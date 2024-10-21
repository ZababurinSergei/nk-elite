export const actions = function (self) {
    return new Promise(async (resolve, reject) => {
        resolve({
            click: function (event) {
                self.reset()

                if(event.currentTarget.classList.contains('sab')) {
                    self.run('./tests/free-queue-sab.test.js')
                }

                if(event.currentTarget.classList.contains('wasm')) {
                    self.run('./tests/free-queue.test.js')
                }

                if(event.currentTarget.classList.contains('elite')) {
                    self.run('./tests/elite.test.js')
                }
            }
        })
    })
}

export default {
    description: 'action'
}