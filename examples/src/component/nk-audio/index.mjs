import { Component } from '../index.mjs';
import { lottieWeb } from 'lottie-web';
import { FreeQueueSAB } from '@newkind/FreeQueueSAB'
import { FreeQueue, MAX_CHANNEL_COUNT, RENDER_QUANTUM_FRAMES } from '@newkind/freeQueue';
import initFreeQueue from '@newkind/initFreeQueue'
import { getConstants } from '@newkind/constants'
import { postMessage } from './main-worker.mjs'
const {QUEUE_SIZE} = getConstants()
import { logger } from "@libp2p/logger";
const log = logger('nk-audio');

const name = 'nk-audio';
const component = await Component();

let cutoff = 100;

// Create 2 FreeQueue instances with 4096 buffer length and 1 channel.
const inputQueue = new FreeQueueSAB(QUEUE_SIZE, 1);
const outputQueue = new FreeQueueSAB(QUEUE_SIZE, 1);

// Create an atomic state for synchronization between Worker and AudioWorklet.
const atomicState = new Int32Array(new SharedArrayBuffer(1 * Int32Array.BYTES_PER_ELEMENT));

let audioContext = null;
let worker = null;
let isWorkerInitialized = false;

let toggleButton = null;
let isPlaying = false;
let messageView = null;
let impulseResponseSelect = null;

log('============== initFreeQueue ==============', initFreeQueue)
/**
 * Function to create and initialize AudioContext.
 * @returns {Promise<AudioContext>}
 */
const initializeAudio = async () => {
    const audioContext = new AudioContext();
    const urlProcessor = new URL('./audio-processor.mjs', import.meta.url)
    await audioContext.audioWorklet.addModule(urlProcessor.pathname);

    const oscillatorNode = new OscillatorNode(audioContext);
    const processorNode = new AudioWorkletNode(audioContext, 'audio-processor', {
        processorOptions: {
            inputQueue,
            outputQueue,
            atomicState
        }
    });

    // Initially suspend the context to prevent the renderer from hammering the
    // Worker.
    audioContext.suspend();

    // Form an audio graph and start the source. When the renderer is resumed,
    // the pipeline will be flowing.
    // oscillatorNode.connect(processorNode).connect(audioContext.destination);
    oscillatorNode.connect(processorNode);
    oscillatorNode.start();

    log('[main.js] initializeAudio()');
    return audioContext;
};

const initializeWorkerIfNecessary = async function (){
    if (isWorkerInitialized) {
        return;
    }

    console.assert(this.audioContext);

    let filePath = null;
    let irArray = null;
    if (impulseResponseSelect) {
        // When the file path is `TEST` generates a test IR (10 samples). See
        // `assets.js` for details.
        filePath = impulseResponseSelect.value;
        irArray = (filePath === 'TEST')
            ? createTestIR()
            : await fetchAudioFileToF32Array(audioContext, filePath);

        impulseResponseSelect.disabled = true;
    }

    // Send FreeQueue instance and atomic state to worker.
    // this.worker.postMessage({
    //     type: 'init',
    //     data: {
    //         inputQueue,
    //         outputQueue,
    //         atomicState,
    //         irArray,
    //         sampleRate: this.audioContext.sampleRate,
    //     }
    // });

    postMessage({
        data: {
            type: 'init',
            data: {
                inputQueue,
                outputQueue,
                atomicState,
                irArray,
                sampleRate: this.audioContext.sampleRate,
            }
        }
    })
    log('[main.js] initializeWorkerIfNecessary(): ' + filePath);

    isWorkerInitialized = true;
};


// Handles `button` click. It toggles the state between playing and suspended.
const toggleButtonClickHandler = async function () {
    if (!isPlaying) {
        initializeWorkerIfNecessary.call(this);
        this.audioContext.resume();
        isPlaying = true;
        // toggleButton.textContent = 'STOP';
    } else {
        this.audioContext.suspend();
        isPlaying = false;
        // toggleButton.textContent = 'START';
    }
};

// Detect required features.
const detectFeaturesAndReport = (viewElement) => {
    let areRequiremensMet = true;
    let errorMessage = ''
    if (typeof navigator.gpu !== 'object') {
        errorMessage +=
            'ERROR: WebGPU is not available on your browser.\r\n';
        areRequiremensMet = false;
    }

    if (typeof SharedArrayBuffer !== 'function') {
        errorMessage +=
            'ERROR: SharedArrayBuffer is not available on your browser.\r\n';
        areRequiremensMet = false;
    }

    if (areRequiremensMet) {
        errorMessage +=
            'All requirements have been met. The experiment is ready to run.\r\n';
    }

    if (!areRequiremensMet) {
        viewElement.dialog.error(errorMessage)
    }

    return areRequiremensMet;
};


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
}

