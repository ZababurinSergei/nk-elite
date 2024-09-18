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

export const createNode = async (DOM, type, publicPeerId, privatePeerId, typeShip) => {
    const shipList = new Set();

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
                        // console.log('!!!!!!!!!!!!! filterMultiaddrForPeer !!!!!!!!!!!!!',type, currentPeerId.toString(), privatePeerId.toString())
                        return true
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

    const nodeFs = unixfs(node);

    while (node.libp2p.getMultiaddrs().length === 0) await new Promise(f => setTimeout(f, 500));


    //---------------------------------------------------------------------------
    node.libp2p.addEventListener('connection:open', (event) => {

    })

    node.libp2p.addEventListener('connection:close', (event) => {
        const peerInfo = event.detail.remotePeer.toString()
        // console.log('[[[[[[[ LISTENER ]]]]]]] connection:close',type, peerInfo)
    })

    node.libp2p.addEventListener('connection:prune', (event) => {
        // const peerInfo = evt.detail
        // console.log('[[[[[[[ LISTENER ]]]]]]] connection:prune', event.detail)
    })

    node.libp2p.addEventListener('peer:connect', async (event) => {
        // console.log('[[[[[[[ LISTENER ]]]]]]] peer:connect', event.detail.toString())
    })

    node.libp2p.addEventListener('peer:disconnect', (event) => {
        // console.log('[[[[[[[ LISTENER ]]]]]]] peer:disconnect', event.detail.toString())
    })

    node.libp2p.addEventListener('peer:discovery', (evt) => {
    })

    node.libp2p.addEventListener('peer:identify', (evt) => {
    })

    node.libp2p.addEventListener('peer:update', (evt) => {
        // console.log('[[[[[[[ LISTENER ]]]]]]] peer:update')
    })

    node.libp2p.addEventListener('self:peer:update', (event) => {
        // DOM.pubsub('refresh').click()
        // if (event.detail.peer.addresses.length !== 0) {
        // console.log('[[[[[[[ LISTENER ]]]]]]] self:peer:update', event.detail)
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

    if(!(typeShip in globalThis)) {
        globalThis[typeShip] = {}
    }

    if(type === 'public') {
        globalThis[typeShip].publicNode = node
    }

    if(type === 'private') {

        globalThis[typeShip].privateNode = node
    }


    window.addEventListener("beforeunload", (event) => {
        // // Отмените событие, как указано в стандарте.
        // event.preventDefault();
        // const publicConnections = globalThis.publicNode.libp2p.getConnections()
        // const privateConnections = globalThis.privateNode.libp2p.getConnections()
        // for (let connect of publicConnections) {
        //     connect.close()
        // }
        //
        // for (let connect of privateConnections) {
        //     connect.close()
        // }
        //
        // event.returnValue = "";
    });

    return node
}

