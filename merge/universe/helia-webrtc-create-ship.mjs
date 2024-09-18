import { createEd25519PeerId, createFromProtobuf} from './lib-peerId-factory.js';
// import init from './PixelPlanets/out.mjs'
import {createNode} from './helia-webrtc-create-node-ship.js'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// const options = init()
export default async (typeShip) => {
    const DOM = {
        webrtcDirect: (type) => {
            const root = document.body.shadowRoot.querySelector('.webrtc-direct')
            switch (type) {
                case 'ship-1_name':
                    return root.querySelector('.ship-1-name')
                case 'ship-id-1_public':
                    return root.querySelector('.ship-id-1_public')
                case 'ship-id-1_private':
                    return root.querySelector('.ship-id-1_private')
                case 'ship-2_name':
                    return root.querySelector('.ship-2-name')
                case 'ship-id-2_public':
                    return root.querySelector('.ship-id-2_public')
                case 'ship-id-2_private':
                    return root.querySelector('.ship-id-2_private')
                default:
                    return root
            }
        }
    }

    // let obectName = !urlParams.has('ship') ? 'cobra' : urlParams.get('ship')
    let namespace = {
        ship: []
    }
    switch (typeShip) {
        case 'discovery':
            namespace.ship.push({
                PeerId: './peerId_ship_discovery.proto',
                name: typeShip
            })

            DOM.webrtcDirect('ship-2_name').textContent = 'Дискавери'
            break
        case 'cobra':
        default:
            namespace.ship.push({
                PeerId: './peerId_ship_cobra.proto',
                name: typeShip
            })

            DOM.webrtcDirect('ship-1_name').textContent = 'Кобра'
            break
    }

    const shipId = namespace.ship.find(item => item.name === typeShip)

    let publicPeerId = await fetch(shipId.PeerId)

    if (publicPeerId.status === 200) {
        publicPeerId = await publicPeerId.blob()
        publicPeerId = await createFromProtobuf(new Uint8Array(await publicPeerId.arrayBuffer()))
        const privatePeerId = await createEd25519PeerId()

        switch (typeShip) {
            case 'discovery':
                DOM.webrtcDirect('ship-id-2_public').textContent = publicPeerId.toString()
                DOM.webrtcDirect('ship-id-2_private').textContent = privatePeerId.toString()
                break
            case 'cobra':
            default:
                DOM.webrtcDirect('ship-id-1_public').textContent = publicPeerId.toString()
                DOM.webrtcDirect('ship-id-1_private').textContent = privatePeerId.toString()
                break
        }

        const node = {
            public: null,
            private: null
        }

        // console.log('==============',typeShip, {
        //     private: privatePeerId,
        //     public: publicPeerId
        // })

        node.private = await createNode(DOM, 'private', publicPeerId, privatePeerId, typeShip)
        node.public = await createNode(DOM, 'public', publicPeerId, privatePeerId, typeShip)

        return node
    } else {
        console.error('Неизвестная ошибка')
    }
}