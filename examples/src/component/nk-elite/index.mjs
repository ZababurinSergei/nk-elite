import {Component} from '../index.mjs';
import {elite, wControl} from './this/index.mjs'
// import {freeQueueInit} from './elite-main.mjs'
// import {EliteProcessor} from './elite-processor.mjs'

const name = 'nk-elite';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    LFreeQueue: {
        value: null,
        writable: true
    },
    pointer: {
        value: null,
        writable: true
    },
    instance: {
        value: null,
        writable: true
    },
    processor: {
        value: null,
        writable: true
    },
    controller: {
        value: null,
        writable: true
    },
    onRuntimeInitialized: {
        value: null,
        writable: true
    },
    connected: {
        value: async function (property) {
            this.DOM = {
                elite: function (type) {
                    const root = this.shadowRoot.querySelector('.elite-control')
                    switch (type) {
                        case 'run':
                            return root.querySelector('.elite-run')
                        default:
                            return root
                    }
                },
                config: () => {
                    const root = this.shadowRoot.querySelector('.config')
                    for (let key in elite) {
                        root.insertAdjacentHTML('beforeend', `<div class="item ${key}">
                                    <span class="key ${key}">${key}: </span>
                                    <span class="value"> ${typeof elite[key] === 'function' ? 'function' : elite[key]} </span>
                                    </div>`)
                    }
                },
                queue: function () {
                    const root = this.shadowRoot.querySelector('.elite-control')
                    const dataValue = root.querySelector('.queue')
                    const inputQueue = dataValue.querySelector('.inputQueue')
                    const outputQueue = dataValue.querySelector('.outputQueue')

                    inputQueue.innerHTML = ''
                    outputQueue.innerHTML = ''

                    let start = this.instance.states[1] - 42
                    if(start >= 0) {
                        for(let i = 0; i < 42; ++i) {
                            console.log('instance: ',start + i,  this.instance.channelData[0][start + i])
                            outputQueue.insertAdjacentHTML('beforeend', `<div class="sample-${this.instance.channelData[0][start + i]}"></div>`)
                        }
                    }
                }
            };

            for (let key in this.DOM) {
                this.DOM[key] = this.DOM[key].bind(this)
            }

            const {actions} = await import(new URL('./actions/index.mjs', import.meta.url).pathname)
            const {controller} = await import(new URL('./controller/index.mjs', import.meta.url).pathname)
            this.controller = await controller(this, await actions(this))

            await this.controller.addEventListener.init()
            this.DOM.config()

            // await freeQueueInit(this, {})
            // this.onRuntimeInitialized = async () => {
            //     debugger
                // this.processor = new EliteProcessor({
                //     processorOptions: {
                //         pointer: this.pointer,
                //         instance: this.instance
                //     },
                //     numberOfInputs: 1,
                //     numberOfOutputs: 1,
                //     outputChannelCount: [2],
                //     channelCount: 2,
                //     channelCountMode: "max",
                //     channelInterpretation: "speakers"
                // })

                // this.DOM.elite('run').disabled = false
                // const interfaceGame = new (await wControl())(this)
            // }

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
        value: async function (event) {
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

