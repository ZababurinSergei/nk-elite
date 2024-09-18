// helia
import * as helia from "helia";
import {unixfs} from "@helia/unixfs";
import {CID} from "multiformats/cid";
import {multiaddr} from "@multiformats/multiaddr";
import dotenv from 'dotenv'
// modules required for helia creation on nodejs
// transports
import {tcp} from "@libp2p/tcp";
import {webSockets} from "@libp2p/websockets";
import {webRTC, webRTCDirect} from "@libp2p/webrtc";
import {circuitRelayTransport, circuitRelayServer} from "libp2p/circuit-relay";
// peerDiscovery
import {mdns} from "@libp2p/mdns";
import {bootstrap} from "@libp2p/bootstrap";
// contentRouters
import {ipniContentRouting} from "@libp2p/ipni-content-routing";

//wrtc-star
import {sigServer} from "@libp2p/webrtc-star-signalling-server";
import {webRTCStar} from "@libp2p/webrtc-star";
import wrtc from "@koush/wrtc";

// repl
import * as repl from "node:repl";
import process from "process";

dotenv.config()

console.log('=== port ===', process.env.PORT || "9090")

// for webrtc-star
// const sig = await sigServer({
//   host: "0.0.0.0",
//   port: process.env.PORT || "9090",
//   metrics: false
// });

const sigAddr = "/dns4/js-libp2p-webrtc-star-yeub.onrender.com/tcp/443/wss/p2p-webrtc-star"
// const sigAddr = `/ip4/127.0.0.1/tcp/${process.env.PORT || "9090"}/ws/p2p-webrtc-star`;
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
const star = webRTCStar({wrtc});
// https://github.com/ipfs/helia/blob/main/packages/helia/src/index.ts
const node = await helia.createHelia({libp2p: {
    addresses: {
      listen: [
        "/ip4/0.0.0.0/tcp/0",
        "/ip4/0.0.0.0/tcp/0/ws",
        "/ip4/0.0.0.0/tcp/0/wss",
        sigAddr,
      ]
    },
    transports: [
      tcp(),
      webSockets({websocket: {rejectUnauthorized: false}}),
      circuitRelayTransport({discoverRelays: 1}),
      star.transport,
    ],
    peerDiscovery: [bootstrap(bootstrapConfig), star.discovery],
    // from https://github.com/libp2p/js-libp2p-webtransport/blob/main/examples/fetch-file-from-kubo/src/libp2p.ts
    connectionGater: {denyDialMultiaddr: async () => false},
  }});

// libp2p dialProtocol examples
const proto = "/my-echo/0.1";
const handler = ({connection, stream}) => {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
  stream.sink(async function* () {
    for await (const bufs of stream.source) {
      yield bufs.slice().slice();
    }
  }());
};
await node.libp2p.handle(proto, handler);
const send = async (ma, msg) => {
  if (typeof ma === "string") ma = multiaddr(ma);
  const stream = await node.libp2p.dialProtocol(ma, proto);
  stream.sink(async function* () {
    yield (new TextEncoder().encode(msg));
  }());
  for await (const bufs of stream.source) {
    return new TextDecoder().decode(bufs.slice().slice());
  }
};

// ipfs examples
console.log("[multiaddrs]");
console.log(node.libp2p.getMultiaddrs().map(ma => `${ma}`));

console.log("[serve example data] try to access the CID from other node");
const nodefs = unixfs(node);
const blob = new Blob([new TextEncoder().encode("Hello World!asasasasxsqwxw21s12s21s12d2x23d2ed2wsweft5g")], {type: "text/plain;charset=utf-8"});
const cid = await nodefs.addByteStream(blob.stream());
console.log(cid);
const cidStr = cid.toString();
const cidAlt = CID.parse(cidStr);
const ret1 = await node.pins.add(cidAlt); //NOTE: pins not accept CID string
console.log(ret1);
// console.log()

// control with repl
// console.log("To stop with Ctrl+D");
// const stop = () => Promise.all([node.stop()]);
// const stop = () => Promise.all([node.stop(), sig.stop()]);
// const rs = repl.start({
//   prompt: "> ",
// });
// rs.once("exit", () => {
//   stop().then(() => {
//     console.log("node and sig stopped...");
//     rs.close();
//   }).catch(console.error);
// });
// Object.assign(rs.context, {
//   node, nodefs, CID, multiaddr, send,
// });
// await Promise.all([node.stop(), sig.stop()]);

// await Promise.all([node.stop()]);








// const maPeer = await window.ctx.maStar('12D3KooWH6yCNbjjEeJYEmSc2kpM7Tk4XnymdsDozFeBH5zwunRb')
// console.log('MA PEER', maPeer)
// const res = await send('/dns4/js-libp2p-webrtc-star-yeub.onrender.com/tcp/443/wss/p2p-webrtc-star/p2p/12D3KooWA2JENeezGZhKD3fwpHUSs5AUf1VjS7qvsHhd7EjAeGG9', 'hello')
// console.log('window.ctx: ',  res)

// example data
// const blob = new Blob([new TextEncoder().encode("Hello World!")], {type: "text/plain;charset=utf-8"});
// console.log("[Blob]", blob);

// publish blob as CID with addByteStream()
// const cid = await ctx.nodefs.addByteStream(rsWithAi(blob.stream()));
//const cid = await ctx.nodefs.addBytes(new Uint8Array(await blob.arrayBuffer()));
// console.log("[unixfs.addByteStream]", cid);
// const cidStr = cid.toString();
// const cidAlt = CID.parse(cidStr);
// const ret1 = await ctx.node.pins.add(cidAlt); //NOTE: pins not accept CID string
// console.log("[pins.add]", ret1);


/*
// example data
const blob = new Blob([new TextEncoder().encode("Hello World!")], {type: "text/plain;charset=utf-8"});
console.log("[Blob]", blob);

// publish blob as CID with addByteStream()
const cid = await ctx.nodefs.addByteStream(rsWithAi(blob.stream()));
//const cid = await ctx.nodefs.addBytes(new Uint8Array(await blob.arrayBuffer()));
console.log("[unixfs.addByteStream]", cid);
const cidStr = cid.toString();
const cidAlt = CID.parse(cidStr);
const ret1 = await ctx.node.pins.add(cidAlt); //NOTE: pins not accept CID string
console.log("[pins.add]", ret1);

// NOTE: helia's pins needs stored blocks in blockstore (e.g. cannnot pin before stat()/ls()/cat())
const stat = await ctx.nodefs.stat(cidStr);
console.log("[unixfs.stat]", stat);

// get CID object from CID string with ls() from @helia/unixfs
for await (const entry of ctx.nodefs.ls(cidStr)) console.log("[unixfs.ls]", entry.cid);

// retrieve data with cat(cid or cid-string)
const u8as = [];
for await (const u8a of ctx.nodefs.cat(cidStr)) {
  console.log("[unixfs.cat]", u8a);
  u8as.push(u8a.slice());
}
console.log("[Blob.text]", await (new Blob(u8as).text()));
*/

// stop only helia nodes; unixfs is just a wrapper
//console.log("[helia.stop]", await node.stop());
