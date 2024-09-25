export const star = function () {

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
