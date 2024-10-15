import { FreeQueueSAB } from '@newkind/FreeQueueSAB'
import {FreeQueue, MAX_CHANNEL_COUNT, RENDER_QUANTUM_FRAMES} from '@newkind/freeQueue';
import { getConstants } from '@newkind/constants'
const { RENDER_QUANTUM, FRAME_SIZE } = getConstants('emulator');
import {logger} from '@libp2p/logger'
const log = logger('emulator:processor')

const ExpectedPrimingCount = parseInt(FRAME_SIZE / RENDER_QUANTUM, 10);

/**
 * A simple AudioWorkletProcessor node.
 *
 * @class BasicProcessor
 * @extends AudioWorkletProcessor
 */
export class MainProcessor {
    /**
     * Constructor to initialize, input and output FreeQueue instances
     * and atomicState to synchronise Worker with AudioWorklet
     * @param {Object} options AudioWorkletProcessor options
     *    to initialize inputQueue, outputQueue and atomicState
     */
    constructor(options) {
        this.stream = null
        this.inputQueue = options.processorOptions.inputQueue;
        this.outputQueue = options.processorOptions.outputQueue;
        this.atomicState = options.processorOptions.atomicState;
        Object.setPrototypeOf(this.inputQueue, FreeQueueSAB.prototype);
        Object.setPrototypeOf(this.outputQueue, FreeQueueSAB.prototype);
        // Object.setPrototypeOf(this.inputQueue, FreeQueue.prototype);
        // Object.setPrototypeOf(this.outputQueue, FreeQueue.prototype);
        this.primingCounter = 0;
    }

    connect(inputs, outputs) {
        console.log(inputs, outputs)
        debugger
    }
    /**
     * The AudioWorkletProcessor's isochronous callback.
     * @param {Array<Float32Array>>} inputs
     * @param {Array<Float32Array>>} outputs
     * @returns {boolean}
     */
    process(inputs, outputs) {
        let input = inputs[0];
        let output = outputs[0];

        // console.log('🟢 ==== processor ==== 🟢', {
        //     input: input,
        //     output: output
        // })
        // The first |ExpectedPrimingCount| number of callbacks won't get any
        // data from the queue because the it's empty. This check is not perfect;
        // waking up the worker can be slow and priming N callbacks might not be
        // enough.
        if (this.primingCounter > 1) {
            // console.log('🟢🟢 ==== OUTQUEUE PULL ==== 🟢🟢', this.outputQueue)
            const didPull = this.outputQueue.pull(output, RENDER_QUANTUM);
            if(this.stream) {
                this.stream(output)
            }

            log('🟢🟢 ==== QUEUE PULL ==== 🟢🟢', output)

            console.log()
            if (!didPull) {
                console.log('[basic-processor.js] Not enough data in outputQueue');
                return false;
            }
        } else {
            this.primingCounter++;
        }

        const didPush = this.inputQueue.push(input, RENDER_QUANTUM);

        if (!didPush) {
            console.log('[basic-processor.js] Not enough space in inputQueue');
            return false;
        }
        // Notify worker.js if `inputQueue` has enough data to perform the batch
        // processing of FRAME_SIZE.
        if (this.inputQueue.isFrameAvailable(FRAME_SIZE)) {
            // console.log('🟢 ==== CHANGE STATE ==== 🟢')
            Atomics.store(this.atomicState, 0, 1);
            Atomics.notify(this.atomicState, 0);
        }

        return true;
    }
}