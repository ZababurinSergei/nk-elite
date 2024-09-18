//TODO Надо подключить потом

import createPlanet from './helia-webrtc-create-planet.mjs'

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

        ship.discovery = await createPlanet('earth')
        ship.cobra = await createPlanet('moon')
    } catch (e) {

        console.error('================== ship ==================', e)
    }
}