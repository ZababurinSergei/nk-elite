import { Component } from '../index.mjs'

const name = 'nk-cursor';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    mouseout: {
        value: function (e) {
            this.DOM.cursor().style.display = "none";
        },
        writable: true
    },
    mousemove: {
        value: function (e) {
            let x = e.pageX;
            let y = e.pageY;

            let cursor = this.DOM.cursor()
            cursor.style.top = y + "px";
            cursor.style.left = x + "px";
            cursor.style.display = "block";

            //cursor effects when mouse stopped
            function mouseStopped() {
                cursor.style.display = "none";
            }
            clearTimeout(this.timeout);
            this.timeout = setTimeout(mouseStopped, 5000);
        },
        writable: true
    },
    timeout: {
        value: null,
        writable: true
    },
    controller: {
        value: null,
        writable: true
    },
    connected: {
        value: async function (property) {
            this.DOM = {
                cursor: () => {
                    return  this.querySelector(".cursor");
                },
                mouseout: () => {
                    return  window.document;
                },
                mousemove: () => {
                    return  window.document;
                },
            }
            this.mouseout = this.mouseout.bind(this)
            this.mousemove = this.mousemove.bind(this)

            this.DOM.mouseout().addEventListener("mouseout", this.mouseout)
            this.DOM.mousemove().addEventListener("mousemove", this.mousemove)

            const { actions } = await import(new URL('./actions/index.mjs', import.meta.url).pathname)
            const { controller } = await import(new URL('./controller/index.mjs', import.meta.url).pathname)
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

