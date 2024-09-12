import { template, actions } from './dialog/index.mjs'
import SwaggerClient from  './swagger/swagger-js/es/index.mjs'

export const dialogThis = {
    template: template,
    actions: actions,
    config: {
        inputs: undefined,
        close: undefined,
        save: undefined,
        cancel: undefined,
        remove: undefined,
        reset: undefined,
        next: undefined,
        data: undefined,
        inputSchema: undefined,
        inputsBody: [],
        update: undefined,
        success: undefined,
    }
}
export { onload } from './onLoad/index.mjs'
export { init } from './init/index.mjs'
export { store } from './store/index.mjs'
export {v4, version, parse, stringify} from './uuid/this/index.js'
export { gitConfig } from './config/index.mjs'
export { apiInit } from './swagger/ui-initializer.mjs'
export { SwaggerClient }