import { Component } from '../index.mjs';

const name = 'nk-elite-control';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    connected: {
        value: async function(property) {
            this.DOM = { };

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

