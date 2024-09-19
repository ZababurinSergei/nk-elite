import {Component} from '../index.mjs';
import {Actions} from "../nk-menu/this/index.mjs";

const name = 'nk-chat';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: {},
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

            this.DOM = {
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

            return true;
        },
        writable: true
    },
    disconnected: async function () {
        this.DOM.chat.refresh.call(this,'select').removeEventListener('click', this.actions.refresh)
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

