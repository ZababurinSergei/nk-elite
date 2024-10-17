export const actions = function (self) {
    return new Promise(async (resolve, reject) => {
        resolve({
            click: function (event) {
                if(event.currentTarget.classList.contains('sab')) {
                    self.run('./this/tests/free-queue-sab.test.js')
                }

                if(event.currentTarget.classList.contains('wasm')) {
                    self.run('./this/tests/free-queue-sab.test.js')
                }
            }
        })
    })
}

export default {
    description: 'action'
}