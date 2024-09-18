import { Component } from '../index.mjs';
import { nkP2p } from './this/index.mjs'

const name = 'nk-menu';
const component = await Component();

Object.defineProperties(component.prototype, {
    stream: {
        value: async function(stream) {
            console.log('--------------', stream)
        },
        writable: true
    },
    connected: {
        value: async function(property) {
            this.broadcastChannel = {
                await: ['nk-p2p']
            }

            this.task = {
                id: 'nk-p2p_0',
                component: 'nk-p2p',
                type: 'self',
                callback: nkP2p,
                data: {test: 'test'}
            }

            return true;
        },
        writable: true
    },
    disconnected: async function() {
        return true
    },
    onMessage: {
        value: async function(event) {
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

