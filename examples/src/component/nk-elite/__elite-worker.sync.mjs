const FRAME_SIZE = 2048;
let inputQueue = null;
let outputQueue = null;

let inputBuffer = null;
let outputBuffer = null

let sampleRate = null;

// Performance metrics
let lastCallback = 0;
let averageTimeSpent = 0;
let timeElapsed = 0;
let runningAverageFactor = 1;



// processing.
const initialize = (messageDataFromMainThread) => {
    ( { inputQueue, outputQueue, sampleRate } = messageDataFromMainThread );

    runningAverageFactor = sampleRate / FRAME_SIZE;

    console.log('[worker.js] initialize', runningAverageFactor);
};


const process = () => {

};

self.onmessage = (msg) => {
    if (msg.data.type === 'init') {

        initialize(msg.data.data);

        self.postMessage({
            status: true
        });

    } else {

        console.log( "data.type: " + msg.data.type );
    }
};
