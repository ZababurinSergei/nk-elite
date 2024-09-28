import * as THREE from 'three'
export class TextureLoader {
    get(src) {
        return new THREE.ImageUtils.loadTexture(src);
    }
}