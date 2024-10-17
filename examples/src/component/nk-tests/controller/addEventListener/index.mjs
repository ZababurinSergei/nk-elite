// import { store, loader } from '../../../../this/index.mjs';
// import { swagger } from '/api/swagger-initializer.mjs'
// import { test } from '/services/tests/src/index.mjs'
// let tests = Symbol.for("tests");
// let api = Symbol.for("api");

export default async (actions) => {

    return {
        init: function() {
                this.DOM.buttons().forEach(item => {
                    item.addEventListener('click', actions.click)
                })
        },
        terminate: function() {
            this.DOM.buttons().forEach(item => {
                item.removeEventListener('click', actions.click)
            })
        }
    }
}