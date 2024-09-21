import {Component} from '../index.mjs';
import { logger } from '@libp2p/logger'
const log = logger('newkind:nk-universe:component')

const name = 'nk-universe';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    connected: {
        value: async function (property) {
            const DOM = { }
            log('Инициализация компонента: %b', Uint8Array.from([0, 1, 2, 3]))
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

