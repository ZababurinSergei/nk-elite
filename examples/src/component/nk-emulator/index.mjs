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
            let workerName = 'Emulator'
            this.inputQueue = new JsFreeQueue(QUEUE_SIZE, 2);
            this.outputQueue = new JsFreeQueue(QUEUE_SIZE, 2);
            Object.setPrototypeOf(this.inputQueue, JsFreeQueue.prototype);
            Object.setPrototypeOf(this.outputQueue, JsFreeQueue.prototype);
            this.atomicState = new Int32Array(new SharedArrayBuffer(4 * Int32Array.BYTES_PER_ELEMENT));
            const worker = new Worker(new URL('./worker.async.js', import.meta.url), {
                name: workerName,
                type: 'module',
            });

            worker.onmessage = (event) => {
                if(event.data.status) {
                    switch (event.data.type) {
                        case 'terminate':
                            //TODO надо проверить уничтожится он или нет до уничтожения компонента
                            console.log('######## TERMINATE ##########')
                            break
                        default:
                            this.task = {
                                id: 'nk-memory_0',
                                component: 'nk-memory',
                                type: 'self',
                                execute: (self) => {
                                    self.sharedArrayBuffer =  {
                                        name: workerName,
                                        inputQueue: QUEUE_SIZE * 2,
                                        outputQueue: QUEUE_SIZE * 2,
                                        atomicState: 4 * Int32Array.BYTES_PER_ELEMENT,
                                        irArray: undefined,
                                        sampleRate: 69,
                                        type: 'async'
                                    }
                                    self.hardwareConcurrency()
                                }
                            }
                            break
                    }
                }
            }

            worker.postMessage({
                type: 'init',
                data: {
                    inputQueue: this.inputQueue,
                    outputQueue: this.outputQueue,
                    atomicState: this.atomicState,
                    irArray: undefined,
                    sampleRate: 48000,
                }
            });
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

