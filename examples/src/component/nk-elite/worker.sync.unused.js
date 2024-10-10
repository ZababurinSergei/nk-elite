import FreeQueue from './free-queue.js'
import { getConstants } from './constants.js'
const { FRAME_SIZE }  = getConstants('emulator');

// import GPUProcessor from './gpu-processor.js';

let inputQueue = null;
let outputQueue = null;
let atomicState = null;
let gpuProcessor = null;
let inputBuffer = null;
let irArray = null;
let sampleRate = null;

// Performance metrics
let lastCallback = 0;
let averageTimeSpent = 0;
let timeElapsed = 0;
let runningAverageFactor = 1;



// processing.
const initialize = (messageDataFromMainThread) => {
    inputQueue = messageDataFromMainThread.inputQueue
    outputQueue = messageDataFromMainThread.outputQueue
    atomicState = messageDataFromMainThread.atomicState
    irArray = messageDataFromMainThread.irArray
    sampleRate = messageDataFromMainThread.sampleRate

    Object.setPrototypeOf(inputQueue, FreeQueue.prototype);
    Object.setPrototypeOf(outputQueue, FreeQueue.prototype);

    // A local buffer to store data pulled out from `inputQueue`.
    inputBuffer = [new Float64Array(FRAME_SIZE), new Float64Array(FRAME_SIZE)]
    // runningAverageFactor = sampleRate / FRAME_SIZE;
    // console.log('----------- runningAverageFactor -------------------', runningAverageFactor)
    // console.log('[worker.js] initialize', runningAverageFactor);
};


const process = () => {
    if (!inputQueue.pull(inputBuffer, FRAME_SIZE)) {
        console.error('[worker.js] Pulling from inputQueue failed.');
        return;
    }

    const outputBuffer = inputBuffer;

    if (!outputQueue.push(outputBuffer, FRAME_SIZE)) {
        console.error('[worker.js] Pushing to outputQueue failed.');
        return;
    }
};

/**
 * Worker message event handler.
 * This will initialize worker with FreeQueue instance and set loop for audio
 * processing. 
 */
self.onmessage = (msg) => {
    if (msg.data.type === 'init') {
        console.log('(((( ===== WORKER ===== ))))')
        
        initialize(msg.data.data);

        self.postMessage({
            status: true
        });

        // eslint-disable-next-line no-undef
        while(Atomics.wait(atomicState, 0,0) === 'ok') {
            process();
            Atomics.store(atomicState, 0, 0);
        }
    }
};
