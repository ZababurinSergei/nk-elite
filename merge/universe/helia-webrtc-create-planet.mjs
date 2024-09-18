import { createEd25519PeerId, createFromProtobuf} from './lib-peerId-factory.js';
// import init from './PixelPlanets/out.mjs'
import {createNode} from './helia-webrtc-create-node-planet.js'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// const options = init()
export default async () => {

    const DOM = {
        pubsub: (type) => {
            const root = document.body.shadowRoot.querySelector('.pubsub')
            switch (type) {
                case 'refresh':
                    return root.querySelector('.refresh')
                case 'ul':
                default:
                    return root.querySelector('ul')
            }
        },
        private: {
            discovery: (type) => {
                const root = document.body.shadowRoot.querySelector('.private-self-discovery')
                switch (type) {
                    case 'refresh':
                        return root.querySelector('.refresh')
                    case 'ul':
                    default:
                        return root.querySelector('ul')
                }
            }
        },
        public: {
            discovery: (type) => {
                const root = document.body.shadowRoot.querySelector('.discovery')
                switch (type) {
                    case 'refresh':
                        return root.querySelector('.refresh')
                    default:
                        return root.querySelector('ul')
                }
            },
        },
        info: (type) => {
            const root = document.body.shadowRoot.querySelector('.peerInfo')
            switch (type) {
                case 'private':
                    return root.querySelector('.self_p')
                case 'ma':
                    return root.querySelector('.ma')
                case 'public':
                    return root.querySelector('.self_peerId_p')
                default:
                    return root
            }
        },
        chat: (type) => {
            const root = document.body.shadowRoot.querySelector('.chat')
            switch (type) {
                case 'refresh':
                    return root.querySelector('.refresh')
                case 'send':
                    return root.querySelector('button.send')
                case 'input':
                    return root.querySelector('textarea')
                case 'output':
                    return root.querySelector('.output')
                case 'select':
                default:
                    return root.querySelector('select')

            }
        },
        disconnect: () => {
            return document.body.shadowRoot.querySelector('.disconnect')
        },
        planet: () => {
            const root = document.body.shadowRoot.querySelector('.planet')
            return root.querySelector('span')
        },
        ma: (type) => {
            let root = {}
            switch (type) {
                case 'public':
                    root = document.body.shadowRoot.querySelector('.ma')
                    return root.querySelector('ul')
                case 'private':
                    root = document.body.shadowRoot.querySelector('.private_ma')
                    return root.querySelector('ul')
            }
        }
    }

    let obectName = !urlParams.has('planet') ? 'sun' : urlParams.get('planet')
    let namespace = {}

    switch (obectName) {
        case 'moon':
            namespace.PeerId = './peerId_moon.proto'
            namespace.planet = 'moon'
            DOM.planet().textContent = 'Луна'
            options.change(options.planet[0])
            break
        case 'uranus':
            namespace.PeerId = './peerId_uranus.proto'
            namespace.planet = 'uranus'
            DOM.planet().textContent = 'Уран'
            options.change(options.planet[1])
            break
        case 'venus':
            namespace.PeerId = './peerId_venus.proto'
            namespace.planet = 'venus'
            DOM.planet().textContent = 'Уран'
            options.change(options.planet[6])
            break
        case 'jupiter':
            namespace.PeerId = './peerId_jupiter.proto'
            namespace.planet = 'jupiter'
            DOM.planet().textContent = 'Юпитер'
            options.change(options.planet[3])
            break
        case 'earth':
            namespace.PeerId = './peerId_earth.proto'
            namespace.planet = 'earth'
            DOM.planet().textContent = 'Земля'
            options.change(options.planet[8])
            break
        default:
            namespace.PeerId = './peerId_solar_system.proto'
            namespace.planet = 'sun'
            DOM.planet().textContent = 'Солнечная система'
            break
    }

    let publicPeerId = await fetch(namespace.PeerId)

    if (publicPeerId.status === 200) {
        publicPeerId = await publicPeerId.blob()
        publicPeerId = await createFromProtobuf(new Uint8Array(await publicPeerId.arrayBuffer()))
        const privatePeerId = await createEd25519PeerId()

        const node = {
            public: null,
            private: null
        }

        node.private = await createNode(DOM, 'private', publicPeerId, privatePeerId)
        node.public = await createNode(DOM, 'public', publicPeerId, privatePeerId)
    } else {
        console.error('Неизвестная ошибка')
    }
}