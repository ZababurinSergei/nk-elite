/**
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

<<<<<<< Updated upstream
=======
/**
 * A single-producer/single-consumer lock-free FIFO backed by SharedArrayBuffer.
 * In a typical pattern is that a worklet pulls the data from the queue and a
 * worker renders audio data to fill in the queue.
 */

class FreeQueue {

  /**
   * An index set for shared state fields. Requires atomic access.
   * @enum {number}
   */
  States = {
    /** @type {number} A shared index for reading from the queue. (consumer) */
    READ: 0,
    /** @type {number} A shared index for writing into the queue. (producer) */
    WRITE: 1,  
  }

  /**
   * FreeQueue constructor. A shared buffer created by this constuctor
   * will be shared between two threads.
   *
   * @param {number} size Frame buffer length.
   * @param {number} channelCount Total channel count.
   */
  constructor(size, channelCount) {
    this.states = new Uint32Array(
      new ArrayBuffer(
        Object.keys(this.States).length * Uint32Array.BYTES_PER_ELEMENT
      )
    );

    this.lastBuffer = undefined;

    /**
     * Use one extra bin to distinguish between the read and write indices 
     * when full. See Tim Blechmann's |boost::lockfree::spsc_queue|
     * implementation.
     */
    this.bufferLength = size + 1;
    this.channelCount = channelCount;
    this.channelData = [];


    for (let i = 0; i < channelCount; i++) {
      this.channelData.push(
        new Float64Array(
	   new ArrayBuffer(
            this.bufferLength * Float64Array.BYTES_PER_ELEMENT
	   )
        )
      );
    }
  }

  static fromObject(object)
  {
    Object.setPrototypeOf(object, FreeQueue.prototype);
    return object;
  }

  /**
   * Helper function for creating FreeQueue from pointers.
   * @param {FreeQueuePointers} queuePointers 
   * An object containing various pointers required to create FreeQueue
   *
   * interface FreeQueuePointers {
   *   memory: WebAssembly.Memory;   // Reference to WebAssembly Memory
   *   bufferLengthPointer: number;
   *   channelCountPointer: number;
   *   statePointer: number;
   *   channelDataPointer: number;
   * }
   * @returns FreeQueue
   */
  static fromPointers(queuePointers) {

    const queue = new FreeQueue(0, 0);

    const HEAPU32 = new Uint32Array(queuePointers.memory.buffer);
    const HEAPF64 = new Float64Array(queuePointers.memory.buffer);

    const bufferLength = HEAPU32[queuePointers.bufferLengthPointer / 4];
    const channelCount = HEAPU32[queuePointers.channelCountPointer / 4];
    
//    pointers.lockFuncPointer = lockFuncPtr;
//    pointers.unlockFuncPointer = unlockFuncPtr;
//    pointers.trylockFuncPointer = trylockFuncPtr;

    const states = HEAPU32.subarray(
        HEAPU32[queuePointers.statePointer / 4] / 4,
        HEAPU32[queuePointers.statePointer / 4] / 4 + 2
    );

    const channelData = [];
    for (let i = 0; i < channelCount; i++) {
      channelData.push(
          new Float64Array( queuePointers.memory.buffer, HEAPU32[HEAPU32[queuePointers.channelDataPointer / 4] / 4 + i], bufferLength )
      );
    }
    
    queue.bufferLength = bufferLength;
    queue.channelCount = channelCount;
    queue.states = states;
    queue.channelData = channelData;

/*
    queue.Lock = function () {
            let fn = queuePointers.module.cwrap('Lock', '', ['number']);
            fn(queuePointers.queue);
    }

    queue.Unlock = function () {
            let fn = queuePointers.module.cwrap('Unlock', '', ['number']);
            fn(queuePointers.queue);
    }

    queue.TryLock = function () {
            let fn = queuePointers.module.cwrap('TryLock', 'number', ['number']);
            return fn(queuePointers.queue);
    }
*/

    return queue;
  }

