import { privateKeyFromProtobuf } from '@libp2p/crypto/keys'
export const objectId = {
    get: {
        peerid: async function () {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);

            let obectName = !urlParams.has('planet')
                ? this.dataset.planet
                    ? this.dataset.planet
                    :'sun'
                : urlParams.get('planet')

            let namespace = {}

            switch (obectName) {
                case 'moon':
                    namespace.peerId = './peerId_moon.proto'
                    namespace.planet = 'moon'
                    namespace.name = 'Луна'
                    break
                case 'uranus':
                    namespace.peerId = './peerId_uranus.proto'
                    namespace.planet = 'uranus'
                    namespace.name = 'Уран'
                    break
                case 'venus':
                    namespace.peerId = './peerId_venus.proto'
                    namespace.planet = 'venus'
                    namespace.name = 'Венера'
                    break
                case 'jupiter':
                    namespace.peerId = './peerId_jupiter.proto'
                    namespace.planet = 'jupiter'
                    namespace.name = 'Юпитер'
                    break
                case 'earth':
                    namespace.peerId = './peerId_planet_earth.proto'
                    namespace.planet = 'earth'
                    namespace.name = 'Земля'
                    break
                default:
                    namespace.peerId = './peerId_solar_system.proto'
                    namespace.planet = 'sun'
                    namespace.name = 'Солнце'
                    break
            }

            namespace.peerId  = await fetch(new URL(namespace.peerId, import.meta.url))

            if (namespace.peerId.status === 200) {
                namespace.status = true
                namespace.peerId = await namespace.peerId.blob()
                const byteCode = new Uint8Array(await namespace.peerId.arrayBuffer())
                namespace.peerId = await privateKeyFromProtobuf(byteCode)
            } else {
                namespace.status = false
            }


            return namespace
        }
    }
}