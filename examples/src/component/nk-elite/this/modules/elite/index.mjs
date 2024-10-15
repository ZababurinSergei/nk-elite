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

    initWasmElite(globalThis["LEliteTG"]).then(function (Module) {
        Module.setStatus("initWasmElite completed...");
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


	CONFIG.html.scope.pointers.vflight_speed = await globalThis["LEliteTG"].ccall('GetGameParameterPointer', 'number', ['string'], ["vflight_speed"], {async: true});
	CONFIG.html.scope.pointers.vflight_roll = await globalThis["LEliteTG"].ccall('GetGameParameterPointer', 'number', ['string'], ["vflight_roll"], {async: true});
	CONFIG.html.scope.pointers.vflight_climb = await globalThis["LEliteTG"].ccall('GetGameParameterPointer', 'number', ['string'], ["vflight_climb"], {async: true});
	CONFIG.html.scope.pointers.venergy = await globalThis["LEliteTG"].ccall('GetGameParameterPointer', 'number', ['string'], ["vflight_climb"], {async: true});
	CONFIG.html.scope.pointers.vlaser_temp = await globalThis["LEliteTG"].ccall('GetGameParameterPointer', 'number', ['string'], ["vflight_climb"], {async: true});
	CONFIG.html.scope.pointers.vaft_shield = await globalThis["LEliteTG"].ccall('GetGameParameterPointer', 'number', ['string'], ["vflight_climb"], {async: true});
	CONFIG.html.scope.pointers.vfront_shield = await globalThis["LEliteTG"].ccall('GetGameParameterPointer', 'number', ['string'], ["vflight_climb"], {async: true});


	const HEAPU32 = new Uint32Array(globalThis["LEliteTG"].HEAPU8);


	let vflight_speed = HEAPU32[CONFIG.html.scope.pointers.vflight_speed / 4];
	let vflight_roll = HEAPU32[CONFIG.html.scope.pointers.vflight_roll / 4];
	let vflight_climb = HEAPU32[CONFIG.html.scope.pointers.vflight_climb / 4];
	let venergy = HEAPU32[CONFIG.html.scope.pointers.venergy / 4];
	let vlaser_temp = HEAPU32[CONFIG.html.scope.pointers.vlaser_temp / 4];
	let vaft_shield = HEAPU32[CONFIG.html.scope.pointers.vaft_shield / 4];
	let vfront_shield = HEAPU32[CONFIG.html.scope.pointers.vfront_shield / 4];

	
	await globalThis["LEliteTG"].ccall('GetGameParameterPointer', 'number', ['string'], ["venergy"], {async: true});
	await globalThis["LEliteTG"].ccall('GetGameParameterPointer', 'number', ['string'], ["vlaser_temp"], {async: true});
	await globalThis["LEliteTG"].ccall('GetGameParameterPointer', 'number', ['string'], ["vaft_shield"], {async: true});
	await globalThis["LEliteTG"].ccall('GetGameParameterPointer', 'number', ['string'], ["vfront_shield"], {async: true});



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
			pointers: {
				vflight_speed: undefined,
				vflight_roll: undefined,
				vflight_climb: undefined,
				venergy: undefined,
				vlaser_temp: undefined,
				vaft_shield: undefined,
				vfront_shield: undefined
			},
                        canvas: undefined
                    }
                }
            };
        }

        resolve(wControl);
    })
}