  /**
   * Pushes the data into queue. Used by producer.
   *
   * @param {Float64Array[]} input Its length must match with the channel
   *   count of this queue.
   * @param {number} blockLength Input block frame length. It must be identical
   *   throughout channels.
   * @return {boolean} False if the operation fails.
   */
  push(input, blockLength) {

    const currentRead = this.states[this.States.READ];
    const currentWrite = this.states[this.States.WRITE];
  
//    const currentRead = Atomics.load(this.states, this.States.READ);
//    const currentWrite = Atomics.load(this.states, this.States.WRITE);

  
    if (this._getAvailableWrite(currentRead, currentWrite) < blockLength) {
      return false;
    }
    let nextWrite = currentWrite + blockLength;
    if (this.bufferLength < nextWrite) {
      nextWrite -= this.bufferLength;
      for (let channel = 0; channel < this.channelCount; channel++) {
        const blockA = this.channelData[channel].subarray(currentWrite);
        const blockB = this.channelData[channel].subarray(0, nextWrite);
        blockA.set(input[channel].subarray(0, blockA.length));
        blockB.set(input[channel].subarray(blockA.length));
      }
    } else {
      for (let channel = 0; channel < this.channelCount; channel++) {
        this.channelData[channel]
            .subarray(currentWrite, nextWrite)
            .set(input[channel].subarray(0, blockLength));
      }
      if (nextWrite === this.bufferLength) nextWrite = 0;
    }

//    Atomics.store(this.states, this.States.WRITE, nextWrite);
    this.states[1] = nextWrite;

    return true;
  }

  /**
   * Pulls data out of the queue. Used by consumer.
   *
   * @param {Float64Array[]} output Its length must match with the channel
   *   count of this queue.
   * @param {number} blockLength output block length. It must be identical
   *   throughout channels.
   * @return {boolean} False if the operation fails.
   */
  pull(output, blockLength) {

//    const currentRead = Atomics.load(this.states, this.States.READ);
//    const currentWrite = Atomics.load(this.states, this.States.WRITE);

    const currentRead = this.states[this.States.READ];
    const currentWrite = this.states[this.States.WRITE];
	
    if (this._getAvailableRead(currentRead, currentWrite) < blockLength) {
      return false;
    }
    let nextRead = currentRead + blockLength;
    if (this.bufferLength < nextRead) {
      nextRead -= this.bufferLength;
      for (let channel = 0; channel < this.channelCount; channel++) {
        const blockA = this.channelData[channel].subarray(currentRead);
        const blockB = this.channelData[channel].subarray(0, nextRead);
        output[channel].set(blockA);
        output[channel].set(blockB, blockA.length);
      }
    } else {
      for (let channel = 0; channel < this.channelCount; ++channel) {
        output[channel].set(
            this.channelData[channel].subarray(currentRead, nextRead)
        );
      }
      if (nextRead === this.bufferLength) {
        nextRead = 0;
      }
    }

    this.lastBuffer = [];
    for ( let i = 0; i < this.channelCount; i++ ) {
        this.lastBuffer.push(
            new Float64Array( output[i] )
        );
    }

    this.states[this.States.READ] = nextRead;
    return true;
  }

  latest( blockLength )
  {
     let channels = this.channelCount;
     let _buffers = [ channels ];
     if ( this.lastBuffer == undefined ) {
	for ( let i = 0; i < channels; i++ ) {
               	_buffers[i] = new Float64Array( blockLength );
	}
	let rc = this.pull( _buffers, blockLength );
	if ( rc == false ) return undefined;
     }
     for ( let i = 0; i < channels; i++ ) {
     	_buffers[i] = new Float64Array( this.lastBuffer[i], blockLength );
     }     	
     return _buffers;
  }

  /**
   * Helper function for debugging.
   * Prints currently available read and write.
   */
  printAvailableReadAndWrite() {
    const currentRead = this.states[this.States.READ];
    const currentWrite = this.states[this.States.WRITE];
    console.log(this, {
        availableRead: this._getAvailableRead(currentRead, currentWrite),
        availableWrite: this._getAvailableWrite(currentRead, currentWrite),
    });
  }
  /**
   * 
   * @returns {number} number of samples available for read
   */
  getAvailableSamples() {
//    this.Lock();
    const currentRead = this.states[this.States.READ];
    const currentWrite = this.states[this.States.WRITE];
//    this.Unlock();
    return this._getAvailableRead(currentRead, currentWrite);
  }
  /**
   * 
   * @param {number} size 
   * @returns boolean. if frame of given size is available or not.
   */
  isFrameAvailable(size) {
    return this.getAvailableSamples() >= size;
  }

