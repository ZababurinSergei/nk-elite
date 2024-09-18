import createShip from './helia-webrtc-create-ship.mjs'

import { createEd25519PeerId, createFromProtobuf} from './lib-peerId-factory.js';
// import init from './PixelPlanets/out.mjs'
import {createNode} from './helia-webrtc-create-node-planet.js'

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
// const options = init()
export default async () => {
    try {

        const ships = []
        ships.push('cobra')
        ships.push('discovery')

        const ship = {
            discovery: null,
            cobra: null
        }

        ship.discovery = await createShip('discovery')
        ship.cobra = await createShip('cobra')
    } catch (e) {

        console.error('================== ship ==================', e)
    }
}