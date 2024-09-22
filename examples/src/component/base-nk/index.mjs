import {init, onload, v4 as uuidv} from './this/index.mjs';
import {onMessage} from './onMessage.mjs';
import {dialogThis} from './this/index.mjs'

const servicePath = new URL('../', import.meta.url);

const store = {};
let eventMessages = {};
let config = {}

const dialogInit = async function (value, type) {
    if(type !== 'terminate') {
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
            // content.innerHTML = '';
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
    controller = {};
    _isBroadcastChannel = false
    component = (name = 'undefined', uuid = undefined) => (uuid !== undefined ? store[name][uuid] : store[name]);

    _broadcastChannel = [{
        self: new BroadcastChannel('broadcast'),
        value: undefined,
        await: undefined
    }];

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

    broadcastPublish = function () {
        this.external;
    }

    messageerror = function (event) {
        console.log('ddddddddddddddddddddddddddddd BROADCAST messageerror ddddddddddddddddddddddddddddd', event);
    }

    set broadcastChannel(value) {
        if (!this._isBroadcastChannel) {
            this._broadcastChannel[0].value = value;
            if (value.hasOwnProperty('await')) {
                this._broadcastChannel[0].await = value.await;
            }

            if ('broadcastChannel' in this._broadcastChannel[0].value && 'messageerror' in this._broadcastChannel[0].value) {
                this._broadcastChannel[0].self.addEventListener('message', this._broadcastChannel[0].value.broadcastChannel);
                this._broadcastChannel[0].self.addEventListener('messageerror', this._broadcastChannel[0].value.messageerror);
            } else {
                this._broadcastChannel[0].self.addEventListener('message', this.broadcastPublish);
                this._broadcastChannel[0].self.addEventListener('messageerror', this.messageerror);
            }

            this._isBroadcastChannel = true
        }
    }

    get broadcastChannel() {
        return this._broadcastChannel[0].value;
    }

    get external() {
        if (this._broadcastChannel[0].await) {
            let componentState = {};
            let errors = [];
            for (let component of this._broadcastChannel[0].await) {
                if (store[component]) {
                    if (!componentState.hasOwnProperty(component)) {
                        componentState[component] = [];
                    }
                    componentState[component] = store[component];
                } else {
                    errors.push({
                        error: 'компонент не найден',
                        component: component
                    });
                }
            }

            const isError = errors.length !== 0;

            if (!isError) {
                for (let i = 0; i < this._broadcastChannel[0].await.length; ++i) {
                    if (this[this._broadcastChannel[0].await[i]] === null) {
                        const component = this._broadcastChannel[0].await[i];
                        this[this._broadcastChannel[0].await[i]] = componentState[component][0].self;
                    }
                }
            }

            return true;
        } else {
            return {
                status: true,
                value: undefined,
                description: `для компонента нет подключаемых компонентов. Если это требуется добавьте их в массив await
                       self.broadcastChannel = {
                          await: ['nk-opfs'],
                          broadcastChannel: actions.broadcastChannel,
                          messageerror: actions.messageerror
                       }`
            };
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

    execute = async function () {
        const call = []
        this._task = this._task.filter(item => {
            const isTagName = item.tagName === this.tagName.toLowerCase()
            const components = this.store[`${item.component}`]
            const isComponent = !!components
            let component = null
            let isId = true
            if (!item.id) {
                isId = false
                alert(`В запросе надо указать id что бы пониматьв каком компоненте делать изменения. Компонент ${item.component} из ${item.tagName} uuid: ${item.uuid}`)
                return true
            }

            if (isComponent) {
                component = (components.filter(data => item.id === data.id))[0]
            }

            if (isTagName && isId && isComponent) {
                switch (item.type) {
                    case 'self':
                        if (component) {
                            const bindOnMessage = item.hasOwnProperty('execute') ? item.execute.bind(this) : this.onMessage.bind(this);

                            call.push({
                                execute: bindOnMessage,
                                self: component.self,
                                detail: item.detail
                            })
                            // component.observedAttributes = ["open", "disabled"];
                            // bindOnMessage(component.self, item.detail);
                            return false;
                        }
                        return true;
                        break;
                    case 'main':
                        alert('Не надо использовать main, Используйте self что бы определить обработчик внутри вызываемого компонента')
                        if (component) {
                            component.self.onMessage(item);
                            return false
                        }
                        return true;
                        break;
                    case 'worker':
                        if (this[`_${item.component}`]) {
                            if (item.hasOwnProperty('callback')) {
                                delete item.callback;
                            }
                            //TODO Надо вынести из цикла фильтра
                            if (this[`_${item.component}`]._worker !== null) {
                                this[`_${item.component}`]._worker.postMessage(item);
                                return false;
                            }

                            if (this[`_${item.component}`]._worker === undefined) {
                                console.error('Не должно быть undefined');
                                return false;
                            }
                        }

                        return true;
                        break;
                    default:
                        break;
                }
            }

            return true;
        });

        call.forEach(item => item.execute(item.self, item.detail))
    };
    _task = [];
    set task(value) {
        this._task.push(Object.assign(value, {
            tagName: this.tagName.toLowerCase(),
            uuid: this.dataset.uuid
        }));

        this.execute().catch(e => console.error(e));
    }

    get task() {
        return {
            task: this._task,
        };
    }

    get help() {
        return {
            task: {
                id: this.tagName.toLowerCase(),
                uuid: this.dataset.uuid,
                component: this._broadcastChannel[0].await,
                type: ['self', 'main', 'worker'],
                action: 'default',
                value: '',
                message: {
                    id: '',
                    type: '',
                    phase: ''
                }
            }
        };
    }

    constructor() {
        super();
        this.dataset.servicesPath = servicePath.pathname;
        this.config = config;

        init(this).then(() => {
            this._isOnload = true;
        }).catch(error => console.warn('error', error));
    }

    connectedCallback() {
        if (this.dataset?.servicesPath) {
            onload(this)
                .then(async (self) => {
                    self.dataset.uuid = uuidv();
                    if ('connected' in self) {
                        await self.connected()
                    }

                    const name = self.tagName.toLowerCase();
                    if (!store.hasOwnProperty(name)) {
                        store[name] = []
                    }

                    store[name].push({
                        id: self.id,
                        uuid: self.dataset.uuid,
                        self: self,
                        dataset: self.dataset
                    });

                    this._broadcastChannel[0].self.postMessage({
                        isBroadcastChannel: this._isBroadcastChannel,
                        name: this.tagName
                    });

                    if (this._isBroadcastChannel) {
                        this.external
                    }
                })
                .catch(e => console.error('error', e));
        }
    }

    disconnectedCallback() {
        if ('disconnected' in this) {
            this.disconnected().then().catch(e => console.error(e))
        }

        if (this._broadcastChannel[0].value) {
            this._broadcastChannel[0].self.removeEventListener('message', this._broadcastChannel[0].value.broadcastChannel);
            this._broadcastChannel[0].self.removeEventListener('messageerror', this._broadcastChannel[0].value.messageerror);
        }

        this._broadcastChannel.self.close();
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
        const baseComponent = new Function('dialogInit', 'config', 'onMessage', 'eventMessages', 'store', 'uuidv', 'servicePath', 'init', 'onload', body);
        return baseComponent(dialogInit, config, onMessage, eventMessages, store, uuidv, servicePath, init, onload, body);
    };
})();