  /**
   * @return {number}
   */
  getChannelCount() {
    return this.channelCount;
  }

  /**
   * @return {number}
   */
  getBufferLength() {
    return this.bufferLength - 1;
  }

  _getAvailableWrite(readIndex, writeIndex) {
    if (writeIndex >= readIndex)
        return this.bufferLength - writeIndex + readIndex - 1;
    return readIndex - writeIndex - 1;
  }

  _getAvailableRead(readIndex, writeIndex) {
    if (writeIndex >= readIndex) return writeIndex - readIndex;
    return writeIndex + this.bufferLength - readIndex;
  }

  _reset() {
    for (let channel = 0; channel < this.channelCount; channel++) {
      this.channelData[channel].fill(0);
    }
//    this.Lock();
    this.states[this.States.READ] = 0;
    this.states[this.States.WRITE] = 0;
//    this.Unlock();
  }
}


>>>>>>> Stashed changes
// Byte per audio sample. (32 bit float)
const BYTES_PER_SAMPLE = Float32Array.BYTES_PER_ELEMENT;

// Basic byte unit of WASM heap. (16 bit = 2 bytes)
const BYTES_PER_UNIT = Uint16Array.BYTES_PER_ELEMENT;

// The max audio channel on Chrome is 32.
const MAX_CHANNEL_COUNT = 32;

// WebAudio's render quantum size.
const RENDER_QUANTUM_FRAMES = 128;


/**
 * A WASM HEAP wrapper for AudioBuffer class. This breaks down the AudioBuffer
 * into an Array of Float32Array for the convinient WASM opearion.
 *
 * @class
 * @dependency Module A WASM module generated by the emscripten glue code.
 */
class FreeQueue {
  /**
   * @constructor
   * @param  {object} wasmModule WASM module generated by Emscripten.
   * @param  {number} length Buffer frame length.
   * @param  {number} channelCount Number of channels.
   * @param  {number=} maxChannelCount Maximum number of channels.
   */
  constructor(wasmModule, length, channelCount, maxChannelCount) {
    // HeapAudioBuffer initialization
    // The |channelCount| must be greater than 0, and less than or equal to
    // the maximum channel count.
    this._isInitialized = false;
    this._module = wasmModule;
    this._length = length;
    this._maxChannelCount = maxChannelCount ?
        Math.min(maxChannelCount, MAX_CHANNEL_COUNT) : channelCount;
    this._channelCount = channelCount;
    this._allocateHeap();
    this._isInitialized = true;


    // RingBuffer initialization
    this._readIndex = 0;
    this._writeIndex = 0;
    this._framesAvailable = 0;
    this._channelDataLocal = [];
    for (let i = 0; i < this._channelCount; ++i) {
      this._channelDataLocal[i] = new Float32Array(length);
    }
  }

  /**
   * Allocates memory in the WASM heap and set up Float32Array views for the
   * channel data.
   *
   * @private
   */
  _allocateHeap() {
    const channelByteSize = this._length * BYTES_PER_SAMPLE;
    const dataByteSize = this._channelCount * channelByteSize;
    this._dataPtr = this._module._malloc(dataByteSize);
    this._channelData = [];
    for (let i = 0; i < this._channelCount; ++i) {
      const startByteOffset = this._dataPtr + i * channelByteSize;
      const endByteOffset = startByteOffset + channelByteSize;
      // Get the actual array index by dividing the byte offset by 2 bytes.
      this._channelData[i] =
          this._module.HEAPF32.subarray(
              startByteOffset >> BYTES_PER_UNIT,
              endByteOffset >> BYTES_PER_UNIT);
    }
  }

  /**
   * Adapt the current channel count to the new input buffer.
   *
   * @param  {number} newChannelCount The new channel count.
   */
  adaptChannel(newChannelCount) {
    if (newChannelCount < this._maxChannelCount) {
      this._channelCount = newChannelCount;
    }
  }

