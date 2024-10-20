import {init, onload, v4 as uuidv} from './this/index.mjs';
import {dialogThis} from './this/index.mjs'

const servicePath = new URL('../', import.meta.url);

const store = {};
let config = {}
let task = []

const dialogInit = async function (value, type) {
    if (type !== 'terminate') {
        if (value) {
            const dialog = document.createElement('dialog')
            const content = document.createElement('div')
            const pathname = servicePath.pathname;
            content.className = 'content'
            dialog.appendChild(content)

            if (value.hasOwnProperty('dataset')) {
                for (let key in value.dataset) {
                    dialog.dataset[key] = value.dataset[key]
                }
            }

            const data = await dialogThis.template.get(value.type)[0].template(pathname, value);
            content.insertAdjacentHTML('afterbegin', data);

            dialogThis.config.inputs = dialog.querySelectorAll('.input_body');
            dialogThis.config.schema = dialog.querySelector('#schema');
            dialogThis.config.update = dialog.querySelector('.update');
            dialogThis.config.reset = dialog.querySelector('.reset');
            dialogThis.config.success = dialog.querySelector('.footer-button.success');
            dialogThis.config.save = dialog.querySelector('.save');
            dialogThis.config.next = dialog.querySelector('.next');
            dialogThis.config.close = dialog.querySelector('.close');
            dialogThis.config.cancel = dialog.querySelector('.cancel');
            dialogThis.config.remove = dialog.querySelector('.remove') || dialog.querySelector('.delete');

            dialogThis.config.inputs?.forEach(item => {
                item.addEventListener('input', dialogThis.actions.input);
            })

            dialogThis.actions.schema = dialogThis.actions.schema.bind(this)
            dialogThis.actions.input = dialogThis.actions.input.bind(this)
            dialogThis.actions.save = dialogThis.actions.save.bind(this)
            dialogThis.actions.update = dialogThis.actions.update.bind(this)
            dialogThis.actions.reset = dialogThis.actions.reset.bind(this)
            dialogThis.actions.next = dialogThis.actions.next.bind(this)
            dialogThis.actions.close = dialogThis.actions.close.bind(this)
            dialogThis.actions.success = dialogThis.actions.success.bind(this)
            dialogThis.actions.remove = dialogThis.actions.remove.bind(this)
            dialogThis.actions.close = dialogThis.actions.close.bind(this)

            dialogThis.config.schema?.addEventListener('input', dialogThis.actions.schema);
            dialogThis.config.save?.addEventListener('click', dialogThis.actions.save);
            dialogThis.config.update?.addEventListener('click', dialogThis.actions.update);
            dialogThis.config.reset?.addEventListener('click', dialogThis.actions.reset);
            dialogThis.config.next?.addEventListener('click', dialogThis.actions.next);
            dialogThis.config.cancel?.addEventListener('click', dialogThis.actions.close);
            dialogThis.config.success?.addEventListener('click', dialogThis.actions.success);
            dialogThis.config.remove?.addEventListener('click', dialogThis.actions.remove);
            dialogThis.config.close?.addEventListener('click', dialogThis.actions.close);

            document.body.appendChild(dialog)
            dialog.showModal();
        }
    } else {
        const dialog = document.querySelector('dialog')

        dialogThis.config.inputs.forEach(item => {
            item.removeEventListener('input', dialogThis.actions.input);
        })

        dialogThis.config.schema?.removeEventListener('input', dialogThis.actions.schema);
        dialogThis.config.save?.removeEventListener('click', dialogThis.actions.save);
        dialogThis.config.update?.removeEventListener('click', dialogThis.actions.update);
        dialogThis.config.reset?.removeEventListener('click', dialogThis.actions.reset);
        dialogThis.config.next?.removeEventListener('click', dialogThis.actions.next);
        dialogThis.config.cancel?.removeEventListener('click', dialogThis.actions.close);
        dialogThis.config.success?.removeEventListener('click', dialogThis.actions.success);
        dialogThis.config.remove?.removeEventListener('click', dialogThis.actions.remove);
        dialogThis.config.close?.removeEventListener('click', dialogThis.actions.close);

        dialogThis.config.inputs = undefined
        dialogThis.config.schema = undefined
        dialogThis.config.close = undefined;
        dialogThis.config.save = undefined;
        dialogThis.config.cancel = undefined;
        dialogThis.config.remove = undefined;
        dialogThis.config.reset = undefined;
        dialogThis.config.next = undefined;
        dialogThis.config.data = undefined;
        dialogThis.config.inputSchema = undefined;
        dialogThis.config.inputsBody = []
        dialogThis.config.update = undefined;
        dialogThis.config.success = undefined;

        dialog.close();
        dialog.remove()
    }
}

