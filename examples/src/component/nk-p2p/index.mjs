import {Component} from '../index.mjs';
import { objectId } from './this/index.mjs'
import {gossipsub} from '@chainsafe/libp2p-gossipsub'
import {noise} from '@chainsafe/libp2p-noise'
import {yamux} from '@chainsafe/libp2p-yamux'
import {circuitRelayTransport} from '@libp2p/circuit-relay-v2'
import {dcutr} from '@libp2p/dcutr'
import {identify, identifyPush} from '@libp2p/identify'
import {webRTC, webRTCDirect} from '@libp2p/webrtc'
import {webSockets} from '@libp2p/websockets'
import * as filters from '@libp2p/websockets/filters'
import {multiaddr} from '@multiformats/multiaddr'
import {createLibp2p} from 'libp2p'
import {fromString, toString} from 'uint8arrays'
import {bootstrap} from '@libp2p/bootstrap'
import {kadDHT, removePrivateAddressesMapper, removePublicAddressesMapper} from '@libp2p/kad-dht'
import {persistentPeerStore} from '@libp2p/peer-store'
import {pubsubPeerDiscovery} from '@libp2p/pubsub-peer-discovery'
import {IDBDatastore} from 'datastore-idb'
import {ping} from '@libp2p/ping'
import { generateKeyPair } from '@libp2p/crypto/keys'
import {PUBSUB_PEER_DISCOVERY, proto, protoAudio} from '@newkind/constants'
import {FaultTolerance} from '@libp2p/interface-transport'
import {logger} from '@libp2p/logger'

const log = logger('nk-p2p:')

const name = 'nk-p2p';
const component = await Component();

const serverPeerId = '12D3KooWH1NPiQaLyw9njJoyKbFu3ncnQQj3tbSWoajVRXohtjEn'
const port = 4955
const RENDER_EXTERNAL_HOSTNAME = 'relay-tuem.onrender.com'

