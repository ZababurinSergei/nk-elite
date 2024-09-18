import createStation from './helia-webrtc-create-station.mjs'

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

        ship.discovery = await createStation('solar_plant')
        ship.cobra = await createStation('crystal_plant')
    } catch (e) {

        console.error('================== ship ==================', e)
    }
}