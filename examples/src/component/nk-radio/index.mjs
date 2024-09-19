import { Component } from '../index.mjs';
import { wControl } from './this/index.mjs'

const name = 'nk-radio';
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

            const instanceRadio = new (await wControl())(this);

            this.task = {
                id: 'nk-p2p_0',
                type: 'self',
                component: 'nk-p2p',
                detail: {test: 'test'}
            }

            console.log('=== instanceRadio ===', instanceRadio)
            return true;
        },
        writable: true
    },
    disconnected: async function() {
        return true
    },
    onMessage: {
        value: async function(self, detail) {

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

