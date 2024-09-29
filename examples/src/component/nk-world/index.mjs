import {Component} from '../index.mjs';
import {loader} from './this/index.mjs'
import { logger } from '@libp2p/logger'
const log = logger('newkind:nk-universe:component')

const name = 'nk-world';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    connected: {
        value: async function (property) {
            const DOM = {}
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const isNkWorld = urlParams.has('nkWorld')
            if (!isNkWorld) {
                this.classList.add('inactive')
            }

            log('Инициализация компонента: %b', Uint8Array.from([0, 1, 2, 3]))
            await loader('./src/app/vendor/stats/build/stats.min.js')
            await loader('./src/app/vendor/jquery/dist/jquery.min.js')
            await loader('./src/app/vendor/foundation-sites/dist/foundation.min.js')
            await loader('./src/app/vendor/tweenjs/build/tween.min.js')
            await loader('./src/app/vendor/three.js/three.min.js')
            await loader('./src/app/vendor/requirejs/require.js', {
                main: './src/app/app'
            })
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

