import { Component } from '../index.mjs'
import { FreeQueueSAB } from '@newkind/freeQueue'
import { getConstants } from '@newkind/constants'
import { Processor } from './processor.mjs'
import { Actions } from './this/index.mjs'

const { QUEUE_SIZE } = getConstants('emulator')
const constants = getConstants('emulator')
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
                        case 'constants':
                            return root.querySelector('.constants')
                        default:
                            return root
                    }
                },
                constants: function (type, constants) {
                    const root = this.shadowRoot.querySelector('.processor')
                    const dataValue = root.querySelector('.constants')
                    switch (type) {
                        case 'set':
                            dataValue.innerHTML = ''
                            for(let key in constants) {
                                if(key === 'ExpectedPrimingCount') {
                                    dataValue.insertAdjacentHTML('beforeend', `<div class="item ${key}"><span class="key">${key}</span> <span class="value">${constants[key]} // FRAME_SIZE/RENDER_QUANTUM</span> </div>`)
                                } else {
                                    dataValue.insertAdjacentHTML('beforeend', `<div class="item ${key}"><span class="key">${key}</span> <span class="value">${constants[key]}</span> </div>`)
                                }
                            }
                            return true
                        default:
                            return root
                    }
                },
                queue: function () {
                    const root = this.shadowRoot.querySelector('.processor')
                    const dataValue = root.querySelector('.queue')
                    const inputQueue = dataValue.querySelector('.inputQueue')
                    const outputQueue = dataValue.querySelector('.outputQueue')
                    const atomicState = dataValue.querySelector('.atomicState')
                    const sampleRate = dataValue.querySelector('.sampleRate')
                    const irArray = dataValue.querySelector('.irArray')

                    inputQueue.innerHTML = ''
                    outputQueue.innerHTML = ''

                    for(let i = 0; i < this.inputQueue.channelData[0].length; ++i) {
                        inputQueue.insertAdjacentHTML('beforeend', `<div class="sample-${this.inputQueue.channelData[0][i]}"></div>`)
                    }

                    for(let i = 0; i < this.outputQueue.channelData[0].length; ++i) {
                        outputQueue.insertAdjacentHTML('beforeend', `<div class="sample-${this.inputQueue.channelData[0][i]}"></div>`)
                    }

                    // switch (name) {
                    //     case 'inputQueue':
                    //

                    //         break
                    //     case 'outputQueue':
                    //         break
                    //     case 'atomicState':
                    //         break
                    //     case 'sampleRate':
                    //         break
                    //     case 'irArray':
                    //         break
                    // }
                    //
                    // for(let i =0; i < data.length; ++i) {
                    //     dataValue.insertAdjacentHTML('beforeend', `<div class="item ${key}"><span class="key">${key}</span> <span class="value">${constants[key]}</span> </div>`)
                    // }
                }
            }

            for(let key in this.DOM) {
                this.DOM[key] = this.DOM[key].bind(this)
            }

            constants.ExpectedPrimingCount =  parseInt(constants.FRAME_SIZE / constants.RENDER_QUANTUM, 10);
            this.DOM.processor('button-run').addEventListener('click', this.actions.processor.run)

            let workerName = 'Emulator'
            this.inputQueue = new FreeQueueSAB(QUEUE_SIZE, 2);
            this.outputQueue = new FreeQueueSAB(QUEUE_SIZE, 2);
            this.atomicState = new Int32Array(new SharedArrayBuffer(2 * Int32Array.BYTES_PER_ELEMENT));
            Object.setPrototypeOf(this.inputQueue, FreeQueueSAB.prototype);
            Object.setPrototypeOf(this.outputQueue, FreeQueueSAB.prototype);

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
                                        inputQueue: QUEUE_SIZE,
                                        outputQueue: QUEUE_SIZE,
                                        atomicState: 2 * Int32Array.BYTES_PER_ELEMENT,
                                        irArray: undefined,
                                        sampleRate: 69,
                                        type: 'async'
                                    }

                                    this.DOM.processor('button-run').removeAttribute('disabled')
                                    this.DOM.queue()
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

