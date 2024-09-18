export const nkP2p = function(self, data) {
    return new Promise((resolve, reject) => {
        // debugger

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
        this.stream(self.stream)
        resolve(true)
    })
}