export const Actions = async function() {
    return  {
        refresh: async (event) => {
            this.task = {
                id: 'nk-p2p_0',
                component: 'nk-p2p',
                type: 'self',
                execute: async (self, detail) => {
                   const listPeer = await self.get.peers.call(self)

                    if (listPeer.length !== 0) {
                        let select = this.DOM.select.call(this, 'list-peers')

                        select.innerHTML = ''
                        select.insertAdjacentHTML('beforeend', `<option value="-1">Выберите пользователя</option>`)

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