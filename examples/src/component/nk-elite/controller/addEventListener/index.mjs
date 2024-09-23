export default async (self, actions) => {

    self.DOM.elite('run')
    return {
        init: () => {
            self.DOM.elite('run').addEventListener('click', actions.run)
        },
        terminate: () => {
            self.DOM.elite('run').removeEventListener('click', actions.run)
        }
    }
}