Object.defineProperties(component.prototype, {
    peerId: {
        value: {
            private: [],
            public: []
        },
        writable: true
    },
    isLoad: {
        value: false,
        writable: true
    },
    updatePeerList: {
        value: async function () {
            const connections = []

            const peerList = this.libp2p.getPeers()
                .map(peerId => {
                    const el = document.createElement('li')
                    el.textContent = peerId.toString()
                    const addrList = document.createElement('ul')

                    const activeConnections = this.libp2p.getConnections(peerId)
                    const isOne = activeConnections.length === 1

                    for (const conn of activeConnections) {
                        const addr = document.createElement('li')

                        let connection = conn.remoteAddr.toString().split(conn.multiplexer)

                        connection = connection.length > 1
                            ? `${conn.multiplexer}${connection[1]}`
                            : connection[0]

                        addr.textContent = conn.remoteAddr.toString()

                        if (peerId.toString() !== serverPeerId && this.dataset.type !== 'public' && !this.peerId.public.includes(peerId.toString())) {
                            if(isOne) {
                                connections.push(connection)
                            } else {
                                if(conn.remoteAddr.toString().startsWith(conn.multiplexer)) {
                                    connections.push(connection)
                                }
                            }
                        }
                    }

                    el.appendChild(addrList)

                    return el
                })

            this.DOM.peerConnectionsList().replaceChildren(...peerList)
            return connections
        },
        writable: false
    },
    libp2p: {
        value: null,
        writable: true
    },
    get: {
        value: {
            peers: async function () {
                return this.updatePeerList()
            }
        },
        writable: true
    },
    DOM: {
        value: null,
        writable: true
    },
    connected: {
        value: async function (property) {
            this.broadcastChannel = {
                await: ['nk-radio', 'nk-menu']
            }

            this.DOM = {
                buttonNode: () => this.shadowRoot.querySelector('.button-node'),
                peerId: () => this.shadowRoot.getElementById('peer-id'),
                dhtMode: () => this.shadowRoot.getElementById('dht-mode'),
                clearButton: () => this.shadowRoot.getElementById('clear-button'),
                dialMultiaddrInput: () => this.shadowRoot.getElementById('dial-multiaddr-input'),
                dialMultiaddrButton: () => this.shadowRoot.getElementById('dial-multiaddr-button'),
                subscribeTopicInput: () => this.shadowRoot.getElementById('subscribe-topic-input'),
                subscribeTopicButton: () => this.shadowRoot.getElementById('subscribe-topic-button'),
                sendTopicMessageInput: () => this.shadowRoot.getElementById('send-topic-message-input'),
                sendTopicMessageButton: () => this.shadowRoot.getElementById('send-topic-message-button'),
                output: () => this.shadowRoot.getElementById('output'),
                listeningAddressesList: () => this.shadowRoot.getElementById('listening-addresses'),
                peerConnectionsList: () => this.shadowRoot.getElementById('peer-connections'),
                topicPeerList: () => this.shadowRoot.getElementById('topic-peers')
            }

            this.get.peers = this.get.peers.bind(this)

            let peerObject = {
                PeerId: undefined
            }

            if(this.dataset.type === 'public') {
                peerObject = await objectId.get.peerid.call(this)
                if(!peerObject.status) {
                    console.error('Небыл найден id')
                }
            } else {
                peerObject.peerId = await generateKeyPair('Ed25519')
            }

            if(this.dataset.type === 'public') {
                this.peerId.public.push(peerObject.peerId.publicKey.toString())
            }

            if(this.dataset.type === 'private') {
                this.peerId.private.push(peerObject.peerId.publicKey.toString())
            }

            // const store = new IDBDatastore('/fs', {
            //     prefix: '/universe',
            //     version: 1
            // })
            // await store.open()

            const isLocalhost = window.location.hostname === 'localhost'

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const isBootstrap = urlParams.has('bootstrap')
            const isLanKad = urlParams.has('lanKad')
            const isDht = urlParams.has('dht')
            const isPubsubPeerDiscovery = urlParams.has('pubsubPeerDiscovery')
            const isPeerInfoMapper = urlParams.has('peerInfoMapper')
            let publicAddressesMapper = removePublicAddressesMapper

            let DhtProtocol = "/universe/kad/1.0.0"
            log('isBootstrap', isBootstrap)
            log('isPubsubPeerDiscovery', isPubsubPeerDiscovery)

            const appendOutput = (line) => {
                this.DOM.output().innerText += `${line}\n`
            }
            const clean = (line) => line.replaceAll('\n', '')

            let boot = []


            if (isBootstrap) {
                if (isPubsubPeerDiscovery) {
                    boot = [
                        pubsubPeerDiscovery({
                            interval: 10000,
                            topics: [PUBSUB_PEER_DISCOVERY],
                            listenOnly: false
                        }),
                        bootstrap({
                            list: [
                                isLocalhost
                                    ? `/dns4/localhost/tcp/${port}/ws/p2p/${serverPeerId}`
                                    : `/dns4/${RENDER_EXTERNAL_HOSTNAME}/wss/p2p/${serverPeerId}`
                            ]
                        })
                    ]
                } else {
                    boot = [
                        bootstrap({
                            list: [
                                isLocalhost
                                    ? `/dns4/localhost/tcp/${port}/ws/p2p/${serverPeerId}`
                                    : `/dns4/${RENDER_EXTERNAL_HOSTNAME}/wss/p2p/${serverPeerId}`
                            ]
                        })
                    ]
                }
            }

            if (isPeerInfoMapper) {
                if (urlParams.get('peerInfoMapper') === 'public') {
                    publicAddressesMapper = removePublicAddressesMapper
                }

                if (urlParams.get('peerInfoMapper') === 'private') {
                    publicAddressesMapper = removePrivateAddressesMapper
                }
            }

            if (isLanKad) {
                DhtProtocol = `${urlParams.get('lanKad')}kad/1.0.0`

                // console.log('----------------------------', DhtProtocol)
                boot = [
                    bootstrap({
                        list: [
                            '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
                            '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
                            '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
                            '/dnsaddr/bootstrap.libp2p.io/p2p/QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp',
                            '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
                            '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt'
                        ]
                    })
                ]
            }

            this.libp2p = await createLibp2p({
                privateKey: peerObject.peerId,
                peerStore: persistentPeerStore,
                // datastore: datastore,
                addresses: {
                    listen: [
                        '/webrtc-direct',
                        '/webrtc'
                    ]
                },
                transports: [
                    webRTCDirect(),
                    webSockets({
                        filter: filters.all
                    }),
                    webRTC(),
                    circuitRelayTransport({
                        discoverRelays: 10
                    })
                ],
                peerDiscovery: boot,
                connectionEncrypters: [noise()],
                streamMuxers: [yamux()],
                connectionManager: {
                    inboundConnectionThreshold: Infinity,
                    maxConnections: Infinity
                },
                transportManager: {
                    faultTolerance: FaultTolerance.NO_FATAL
                },
                services: {
                    identify: identify(),
                    identifyPush: identifyPush(),
                    pubsub: gossipsub(),
                    dcutr: dcutr(),
                    // ping: ping(),
                    dht: kadDHT({
                        kBucketSize: 4,
                        kBucketSplitThreshold: `kBucketSize`,
                        prefixLength: 6,
                        clientMode: false,
                        querySelfInterval: 5000,
                        initialQuerySelfInterval: 1000,
                        allowQueryWithZeroPeers: false,
                        protocol: DhtProtocol,
                        logPrefix: "libp2p:kad-dht",
                        pingTimeout: 10000,
                        pingConcurrency: 10,
                        maxInboundStreams: 32,
                        maxOutboundStreams: 64,
                        // maxInboundStreams: 3,
                        // maxOutboundStreams: 6,
                        // peerInfoMapper: removePrivateAddressesMapper,
                        // peerInfoMapper: publicAddressesMapper,
                    })
                },
                connectionGater: {
                    denyDialPeer: (currentPeerId) => {
                        // console.log('-------- denyDialPeer --------', currentPeerId.toString())
                        return false
                    },
                    denyDialMultiaddr: async (currentPeerId) => {
                        // console.log('-------- denyDialMultiaddr --------', currentPeerId.toString())
                        return false
                    },
                    denyOutboundConnection: (currentPeerId, maConn) => {
                        // console.log('-------- 1 denyOutboundConnection 1 --------', currentPeerId.toString(), maConn)
                        return false
                    },
                    denyOutboundEncryptedConnection: (currentPeerId, maConn) => {
                        // console.log('-------- 2 denyOutboundEncryptedConnection 2 --------', currentPeerId.toString(), maConn)
                        return false
                    },
                    denyOutboundUpgradedConnection: (currentPeerId, maConn) => {
                        // console.log('-------- 3 denyOutboundUpgradedConnection 3 --------', currentPeerId.toString(), maConn)
                        return false
                    },
                    denyInboundConnection: (maConn) => {
                        // console.log('-------- 1 denyInboundConnection 1 --------', maConn)
                        return false
                    },
                    denyInboundEncryptedConnection: (currentPeerId, maConn) => {
                        // console.log('-------- 2 denyInboundEncryptedConnection 2 --------', currentPeerId.toString(), maConn)
                        return false
                    },
                    denyInboundUpgradedConnection: (currentPeerId, maConn) => {
                        // console.log('-------- 3 denyInboundUpgradedConnection 3 --------', currentPeerId.toString(), maConn)
                        return false
                    },
                    filterMultiaddrForPeer: async (currentPeerId, maConn) => {
                        // console.log('-------- filterMultiaddrForPeer --------', currentPeerId.toString(), maConn)
                        return true
                    }
                }
            })

            const intervalId = setInterval(() => {
                // const ma = multiaddr(isLocalhost
                //     ? `/dns4/localhost/tcp/${port}/ws/p2p/${serverPeerId}`
                //     : `/dns4/${RENDER_EXTERNAL_HOSTNAME}/wss/p2p/${serverPeerId}`)
                // this.libp2p.services.ping.ping(ma)
            }, 1000 * 60 * 13)

            this.DOM.dhtMode().textContent = isDht
                ? this.libp2p.services.dht.getMode()
                : 'Disabled'

            this.DOM.buttonNode().innerText = `Node ${this.dataset.type}: ${this.libp2p.peerId.toString()}`
            this.DOM.peerId().innerText = this.libp2p.peerId.toString()

            this.libp2p.addEventListener('peer:discovery', async (evt) => {
                log('peer:discovery', evt.detail.id.toString())
                console.log(`peer:discovery `, evt.detail.multiaddrs)
                if(evt.detail.multiaddrs.length !== 0) {
                    await this.libp2p.dial(evt.detail.multiaddrs)
                }
            })

            this.libp2p.addEventListener('connection:open', async (event) => {
                log('connection:open', event.detail.remoteAddr.toString())

                const listPeer = await this.updatePeerList()

                if(this.dataset.type === 'private') {
                    this.task = {
                        id: 'nk-chat_0',
                        type: 'self',
                        component: "nk-chat",
                        execute: (self, detail) => {
                            if (listPeer.length !== 0) {
                                let select = self.DOM.select.call(self, 'list-peers')

                                select.innerHTML = ''
                                select.insertAdjacentHTML('beforeend', `<option value="">Выберите пользователя</option>`)

                                for (const item of listPeer) {
                                    select.insertAdjacentHTML('beforeend', `<option value="${item}">${item}</option>`)
                                }
                            }
                        }
                    }
                }
            })

            this.libp2p.addEventListener('connection:close', async (event) => {
                log('connection:close', event.detail.remoteAddr.toString())

                const listPeer = await this.updatePeerList()

                if(this.dataset.type === 'private') {
                    this.task = {
                        id: 'nk-chat_0',
                        type: 'self',
                        component: "nk-chat",
                        execute: (self, detail) => {
                            if (listPeer.length !== 0) {
                                let select = self.DOM.select.call(self, 'list-peers')

                                select.innerHTML = ''
                                select.insertAdjacentHTML('beforeend', `<option value="">Выберите пользователя</option>`)

                                for (const item of listPeer) {
                                    select.insertAdjacentHTML('beforeend', `<option value="${item}">${item}</option>`)
                                }
                            }
                        }
                    }
                }
            })

            this.libp2p.addEventListener('self:peer:update', (event) => {
                log('self:peer:update', this.libp2p.getMultiaddrs())

                const multiaddrs = this.libp2p.getMultiaddrs()
                    .map((ma) => {
                        const el = document.createElement('li')
                        el.textContent = ma.toString()
                        el.onclick = (event) => {
                            navigator.clipboard.writeText(event.currentTarget.textContent)
                                .then(() => {
                                })
                                .catch((err) => console.error(err.name, err.message));
                        }
                        return el
                    })

                // if(this.dataset.type === 'private') {
                    this.task = {
                        id: 'nk-menu_0',
                        component: 'nk-menu',
                        type: 'self',
                        execute: (self) => {
                            const multiaddrs = this.libp2p.getMultiaddrs()
                                .map((ma) => {
                                    const el = document.createElement('li')
                                    el.textContent = ma.toString()
                                    el.onclick = (event) => {
                                        navigator.clipboard.writeText(event.currentTarget.textContent)
                                            .then(() => {
                                            })
                                            .catch((err) => console.error(err.name, err.message));
                                    }
                                    return el
                                })

                            if(this.dataset.type === 'private') {
                                self.DOM.info('ma_private').replaceChildren(...multiaddrs)
                            }

                            if(this.dataset.type === 'public') {
                                self.DOM.info('ma_public').replaceChildren(...multiaddrs)
                            }
                        }
                    }
                // }


                this.DOM.listeningAddressesList().replaceChildren(...multiaddrs)
            })

            this.DOM.clearButton().onclick = async () => {
                this.DOM.dialMultiaddrInput().value = ''
            }

            this.DOM.dialMultiaddrButton().onclick = async () => {
                const ma = multiaddr(this.DOM.dialMultiaddrInput().value)
                appendOutput(`Dialing '${ma}'`)
                await this.libp2p.dial(ma)
                appendOutput(`Connected to '${ma}'`)
            }

            this.DOM.subscribeTopicButton().onclick = async () => {
                const topic = this.DOM.subscribeTopicInput().value
                appendOutput(`Subscribing to '${clean(topic)}'`)

                this.libp2p.services.pubsub.subscribe(topic)

                this.DOM.sendTopicMessageInput().disabled = undefined
                this.DOM.sendTopicMessageButton().disabled = undefined
            }

            this.DOM.sendTopicMessageButton().onclick = async () => {
                const topic = this.DOM.subscribeTopicInput().value
                const message = this.DOM.sendTopicMessageInput().value
                appendOutput(`Sending message '${clean(message)}'`)

                await this.libp2p.services.pubsub.publish(topic, fromString(message))
            }

            // setInterval(() => {
            //     const topic = this.DOM.subscribeTopicInput().value
            //     const peerList = this.libp2p.services.pubsub.getSubscribers(topic)
            //         .map(peerId => {
            //             const el = document.createElement('li')
            //             el.textContent = peerId.toString()
            //             return el
            //         })
            //     this.DOM.topicPeerList().replaceChildren(...peerList)
            // }, 500)

            this.libp2p.services.pubsub.addEventListener('message', event => {
                // const topic = event.detail.topic
                // const message = toString(event.detail.data)

                // appendOutput(`Message received on topic '${topic}'`)
                // appendOutput(message)
            })

            this.task = {
                id: 'nk-menu_0',
                component: 'nk-menu',
                type: 'self',
                execute: (self, detail) => {
                    if(this.dataset.type === 'private') {
                        self.DOM.info.call(self, 'planet-private-id').textContent = this.libp2p.peerId.toString()
                    } else {
                        self.DOM.info.call(self, 'planet').textContent = peerObject.name
                        self.DOM.info.call(self, 'planet-public-id').textContent = this.libp2p.peerId.toString()
                    }
                }
            }

            this.task = {
                id: 'nk-chat_0',
                component: 'nk-chat',
                type: 'self',
                execute: async (self) => {
                    await this.libp2p.handle(proto, self.handler);
                    await this.libp2p.handle(protoAudio, self.handler);
                }
            }

            // this.task = {
            //     id: 'nk-radio-client_0',
            //     component: 'nk-radio-client',
            //     type: 'self',
            //     execute: async (self) => {
            //         await this.libp2p.handle(protoAudio, self.handler);
            //     }
            // }

            this.isLoad = true
            return true;
        },
        writable: true
    },
    disconnected: {
        value: async function () {
            return true
        },
        writable: false
    },
    onMessage: {
        value: async function (self, detail) {

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

