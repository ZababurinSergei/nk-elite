import { Component } from '../index.mjs'
import { JsFreeQueue } from '@newkind/queue'
import { getConstants } from '@newkind/constants'
const { QUEUE_SIZE } = getConstants('emulator')
const name = 'nk-emulator';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    atomicState: {
        value: null,
        writable: true
    },
    inputQueue: {
        value: null,
        writable: true
    },
    outputQueue: {
        value: null,
        writable: true
    },
    connected: {
        value: async function (property) {
            console.log('ddddddddddddd',QUEUE_SIZE)

            this.inputQueue = new JsFreeQueue(QUEUE_SIZE, 2);
            this.outputQueue = new JsFreeQueue(QUEUE_SIZE, 2);
            Object.setPrototypeOf(this.inputQueue, JsFreeQueue.prototype);
            Object.setPrototypeOf(this.outputQueue, JsFreeQueue.prototype);

            self.atomicState = new Int32Array(new SharedArrayBuffer(4 * Int32Array.BYTES_PER_ELEMENT));

            this.task = {
                id: 'nk-memory_0',
                component: 'nk-memory',
                type: 'self',
                execute: async (self) => {

                }
            }
            // let workerName = 'Emulator'

            // self.hardwareConcurrency
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

