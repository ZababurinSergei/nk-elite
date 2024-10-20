import { Component } from '../index.mjs'
const name = 'nk-memory';
const component = await Component();

Object.defineProperties(component.prototype, {
    _sharedArrayBuffer: {
        value: [],
        writable: true
    },
    hardwareConcurrency: {
        value: function(){
            const hardwareConcurrency = this.shadowRoot.querySelector('.hardwareConcurrency')
            hardwareConcurrency.querySelector('.value').textContent = window.navigator.hardwareConcurrency
            return window.navigator.hardwareConcurrency
        },
        writable: true
    },
    sharedArrayBuffer: {
        set(value) {
            if(value?.isRemove) {
                delete this._sharedArrayBuffer[value.name.toLowerCase()]
            } else {
                this._sharedArrayBuffer[value.name.toLowerCase()] = value
            }

            const list = this.shadowRoot.querySelector('.memory-queue')
            list.innerHTML = ''
            for(let item in this._sharedArrayBuffer) {
                const array = []
                for(let key in this._sharedArrayBuffer[item]) {
                    array.push(`<div class="item _${key}"><span class="key"> ${key}:</span> <span class="value">${this.sharedArrayBuffer[item][key]}</span> </div>`)
                }

                list.insertAdjacentHTML('beforeend', `
                <div class="memory _${item}">
                    ${array.join(' ')}
                </div>
            `)
            }
        },
        get() {
            return this._sharedArrayBuffer
        }
    },
    DOM: {
        value: null,
        writable: true
    },
    connected: {
        value: async function (property) {
            this.hardwareConcurrency = this.hardwareConcurrency.bind(this)
            this.hardwareConcurrency()
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const isNkWorld = urlParams.has('memory')

            if(!isNkWorld) {
                this.classList.add('inactive')
            }
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

