export const actions = function (self) {
    return new Promise(async (resolve, reject) => {
        resolve({
            click: function (event) {
                if(event.currentTarget.classList.contains('sab')) {
                    self.DOM.tests().innerHTML = ''
                    self.run('./tests/free-queue-sab.test.js')
                }

                if(event.currentTarget.classList.contains('wasm')) {
                    console.log('self.DOM.tests()', self.DOM.tests())
                    self.DOM.tests().innerHTML = ''
                    self.run('./tests/free-queue-sab.test.js')
                }
            }
        })
    })
}

export default {
    description: 'action'
}