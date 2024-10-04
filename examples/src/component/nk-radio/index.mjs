import { Component } from '../index.mjs';
import { wControl } from './this/index.mjs'

const name = 'nk-radio';
const component = await Component();

Object.defineProperties(component.prototype, {
    connected: {
        value: async function(property) {
            this.broadcastChannel = {
                await: ['nk-p2p']
            }

            const instanceRadio = new (await wControl())(this);

            return true;
        },
        writable: true
    },
    disconnected: {
        value: async function () {
            return true
        },
        writable: false
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

