import {randomColor} from 'randomcolor'

export class RandomColorGenerator {
    constructor() {
    }

    getRandomHexColor() {
        return '#' + (Math.random().toString(16) + '000000').slice(2, 8);
    }

    getRandomColor(options) {
        return randomColor.randomColor(options);
    }
}