import {Component} from '../index.mjs';
import {Actions} from "../nk-menu/this/index.mjs";
import {lpStream} from 'it-length-prefixed-stream'
import {multiaddr} from "@multiformats/multiaddr";
import {proto} from '@newkind/constants'

const name = 'nk-chat';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: {},
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

            this._count ++
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
            console.log('INCOMING PEER_ID ', connection.remotePeer.toString())
            const lp = lpStream(stream)

            const res = await lp.read()

            const output = new TextDecoder().decode(res.subarray())

            this._message = output
            this.printSmbl.call(component.prototype)
        },
        writable: true
    },
    send: {
        value: async function (ma, msg) {
            if (typeof ma === "string") ma = multiaddr(ma);

            const signal = AbortSignal.timeout(5000)

            this.task = {
                id: 'nk-p2p_1',
                component: 'nk-p2p',
                type: 'self',
                execute: async (self) => {
                    try {
                        this.DOM.input.textContent = ''
                        const stream = await self.libp2p.dialProtocol(ma, proto, {
                            signal
                        });

                        const lp = lpStream(stream)

                        await lp.write(new TextEncoder().encode(msg))

                        return msg
                    } catch (e) {
                        alert(e.toString)
                    }

                }
            }
        },
        writable: true
    },
    stream: {
        value: async function (stream) {
            console.log('--------------', stream)
        },
        writable: true
    },
    connected: {
        value: async function (property) {
            this.broadcastChannel = {
                await: ['nk-p2p']
            }

            this.printSmbl = this.printSmbl.bind(this)
            this.send = this.send.bind(this)
            this.handler = this.handler.bind(this)

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
                            default:
                                break
                        }
                    }
                }
            }

            this.actions = await Actions.call(this)

            this.DOM.chat.refresh.call(this, 'select').addEventListener('click', this.actions.refresh)

            this.DOM.chat.send.call(this, 'text').addEventListener('click', async (event) => {
                const select = this.DOM.select.call(this, 'list-peers')
                const outgoing = this.DOM.output
                let peer = select.options[select.selectedIndex].value;

                if(peer.length !== 0) {
                    this.task = {
                        id: 'nk-p2p_1',
                        component: 'nk-p2p',
                        type: 'self',
                        execute: async (self) => {
                            const connections = self.libp2p.getConnections()
                            const connect =  {
                                remotePeer: peer
                            }
                            // const connect = connections.find(item => {}item.remotePeer.toString().includes(peer))

                            console.log('------------ connections --------------', connections)
                            if (connect) {
                                const res = await this.send(connect.remotePeer, outgoing.value)
                                // console.log('---------- REQUEST ----------', connect.remotePeer.toString(), res)
                            } else {
                                alert('соединение не найдено')
                            }
                        }
                    }
                    // const connections = globalThis.node.libp2p.getConnections()
                } else {
                    alert('Надо выбрать адрес отправления')
                    // this.dialog.open('Надо выбрать адрес отправления')
                }

            })
            return true;
        },
        writable: true
    },
    disconnected: async function () {
        this.DOM.chat.refresh.call(this, 'select').removeEventListener('click', this.actions.refresh)
        return true
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

