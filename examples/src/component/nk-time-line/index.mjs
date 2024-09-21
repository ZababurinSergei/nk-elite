import { Component } from '../index.mjs'
// import { actions } from './actions/index.mjs'
// import { controller } from './controller/index.mjs'

const name = 'nk-time-line';
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

            // const url = new URL('./actions/index.mjs', import.meta.url)
            const { actions } = await import(new URL('./actions/index.mjs', import.meta.url).pathname)
            const { controller } = await import(new URL('./controller/index.mjs', import.meta.url).pathname)
            // let {controller} = await import(`/services/${self.dataset.servicesPath}/src/component/${COMPONENT}/controller/index.mjs`)

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

