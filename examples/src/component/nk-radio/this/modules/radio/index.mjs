import initFreeQueue from "../../free-queue/free-queue.asm.js";

import FreeQueue from "../../free-queue/free-queue-sab.js";
//import FreeQueue from "../../free-queue/free-queue.js";

import { getConstants } from '@newkind/constants'
import Application from "./oscilloscope/index.mjs";
import { logger } from "@libp2p/logger";
import CONFIG from "../../config.mjs";

const constants = getConstants()
const log = logger('LFreeQueue');

const newAudio = async function () {
    try {
        if (CONFIG.audio.init == false) {
            CONFIG.audio.init = true;
            CONFIG.stream.song = new Audio(CONFIG.stream.path);
            CONFIG.stream.source = CONFIG.audio.ctx.createMediaElementSource(CONFIG.stream.song);

            this.task({
                id: 'nk-chat_0',
                component: 'nk-chat',
                type: 'self',
                execute: (self) => {
                    self.stream = CONFIG.stream
                }
            })

            CONFIG.stream.song.crossOrigin = "anonymous";
            CONFIG.stream.song.addEventListener( "canplay", async (event) => {
                await CONFIG.audio.ctx.resume();
                await CONFIG.stream.song.play();
                CONFIG.html.button.start.textContent = "Stop Audio";
                return true;
            }, { once: true } );

            await CONFIG.stream.source.connect(CONFIG.audio.ctx.destination);
            await CONFIG.stream.source.connect(CONFIG.audio.node);
            CONFIG.audio.init = false;
        }
    } catch (e) {
        CONFIG.html.button.start.textContent = "Stop Audio";
        return true;
    }
}

const ctx = async function () {
    if (CONFIG.audio.ctx == undefined || CONFIG.audio.ctx == null) {
        CONFIG.audio.ctx = new (window.AudioContext || window.webkitAudioContext)();
        const urlProcessor = new URL("./radio-processor.mjs", import.meta.url)
        //////////////////////////////////////////////////////////////////////////////////////////////
        // console.log("urlProcessor", urlProcessor.pathname)
        //////////////////////////////////////////////////////////////////////////////////////////////
        await CONFIG.audio.ctx.audioWorklet.addModule(urlProcessor.pathname);
    }

    CONFIG.audio.node = new AudioWorkletNode(CONFIG.audio.ctx, "radio-processor", {
        processorOptions: {},
        numberOfInputs: 1,
        numberOfOutputs: 1,
        outputChannelCount: [2],
        channelCount: 2,
        channelCountMode: "max",
        channelInterpretation: "speakers"
    });

    CONFIG.audio.node.connect( CONFIG.audio.ctx.destination );
    CONFIG.audio.node.port.postMessage( Object.entries( CONFIG.queue.object ) );

    CONFIG.audio.ctx.suspend();

//    CONFIG.audio.analyser =  CONFIG.audio.ctx.createAnalyser()
//    CONFIG.audio.master.gain = CONFIG.audio.ctx.createGain()

//    CONFIG.audio.waveform = new Float32Array(CONFIG.audio.analyser.frequencyBinCount)
//    await CONFIG.audio.analyser.getFloatTimeDomainData(CONFIG.audio.waveform)

    // TODO переключатель между радио и осцилятором
//    CONFIG.audio.master.gain.connect(CONFIG.audio.processorNode).connect(CONFIG.audio.analyser).connect(CONFIG.audio.ctx.destination);
    // CONFIG.audio.oscillatorNode.connect(CONFIG.audio.processorNode).connect(CONFIG.audio.analyser).connect(CONFIG.audio.ctx.destination);

//    CONFIG.audio.oscillatorNode.start();

    return CONFIG.audio.ctx
}

const freeQueueInit = function (){
    // Подключаю воркер
//    const urlWorker = (new URL('./worker.sync.js', import.meta.url)).pathname
//    let workerName = 'nk-radio'

    // Поставь сюда подключение
//    this.inputQueue = 0 //new FreeQueue(QUEUE_SIZE, 2);
//    this.outputQueue = 0 //new FreeQueue(QUEUE_SIZE, 2);
//    this.atomicState = 0 //new Int32Array(new SharedArrayBuffer(2 * Int32Array.BYTES_PER_ELEMENT));


    globalThis["LFreeQueue"] = {
        setStatus: function (e) {
            if (e !== "") {
                console.log(e)
            };
        }
    };

    globalThis["LFreeQueue"].onRuntimeInitialized = async function() 
    {
        ///////////////////////////////////////////////////////////////////////////////////////
        // FreeQueue initialization
        ///////////////////////////////////////////////////////////////////////////////////////
        //globalThis["LFreeQueue"].callMain("");
    }

    initFreeQueue(globalThis["LFreeQueue"]).then( async function (module) 
    {
        const GetFreeQueuePointers = module.cwrap('GetFreeQueuePointers', 'number', ['number', 'string']);
        const PrintQueueInfo = module.cwrap('PrintQueueInfo', '', ['number']);
        const CreateFreeQueue = module.cwrap('CreateFreeQueue', 'number', ['number', 'number']);
        const PrintQueueAddresses = module.cwrap('PrintQueueAddresses', '', ['number']);

        CONFIG.queue.pointer = CreateFreeQueue( 1754 * 50, 2 );
        const bufferLengthPtr = GetFreeQueuePointers(CONFIG.queue.pointer, "buffer_length");
        const channelCountPtr = GetFreeQueuePointers(CONFIG.queue.pointer, "channel_count");
        const statePtr = GetFreeQueuePointers(CONFIG.queue.pointer, "state");
        const channelDataPtr = GetFreeQueuePointers(CONFIG.queue.pointer, "channel_data");

        const pointers = new Object();

        pointers.memory = module.HEAPU8;
        pointers.bufferLengthPointer = bufferLengthPtr;
        pointers.channelCountPointer = channelCountPtr;
        pointers.statePointer = statePtr;
        pointers.channelDataPointer = channelDataPtr;
	
	CONFIG.queue.api.lock = function() { 
		let fn = module.cwrap('Lock', '', ['number']);
		fn( CONFIG.queue.pointer );
	}
	CONFIG.queue.api.unlock = function() { 
		let fn = module.cwrap('Unlock', '', ['number']);
		fn( CONFIG.queue.pointer );
	}
	CONFIG.queue.api.trylock = function() { 
		let fn = module.cwrap('TryLock', 'number', ['number']);
		return fn( CONFIG.queue.pointer );
	}

	CONFIG.queue.object = pointers;

        CONFIG.queue.instance = FreeQueue.fromPointers(pointers);

        if (CONFIG.queue.instance != undefined) CONFIG.queue.instance.printAvailableReadAndWrite();

        module.setStatus("initWasmFreeQueue completed...");
    });
}

