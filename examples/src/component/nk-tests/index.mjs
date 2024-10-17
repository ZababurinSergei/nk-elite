import {Component} from '../index.mjs';
import { logger } from '@libp2p/logger'
import Test from './this/modules/test/index.mjs'
import { mocha } from '@newkind/tests'

const log = logger('nk-tests')

const name = 'nk-tests';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: {
            buttons: function () {
              return this.shadowRoot.querySelectorAll('button')
            },
            tests: function () {
                return this.shadowRoot.querySelector('#mocha')
            }
        },
        writable: true
    },
    run: {
        value: function (path = false, checkLeaks = true) {
            return new Promise(async (resolve, reject) => {
                try {
                    mocha.setup("bdd");
                    const urlTEst = new URL(path, import.meta.url);


                    (path)
                        ? await Test(urlTEst.pathname)
                        : await Test()

                    (checkLeaks)
                        ? mocha.checkLeaks()
                        : ''

                    mocha.run()
                    resolve(true)
                } catch (e) {
                    reject({
                        success: false,
                        status: "false",
                        message: e
                    })
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
            this.DOM.buttons = this.DOM.buttons.bind(this)
            this.DOM.tests = this.DOM.tests.bind(this)
            this.run = this.run.bind(this)
            this.stop = this.stop.bind(this)
            const { actions } = await import(new URL('./actions/index.mjs', import.meta.url).pathname)
            const { controller } = await import(new URL('./controller/index.mjs', import.meta.url).pathname)
            this.controller = await controller.call(this, await actions(this))
            await this.controller.addEventListener.init.call(this)
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

