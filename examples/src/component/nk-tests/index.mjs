import {Component} from '../index.mjs';
import {logger} from '@libp2p/logger'
import Test from './this/modules/test/index.mjs'
import {mocha} from '@newkind/tests'
import {Iframe} from '@newkind/this'

const log = logger('nk-tests')

const name = 'nk-tests';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: {
            nkIframe: function () {
                return this.querySelector('nk-iframe')
            },
            script: function () {
                return this.querySelector('.script')
            },
            buttons: function () {
                return this.shadowRoot.querySelectorAll('button')
            },
            tests: function () {
                return this.querySelector('#mocha')
            }
        },
        writable: true
    },
    reset: {
        value: function () {
            let nkIframe = this.DOM.nkIframe()
            if(nkIframe) {
                nkIframe.remove()
            }
        },
        writable: true
    },
    run: {
        value: function (path = false, checkLeaks = true) {
            return new Promise(async (resolve, reject) => {
                const iframe = await Iframe()
                if (iframe.isFramed) {
                    try {
                        mocha.setup({
                            asyncOnly: false,
                            ui: 'bdd'
                        });

                        const urlTEst = new URL(path, import.meta.url);

                        // let test = await fetch(urlTEst.pathname)
                        // test = await test.blob()
                        // let objectURL = window.URL.createObjectURL(test);
                        // mocha.addFile(objectURL);

                        (path)
                            ? await Test.call(this, urlTEst.pathname)
                            : await Test.call(this)

                            (checkLeaks)
                                ? mocha.checkLeaks()
                                : ''

                        // mocha.cleanReferencesAfterRun(false).run(() => {
                        //    console.log('33333333333333333333333333333333333333')
                        // mocha.cleanReferencesAfterRun(false)
                        // mocha.dispose()
                        // mocha.cleanReferencesAfterRun(true).run(() => {mocha.dispose();});
                        // });

                        mocha.run()
                        resolve(true)
                    } catch (e) {
                        reject({
                            success: false,
                            status: "false",
                            message: e
                        })
                    }
                } else {
                    this.insertAdjacentHTML('beforeend', `
                        <nk-iframe
                            slot="tests"
                            id="nk-iframe_0"
                            data-css-light="true"
                            data-test-url=${path}
                        >
                            <template>
                                <div style="height:100%">
                                    <slot name="jason"></slot>
                                </div>
                            </template>
                        </nk-iframe>
                    `)
                }
            })
        },
        writable: true
    },
    stop: {
        value: function () {

        },
        writable: true
    },
    controller: {
        value: null,
        writable: true
    },
    connected: {
        value: async function (property) {
            const iframe = await Iframe()
            this.DOM.buttons = this.DOM.buttons.bind(this)
            this.DOM.tests = this.DOM.tests.bind(this)
            this.DOM.script = this.DOM.script.bind(this)
            this.reset = this.reset.bind(this)
            this.run = this.run.bind(this)
            this.stop = this.stop.bind(this)
            const {actions} = await import(new URL('./actions/index.mjs', import.meta.url).pathname)
            const {controller} = await import(new URL('./controller/index.mjs', import.meta.url).pathname)
            this.controller = await controller.call(this, await actions(this))
            await this.controller.addEventListener.init.call(this)

            if (iframe.isFramed) {
                const nkIframe = window.parent.document.body.querySelector('nk-iframe')

                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ nkIframe.dataset.testUrl', nkIframe, nkIframe.dataset.testUrl.length)
                if (nkIframe.dataset.testUrl && nkIframe.dataset.testUrl.trim().length !== 0) {
                    this.run(nkIframe.dataset.testUrl)
                }
            }

            return true
        },
        writable: true
    },
    disconnected: {
        value: async function () {
            await this.controller.addEventListener.terminate.call(this)
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

