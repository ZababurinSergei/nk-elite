import {Component} from '../index.mjs';
import {Actions} from "../nk-menu/this/index.mjs";
import {lpStream} from 'it-length-prefixed-stream'
import {multiaddr} from "@multiformats/multiaddr";
import {proto, protoAudio} from '@newkind/constants'
import {peerIdFromString} from '@libp2p/peer-id'

const name = 'nk-chat';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: {},
        writable: true
    },
    constraints: {
        value: function () {
            return {
                audio: true,
                video: false
            }
        },
        writable: true
    },
    _count: {
        value: 0,
        writable: true
    },
    _message: {
        value: {},
        writable: true
    },
    printSmbl: {
        value: async function () {
            let timeout = Math.round(Math.random() * 100);
            this.DOM.input.textContent = this.DOM.input.textContent + this._message[this._count]

            this._count++
            if (this._count < this._message.length) {
                setTimeout(this.printSmbl, timeout);
            } else {
                this._count = 0
                clearTimeout(timeout)
                this._message = ''
            }
        },
        writable: true
    },
    handler: {
        value: async function ({connection, stream}) {
            const protocol = stream.protocol
            if (protocol === proto) {
                const lp = lpStream(stream)
                const res = await lp.read()

                const output = new TextDecoder().decode(res.subarray())

                this._message = output
                this.printSmbl()
            }

            if (protocol === protoAudio) {
                //https://github.com/libp2p/js-libp2p/discussions/2706
                // console.log('================================================================', this.id)
                const nkP2p = await this.component({
                    id: 'nk-p2p_1',
                    component: 'nk-p2p',
                })

                const lp = lpStream(stream)
                // while (true) {
                //     const res = await lp.read()
                //     console.log('=================== RESPONSE =========================', res)
                // }
                // const connections = self.libp2p.getConnections()
                // for(let connection of connections) {
                //     console.log('========== 222 ============', connection )
                // }
                // const audioTag = self.DOM.audio()
                // const localStream = await navigator.mediaDevices.getUserMedia({video: false, audio: true})
                // const audioTracks = localStream.getAudioTracks();
                // const processor = new MediaStreamTrackProcessor(audioTracks[0]);
                // const generator = new MediaStreamTrackGenerator('audio');
                // const sink = generator.writable;
                // await stream.sink(localStream)
                // console.log('-------------- stream ------------------------', localStream)
                // audioTag.srcObject = localStream
                // audioTag.srcObject = stream.streamSource
                // const source = this.processor.readable;
                // console.log('-------------- stream 3------------------------', localStream)

                stream.channel.onmessage = (event) => {
                    console.log(`received: ${event.data}`);
                };

                stream.channel.onopen = () => {
                    console.log("datachannel open");
                };

                stream.channel.onclose = () => {
                    console.log("datachannel close");
                };
                // await stream.pipe(audioCtx.destination);
                // const lp = lpStream(stream)
                //
                // const res = await lp.read()
                //
                // const output = new TextDecoder().decode(res.subarray())
                //
                // this._message = output
                // this.printSmbl()
            }
        },
        writable: true
    },
    send: {
        value: async function (type, ma, msg) {
            try {
                if (typeof ma === "string") ma = multiaddr(ma);

                const nkP2p = await this.component({
                    id: 'nk-p2p_1',
                    component: 'nk-p2p',
                })

                if (type === 'text') {
                    const signal = AbortSignal.timeout(5000)
                    this.DOM.input.textContent = ''
                    const stream = await nkP2p.libp2p.dialProtocol(ma, proto, {
                        signal
                    });
                    const lp = lpStream(stream)
                    await lp.write(new TextEncoder().encode(msg))
                    return msg
                }

                if (type === 'audio') {
                    const signal = AbortSignal.timeout(5000)
                    this.DOM.input.textContent = ''

                    const stream = await nkP2p.libp2p.dialProtocol(ma, protoAudio, {
                        signal
                    });

                    const lp = lpStream(stream)

                    this.stream.stream = async (output) => {
                        stream.channel.send(output)
                        // const lp = lpStream(stream)
                        // await lp.write(output)
                    }
                    return true
                }
            } catch (e) {
                const text = e.toString()
                this.dialog.error(import.meta.url, text)
            }
        },
        writable: true
    },
    _stream: {
        value: null,
        writable: true
    },
    stream: {
        get: function () {
            return this._stream;
        },
        set: function (newValue) {
            this._stream = newValue;
            const select = this.DOM.select('list-peers')
            let peer = select.options[select.selectedIndex].value;

            if (peer.length === 0) {
                this.DOM.chat.send('audio').classList.add('disabled')
            } else {
                this.DOM.chat.send('audio').classList.remove('disabled')
            }
        },
    },
    connected: {
        value: async function (property) {
            this.broadcastChannel = {
                await: ['nk-p2p']
            }

            this.DOM = {
                input: this.shadowRoot.querySelector('.input'),
                output: this.shadowRoot.querySelector('.output'),
                select: function (type) {
                    const root = this.shadowRoot.querySelector('.chat')
                    switch (type) {
                        case 'list-peers':
                            return root.querySelector('.list-peer')
                        default:
                            break
                    }
                },
                chat: {
                    refresh: function (type) {
                        const root = this.shadowRoot.querySelector('.chat')
                        switch (type) {
                            case 'select':
                                return root.querySelector('.refresh')
                            default:
                                break
                        }
                    },
                    send: function (type) {
                        const root = this.shadowRoot.querySelector('.chat')
                        switch (type) {
                            case 'text':
                                return root.querySelector('.send')
                            case 'audio':
                                return root.querySelector('.send-audio')
                            default:
                                break
                        }
                    }
                }
            }

            this.printSmbl = this.printSmbl.bind(this)
            this.send = this.send.bind(this)
            this.handler = this.handler.bind(this)
            this.DOM.select = this.DOM.select.bind(this)
            this.DOM.chat.send = this.DOM.chat.send.bind(this)
            this.DOM.select = this.DOM.select.bind(this)

            this.actions = await Actions.call(this)

            this.DOM.chat.refresh.call(this, 'select').addEventListener('click', this.actions.refresh)

            this.DOM.select('list-peers').addEventListener('change', (event) => {
                const select = this.DOM.select('list-peers')

                let peer = select.options[select.selectedIndex].value;

                if (peer.length === 0) {
                    this.DOM.chat.send('audio').classList.add('disabled')
                    this.DOM.chat.send('text').classList.add('disabled')
                } else {
                    // if (this.stream) {
                    this.DOM.chat.send('audio').classList.remove('disabled')
                    // } else {
                    //     this.DOM.chat.send('audio').classList.add('disabled')
                    // }
                    this.DOM.chat.send('text').classList.remove('disabled')
                }
            })

            this.DOM.chat.send('audio').addEventListener('click', async (event) => {
                if (this.DOM.chat.send.call(this, 'audio').classList.contains('disabled')) {
                    return
                }

                const select = this.DOM.select('list-peers')
                const outgoing = this.DOM.output
                let peer = select.options[select.selectedIndex].value.trim();

                if (peer.length !== 0) {
                    const nkP2p = await this.component({
                        id: 'nk-p2p_1',
                        component: 'nk-p2p',
                    })

                    const connections = nkP2p.libp2p.getConnections()
                    //TODO надо получать адресс из значений ноды
                    const connect = {
                        remotePeer: peer
                    }

                    if (connect) {
                        const res = await this.send('audio', connect.remotePeer, outgoing.value)
                    } else {
                        this.dialog.error('соединение не найдено')
                    }
                } else {
                    this.dialog.error('Надо выбрать адрес получателя')
                }
            })

            this.DOM.chat.send.call(this, 'text').addEventListener('click', async (event) => {
                if (this.DOM.chat.send.call(this, 'text').classList.contains('disabled')) {
                    return
                }

                const select = this.DOM.select.call(this, 'list-peers')
                const outgoing = this.DOM.output
                let peer = select.options[select.selectedIndex].value;

                if (peer.length !== 0) {
                    const nkP2p = await this.component({
                        id: 'nk-p2p_1',
                        component: 'nk-p2p',
                    })

                    const connections = nkP2p.libp2p.getConnections()
                    //TODO надо получать адресс из значений ноды
                    const connect = {
                        remotePeer: peer
                    }

                    if (connect) {
                        const res = await this.send('text', connect.remotePeer, outgoing.value)
                    } else {
                        this.dialog.error('соединение не найдено')
                    }
                } else {
                    this.dialog.error('Надо выбрать адрес получателя')
                }

            })
            return true;
        },
        writable: true
    },
    disconnected: {
        value: async function () {
            this.DOM.chat.refresh.call(this, 'select').removeEventListener('click', this.actions.refresh)
            return true
        },
        writable: false
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e);
}

export default {};




