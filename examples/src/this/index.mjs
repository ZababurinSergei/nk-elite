import router from './router/index.mjs'
import stats from './stats/index.mjs'
import { initComponent } from '../component/index.mjs'
import { Fonts } from './fonts/index.mjs';
export const init = async function (options = []) {
    await Fonts('Raleway', 'Raleway-Regular.ttf');
    await Fonts('Raleway-ExtraBold', 'Raleway-ExtraBold.ttf');
    await Fonts('Segoe UI Light', 'segoeuil.ttf');
    await stats()
    await router()
    await initComponent(options.components)

    return true
}
export default {
    description: "Модули для проекта"
}