Object.defineProperties(component.prototype, {
    DOM: {
        value: { },
        writable: true
    },
    LFreeQueue: {
        value: {
            setStatus: function (e) {
                if (e !== "") {
                    log('--------------- FreeQueue initialization ---------------',e)
                };
            },
            onRuntimeInitialized: async function () {
                ///////////////////////////////////////////////////////////////////////////////////////
                // FreeQueue initialization
                ///////////////////////////////////////////////////////////////////////////////////////
                //globalThis["LFreeQueue"].callMain("");
            }
        },
        writable: true
    },
    audioContext: {
        value: null,
        writable: true
    },
    processedStream: {
        value: null,
        writable: true
    },
    worker: {
        value: null,
        writable: true
    },
    processor: {
        value: null,
        writable: true
    },
    generator: {
        value: null,
        writable: true
    },
    stream: {
        value: null,
        writable: true
    },
    constraints: {
        value: function () {
            return {
                audio: true,
                video: false
            }
        },
        writable: true
    },
    connected: {
        value: async function (property) {
            this.DOM = {
                audio: function () {
                    return this.shadowRoot.querySelector('audio');
                }
            }

            initFreeQueue(this.LFreeQueue).then( async (module) => {
                // const GetFreeQueuePointers = module.cwrap('GetFreeQueuePointers', 'number', ['number', 'string']);
                // const PrintQueueInfo = module.cwrap('PrintQueueInfo', '', ['number']);
                // const CreateFreeQueue = module.cwrap('CreateFreeQueue', 'number', ['number', 'number']);
                // const PrintQueueAddresses = module.cwrap('PrintQueueAddresses', '', ['number']);

                const bufferLength = 1024;
                const channelCount = 2;
                const maxChannelCount = 4;

                const freeQueue = new FreeQueue(module, bufferLength, channelCount, maxChannelCount);

                // CONFIG.queue.pointer = CreateFreeQueue( 1754 * 50, 2 );
                log('------------------ module', freeQueue)
                // CONFIG.queue.pointer = CreateFreeQueue( 1754 * 50, 2 );
                // const bufferLengthPtr = GetFreeQueuePointers(CONFIG.queue.pointer, "buffer_length");
                // const channelCountPtr = GetFreeQueuePointers(CONFIG.queue.pointer, "channel_count");
                // const statePtr = GetFreeQueuePointers(CONFIG.queue.pointer, "state");
                // const channelDataPtr = GetFreeQueuePointers(CONFIG.queue.pointer, "channel_data");

                // const pointers = new Object();
                // pointers.memory = module.HEAPU8;
                // pointers.bufferLengthPointer = bufferLengthPtr;
                // pointers.channelCountPointer = channelCountPtr;
                // pointers.statePointer = statePtr;
                // pointers.channelDataPointer = channelDataPtr;

                // CONFIG.queue.instance = FreeQueue.fromPointers(pointers);
                // if (CONFIG.queue.instance != undefined) CONFIG.queue.instance.printAvailableReadAndWrite();

                module.setStatus("initWasmFreeQueue completed...");

            });

            if (!detectFeaturesAndReport(this)) {
                return;
            }

            this.audioContext = await initializeAudio();

            const newUrl = new URL('./worker.sync.mjs', import.meta.url)

            this.worker = new Worker(newUrl.pathname, {
                name: "audio-worker",
                type: 'module'
            });

            this.worker.onerror = (event) => {
                log('[main.js] Error from worker.js: ', event);
            };

            const shadow = this.shadowRoot;
            const audioPlayerContainer = shadow.getElementById('audio-player-container');
            const playIconContainer = shadow.getElementById('play-icon');
            const seekSlider = shadow.getElementById('seek-slider');
            const volumeSlider = shadow.getElementById('volume-slider');
            const muteIconContainer = shadow.getElementById('mute-icon');
            const audio = shadow.querySelector('audio');
            const durationContainer = shadow.getElementById('duration');
            const currentTimeContainer = shadow.getElementById('current-time');
            const outputContainer = shadow.getElementById('volume-output');
            let playState = 'play';
            let muteState = 'unmute';
            let raf = null;

            // audio.src = this.getAttribute('data-src');
            //
            const playAnimation = lottieWeb.loadAnimation({
                container: playIconContainer,
                path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
                renderer: 'svg',
                loop: false,
                autoplay: false,
                name: "Play Animation",
            });

            const muteAnimation = lottieWeb.loadAnimation({
                container: muteIconContainer,
                path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json',
                renderer: 'svg',
                loop: false,
                autoplay: false,
                name: "Mute Animation",
            });

            playAnimation.goToAndStop(14, true);
            //
            const whilePlaying = () => {
                seekSlider.value = Math.floor(audio.currentTime);
                currentTimeContainer.textContent = calculateTime(seekSlider.value);
                audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
                raf = requestAnimationFrame(whilePlaying);
            }

            const showRangeProgress = (rangeInput) => {
                if (rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
                else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
            }

            const calculateTime = (secs) => {
                const minutes = Math.floor(secs / 60);
                const seconds = Math.floor(secs % 60);
                const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
                return `${minutes}:${returnedSeconds}`;
            }

            const displayDuration = () => {
                durationContainer.textContent = calculateTime(audio.duration);
            }

            const setSliderMax = () => {
                seekSlider.max = Math.floor(audio.duration);
            }
            //
            const displayBufferedAmount = () => {
                if (audio.buffered.length > 0) {
                    const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
                    audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
                }
            }

            if (audio.readyState > 0) {
                displayDuration();
                setSliderMax();
                displayBufferedAmount();
            } else {
                audio.addEventListener('loadedmetadata', () => {
                    displayDuration();
                    setSliderMax();
                    displayBufferedAmount();
                });
            }

            playIconContainer.addEventListener('click', async () => {
                if (playState === 'play') {
                    playAnimation.playSegments([14, 27], true);
                    requestAnimationFrame(whilePlaying);
                    toggleButtonClickHandler.call(this)
                    playState = 'pause';
                } else {
                    playAnimation.playSegments([0, 14], true);
                    cancelAnimationFrame(raf);
                    toggleButtonClickHandler.call(this)
                    playState = 'play';
                }
            });

            muteIconContainer.addEventListener('click', () => {
                if (muteState === 'unmute') {
                    muteAnimation.playSegments([0, 15], true);
                    audio.muted = true;
                    muteState = 'mute';
                } else {
                    muteAnimation.playSegments([15, 25], true);
                    audio.muted = false;
                    muteState = 'unmute';
                }
            });

            audio.addEventListener('progress', displayBufferedAmount);

            seekSlider.addEventListener('input', (e) => {
                showRangeProgress(e.target);
                currentTimeContainer.textContent = calculateTime(seekSlider.value);
                if (!audio.paused) {
                    cancelAnimationFrame(raf);
                }
            });

            seekSlider.addEventListener('change', () => {
                audio.currentTime = seekSlider.value;
                if (!audio.paused) {
                    requestAnimationFrame(whilePlaying);
                }
            });

            volumeSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                showRangeProgress(e.target);
                outputContainer.textContent = value;
                audio.volume = value / 100;
            });

            // if('mediaSession' in navigator) {
            //     navigator.mediaSession.metadata = new MediaMetadata({
            //         title: 'Komorebi',
            //         artist: 'Anitek',
            //         album: 'MainStay',
            //         artwork: [
            //             { src: './component/nk-audio/img.png', sizes: '96x96', type: 'image/png' },
            //             { src: './component/nk-audio/img.png', sizes: '128x128', type: 'image/png' },
            //             { src: './component/nk-audio/img.png', sizes: '192x192', type: 'image/png' },
            //             { src: './component/nk-audio/img.png', sizes: '256x256', type: 'image/png' },
            //             { src: './component/nk-audio/img.png', sizes: '384x384', type: 'image/png' },
            //             { src: './component/nk-audio/img.png', sizes: '512x512', type: 'image/png' }
            //         ]
            //     });

            // navigator.mediaSession.setActionHandler('play', () => {
            //     if(playState === 'play') {
            //         audio.play();
            //         playAnimation.playSegments([14, 27], true);
            //         requestAnimationFrame(whilePlaying);
            //         playState = 'pause';
            //     } else {
            //         audio.pause();
            //         playAnimation.playSegments([0, 14], true);
            //         cancelAnimationFrame(raf);
            //         playState = 'play';
            //     }
            // });

            // navigator.mediaSession.setActionHandler('pause', () => {
            //     if(playState === 'play') {
            //         audio.play();
            //         playAnimation.playSegments([14, 27], true);
            //         requestAnimationFrame(whilePlaying);
            //         playState = 'pause';
            //     } else {
            //         audio.pause();
            //         playAnimation.playSegments([0, 14], true);
            //         cancelAnimationFrame(raf);
            //         playState = 'play';
            //     }
            // });

            // navigator.mediaSession.setActionHandler('seekbackward', (details) => {
            //     audio.currentTime = audio.currentTime - (details.seekOffset || 10);
            // });

            // navigator.mediaSession.setActionHandler('seekforward', (details) => {
            //     audio.currentTime = audio.currentTime + (details.seekOffset || 10);
            // });
            //
            // navigator.mediaSession.setActionHandler('seekto', (details) => {
            //     if (details.fastSeek && 'fastSeek' in audio) {
            //         audio.fastSeek(details.seekTime);
            //         return;
            //     }
            //     audio.currentTime = details.seekTime;
            // });

            // navigator.mediaSession.setActionHandler('stop', () => {
            //     audio.currentTime = 0;
            //     seekSlider.value = 0;
            //     audioPlayerContainer.style.setProperty('--seek-before-width', '0%');
            //     currentTimeContainer.textContent = '0:00';
            //     if(playState === 'pause') {
            //         playAnimation.playSegments([0, 14], true);
            //         cancelAnimationFrame(raf);
            //         playState = 'play';
            //     }
            // });
            // }

            // return true;
        },
        writable: true
    },
    disconnected: {
        value: async function () {
            return true
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




