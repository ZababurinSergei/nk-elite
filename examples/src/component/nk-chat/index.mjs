import {Component} from '../index.mjs';
import {Actions} from "../nk-menu/this/index.mjs";
import {lpStream} from 'it-length-prefixed-stream'
import {multiaddr} from "@multiformats/multiaddr";
import {proto, protoAudio} from '@newkind/constants'
import { peerIdFromString } from '@libp2p/peer-id'

const name = 'nk-chat';
const component = await Component();

const constraints = window.constraints = {
    audio: true,
    video: false
};

function lowPassFilter() {
    const format = 'f32-planar';
    let lastValuePerChannel = undefined;
    return (data, controller) => {
        const rc = 1.0 / (cutoff * 2 * Math.PI);
        const dt = 1.0 / data.sampleRate;
        const alpha = dt / (rc + dt);
        const nChannels = data.numberOfChannels;
        if (!lastValuePerChannel) {
            console.log(`Audio stream has ${nChannels} channels.`);
            lastValuePerChannel = Array(nChannels).fill(0);
        }
        const buffer = new Float32Array(data.numberOfFrames * nChannels);
        for (let c = 0; c < nChannels; c++) {
            const offset = data.numberOfFrames * c;
            const samples = buffer.subarray(offset, offset + data.numberOfFrames);
            data.copyTo(samples, {planeIndex: c, format});
            let lastValue = lastValuePerChannel[c];

            // Apply low-pass filter to samples.
            for (let i = 0; i < samples.length; ++i) {
                lastValue = lastValue + alpha * (samples[i] - lastValue);
                samples[i] = lastValue;
            }

            lastValuePerChannel[c] = lastValue;
        }
        controller.enqueue(new AudioData({
            format,
            sampleRate: data.sampleRate,
            numberOfFrames: data.numberOfFrames,
            numberOfChannels: nChannels,
            timestamp: data.timestamp,
            data: buffer
        }));
    };
}

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
                console.log('================================================================', this.id)
                this.task = {
                    id: 'nk-p2p_1',
                    component: 'nk-p2p',
                    execute: async (self) => {

                        const connections = self.libp2p.getConnections()

                        for(let connection of connections) {
                            console.log('========== 222 ============', connection )
                        }


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
                    }
                }

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
            if (typeof ma === "string") ma = multiaddr(ma);
            this.task = {
                id: 'nk-p2p_1',
                component: 'nk-p2p',
                type: 'self',
                execute: async (self) => {
                    try {
                        if (type === 'text') {
                            const signal = AbortSignal.timeout(5000)

                            this.DOM.input.textContent = ''
                            const stream = await self.libp2p.dialProtocol(ma, proto, {
                                signal
                            });

                            const lp = lpStream(stream)

                            console.log('dddddddddddddddddddddddddd',)
                            await lp.write(new TextEncoder().encode(msg))

                            return msg
                        }

                        if (type === 'audio') {
                            const signal = AbortSignal.timeout(5000)
                            this.DOM.input.textContent = ''

                            const stream = await self.libp2p.dialProtocol(ma, protoAudio, {
                                signal
                            });

                            // const connection = dialer.getConnections(peerIdFromString(webRTCMultiaddr.getPeerId()))[0]
                            // const lp = lpStream(stream)
                            // const connections = self.libp2p.getConnections(peerIdFromString(ma.getPeerId()))
                            // const connections_2 = self.libp2p.getConnections()
                            // for(let connection of connections_2) {
                                // console.log('======================', connection )
                            // }


                            const audioTracks = this.stream.getAudioTracks();

                            console.log('======== stream ==============', this.stream)
                            for(let audioTrack of audioTracks) {
                                console.log('======================', audioTrack)
                            }

                            // this.stream.oninactive = () => {
                            //     console.log('Stream ended');
                            // };


                            // const rtcPeerConnection = conn.peerConnection
                            // console.log(rtcPeerConnection)

                            // for(const connection of conns) {
                            //     const rtcPeerConnection = conn.peerConnection
                            //     console.log('dddddddddddddddddddddddddddd',conn)
                            // }

                            // this.processor = new MediaStreamTrackProcessor(audioTracks[0]);
                            // this.generator = new MediaStreamTrackGenerator('audio');
                            // const source = this.processor.readable;
                            // const sink = this.generator.writable;
                            // const transformer = new TransformStream({transform: lowPassFilter()});
                            // const abortController = new AbortController();

                            // console.log('ddddddddddddddddddddddddddddddddddddddddddd', sink)
                            // console.log('ddddddddddddddddd sink dddddddddddddddddddddddddd', await stream.sink(stream.source))
                            // const signal = abortController.signal;
                            // source.pipeTo(await stream.sink(stream.source))
                            // const promise = source.pipeThrough(transformer, {signal}).pipeTo(stream.sink);
                            // promise.catch((e) => {
                            //     if (signal.aborted) {
                            //         console.log('Shutting down streams after abort.');
                            //     } else {
                            //         console.error('Error from stream transform:', e);
                            //     }
                            //     source.cancel(e);
                            //     sink.abort(e);
                            // })

                            // setInterval(async () => {
                            //     await lp.write(new TextEncoder().encode(msg))
                            // stream.channel.send('asasasasas')
                            // }, 1000)
                            //
                            // const lp = lpStream(stream)
                            //
                            // await lp.write(new TextEncoder().encode(msg))
                            //
                            return true
                        }
                    } catch (e) {
                        const text = e.toString()
                        this.dialog.error(import.meta.url, text)
                    }

                }
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
                    if (this.stream) {
                        this.DOM.chat.send('audio').classList.remove('disabled')
                    } else {
                        this.DOM.chat.send('audio').classList.add('disabled')
                    }

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
                    this.task = {
                        id: 'nk-p2p_1',
                        component: 'nk-p2p',
                        type: 'self',
                        execute: async (self) => {
                            const connections = self.libp2p.getConnections()
                            //TODO надо получать адресс из значений ноды
                            const connect = {
                                remotePeer: peer
                            }
                            if (connect) {
                                const res = await this.send('audio', connect.remotePeer, outgoing.value)
                            } else {
                                this.dialog.error('соединение не найдено')
                            }
                        }
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
                    this.task = {
                        id: 'nk-p2p_1',
                        component: 'nk-p2p',
                        type: 'self',
                        execute: async (self) => {
                            const connections = self.libp2p.getConnections()
                            //TODO надо получать адресс из значений ноды
                            const connect = {
                                remotePeer: peer
                            }
                            if (connect) {
                                const res = await this.send('text', connect.remotePeer, outgoing.value)
                            } else {
                                this.dialog.error('соединение не найдено')
                            }
                        }
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
    },
    onMessage: {
        value: async function (self, detail) {
            console.warn('Этот метод не надо использовать. Надо сделать в вызывающем компоненте тип self', self)
            debugger
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




