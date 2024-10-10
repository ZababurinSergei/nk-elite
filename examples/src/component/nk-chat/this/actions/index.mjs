export const Actions = async function () {
    return {
        refresh: async (event) => {
            const nkP2p = await this.component({
                id: 'nk-p2p_0',
                component: 'nk-p2p',
            })

            const listPeer = await nkP2p.get.peers()

            if (listPeer.length !== 0) {
                let select = this.DOM.select('list-peers')

                select.innerHTML = ''
                select.insertAdjacentHTML('beforeend', `<option value="">Выберите пользователя</option>`)

                for (const item of listPeer) {
                    select.insertAdjacentHTML('beforeend', `<option value="${item}">${item}</option>`)
                }
            }
        }
    }
}