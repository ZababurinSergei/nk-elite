export const actions = async (self) => {

    const FRAME_SIZE = 42
    let timerId = undefined

    return {
        run: (event) => {
            if (self.DOM.elite('run').disabled) {
                return
            }

            if(self.DOM.elite('run').dataset.type === 'run') {
                self.DOM.elite('run').dataset.type = 'stop'
                self.DOM.elite('run').textContent = 'STOP ELITE PROCESSOR'

                let count = 0

                timerId = setInterval(() => {
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

                        // console.log('00 START PROCESS', {
                        //     inputQueue: self.inputQueue.channelData[0],
                        //     outputQueue: self.outputQueue.channelData[0]
                        // })
                        //
                        self.DOM.queue()

                        console.log('======= PROCESSOR =======', input[0])
                        // debugger
                        self.processor.process(input[0], output[0])
                    } catch (e) {
                        self.dialog.error(import.meta.url, e.toString())
                        clearInterval(timerId)
                    }

                    count++
                }, 100)
                console.log('#####################################')
            } else {
                clearInterval(timerId)
                self.DOM.elite('run').dataset.type = 'run'
                self.DOM.elite('run').textContent = 'RUN ELITE PROCESSOR'
            }
        }
    }
}

export default {
    description: "actions for newkind-osc"
}