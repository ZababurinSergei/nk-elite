import path from 'path';
import fs from 'node:fs';
import process from "node:process";
import cors from 'cors';
import Enqueue from 'express-enqueue';
import compression from 'compression';
import * as dotenv from 'dotenv';
import express from 'express';
import { peerIdFromString } from '@libp2p/peer-id';
/* eslint-disable no-console */
import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { bootstrap } from '@libp2p/bootstrap';
import { identify } from '@libp2p/identify';
import { kadDHT, removePublicAddressesMapper } from '@libp2p/kad-dht';
import { mplex } from '@libp2p/mplex';
import { tcp } from '@libp2p/tcp';
import { createLibp2p } from 'libp2p';
import { bootstrappers } from './bootstrappers.mjs';
import { webRTCStar } from "@libp2p/webrtc-star";
import { createEd25519PeerId, exportToProtobuf, createFromProtobuf } from '@libp2p/peer-id-factory';
import { autoNAT } from '@libp2p/autonat';

const rtcStar = "/dns4/webrtc-star.onrender.com/tcp/443/wss/p2p-webrtc-star"
const fileNamePeerId = '/peerId_station_sun.proto'

let pathNode = ''
const __dirname = process.cwd();
const isRead = true
const writePeerId = async (name) => {
    const peerId = await createEd25519PeerId()
    fs.writeFileSync(__dirname + name, exportToProtobuf(peerId))
    return peerId
}

const readPeerId = async (name) => {
    const buffer = fs.readFileSync(__dirname + name)
    return createFromProtobuf(buffer)
}

const peerId = fs.existsSync(__dirname + fileNamePeerId) && isRead ? await readPeerId(fileNamePeerId) :await writePeerId(fileNamePeerId)

dotenv.config();

const port = process.env.PORT
    ? process.env.PORT
    : 7758;

let whitelist = ['*']

let app = express();

app.use(compression());
app.use(express.json());

const queue = new Enqueue({
    concurrentWorkers: 4,
    maxSize: 200,
    timeout: 30000
});

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || whitelist.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(await cors({credentials: true}));
app.use(queue.getMiddleware());

const createNode = async () => {
    // console.log('ddddddddddddd', `/ip4/127.0.0.1/tcp/${process.env.PORT? '443': port + 1}`)
    const star = webRTCStar();

    const node = await createLibp2p({
        peerId,
        addresses: {
            listen: [
                `/ip4/127.0.0.1/tcp/${process.env.PORT? '443': port + 1}`,
                "/webrtc",
                "/wss",
                "/ws",
                rtcStar // see
            ],
            // announce: [`/dns4/discovery-biq5.onrender.com/tcp/443`]
        },
        transports: [
            tcp(),
            // star.transport,
        ],
        streamMuxers: [yamux(), mplex()],
        connectionEncryption: [noise()],
        peerDiscovery: [
            star.discovery,
            bootstrap({
                list: bootstrappers
            })
        ],
        services: {
            kadDHT: kadDHT({
                protocol: '/universe/kad/1.0.0',
                clientMode: false
            }),
            identify: identify(),
            autoNAT: autoNAT()
        },
        connectionGater: {
            denyDialMultiaddr: async (...args) => false,
        },
    })

    const peerConfig = {
        peerId: node.peerId.toString(),
        ma: node.getMultiaddrs()
    }

    console.log('Listening on:', peerConfig)

    peerConfig.ma.forEach((ma) => {
        pathNode = ma.toString()
    })

    node.addEventListener('peer:connect', (evt) => {
        const peerId = evt.detail
        console.log('Connection established to:', peerId.toString()) // Emitted when a peer has been found
    })

    node.addEventListener('peer:discovery', (evt) => {
        const peerInfo = evt.detail

        console.log('Discovered:', peerInfo.id.toString())
    })

    return node
}

async function main () {
    app.use(express.static('public'))

    const node = await createNode()

    app.use(express.static(`${__dirname}`));

    app.get(`/env.json`, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, 'env.json'))
    })

    app.get(`/env.mjs`, async (req, res) => {
        res.status(200).sendFile(path.join(__dirname, 'env.mjs'))
    })

    app.get(`/*`, async (req, res) => {
        // res.status(200).send(html);
        res.status(200).sendFile(path.join(__dirname, '/index.html'));
    });

    app.post(`/*`, async (req, res) => {
        console.log('==== POST ====', req.path);
    });

    app.use(queue.getErrorMiddleware());

    app.listen(port, () => {
        console.log('pid: ', process.pid);
        console.log('listening on http://localhost:' + port);
    });
}

main()
