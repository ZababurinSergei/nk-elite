import { Component } from '../index.mjs'
import { actions } from './actions/index.mjs'
import { controller } from './controller/index.mjs'

const name = 'nk-filter';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    controller: {
        value: null,
        writable: true
    },
    connected: {
        value: async function (property) {
            this.controller = await controller(this, await actions(this))
            await this.controller.addEventListener.init()
        },
        writable: true
    },
    disconnected: {
        value: async function () {
            this.controller.addEventListener.terminate()
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