  /**
   * Getter for the buffer length in frames.
   *
   * @return {?number} Buffer length in frames.
   */
  get length() {
    return this._isInitialized ? this._length : null;
  }

  /**
   * Getter for the number of channels.
   *
   * @return {?number} Buffer length in frames.
   */
  get numberOfChannels() {
    return this._isInitialized ? this._channelCount : null;
  }

  /**
   * Getter for the maxixmum number of channels allowed for the instance.
   *
   * @return {?number} Buffer length in frames.
   */
  get maxChannelCount() {
    return this._isInitialized ? this._maxChannelCount : null;
  }

  /**
   * Returns a Float32Array object for a given channel index. If the channel
   * index is undefined, it returns the reference to the entire array of channel
   * data.
   *
   * @param  {number|undefined} channelIndex Channel index.
   * @return {?Array} a channel data array or an
   * array of channel data.
   */
  getChannelData(channelIndex) {
    if (channelIndex >= this._channelCount) {
      return null;
    }

    return typeof channelIndex === 'undefined' ?
        this._channelData : this._channelData[channelIndex];
  }

  /**
   * Returns the base address of the allocated memory space in the WASM heap.
   *
   * @return {number} WASM Heap address.
   */
  getHeapAddress() {
    return this._dataPtr;
  }

  /**
   * Returns the base address of the allocated memory space in the WASM heap.
   *
   * @return {number} WASM Heap address.
   */
  getPointer() {
    return this._dataPtr;
  }

  /**
   * Frees the allocated memory space in the WASM heap.
   */
  free() {
    this._isInitialized = false;
    this._module._free(this._dataPtr);
    this._module._free(this._pointerArrayPtr);
    this._channelData = null;
  }

  /**
   * Getter for Available frames in buffer.
   *
   * @return {number} Available frames in buffer.
   */
  get framesAvailable() {
    return this._framesAvailable;
  }

  /**
   * Push a sequence of Float32Arrays to buffer.
   *
   * @param  {array} arraySequence A sequence of Float32Arrays.
   */
  push(arraySequence) {
    // The channel count of arraySequence and the length of each channel must
    // match with this buffer obejct.

    if (arraySequence.length !== this._channelCount) {
      throw new Error(`Channel count mismatch: expected ${this._channelCount}, but got ${arraySequence.length}.`);
    }

    // Transfer data from the |arraySequence| storage to the internal buffer.
    const sourceLength = arraySequence[0].length;
    for (let i = 0; i < sourceLength; ++i) {
      for (let channel = 0; channel < this._channelCount; ++channel) {
        this._channelDataLocal[channel][this._writeIndex] = arraySequence[channel][i];
      }
      this._writeIndex = (this._writeIndex + 1) % this._length;
    }

    // For excessive frames, the buffer will be overwritten.
    this._framesAvailable += sourceLength;
    if (this._framesAvailable > this._length) {
      this._framesAvailable = this._length;
    }
  }

  /**
   * Pull data out of buffer and fill a given sequence of Float32Arrays.
   *
   * @param  {array} arraySequence An array of Float32Arrays.
   */
  pull(arraySequence) {
    // The channel count of arraySequence and the length of each channel must
    // match with this buffer obejct.

    if (arraySequence.length !== this._channelCount) {
      throw new Error(`Channel count mismatch: expected ${this._channelCount}, but got ${arraySequence.length}.`);
    }

    // If the FIFO is completely empty, do nothing.
    if (this._framesAvailable === 0) {
      return;
    }

    const destinationLength = arraySequence[0].length;

    // Transfer data from the internal buffer to the |arraySequence| storage.
    for (let i = 0; i < destinationLength; ++i) {
      for (let channel = 0; channel < this._channelCount; ++channel) {
        arraySequence[channel][i] = this._channelDataLocal[channel][this._readIndex];
      }
      this._readIndex = (this._readIndex + 1) % this._length;
    }

    this._framesAvailable -= destinationLength;
    if (this._framesAvailable < 0) {
      this._framesAvailable = 0;
    }
  }
} // class FreeQueue

export {
  MAX_CHANNEL_COUNT,
  RENDER_QUANTUM_FRAMES,
  FreeQueue
};