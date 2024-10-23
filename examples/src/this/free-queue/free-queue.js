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

/*
    this.lastBuffer = [];
    for ( let i = 0; i < this.channelCount; i++ ) {
        this.lastBuffer.push(
            new Float64Array( output[i] )
        );
    }
*/

    this.states[this.States.READ] = nextRead;
    return true;
  }

/*
  latest( blockLength )
  {
     let channels = this.channelCount;
     let _buffers = [ channels ];

     if ( this.lastBuffer != undefined ) {
         for ( let i = 0; i < channels; i++ ) 
             _buffers[i] = new Float64Array( this.lastBuffer[i], blockLength );
     } else {
         for ( let i = 0; i < channels; i++ )
             _buffers[i] = new Float64Array( blockLength );
     }

     return _buffers;
  }
*/

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

export { FreeQueue }
export default FreeQueue;