const BaseClass = class extends HTMLElement {
    static get observedAttributes() {
        return ["open", "disabled"];
    }

    _isOnload = false;

    dialog = {
        error: async function (url, value) {
            dialogInit.call(this, {
                type: 'error',
                title: 'Ошибка',
                description: [{
                    text: url
                }, {
                    text: value
                }],
                button: [{
                    type: 'reset',
                    description: 'Закрыть'
                }]
            })
        },
        open: async function (value) {
            if (typeof value === 'string') {
                dialogInit.call(this, {
                    type: 'success',
                    title: '',
                    description: [{
                        text: value
                    }],
                    button: [{
                        type: 'success',
                        description: 'Хорошо'
                    }]
                })
            } else {
                dialogInit.call(this, value)
            }
        },
        close: async function () {
            dialogInit.call(this, {}, 'terminate')
        }
    }

    get config() {
        return config;
    }

    set config(value) {
        for (let key in value) {
            config[key] = value[key];
        }
        return true;
    }

    get store() {
        return store;
    }

    execute = function () {
        return new Promise((resolve, reject) => {
            const call = []
            let count = 0
            for (let item of task) {
                const components = this.store[`${item.component}`]
                if (components) {
                    for (let component of components) {
                        if (component.id === item.id) {
                            const bindOnMessage = item.hasOwnProperty('execute') ? item.execute.bind(this) : this.onMessage.bind(this);
                            call.push({
                                execute: bindOnMessage,
                                self: component.self,
                                detail: item.detail
                            })

                            task.splice(count, 1);
                        }
                    }

                }
                count++
            }
            call.forEach(item => item.execute(item.self, item.detail))
            resolve(true)
        })
    };

    task = async function (value) {
        task.push(Object.assign(value, {
            tagName: this.tagName.toLowerCase(),
            // uuid: this.dataset.uuid,
            type: ('type' in value) ? value.type : 'self'
        }));

        await this.execute();
    }

    get task() {
        return task
    }

    component = function(value) {
        return new Promise(async (resolve,reject) => {
            task.push(Object.assign(value, {
                tagName: this.tagName.toLowerCase(),
                // uuid: this.dataset.uuid,
                type: ('type' in value) ? value.type : 'self',
                execute: function (self) {
                    resolve(self)
                }
            }));

            await this.execute();
        })
    }

    set disabled(val) {
        if (val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }
    get disabled() {
        return this.hasAttribute('disabled');
    }

    set open(val) {
        if (val) {
            this.setAttribute('open', '');
        } else {
            this.removeAttribute('open');
        }
    }

    get open() {
        return this.hasAttribute('open');
    }

    constructor() {
        super();
        this.dataset.servicesPath = servicePath.pathname;
        this.config = config;
        this.task = this.task.bind(this)
        this.component = this.component.bind(this)

        init(this).then(() => {
            this._isOnload = true;
        }).catch(error => console.warn('error', error));
    }

    connectedCallback() {
        if (this.dataset?.servicesPath) {
            onload(this)
                .then(async (self) => {
                    // self.dataset.uuid = uuidv();

                    if ('connected' in self) {
                        await self.connected()
                    }

                    if(this?.DOM) {
                        for(let key in this.DOM) {
                            if(typeof this.DOM[key] === 'function') {
                                this.DOM[key] = this.DOM[key].bind(this)
                            }
                        }
                    }

                    const name = self.tagName.toLowerCase();

                    if (!store.hasOwnProperty(name)) {
                        store[name] = []
                    }

                    store[name].push({
                        id: self.id,
                        // uuid: self.dataset.uuid,
                        self: self,
                        dataset: self.dataset
                    });

                    this.execute()
                })
                .catch(e => console.error('error', e));
        }
    }

    disconnectedCallback() {
        if ('disconnected' in this) {
            this.disconnected().then().catch(e => console.error(e))
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ('attributeChanged' in this && newValue) {
            this.attribute({
                name: name,
                oldValue: oldValue,
                newValue: newValue
            });
        }
    }

    adoptedCallback() {
        if ('adopted' in this) {
            this.adopted({
                name: name
            });
        }
    }
};

export const Component = (() => {
    return async () => {
        const body = `return ${BaseClass}`;
        const baseComponent = new Function('task', 'dialogInit', 'config', 'store', 'uuidv', 'servicePath', 'init', 'onload', body);
        return baseComponent(task, dialogInit, config, store, uuidv, servicePath, init, onload, body);
    };
})();
