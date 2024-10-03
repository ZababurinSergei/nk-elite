export const Actions = async function() {
    return  {
        refresh: async (event) => {
            this.task = {
                id: 'nk-p2p_0',
                component: 'nk-p2p',
                type: 'self',
                execute: async (self, detail) => {
                   const listPeer = await self.get.peers()

                    if (listPeer.length !== 0) {
                        let select = this.DOM.select('list-peers')

                        select.innerHTML = ''
                        select.insertAdjacentHTML('beforeend', `<option value="">Выберите пользователя</option>`)

                        for (const item of listPeer) {
                            select.insertAdjacentHTML('beforeend', `<option value="${item}">${item}</option>`)
                        }
                    }
                },
                detail: {
                    callback: function () {

                    },
                    test: 'test'
                }
            }
        }
    }
}