import { chai } from '@newkind/tests'
import { postMessage } from './modules/main-worker.mjs'
describe('Elite', async function () {
    this.timeout(10000);
    before(async function () {

    });

    describe('Подключение модуля', async function () {
        it('Импортируем wasm файл', function () {
            return new Promise(async (resolve, reject) => {
                reject(true)
            })
        })
    })
    describe('Подключение сети', async function () {
        it('Подключение памяти', function () {
            return new Promise(async (resolve, reject) => {
                reject(true)
            })
        })
    })
    describe('Стрим ланные', async function () {
        it('От пира А к Б', function () {
            return new Promise(async (resolve, reject) => {
                reject(true)
            })
        })
        it('От пира Б к А', function () {
            return new Promise(async (resolve, reject) => {
                reject(true)
            })
        })
    })
})