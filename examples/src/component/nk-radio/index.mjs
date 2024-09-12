import { Component } from '../index.mjs';
import { wControl } from './this/index.mjs'

const name = 'nk-radio';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    connected: {
        value: async function(property) {
            this.DOM = { };

            new (await wControl())(this);

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

