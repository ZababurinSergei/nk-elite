import dotenv from 'dotenv'
import {sigServer} from "@libp2p/webrtc-star-signalling-server";
import * as repl from "node:repl";
import process from "process";

dotenv.config()

const sig = await sigServer({
  host:  "0.0.0.0",
  port: process.env.PORT || "9090",
  metrics: false
});

console.log('STAR: ',sig.info)

// console.log("To stop with Ctrl+D");
// const stop = () => Promise.all([sig.stop()]);
// const rs = repl.start({
//   prompt: "> ",
// });
// rs.once("exit", () => {
//   stop().then(() => {
//     console.log("sig stopped...");
//     rs.close();
//   }).catch(console.error);
// });