const componentInit = (self) => {
    freeQueueInit.call(self);

    CONFIG.html.scope.canvas = self.shadowRoot.querySelector("#gfx")
    CONFIG.html.button.start = self.shadowRoot.querySelector("#start");

    let wgerr = self.shadowRoot.querySelector("#error");
    let wgfx = CONFIG.html.scope.canvas;

    CONFIG.html.button.radios.this = self.shadowRoot.querySelectorAll("input[name='radio-selection']");
    CONFIG.html.button.radios.length = CONFIG.html.button.radios.this.length;

    CONFIG.player.isPlaying = false;

    CONFIG.application.instance = new Application();
    const available = CONFIG.application.instance.check();
    if (available) {
        wgerr.style.display = 'none';
        wgfx.style.display = 'block';
    } else {
        wgerr.style.display = 'block';
        wgfx.style.display = 'none';
    }

    CONFIG.application.instance.setCanvas(CONFIG.html.scope.canvas);
    const _canvas = CONFIG.application.instance.getCanvas();

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // TODO: canvas resize
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const _scale = window.devicePixelRatio;

    _canvas.width = window.innerWidth;
    _canvas.height = _canvas.width * 3 / 14;

    _canvas.height = _canvas.height * _scale;
    _canvas.width = _canvas.width * _scale;
}

export default async () => {
    return new Promise((resolve, reject) => {
        class wControl {
            /////////////////////////////////////////////////////////////////////////////////////////////
            // component
            /////////////////////////////////////////////////////////////////////////////////////////////
            constructor(self) {
                componentInit(self);

                for (let i = 0, max = CONFIG.html.button.radios.length; i < max; i++) {
                    if (CONFIG.html.button.radios.this[i].checked === true) {
                        CONFIG.stream.path = CONFIG.html.button.radios.this[i].value;
                    }
                }

                for (let i = 0, max = CONFIG.html.button.radios.length; i < max; i++) {
                    CONFIG.html.button.radios.this[i].addEventListener("change", async (e) => {
                        if (CONFIG.player.isPlaying) {
                            CONFIG.player.isPlaying = false;
                            await CONFIG.stream.song.pause();
                            await CONFIG.audio.ctx.suspend();
                            CONFIG.audio.node.disconnect();
                            CONFIG.stream.song = undefined;
                            CONFIG.audio.ctx = undefined;
                            CONFIG.audio.node = undefined;
                            CONFIG.queue.instance._reset();
                            CONFIG.html.button.start.textContent = "Start Audio";
                            CONFIG.stream.path = e.target.value;
                            if (CONFIG.audio.ctx != undefined && CONFIG.audio.ctx != null) {
                                CONFIG.player.isPlaying = !CONFIG.player.isPlaying;
                                await newAudio.call(self);
                            } else {
                                CONFIG.player.isPlaying = !CONFIG.player.isPlaying;
                                await ctx();
                                await newAudio.call(self);
                            }
                        } else {
                            CONFIG.stream.path = e.target.value;
                        }
                    });
                }

                CONFIG.html.button.start.addEventListener("click", async (e) => {
                    if(CONFIG.html.button.start.classList.contains('disabled')) {
                        return
                    }

                    CONFIG.html.button.start.classList.add("disabled")

                    const timeId = setTimeout(() => {
                        CONFIG.html.button.start.classList.remove("disabled")
                        clearTimeout(timeId)
                    }, 3000)

                    if (CONFIG.player.isPlaying) {
                        CONFIG.player.isPlaying = false;
                        await CONFIG.stream.song.pause();
                        await CONFIG.audio.ctx.suspend();
                        CONFIG.audio.node.disconnect();
                        CONFIG.stream.song = undefined;
                        CONFIG.audio.ctx = undefined;
                        CONFIG.audio.node = undefined;
                        CONFIG.queue.instance._reset();
                        CONFIG.html.button.start.textContent = "Start Audio";
                    } else {
                        CONFIG.html.button.start.textContent = "Stop Audio";
                        CONFIG.player.isPlaying = true;
                        await ctx();
                        await newAudio.call(self);
                    }
                });

                CONFIG.application.instance.start();
            }

        }

        resolve(wControl);
    })
}
