import {initFreeQueue, FreeQueue} from "../../../../../this/queue.mjs"
import Application from "./oscilloscope/index.mjs";
import { logger } from '@libp2p/logger'
const log = logger('LFreeQueue')
const newAudio = async function (CONFIG) {
    try {
        if (CONFIG.audio.init == false) {
            CONFIG.audio.init = true;
            CONFIG.stream.song = new Audio(CONFIG.stream.path);
            CONFIG.stream.source = CONFIG.audio.ctx.createMediaElementSource(CONFIG.stream.song);

            this.task = {
                id: 'nk-chat_0',
                component: 'nk-chat',
                type: 'self',
                execute: (self) => {
                    self.stream = CONFIG.stream
                }
            }

            CONFIG.stream.song.crossOrigin = 'anonymous';
            CONFIG.stream.song.addEventListener("canplay", async (event) => {
                await CONFIG.audio.ctx.resume();
                await CONFIG.stream.song.play();
                CONFIG.html.button.start.textContent = 'Stop Audio';
                return true;
            }, { once: true });
            await CONFIG.stream.source.connect(CONFIG.audio.ctx.destination);
            await CONFIG.stream.source.connect(CONFIG.audio.node);
            CONFIG.audio.init = false;
        }
    } catch (e) {
        CONFIG.html.button.start.textContent = 'Stop Audio';
        return true;
    }
}

