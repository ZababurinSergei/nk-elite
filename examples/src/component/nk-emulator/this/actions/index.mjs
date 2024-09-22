import { getConstants } from '@newkind/constants'

const { FRAME_SIZE } = getConstants('emulator')
export const Actions = async (self) => {

    return {
        processor: {
            run: (event) => {
                let count  = 0
               const timerId = setInterval(() => {
                    try {
                        if(count > 10) {
                            count = 1
                        }

                        const input = [[new Float64Array(FRAME_SIZE), new Float64Array(FRAME_SIZE)]];
                        input.forEach((item, i) => {
                            item.forEach((data, j) => {
                                data.forEach((value, k) => {
                                    input[i][j][k] = count
                                })
                            })
                        })

                        const output = [[new Float64Array(FRAME_SIZE), new Float64Array(FRAME_SIZE)]];

                        console.log('00 START PROCESS', {
                            inputQueue: self.inputQueue.channelData[0],
                            outputQueue: self.outputQueue.channelData[0]
                        })

                        self.DOM.queue()

                        self.processor.process(input, output)
                    } catch (e) {
                        self.dialog.error(import.meta.url, e.toString())
                        clearInterval(timerId)
                    }

                   count++
                }, 500)
            }
        }
    }
};
export default {
    description: 'action'
};