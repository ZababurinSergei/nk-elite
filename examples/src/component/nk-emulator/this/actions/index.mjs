import { getConstants } from '@newkind/constants'

const { FRAME_SIZE } = getConstants('emulator')
export const Actions = async (self) => {

    return {
        processor: {
            run: (event) => {
               const timerId = setInterval(() => {
                    try {
                        let input = [[new Float64Array(FRAME_SIZE), new Float64Array(FRAME_SIZE)]];
                        const output = [[new Float64Array(FRAME_SIZE), new Float64Array(FRAME_SIZE)]];

                        self.processor.process(input, output)
                    } catch (e) {
                        self.dialog.error(import.meta.url, e.toString())
                        clearInterval(timerId)
                    }
                }, 1000)
            }
        }
    }
};
export default {
    description: 'action'
};