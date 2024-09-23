import {getConstants} from '@newkind/constants'

const {FRAME_SIZE} = getConstants('emulator')
export const Actions = async (self) => {

    return {
        processor: {
            run: (event) => {
                if (self.DOM.processor('button-run').disabled) {
                    return
                }

                const buttonRun = self.DOM.processor('button-run')
                buttonRun.disabled = true


                let count = 0

                const timerId = setInterval(() => {
                    try {
                        if (count > 10) {
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
                }, 10)


                buttonRun.dataset.type = buttonRun.dataset.type === 'run'
                    ? (buttonRun.dataset.type = 'stop', buttonRun.textContent = 'stop')
                    : (buttonRun.dataset.type = 'run', buttonRun.textContent = 'run')

                const timerRunId = setTimeout(() => {
                    clearTimeout(timerRunId)
                    self.DOM.processor('button-run').disabled = false
                }, 3000)
            }
        }
    }
};
export default {
    description: 'action'
};