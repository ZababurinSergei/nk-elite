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
                    namespace.PeerId = './peerId_moon.proto'
                    namespace.planet = 'moon'
                    namespace.name = 'Луна'
                    break
                case 'uranus':
                    namespace.PeerId = './peerId_uranus.proto'
                    namespace.planet = 'uranus'
                    namespace.name = 'Уран'
                    break
                case 'venus':
                    namespace.PeerId = './peerId_venus.proto'
                    namespace.planet = 'venus'
                    namespace.name = 'Венера'
                    break
                case 'jupiter':
                    namespace.PeerId = './peerId_jupiter.proto'
                    namespace.planet = 'jupiter'
                    namespace.name = 'Юпитер'
                    break
                case 'earth':
                    namespace.PeerId = './peerId_planet_earth.proto'
                    namespace.planet = 'earth'
                    namespace.name = 'Земля'
                    break
                default:
                    namespace.PeerId = './peerId_solar_system.proto'
                    namespace.planet = 'sun'
                    namespace.name = 'Солнце'
                    break
            }

            namespace.PeerId  = await fetch(new URL(namespace.PeerId, import.meta.url))

            if (namespace.PeerId.status === 200) {
                namespace.status = true
                namespace.PeerId = await namespace.PeerId.blob()
                namespace.PeerId = await privateKeyFromProtobuf(new Uint8Array(await namespace.PeerId.arrayBuffer()))
            } else {
                namespace.status = false
            }


            return namespace
        }
    }
}