import { Component } from '../index.mjs';
import { wControl } from './this/index.mjs'

const name = 'nk-radio';
const component = await Component();

Object.defineProperties(component.prototype, {
    stream: {
        value: async function(stream) {
            console.log('--------------', stream)
        },
        writable: true
    },
    connected: {
        value: async function(property) {
            this.broadcastChannel = {
                await: ['nk-p2p']
            }

            const instanceRadio = new (await wControl())(this);

            this.task = {
                id: 'nk-p2p_0',
                type: 'self',
                component: 'nk-p2p',
                detail: {test: 'test'}
            }

            console.log('=== instanceRadio ===', instanceRadio)
            return true;
        },
        writable: true
    },
    disconnected: async function() {
        return true
    },
    onMessage: {
        value: async function(self, detail) {
            // this.dialog.open({
            //     type: 'update_s',
            //     title: 'title',
            //     mapping: ['code', 'name', 'cancel', 'save'],
            //     detail: {
            //         itemId: 'dataset.id'
            //     },
            //     input: [{
            //         type: 'text:mss',
            //         id: 'code',
            //         title: 'Код',
            //         placeholder: 'Введите код',
            //         isReadonly: false,
            //         notification: "Введите код",
            //         field: "code",
            //         value: 'текст 2',
            //         error: {
            //             class: "errorMessage code",
            //             description: 'Заполните обязательное поле'
            //         },
            //     }, {
            //         type: 'text:mss',
            //         id: 'name',
            //         title: 'Наименование',
            //         placeholder: 'Введите наименование',
            //         isReadonly: false,
            //         notification: "Введите наименование",
            //         field: "name",
            //         value: 'текст',
            //         error: {
            //             class: "errorMessage name",
            //             description: 'Заполните обязательное поле'
            //         },
            //     }],
            //     button: [{
            //         id: 'after',
            //         type: 'cancel',
            //         description: 'Отмена'
            //     }, {
            //         id: 'after',
            //         type: 'update',
            //         description: 'Хорошо'
            //     }]
            // })
            console.log('--------------', {
                this: this,
                self: self,
                detail: detail
            })
        },
        writable: false
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e);
}

export default {};

