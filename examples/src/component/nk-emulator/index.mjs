import { Component } from '../index.mjs'
import {jsFreeQueue} from '@newkind/queue'

const name = 'nk-emulator';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    connected: {
        value: async function (property) {
            console.log('ddddddddddddd',jsFreeQueue)
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

