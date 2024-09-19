import {Component} from '../index.mjs';
// import {Actions} from './this/index.mjs'

const name = 'nk-menu';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: {
            info: function(type) {
                const root = this.shadowRoot.querySelector('.peerInfo')
                switch (type) {
                    case 'planet-public-id':
                        return root.querySelector('.planet-public-id')
                    case 'planet-private-id':
                        return root.querySelector('.planet-private-id')
                    case 'planet':
                        return  root.querySelector('.planet-text')
                    case 'private':
                        return root.querySelector('.self_p')
                    case 'public':
                        return root.querySelector('.self_peerId_p')
                    case 'ma_public':
                        return root.querySelector('.ma_public')
                    case 'ma_private':
                        return root.querySelector('.ma_private')
                    default:
                        return root
                }
            }
        },
        writable: true
    },
    stream: {
        value: async function (stream) {
            console.log('--------------', stream)
        },
        writable: true
    },
    connected: {
        value: async function (property) {
            this.broadcastChannel = {
                await: ['nk-p2p']
            }

            return true;
        },
        writable: true
    },
    disconnected: async function () {
        return true
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

