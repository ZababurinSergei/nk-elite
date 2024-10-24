import { chai } from "@newkind/tests";

import initWasmElite from "../../nk-elite/this/modules/elite/build/nk-elite.asm.js";

import { postMessage } from "./modules/main-worker.mjs"
import { logger } from "@libp2p/logger"

describe('Elite', async function () {

    globalThis["LEliteTG"] = {
        preRun: [],
        postRun: [],
        print: function (e) {
		console.log("LEliteTG: " + e);
        },
        printErr: function (e) {
		console.error("LEliteTG: " + e);
        },
        canvas: function () {
            return document.createElement("canvas");
        }(),
        setStatus: function (e) {
            if (e !== "") {
                console.log("LEliteTG: " + e);
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
        module.setStatus("initWasmElite Test completed...");
    });

//        await globalThis["LEliteTG"].ccall('SetGameParameter', 'number', ['string', 'string'], ["enableconsole", (CONFIG.html.scope.parameters.showGameConsole == true) ? "enable" : "disable"], {async: true});
//        await globalThis["LEliteTG"].ccall('SetGameParameter', 'number', ['string', 'string'], ["enablescreen-name", (CONFIG.html.scope.parameters.showScreenName == true) ? "enable" : "disable"], {async: true});
//        await globalThis["LEliteTG"].ccall('SetGameParameter', 'number', ['string', 'string'], ["enablefirstchart", (CONFIG.html.scope.parameters.showChart1 == true) ? "enable" : "disable"], {async: true});
//        await globalThis["LEliteTG"].ccall('SetGameParameter', 'number', ['string', 'string'], ["enablesecondchart", (CONFIG.html.scope.parameters.showChart2 == true) ? "enable" : "disable"], {async: true});

    before(async function () {

    });

    describe('Подключение модуля', async function () {
        it('Импортируем wasm файл', function () {
            return new Promise(async (resolve, reject) => {
                reject(true)
            })
        })
    })
    describe('Подключение сети', async function () {
        it('Подключение памяти', function () {
            return new Promise(async (resolve, reject) => {
                reject(true)
            })
        })
    })
    describe('Стрим ланные', async function () {
        it('От пира А к Б', function () {
            return new Promise(async (resolve, reject) => {
                reject(true)
            })
        })
        it('От пира Б к А', function () {
            return new Promise(async (resolve, reject) => {
                reject(true)
            })
        })
    })
})