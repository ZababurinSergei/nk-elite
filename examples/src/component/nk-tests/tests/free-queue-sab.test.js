import { chai } from '@newkind/tests'
import { FreeQueueSAB } from '@newkind/FreeQueueSAB';

const { expect, assert } = chai

describe('FreeQueueSAB', function () {
    const bufferLength = 1024;
    const channelCount = 2;
    let queue;

    beforeEach(() => {
        queue = new FreeQueueSAB(bufferLength, channelCount);
    });

    describe('Constructor', function () {
        it('should initialize states correctly', function () {
            expect(queue.states).to.be.an.instanceof(Uint32Array);
            expect(queue.states.length).to.equal(2);
        });

        it('should initialize buffer length correctly', function () {
            expect(queue.getBufferLength()).to.equal(bufferLength);
        });

        it('should initialize channel count correctly', function () {
            expect(queue.getChannelCount()).to.equal(channelCount);
        });

    });

    describe('Channel Adaption', () => {
        it('should initialize channel data correctly', function () {
            expect(queue.channelData).to.be.an('Array');
            expect(queue.channelData.length).to.equal(channelCount);
            queue.channelData.forEach(channel => {
                expect(channel).to.be.an.instanceof(Float64Array);
                expect(channel.length).to.equal(bufferLength + 1);
            });
        });

        it('should not adapt to an invalid channel count (e.g., negative or zero)', function () {
            const invalidChannelCounts = [-1, 0]; 
            invalidChannelCounts.forEach(invalidCount => {
                expect(() => queue.setChannelCount(invalidCount)).to.throw(Error);
                expect(queue.channelData.length).to.equal(channelCount); 
            });
        });
    })

    describe('push', function () {
        it('should push data into the queue', function () {
            const input = [new Float64Array([1, 2, 3]), new Float64Array([4, 5, 6])];
            const result = queue.push(input, 3);
            expect(result).to.be.true;
            expect(queue.getAvailableSamples()).to.equal(3);
        });

        it('should fail to push data when buffer is full', function () {
            const input = [new Float64Array(queue.getBufferLength()), new Float64Array(queue.getBufferLength())];

            let result = queue.push(input, queue.getBufferLength());
            expect(result, 'Push result when buffer is full').to.be.true;

            result = queue.push(input, queue.getBufferLength());
            expect(result, 'Push result when attempting to overfill buffer').to.be.false;
        });

        it('should handle maximum capacity', function () {
            const input = Array.from({ length: channelCount }, () => new Float64Array(bufferLength));
            for (let i = 0; i < bufferLength; i++) {
                queue.push(input, 1);
            }
            expect(queue.push(input, 1)).to.be.false; // Should be full now
        });
    });

    describe('pull', function () {
        it('should pull data from the queue', function () {
            const input = [new Float64Array([1, 2, 3]), new Float64Array([4, 5, 6])];
            queue.push(input, 3);
            const output = [new Float64Array(3), new Float64Array(3)];
            const result = queue.pull(output, 3);
            expect(result).to.be.true;
            expect(output[0]).to.deep.equal(input[0]);
            expect(output[1]).to.deep.equal(input[1]);
        });

        it('should fail to pull data when buffer is empty', function () {
            const output = [new Float64Array(bufferLength), new Float64Array(bufferLength)];
            const result = queue.pull(output, bufferLength);
            expect(result).to.be.false;
        });
    });

    describe('Utility Methods', function () {
        it('should correctly get available samples', function () {
            expect(queue.getAvailableSamples()).to.equal(0);
            const input = [new Float64Array([1, 2, 3]), new Float64Array([4, 5, 6])];
            queue.push(input, 3);
            expect(queue.getAvailableSamples()).to.equal(3);
        });

        it('should correctly check if frame is available', function () {
            expect(queue.isFrameAvailable(3)).to.be.false;
            const input = [new Float64Array([1, 2, 3]), new Float64Array([4, 5, 6])];
            queue.push(input, 3);
            expect(queue.isFrameAvailable(3)).to.be.true;
        });
    });

    describe('Error Handling', () => {
        it('should throw an error when push input length does not match channel count', function () {
            const bufferLength = 256;
            const channelCount = 2;
            const queue = new FreeQueueSAB(bufferLength, channelCount);
        
            const invalidInput = [new Float64Array(bufferLength)]; 
        
            expect(() => queue.push(invalidInput, bufferLength)).to.throw(Error);
        });
        
        it('should return false when pushing with insufficient available write space', function () {
            const bufferLength = 4; 
            const channelCount = 2;
            const queue = new FreeQueueSAB(bufferLength, channelCount);
        
            const input = [new Float64Array([1, 2, 3, 4]), new Float64Array([1, 2, 3, 4])];
            queue.push(input, 4); 
        
            const insufficientInput = [new Float64Array([5, 6, 7, 8]), new Float64Array([5, 6, 7, 8])];
            const result = queue.push(insufficientInput, 4);
        
            expect(result).to.be.false;
        });

        it('should return false when pulling with insufficient available read space', function () {
            const bufferLength = 4; 
            const channelCount = 2;
            const queue = new FreeQueueSAB(bufferLength, channelCount);
        
            const output = [new Float64Array(bufferLength), new Float64Array(bufferLength)];
            const result = queue.pull(output, 4); 
        
            expect(result).to.be.false;
        });        
    })

    describe('Performance Tests', function () {
        it('should handle large data efficiently', function () {
            const input = [new Float64Array(bufferLength), new Float64Array(bufferLength)];
            const output = [new Float64Array(bufferLength), new Float64Array(bufferLength)];
            for (let i = 0; i < 100000; i++) {
                queue.push(input, bufferLength);
                queue.pull(output, bufferLength);
            }
        });

        it('should handle small data efficiently', function () {
            const input = [new Float64Array(1), new Float64Array(1)];
            const output = [new Float64Array(1), new Float64Array(1)];
            for (let i = 0; i < 1000000; i++) {
                queue.push(input, 1);
                queue.pull(output, 1);
            }
        });
    });
});



let tests = Symbol.for("tests");
let swagger = Symbol.for("swagger");
/**
 * Chai import in window['@newkind/tests']
 * console.log('assert',window['@newkind/tests'].assert)
 * console.log('events',window['@newkind/tests'].events)
 * console.log('expect',window['@newkind/tests'].expect)
 * console.log('should',window['@newkind/tests'].should)
 * console.log('events',window['@newkind/tests'].isEmpty)
 */

// console.log('assert',window[tests].assert)
// console.log('expect',window[tests].expect)
// console.log('should',window[tests].should)
// console.log('events',window[tests].isEmpty)

describe('Остров', async function () {
    this.timeout(10000);
    before(async function () { });
    describe('У лукоморья дуб зелёный;', async function () {
        it('Посадить дерево', function () {
            return new Promise(async (resolve, reject) => {
                console.log('---- swagger ----', window[swagger])
                resolve(true)
            })
        })
        it('подожать 20-30 лет', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
    })
    describe('Златая цепь на дубе том:', async function () {
        it('Купить прибор для анализа драгоценных металлов', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('Снять пробу', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
    })
    describe('И днём и ночью кот учёный', async function () {
        it('Взять кота', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('Взять учебник математики', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('Применить учкбник к коту', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
    })
    describe('Всё ходит по цепи кругом;', async function () {
        it('Последить один день', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('Последить ещё один день', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
        it('Поставить перед котом препятствие', function () {
            return new Promise(async (resolve, reject) => {
                resolve(true)
            })
        })
    })
})