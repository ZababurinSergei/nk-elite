import {Component} from '../index.mjs';
import {Actions} from './this/index.mjs'

const name = 'nk-menu';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: {
            chat: {
                refresh: function(type) {
                    console.log('dddddddddddddddddddddddddddd', this)
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

            this.actions = await Actions.call(this)

            this.DOM.chat.refresh.call(this, 'select').addEventListener('click', this.actions.refresh)

            // this.task = {
            //     id: 'nk-p2p_0',
            //     component: 'nk-p2p',
            //     type: 'self',
            //     detail: {test: 'test'}
            // }

            return true;
        },
        writable: true
    },
    disconnected: async function () {
        this.DOM.chat.refresh.call(this,'select').removeEventListener('click', this.actions.refresh)
        return true
    },
    onMessage: {
        value: async function (event) {
            console.warn('Этот метод не надо использовать. Надо сделать в вызывающем компоненте тип self')
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

