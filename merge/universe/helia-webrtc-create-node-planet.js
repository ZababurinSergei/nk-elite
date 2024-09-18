import * as helia from "helia";
import {unixfs} from "@helia/unixfs";
import {CID} from "multiformats/cid";
import {multiaddr} from "@multiformats/multiaddr";
// import { mdns } from '@libp2p/mdns'
import {createLibp2p} from 'libp2p'
// import {circuitRelayTransport} from "@libp2p/circuit-relay-v2";
// import {webRTC, webRTCDirect} from "@libp2p/webrtc";
// import {webTransport} from "@libp2p/webtransport";
// import {webSockets} from "@libp2p/websockets";
import {webRTCStar} from "@libp2p/webrtc-star";
import {webRTC} from '@libp2p/webrtc'
// import * as filters from "@libp2p/websockets/filters";
import {createFromProtobuf} from '@libp2p/peer-id-factory';
import {noise} from '@chainsafe/libp2p-noise'
import {yamux} from '@chainsafe/libp2p-yamux'
import {mplex} from '@libp2p/mplex'
// import { bootstrap } from '@libp2p/bootstrap'
import {identify} from '@libp2p/identify'
// import { kadDHT, removePublicAddressesMapper } from '@libp2p/kad-dht'
// import { autoNAT } from '@libp2p/autonat'
import {FaultTolerance} from '@libp2p/interface-transport'
import {lpStream, decode, encode} from 'it-length-prefixed-stream'
import {byteStream} from 'it-byte-stream'
import * as varint from 'uint8-varint'
import {Uint8ArrayList} from 'uint8arraylist'
import {fromString, toString} from 'uint8arrays'
// import * as lp from 'it-length-prefixed-stream'

