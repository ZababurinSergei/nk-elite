export const Actions = async (self) => {

    return {
        processor: {
            run: (event) => {
               const timerId = setInterval(() => {
                    try {
                        const input = [new Float64Array([21, 31]), new Float64Array([21, 31])];
                        const output = [new Float64Array([21, 31]), new Float64Array([21, 31])];
                        self.processor.process(input, output)
                    } catch (e) {
                        self.dialog.error(e.toString())
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