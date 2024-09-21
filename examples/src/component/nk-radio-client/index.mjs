import { Component } from '../index.mjs';
import {lpStream} from "it-length-prefixed-stream";

const name = 'nk-radio-client';
const component = await Component();

Object.defineProperties(component.prototype, {
    DOM: {
        value: null,
        writable: true
    },
    handler: {
        value: async function ({connection, stream}) {
            console.log('INCOMING PEER_ID ', connection.remotePeer.toString())
            // const lp = lpStream(stream)
            // const res = await lp.read()
            // const output = new TextDecoder().decode(res.subarray())
            // this._message = output
            // this.printSmbl.call(component.prototype)
        },
        writable: true
    },
    connected: {
        value: async function(property) {
            this.handler = this.handler.bind(this)

            this.DOM = {
                button: {
                    play: function (type) {
                        const root = this.shadowRoot.querySelector('.nk-radio-client')
                        switch (type) {
                            case 'audio':
                                return root.querySelector('.audio')
                            default:
                                return  root
                        }
                    }
                }
            };

            this.task = {
                id: 'nk-p2p_1',
                component: 'nk-p2p',
                type: 'self',
                execute: async (self) => {
                       // self.libp2p
                }
            }
            this.DOM.button.play.call(this, 'audio').addEventListener('click', () => {
                // if (navigator.mediaDevices) {
                //     navigator.mediaDevices
                //         .getUserMedia({ video: true, audio: false })
                //         .then(function onSuccess(stream) {
                //             const video = document.getElementById("webcam");
                //             video.autoplay = true;
                //             video.srcObject = stream;
                //         })
                //         .catch(function onError() {
                //             alert(
                //                 "There has been a problem retrieving the streams - are you running on file:/// or did you disallow access?",
                //             );
                //         });
                // } else {
                //     alert("getUserMedia is not supported in this browser.");
                // }
            })

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
        value: async function(event) {

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

