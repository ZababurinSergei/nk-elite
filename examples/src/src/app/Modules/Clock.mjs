import * as THREE from 'three'

export class Clock extends THREE.Clock {
    constructor(autoStart) {
        super(autoStart);
    }
}