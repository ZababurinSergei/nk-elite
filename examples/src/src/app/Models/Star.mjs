import {celestialObjectInit} from './CelestialObject.mjs'

export const star = function () {

  const CelestialObject = celestialObjectInit.call(this)

  class Star extends CelestialObject {
    constructor(data) {
      super(data.diameter, data.mass, data.gravity, data.density);

      this._brightness = 1;
    }
  }
}

// define(
// [
//   'Models/CelestialObject'
// ],
// function(CelestialObject) {
//
// });
