export { loader } from './loader/index.mjs'
export { render, navigate } from './navigate/index.mjs'

export const Iframe = async function() {
    let isFramed = false;

    try {
        isFramed = window != window.top || document != top.document || self.location != top.location;
    } catch (e) {
        isFramed = true;
    }

    return {
        isFramed: isFramed
    }
}


export default {
    description: "Глобавльные библиотеки"
}