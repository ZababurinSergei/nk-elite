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
            let x = e.clientX;
            let y = e.clientY;

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
                document: () => {
                    return  window.document;
                }
            }

            this.mouseout = this.mouseout.bind(this)
            this.mousemove = this.mousemove.bind(this)

            this.DOM.document().addEventListener("mouseout", this.mouseout)
            this.DOM.document().addEventListener("mousemove", this.mousemove)
        },
        writable: true
    },
    disconnected: {
        value: async function () {
            this.DOM.document().removeEventListener("mouseout", this.mouseout)
            this.DOM.document().removeEventListener("mousemove", this.mousemove)
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