const rtcStar = "/dns4/webrtc-star.onrender.com/tcp/443/wss/p2p-webrtc-star"
// const rtcStar =  '/ip4/127.0.0.1/tcp/9090/ws/p2p-webrtc-star/'
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
globalThis.pubsubPeerList = []
export const createNode = async (DOM, type, publicPeerId, privatePeerId) => {
    const peerList = new Set();

    // https://github.com/ipfs/helia/blob/main/packages/helia/src/utils/bootstrappers.ts
    const bootstrapConfig = {
        list: [
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
            '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
            '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
        ]
    };

    const star = webRTCStar();

    const configNode = {
        libp2p: {
            // https://github.com/ipfs/helia/blob/main/packages/helia/src/utils/libp2p-defaults.browser.ts#L27
            addresses: {
                listen: [
                    "/webrtc",
                    "/wss",
                    "/ws",
                    rtcStar
                ],
            },
            transports: [
                star.transport,
            ],
            peerDiscovery: [
                star.discovery
            ],
            transportManager: {
                faultTolerance: FaultTolerance.NO_FATAL
            },
            connectionManager: {
                autoDialInterval: 1000 //(default: 5000)
            },
            connectionGater: {
                denyDialPeer: (currentPeerId) => {
                    // console.log('00000000000000 denyDialPeer 00000000000000',type, currentPeerId.toString())
                    return false
                },
                denyDialMultiaddr: async (currentPeerId) => {
                    // console.log('111111111111 denyDialMultiaddr 111111111111',type, currentPeerId.toString())
                    return false
                },
                denyOutboundConnection: (currentPeerId, maConn) => {
                    if(type === 'public' && currentPeerId.toString() === publicPeerId.toString()) {
                        return true
                    }
                    // console.log('####### 1 ####### denyOutboundConnection ##############',type, currentPeerId.toString())
                    return false
                },
                denyOutboundEncryptedConnection: (currentPeerId, maConn) => {
                    // console.log('####### 2 ####### denyOutboundEncryptedConnection ##############',type, currentPeerId.toString())
                    return false
                },
                denyOutboundUpgradedConnection: (currentPeerId, maConn) => {
                    // console.log('####### 3 ####### denyOutboundUpgradedConnection ##############', type, currentPeerId.toString())
                    return false
                },
                denyInboundConnection: (maConn) => {
                    // console.log('------- 1 ------- denyInboundConnection --------------', type, maConn.remoteAddr.toString())
                    return false
                },
                denyInboundEncryptedConnection: (currentPeerId, maConn) => {
                    // console.log('------- 2 ------- denyInboundEncryptedConnection --------------', type, currentPeerId.toString())
                    return false
                },
                denyInboundUpgradedConnection: (currentPeerId, maConn) => {
                    // console.log('------- 3 ------- denyInboundUpgradedConnection --------------', type, currentPeerId.toString())
                    return false
                },
                filterMultiaddrForPeer: async (currentPeerId, multiaddr) => {
                    if (
                        type === 'private' && currentPeerId.toString() === publicPeerId.toString() ||
                        type === 'private' && currentPeerId.toString() === privatePeerId.toString() ||
                        type === 'public' && currentPeerId.toString() === privatePeerId.toString()
                    ) {
                        return false
                    } else {
                        // console.log('!!!!!!!!!!!!! filterMultiaddrForPeer !!!!!!!!!!!!!',type, currentPeerId.toString(), privatePeerId.toString())
                        return true
                    }
                }
            }
        }
    }

    if (type === 'public') {
        configNode.libp2p.peerId = publicPeerId
    }

    if (type === 'private') {
        configNode.libp2p.peerId = privatePeerId
    }

    const node = await helia.createHelia(configNode); // tcp network, stored on memory (not use files)

    const topic = 'filter'

    node.libp2p.services.pubsub.addEventListener('message', event => {
        const topic = event.detail.topic
        const message = JSON.parse(toString(event.detail.data))

        if (!(message['public'] in globalThis.pubsubPeerList)) {
            globalThis.pubsubPeerList[message['public']] = []
        }

        switch (message['type']) {
            case 'push':
                if (!globalThis.pubsubPeerList[message['public']].includes(message['private'])) {
                    globalThis.pubsubPeerList[message['public']].push(message['private'])
                }

                // DOM.pubsub('refresh').click()
                break
            default:
                break
        }
    })

    await node.libp2p.services.pubsub.subscribe(topic)

    async function observerPeer(props) {
        const peerListData = node.libp2p.services.pubsub.getSubscribers(topic)

        if (peerListData.length !== 0) {
            await node.libp2p.services.pubsub.publish(topic, fromString(JSON.stringify({
                type: props.type,
                public: publicPeerId.toString(),
                private: privatePeerId.toString()
            })))
        }
    }

    setInterval(async () => {
        observerPeer({
            type: 'push'
        })
    }, 500)

    const nodeFs = unixfs(node);

    while (node.libp2p.getMultiaddrs().length === 0) await new Promise(f => setTimeout(f, 500));

    DOM.info(type).textContent = node.libp2p.peerId.toString()
    let ma = DOM.ma(type)

    for (let item of node.libp2p.getMultiaddrs()) {
        ma.insertAdjacentHTML('beforeend', `<li>${item}</li>`)
    }

    //---------------------------------------------------------------------------
    node.libp2p.addEventListener('connection:open', (event) => {
    })

    node.libp2p.addEventListener('connection:close', (event) => {
        const currentPeerId = publicPeerId.toString()
        const peerInfo = event.detail.remotePeer.toString()
        // console.log('[[[[[[[ LISTENER ]]]]]]] connection:close',type, peerInfo)

        if(globalThis.pubsubPeerList.hasOwnProperty(currentPeerId)) {
           globalThis.pubsubPeerList[currentPeerId] = globalThis.pubsubPeerList[currentPeerId].filter(item => item !== peerInfo)
        }

        if(globalThis.pubsubPeerList[currentPeerId],length === 0) {
           delete globalThis.pubsubPeerList[currentPeerId]
        }

        console.log('globalThis.pubsubPeerList[currentPeerId]', globalThis.pubsubPeerList[currentPeerId])
        DOM.pubsub('refresh').click()
    })

    node.libp2p.addEventListener('connection:prune', (event) => {
        // const peerInfo = evt.detail
        // console.log('[[[[[[[ LISTENER ]]]]]]] connection:prune', event.detail)
    })

    node.libp2p.addEventListener('peer:connect', async (event) => {
        // const peerList = node.libp2p.services.pubsub.getSubscribers(topic)
        // console.log('-----------------------------------', peerList)
        // await node.libp2p.services.pubsub.publish(topic, fromString('test'))
        // peerList.add(peerId.toString())
        // for (const item of peerList) {
        //     const discovery = DOM.discovery()
        //     discovery.innerHTML = ''
        //     discovery.insertAdjacentHTML('beforeend', `<li>${peerId.toString()}</li>`)
        // }
        DOM[type].discovery('refresh').click()
        // DOM.pubsub('refresh').click()
        // console.log('[[[[[[[ LISTENER ]]]]]]] peer:connect', event.detail.toString())
    })

    node.libp2p.addEventListener('peer:disconnect', (event) => {
        peerList.delete(event.detail.toString())
        DOM[type].discovery('refresh').click()
        // DOM.pubsub('refresh').click()
        // const peerId = event.detail?.toString()
        // if(peerList.has(peerId)) {
        //     peerList.delete(peerId);
        // }
        // for (const item of peerList) {
        //     const dis     request.then(data => {    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', bufs.slice().slice(), bufs)  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', bufs.slice().slice(), bufs)
        //     console.log('@@@@@@@@@@@@@@@@@@', data)
        //     const input  = DOM.chcovery = DOM.discovery()
        //     discovery.innerHTML = ''
        //     discovery.insertAdjacentHTML('beforeend', `<li>${peerId.toString()}</li>`)
        // }
        // const peerInfo = event.detail
        // console.log('[[[[[[[ LISTENER ]]]]]]] peer:disconnect', event.detail.toString())
    })

    node.libp2p.addEventListener('peer:discovery', (evt) => {
        // console.log('[[[[[[[ LISTENER ]]]]]]] peer:discovery', {
        //     id: event.detail.id.toString(),
        //     detail: event.detail
        // })
    })

    node.libp2p.addEventListener('peer:identify', (evt) => {
        // console.log('[[[[[[[ LISTENER ]]]]]]] peer:identify', {
        //     peerId: event.detail.peerId.toString(),
        //     observedAddr: event.detail.observedAddr.toString(),
        //     listenAddrs: event.detail.listenAddrs.toString()
        // })
    })

    node.libp2p.addEventListener('peer:update', (evt) => {
        // for(let item of event.detail.peer.addresses) {
        //     console.log('[[[[[[[ LISTENER ]]]]]]] peer:update CURRENT isCertified', item.isCertified)
        // }

        // if(event.detail.previous?.addresses) {
        //     for(let item of event.detail.previous.addresses) {
        //         console.log('[[[[[[[ LISTENER ]]]]]]] peer:update PREVIOUSE isCertified', item.isCertified)
        //     }
        // }
        // console.log('[[[[[[[ LISTENER ]]]]]]] peer:update')
        // console.log('[[[[[[[ LISTENER ]]]]]]] peer:update', {
        //     peer: {
        //         self: event.detail.peer.addresses,
        //         protocols: event.detail.peer.protocols,
        //         // protocols: event.detail.peer.protocols
        //     },
        //     previous: {
        //         self: event.detail.previous,
        //         protocols: event.detail.previous?.protocols
        //         // protocols: event.detail.previous.protocols
        //     }
        // })

        DOM.pubsub('refresh').click()
    })

    node.libp2p.addEventListener('self:peer:update', (event) => {
        // DOM.pubsub('refresh').click()
        // if (event.detail.peer.addresses.length !== 0) {
        console.log(`Advertising with a relay address of ${node.libp2p.getMultiaddrs()[0].toString()}`)
        // }
    })

    node.libp2p.addEventListener('start', (evt) => {
        // console.log('[[[[[[[ LISTENER ]]]]]]] start', event.detail)
    })

    node.libp2p.addEventListener('stop', (evt) => {
        // console.log('[[[[[[[ LISTENER ]]]]]]] stop', event.detail)
    })

    node.libp2p.addEventListener('transport:close', (event) => {
        // DOM.pubsub('refresh').click()
        // const peerInfo = evt.detail
        // console.log('[[[[[[[ LISTENER ]]]]]]] transport:close', event.detail)
    })

    node.libp2p.addEventListener('transport:listening', (event) => {
        // const peerInfo = evt.detail
        // console.log('[[[[[[[ LISTENER ]]]]]]] transport:listening', event.detail)
    })

    const proto = "/my-echo/0.1";

    const incoming = DOM.chat('input')

    let p = 0
    const printSmbl = () => {
        let timeout = Math.round(Math.random() * 100);
        incoming.textContent = incoming.textContent + globalThis.message[p]

        p++;
        if (p < globalThis.message.length) {
            setTimeout(printSmbl, timeout);
        } else {
            p = 0
            clearTimeout(timeout)
            globalThis.message = ''
        }
    }

    const handler = async ({connection, stream}) => {
        console.log('INCOMING PEER_ID ', connection.remotePeer.toString())
        const lp = lpStream(stream)

        const res = await lp.read()

        const output = new TextDecoder().decode(res.subarray())

        globalThis.message = output

        printSmbl()
    };

    await node.libp2p.handle(proto, handler);

    const send = async (ma, msg) => {
        if (typeof ma === "string") ma = multiaddr(ma);

        const signal = AbortSignal.timeout(5000)

        const stream = await node.libp2p.dialProtocol(ma, proto, {
            signal
        });

        const lp = lpStream(stream)

        await lp.write(new TextEncoder().encode(msg))

        return msg
    };

    const discoveryRefresh = DOM[type].discovery('refresh')
    const select = DOM.chat('select')
    const refresh = DOM.chat('refresh')
    const buttonSend = DOM.chat('send')

    if(type === 'public') {
        globalThis.publicNode = node
    }

    if(type === 'private') {
        globalThis.privateNode = node
    }

    DOM.pubsub('refresh').addEventListener('click', async (event) => {
        if (type === 'public') {
            const root = DOM.pubsub()
            root.innerHTML = ''

            const listItems = (key) => {
                let items = ``
                for (let item of globalThis.pubsubPeerList[key]) {
                    items = items + `
                        <div class="pubsub-item-peerId">
                            <p>${item}</p>
                            <button class="detail" data-peer-id="${item}" onclick="((button) => {
                                console.log('INFORMATION')
                                // const connections = globalThis.node.libp2p.getConnections()
                                // const connect = connections.find(item => item.remotePeer.toString() === button.dataset.peerId)
                                // connect.close()
                            })(this)">
                                Детали
                            </button>
                        </div>
                    `
                }

                return items
            }

            for (let key in globalThis.pubsubPeerList) {
                root.insertAdjacentHTML('beforeend', `
                    <li class="pubsub-item">
                            <div class="title">
                                <h3>${key}</h3>
                                <button class="detail" data-peer-id="${key}" onclick="((button) => {
                                    console.log('INFORMATION')
                                    // const connections = globalThis.node.libp2p.getConnections()
                                    // const connect = connections.find(item => item.remotePeer.toString() === button.dataset.peerId)
                                    // connect.close()
                                })(this)">
                                    Детали
                                </button>
                            </div>
                            <div class="pubsub-container">
                                ${listItems(key)}
                            </div>
                    </li>
                
                `)
            }
        }
    })

    discoveryRefresh.addEventListener('click', async (event) => {
        const discovery = DOM[type].discovery()

        discovery.innerHTML = ''

        const peers = node.libp2p.getPeers()
        const connections = node.libp2p.getConnections()
        let count = 0

        for (let connect of connections) {
            peerList.add(connect.remotePeer.toString())
            count++
        }

        for (const item of peerList) {
            discovery.insertAdjacentHTML('beforeend', `<li class="peerId-info">
                <p>${item}</p>
            </li>`)
        }

        count = 0
        refresh.click()
    })

    window.addEventListener("beforeunload", (event) => {
        // Отмените событие, как указано в стандарте.
        event.preventDefault();
        const publicConnections = globalThis.publicNode.libp2p.getConnections()
        const privateConnections = globalThis.privateNode.libp2p.getConnections()
        for (let connect of publicConnections) {
            connect.close()
        }

        for (let connect of privateConnections) {
            connect.close()
        }

        event.returnValue = "";
    });

    buttonSend.addEventListener('click', async (event) => {
        const outgoing = DOM.chat('output')
        let peer = select.options[select.selectedIndex].value;
        const connections = globalThis.node.libp2p.getConnections()
        const connect = connections.find(item => item.remotePeer.toString() === peer)

        console.log('------------ connections --------------', connections)
        if (connect) {
            const res = await send(connect.remotePeer, outgoing.value)
            console.log('---------- REQUEST ----------', connect.remotePeer.toString(), res)
        }
    })

    refresh.addEventListener('click', (event) => {
        select.innerHTML = ''
        for (const item of peerList) {
            select.insertAdjacentHTML('beforeend', `<option value="${item}">${item}</option>`)
        }
    })


    return node
}

