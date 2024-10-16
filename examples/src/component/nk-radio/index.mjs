import { Component } from '../index.mjs';
import { wControl } from './this/index.mjs'

const name = 'nk-radio';
const component = await Component();

Object.defineProperties(component.prototype, {
    inputQueue: {
        value: null,
        writable: true
    },
    outputQueue: {
        value: null,
        writable: true
    },
    atomicState: {
      value: null,
      writable: true
    },
    connected: {
        value: async function(property) {
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
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e);
}

export default {};

