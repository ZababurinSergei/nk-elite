import {Component} from '../index.mjs';

const name = 'nk-universe';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    connected: {
        value: async function (property) {
            const DOM = { }

            return true
        },
        writable: true
    },
    disconnected: async function () {
        return true
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e);
}

export default {};