const ctx = async (CONFIG) => {
    if (CONFIG.audio.ctx == undefined || CONFIG.audio.ctx == null) {
        CONFIG.audio.ctx = new (window.AudioContext || window.webkitAudioContext)();
        const urlProcessor = new URL('./radio-processor.mjs', import.meta.url)
        console.log('urlProcessor', urlProcessor.pathname)
        await CONFIG.audio.ctx.audioWorklet.addModule(urlProcessor.pathname);
    }

    // CONFIG.audio.oscillatorNode = new OscillatorNode(CONFIG.audio.ctx);
    // Create an atomic state for synchronization between Worker and AudioWorklet.

    CONFIG.audio.node = new AudioWorkletNode(CONFIG.audio.ctx, 'radio-processor', {
        processorOptions: {
            pointer: CONFIG.queue.pointer,
            instance: CONFIG.queue.instance
        },
        numberOfInputs: 1,
        numberOfOutputs: 1,
        outputChannelCount: [2],
        channelCount: 2,
        channelCountMode: "max",
        channelInterpretation: "speakers"
    });

    // CONFIG.audio.node.connect((...arg)=> {
    //     console.log('ddddddddddddd', arg)
    //     debugger
    // })

    CONFIG.audio.node.connect(CONFIG.audio.ctx.destination);

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

const freeQueueInit = (CONFIG) => {

    globalThis["LFreeQueue"] = {
        setStatus: function (e) {
            if (e !== "") {
                log(e)
            };
        }
    };

    globalThis["LFreeQueue"].onRuntimeInitialized = async function() 
    {
        ///////////////////////////////////////////////////////////////////////////////////////
        // FreeQueue initialization
        ///////////////////////////////////////////////////////////////////////////////////////
        //globalThis["LFreeQueue"].callMain("");

        const GetFreeQueuePointers = globalThis["LFreeQueue"].cwrap('GetFreeQueuePointers', 'number', ['number', 'string']);
        const PrintQueueInfo = globalThis["LFreeQueue"].cwrap('PrintQueueInfo', '', ['number']);
        const CreateFreeQueue = globalThis["LFreeQueue"].cwrap('CreateFreeQueue', 'number', ['number', 'number']);
        const PrintQueueAddresses = globalThis["LFreeQueue"].cwrap('PrintQueueAddresses', '', ['number']);

        CONFIG.queue.pointer = CreateFreeQueue( 1754 * 50, 2 );
        const bufferLengthPtr = GetFreeQueuePointers(CONFIG.queue.pointer, "buffer_length");
        const channelCountPtr = GetFreeQueuePointers(CONFIG.queue.pointer, "channel_count");
        const statePtr = GetFreeQueuePointers(CONFIG.queue.pointer, "state");
        const channelDataPtr = GetFreeQueuePointers(CONFIG.queue.pointer, "channel_data");

        const pointers = new Object();
        pointers.memory = globalThis["LFreeQueue"].HEAPU8;
        pointers.bufferLengthPointer = bufferLengthPtr;
        pointers.channelCountPointer = channelCountPtr;
        pointers.statePointer = statePtr;
        pointers.channelDataPointer = channelDataPtr;

        CONFIG.queue.instance = FreeQueue.fromPointers(pointers);
        if (CONFIG.queue.instance != undefined) CONFIG.queue.instance.printAvailableReadAndWrite();
    }

    initFreeQueue(globalThis["LFreeQueue"]).then( async (module) => {
        globalThis["LFreeQueue"].setStatus("initWasmFreeQueue completed...");

        globalThis["LFreeQueue"].Store = async function( _key, _value ) {
            let _convert = "";
            
            if ( typeof _value === "string" ) _convert = _value;
            else if ( typeof _value === "number" ) _convert = _value.toString();
            else if ( typeof _value === "boolean" ) _convert = (_value == true ) ? "true" : "false";

            await globalThis["LFreeQueue"].ccall( "Store", "", [ "string", "string" ], [ _key, _convert ], { async: true } );
        }

        globalThis["LFreeQueue"].Load = async function( _key ) {
            return await globalThis["LFreeQueue"].ccall( "Load", "string", [ "string" ], [ _key ], { async: true } );
        }
    });

}

const componentInit = (self, CONFIG) => {
    freeQueueInit(CONFIG);

    CONFIG.html.scope.canvas = self.shadowRoot.querySelector("#gfx")
    CONFIG.html.button.start = self.shadowRoot.querySelector("#start");

    let wgerr = self.shadowRoot.querySelector("#error");
    let wgfx = CONFIG.html.scope.canvas;

    CONFIG.html.button.radios.this = self.shadowRoot.querySelectorAll("input[name='radio-selection']");
    CONFIG.html.button.radios.length = CONFIG.html.button.radios.this.length;

    CONFIG.player.isPlaying = false;

    CONFIG.application.instance = new Application(CONFIG);
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
                componentInit(self, this.CONFIG);

                const CONFIG = this.CONFIG;

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
                                await newAudio.call(self, CONFIG);
                            } else {
                                CONFIG.player.isPlaying = !CONFIG.player.isPlaying;
                                await ctx(CONFIG);
                                await newAudio.call(self, CONFIG);
                            }
                        } else {
                            CONFIG.stream.path = event.target.value;
                        }
                    });
                }

                CONFIG.html.button.start.addEventListener("click", async (e) => {
                    if(CONFIG.html.button.start.classList.contains('disabled')) {
                        return
                    }

                    CONFIG.html.button.start.classList.add('disabled')

                    const timeId = setTimeout(() => {
                        CONFIG.html.button.start.classList.remove('disabled')
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
                        await ctx(CONFIG);
                        console.log(self)
                        await newAudio.call(self, CONFIG);
                    }
                });

                CONFIG.application.instance.start();
            }

            CONFIG = {
                audio: {
                    ctx: undefined,
                    node: undefined,
                    init: false
                },
                html: {
                    scope: {
                        canvas: false,
                        context: false
                    },
                    button: {
                        start: false,
                        radios: {
                            this: false,
                            length: false
                        }
                    }
                },
                player: {
                    isPlaying: false
                },
                stream: {
                    song: undefined,
                    source: undefined,
                    path: undefined,
                },
                web: {
                    crossOrigin: 'anonymous'
                },
                queue: {
                    instance: undefined,
                    pointer: undefined
                },
                application: {
                    instance: undefined,
                    channels: 2,
                    goniometer: "goniometer-off",
                    holdChart: "holdchart-off",
                    inputType: "default", // "audio"; // "osc"
                    renderType: "stereo",
                    kdX: 500,
                    kdY: 10,
                    zoomX: 100,
                    zoomY: 100,
                    holdBuffer: undefined,
                    renderBuffer: undefined,
                    sampleRate: 44100,
                    volumeRate: 1.0,
                    nameOfFile: "",
                    frameOffset: 0
                }
            };
        }

        resolve(wControl);
    })
}
