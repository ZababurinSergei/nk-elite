import {Component} from '../index.mjs'
import { cell } from './this/index.mjs'

const name = 'nk-iframe';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    cell: {
        value: cell,
        writable: true
    },
    controller: {
        value: null,
        writable: true
    },
    height: {
        set: function (value) {
            const iframe = this.querySelector('iframe')
            iframe.style.height = `${value}px`
            this.style.setProperty('--height', `${value}px`);
        },
        get: function () {
            return this.style.getPropertyValue('--height');
        }
    },
    width: {
        set: function (value) {
            this.style.setProperty('--width', `${value}px`);
        },
        get: function () {
            return this.style.getPropertyValue('--width');
        }
    },
    connected: {
        value: async function (property) {
            this.cell = this.cell.bind(this)
            const {actions} = await import(new URL('./actions/index.mjs', import.meta.url).pathname)
            const {controller} = await import(new URL('./controller/index.mjs', import.meta.url).pathname)
            this.controller = await controller(this, await actions(this))
            await this.controller.addEventListener.init()

            if (this.dataset.height) {
                this.height = this.dataset.height
            }

            if (this.dataset.width) {
                this.width = this.dataset.width
            }

            var isFramed = false;
            
            try {
                isFramed = window != window.top || document != top.document || self.location != top.location;
            } catch (e) {
                isFramed = true;
            }
            if (isFramed) {

            } else {
                this.cell()
            }
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

