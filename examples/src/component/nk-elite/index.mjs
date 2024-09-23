import { Component } from '../index.mjs';
import { elite, wControl } from './this/index.mjs'

const name = 'nk-elite';
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
        value: async function(property) {
            this.DOM = {
                config: () => {
                    const root = this.shadowRoot.querySelector('.config')
                    for(let key in elite) {
                        root.insertAdjacentHTML('beforeend',`<div class="item ${key}">
                                    <span class="key ${key}">${key}: </span>
                                    <span class="value"> ${typeof elite[key] === 'function'?'function': elite[key] } </span>
                                    </div>`)
                    }
                }
            };

            for(let key in this.DOM) {
                this.DOM[key] = this.DOM[key].bind(this)
            }
            const { actions } = await import(new URL('./actions/index.mjs', import.meta.url).pathname)
            const { controller } = await import(new URL('./controller/index.mjs', import.meta.url).pathname)
            this.controller = await controller(this, await actions(this))
            await this.controller.addEventListener.init()
            this.DOM.config()

            const interfaceGame = new (await wControl())(this)
            return true;
        },
        writable: true
    },
    disconnected: {
        value: async function () {
            this.controller.addEventListener.terminate()
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

