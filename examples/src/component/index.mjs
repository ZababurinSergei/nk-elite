import { Component } from './base-nk/index.mjs';

export { Component }
export const initComponent = async function (componentNames = []){
    try {
        componentNames.forEach(componentName => { import(`./${componentName}/index.mjs`) })
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

export default {
    description: "Компоненты"
}