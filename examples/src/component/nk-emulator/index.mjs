import { Component } from '../index.mjs'
import { FreeQueue } from './free-queue.js'
import { getConstants } from '@newkind/constants'
import { Processor } from './processor.mjs'
import { Actions } from './this/index.mjs'
const { QUEUE_SIZE } = getConstants('emulator')
const name = 'nk-emulator';
const component = await Component();

// const urlWorker = new URL('./worker.async.js', import.meta.url)
const urlWorker = (new URL('./worker.sync.js', import.meta.url)).pathname

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    actions: {
        value: null,
        writable: true
    },
    processor: {
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
            this.actions = await Actions(this)

            this.DOM = {
                processor: function(type) {
                    const root = this.shadowRoot.querySelector('.processor')
                    switch (type) {
                        case 'button-run':
                            return root.querySelector('.button-run')
                        default:
                            return root
                    }
                }
            }

            for(let key in this.DOM) {
                this.DOM[key] = this.DOM[key].bind(this)
            }

            this.DOM.processor('button-run').addEventListener('click', this.actions.processor.run)

            let workerName = 'Emulator'
            this.inputQueue = new FreeQueue(QUEUE_SIZE, 2);
            this.outputQueue = new FreeQueue(QUEUE_SIZE, 2);
            this.atomicState = new Int32Array(new SharedArrayBuffer(4 * Int32Array.BYTES_PER_ELEMENT));
            Object.setPrototypeOf(this.inputQueue, FreeQueue.prototype);
            Object.setPrototypeOf(this.outputQueue, FreeQueue.prototype);

            this.processor = new Processor({
                processorOptions: {
                    inputQueue: this.inputQueue,
                    outputQueue: this.outputQueue,
                    atomicState: this.atomicState
                }
            })

            const worker = new Worker(urlWorker, {
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

                                    this.DOM.processor('button-run').removeAttribute('disabled')
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
                    sampleRate: 20,
                }
            });
        },
        writable: true
    },
    disconnected: {
        value: async function () {
            this.DOM.processor('button-run').removeEventListener('click', this.actions.processor.run)
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

