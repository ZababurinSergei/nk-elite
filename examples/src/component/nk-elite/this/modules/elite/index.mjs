import initWasmElite from "./build/nk-elite.asm.js"
import {logger} from '@libp2p/logger'
const log = logger('LEliteTG:')

// console.log('==== log ====', log)
const eliteTGInit = (CONFIG) => {
    globalThis["LEliteTG"] = {
        preRun: [],
        postRun: [],
        print: function (e) {
            log(e)
            // console.log("LEliteTG: " + e);
        },
        printErr: function (e) {
            log(e)
            // console.error("LEliteTG: " + e);
        },
        canvas: function () {
            return CONFIG.html.scope.canvas
        }(),
        setStatus: function (e) {
            if (e !== "") {
                log(e)
            }
        },
        totalDependencies: 0,
        monitorRunDependencies: function (e) {
            this.totalDependencies = Math.max(this.totalDependencies, e);
            this.setStatus(e ? "Preparing... (" + (this.totalDependencies - e) + "/" + this.totalDependencies + ")" : "All downloads complete.")
            this.setStatus("monitorRunDependencies [ " + e + " ]");
        }
    };
    globalThis["LEliteTG"].onRuntimeInitialized = function () {
        globalThis["LEliteTG"].callMain();
        globalThis["LEliteTG"].setStatus("onRuntimeInitialized");
    };

    globalThis["LEliteTG"].setStatus("Downloading...");

    initWasmElite(globalThis["LEliteTG"]).then(function (module) {
        module.setStatus("initWasmElite completed...");
    });
}

const componentInit = (self, CONFIG) => {
    CONFIG.html.scope.canvas = self.shadowRoot.querySelector("#nk-elitecanvas");

///////////////////////////////////////////////////////////////////////////////////////////////////
//    It's work too...
//    CONFIG.html.scope.canvas = document.createElement("canvas");

    CONFIG.html.scope.canvas.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });

///////////////////////////////////////////////////////////////////////////////////////////////////
//    It's work too...
//    CONFIG.html.scope.canvas.oncontextmenu = function() { return false; }

    CONFIG.html.scope.canvas.addEventListener("webglcontextlost", function (e) {
        console.log("LEliteTG: WebGL context lost. You will need to reload the page.");
        e.preventDefault();
    });

    const e = self.shadowRoot.querySelector("#showAndApply");
    e.addEventListener("click", async function (event) {

        CONFIG.html.scope.parameters.showGameConsole = self.shadowRoot.querySelector("#showGameConsole").checked;
        CONFIG.html.scope.parameters.showScreenName = self.shadowRoot.querySelector("#showScreenName").checked;
        CONFIG.html.scope.parameters.showChart1 = self.shadowRoot.querySelector("#showChart1").checked;
        CONFIG.html.scope.parameters.showChart2 = self.shadowRoot.querySelector("#showChart2").checked;

        await globalThis["LEliteTG"].ccall('SetGameParameter', 'number', ['string', 'string'], ["enableconsole", (CONFIG.html.scope.parameters.showGameConsole == true) ? "enable" : "disable"], {async: true});
        await globalThis["LEliteTG"].ccall('SetGameParameter', 'number', ['string', 'string'], ["enablescreen-name", (CONFIG.html.scope.parameters.showScreenName == true) ? "enable" : "disable"], {async: true});
        await globalThis["LEliteTG"].ccall('SetGameParameter', 'number', ['string', 'string'], ["enablefirstchart", (CONFIG.html.scope.parameters.showChart1 == true) ? "enable" : "disable"], {async: true});
        await globalThis["LEliteTG"].ccall('SetGameParameter', 'number', ['string', 'string'], ["enablesecondchart", (CONFIG.html.scope.parameters.showChart2 == true) ? "enable" : "disable"], {async: true});

    });

    eliteTGInit(CONFIG);
}

export default async () => {
    return new Promise((resolve, reject) => {
        class wControl {
            /////////////////////////////////////////////////////////////////////////////////////////////
            // component
            /////////////////////////////////////////////////////////////////////////////////////////////
            constructor(self) {
                componentInit(self, this.CONFIG);
            }

            CONFIG = {
                html: {
                    scope: {
                        parameters: {
                            showGameConsole: undefined,
                            showScreenName: undefined,
                            showChart1: undefined,
                            showChart2: undefined
                        },
                        canvas: undefined
                    }
                }
            };
        }

        resolve(wControl);
    })
}
