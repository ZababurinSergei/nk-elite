import { Component } from '../index.mjs'
const name = 'nk-memory';
const component = await Component();

Object.defineProperties(component.prototype, {
    _inputQueue: {
        value: undefined,
        writable: true
    },
    _outputQueue: {
        value: undefined,
        writable: true
    },
    _atomicState: {
        value: undefined,
        writable: true
    },
    _hardwareConcurrency: {
        value: 0,
        writable: true
    },
    _sharedArrayBuffer: {
        value: [],
        writable: true
    },
    hardwareConcurrency: {
        set(value) {
            this._hardwareConcurrency = value
        },
        get() {
            this._hardwareConcurrency = window.navigator.hardwareConcurrency
            const hardwareConcurrency = this.shadowRoot.querySelector('.hardwareConcurrency')
            hardwareConcurrency.querySelector('.value').textContent = this._hardwareConcurrency
            return this._hardwareConcurrency
        }
    },
    inputQueue: {
        set(value) {
            this._inputQueue = value
        },
        get() {
            return this._inputQueue
        }
    },
    atomicState: {
        set(value) {
            this._atomicState = value
        },
        get() {
            return this._atomicState
        }
    },
    outputQueue: {
        set(value) {
            this._outputQueue = value
        },
        get() {
            return this._outputQueue
        }
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
                console.log('----------- key -----------')
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

