import {Component} from '../index.mjs';
import { logger } from '@libp2p/logger'
import Test from './this/modules/test/index.mjs'
import { Mocha } from './this/modules/chai/index.mjs'
import css from './this/modules/mocha/mocha.min.css.mjs'

const log = logger('nk-tests')
let mochaHtml =`<div id="tests" style="position: relative"><ul id="mocha"></ul></div><style>${css}</style>`;

const name = 'nk-tests';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    connected: {
        value: async function (property) {
            const DOM = { }

            return true
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

