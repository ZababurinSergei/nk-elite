import { Scene } from '../Modules/Scene.mjs'
import { RandomColorGenerator } from '../Modules/RandomColorGenerator.mjs'
import { renderControllerInit } from '../Controllers/RenderController.mjs'
import { sunInit } from '../Models/Sun.mjs'
import {planetInit} from '../Models/Planet.mjs'
import {orbitControllerInit} from '../Controllers/OrbitController.mjs'
import { moonInit } from '../Models/Moon.mjs'
import * as THREE from 'three'
import { constantsInit } from '../Environment/Constants.mjs'
export const systemFactory = async function () {
  let self = this
  const Sun = sunInit.call(this)
  const Moon = moonInit.call(this)
  const Planet = planetInit.call(this)
  const OrbitController = orbitControllerInit.call(this)
  const RenderController = renderControllerInit.bind(this)
  const Constants = constantsInit.call(this)
  /**
   * SolarSystemFactory
   *
   * @param {Object} data
   */
  function SolarSystemFactory(data) {
    this.scene = new Scene(self);
    this.data = data || {};
    this.parent = data.parent || null;
    this.planets = data.planets || [];

    this.solarSystemObjects = {
      sun: null,
      planets: [],
      moons: []
    };

    this._randomColorGenerator = new RandomColorGenerator();
  }

  /**
   * Builds all objects in the scene.
   *
   * @param  {Object}  data
   * @return {Promise}
   */
  SolarSystemFactory.prototype.build = function(data) {
    return new Promise((resolve)=> {
      let startTime = new Date().getTime();
      let startEvent = new CustomEvent('solarsystem.build.start', {
        detail: {
          timestamp: startTime
        }
      });

      let sun = this.buildSun(data.parent);
      this.solarSystemObjects.sun = sun;
      this.scene.add(sun.threeObject);

      let map = {
        '1': {
          buildGroup: this.buildPlanets.bind(this, data.planets, sun),
          timeout: 500
        }
        ,
        '2': {
          buildGroup: this.buildAsteroidBelt.bind(this, data),
          timeout: 500
        }
        ,
        '3': {
          buildGroup: this.buildKuiperBelt.bind(this, data),
          timeout: 300
        }
        ,
        '4': {
          buildGroup: this.buildStars.bind(this),
          timeout: 300
        }
      };

      let buildGroupsCount = Object.keys(map).length;
      let i = 0;

      function run() {
        i++;

        let groupStartTime = new Date().getTime();

        if (map.hasOwnProperty(i)) {
          setTimeout(()=> {
            map[i].buildGroup.call().then((response)=> {
              let groupEndTime = new Date().getTime();
              let elapsedTime = (groupEndTime - groupStartTime) * 0.001;
              let percentage = (i / 4) * 100;

              this.updateProgress(percentage);

              groupStartTime = groupEndTime;

              run.call(this);
            });
          }, 1000);

        } else {
          this.renderScene(startTime);
          resolve();
        }
      }

      run.call(this);
    });
  };

  SolarSystemFactory.prototype.renderScene = function(startTime) {
    debugger
    let renderController = new RenderController(this.scene);
    let focalpoint = this.scene;

    focalpoint.add(this.scene.camera);
    this.scene.camera.up.set(0, 0, 1);
    this.scene.camera.position.set(
        60000,
        0,
        15000
    );

    let focalPointChangeEvent = new CustomEvent('solarsystem.focalpoint.change', {
      detail: {
        object: focalpoint
      }
    });

    this.scene.camera.lookAt(new THREE.Vector3());
    document.dispatchEvent(focalPointChangeEvent);

    this.initializeUserInterface();

    let endTime = new Date().getTime();
    let endEvent = new CustomEvent('solarsystem.build.end', {
      detail: {
        elapsedTime: (endTime - startTime) * 0.001
      }
    });

    document.dispatchEvent(endEvent);
  };

  /**
   * Right now this basically just renders the prototype of the ISS. I'd like to get this to
   * work with man-made satellites and model those as well.
   */
  SolarSystemFactory.prototype.buildMechanicalSatellites = function(planet, satellitesData) {

    // console.debug('Build Mech Satellite', planet, satellitesData);

    if (!(satellitesData instanceof Array)) {
      throw new Error('Argument satellitesData must be an instanceof Array.');
    }

    let mesh = new THREE.Mesh(
            new THREE.SphereGeometry(
                0.002,
                16,
                16
            ),
            new THREE.MeshPhongMaterial()
        )
    ;

    let threeRadius = planet.threeDiameter / 2;
    let threeDistanceFromParent = threeRadius + 400 * Constants.universeScale;

    for (let i = 0; i < satellitesData.length; i++) {
      planet.threeObject.add(mesh);

      mesh.position.x = threeDistanceFromParent;
    }
  };

  SolarSystemFactory.prototype.buildMoons = function(planetData, planet) {
    for (let i = 0; i < planetData.satellites.length; i++) {
      let orbitColor = this._randomColorGenerator.getRandomColor({
        luminosity: 'light',
        format: 'hex',
        hue: 'blue'
      });

      let moon = new Moon(planetData.satellites[i], planet, planetData, orbitColor);
      let orbitCtrlMoon = new OrbitController(moon, false);

      this.solarSystemObjects.moons.push(moon);

      planet._moons.push(moon);
      // planet.threeObject.add(moon.orbitCentroid);
      // planet.objectCentroid.add(moon.orbitCentroid);

      planet.core.add(moon.orbitCentroid);

      let buildEvent = new CustomEvent('solarsystem.build.object.complete', {
        detail: {
          object: moon
        }
      });

      document.dispatchEvent(buildEvent);
    }
  };

  SolarSystemFactory.prototype.buildPlanet = function(data, sun) {
    return new Promise((resolve)=> {
      let startTime = new Date().getTime();
      let planet = new Planet(data, sun);
      let orbitCtrl = new OrbitController(planet);

      this.scene.add(planet.orbitCentroid); // all 3d objects are attached to the orbit centroid

      if (data.satellites.length) {
        this.buildMoons(data, planet);
      }

      if (data.satellites_mech && data.satellites_mech.length) {
        this.buildMechanicalSatellites(planet, data.satellites_mech);
      }

      this.solarSystemObjects.planets.push(planet);

      let endTime = new Date().getTime();

      resolve({
        planet: planet,
        elapsedTime: (endTime - startTime) * 0.001
      });
    });
  };

  SolarSystemFactory.prototype.buildPlanets = function(planets, sun) {
    return new Promise((resolve)=> {
      let startTime = new Date().getTime();
      let promises = [];
      let endCount = planets.length - 1;
      let i;

      for (i = 0; i < planets.length; i++) {
        let startTime = new Date().getTime();

        promises.push(this.buildPlanet(planets[i], sun).then((response)=> {
          let buildEvent = new CustomEvent('solarsystem.build.object.complete', {
            detail: {
              object: response.planet
            }
          });

          document.dispatchEvent(buildEvent);

          this.solarSystemObjects.planets.push(response.planet);
        }));
      }

      Promise.all(promises).then(()=> {
        let endTime = new Date().getTime();

        resolve({
          group: 'planets',
          elapsedTime: (endTime - startTime) * 0.001
        });
      });
    });
  };

  SolarSystemFactory.prototype.buildSun = function(parentData) {
    let sun = new Sun(parentData);

    this.solarSystemObjects.sun = sun;

    let buildEvent = new CustomEvent('solarsystem.build.object.complete', {
      detail: {
        object: sun
      }
    });

    document.dispatchEvent(buildEvent);

    return sun;
  };

  SolarSystemFactory.prototype.buildAsteroidBelt = function(data) {
    let startTime = new Date().getTime();
    let asteroidBeltFactory = new AsteroidBeltFactory(this.scene, data);

    return new Promise((resolve)=> {
      asteroidBeltFactory.build();

      let endTime = new Date().getTime();

      resolve({
        group: 'asteroids',
        elapsedTime: (endTime - startTime) * 0.001
      });
    });
  };

  SolarSystemFactory.prototype.buildKuiperBelt = function(data) {
    let startTime = new Date().getTime();
    let kuiperBeltFactory = new KuiperBeltFactory(this.scene, data);

    return new Promise((resolve)=> {
      kuiperBeltFactory.build();

      let endTime = new Date().getTime();

      resolve({
        group: 'asteroids',
        elapsedTime: (endTime - startTime) * 0.001
      });
    });
  };

  SolarSystemFactory.prototype.buildStars = function() {
    let startTime = new Date().getTime();
    let starFactory = new StarFactory(this.scene);

    return new Promise((resolve)=> {
      starFactory.buildStarField().then(()=> {
        let endTime = new Date().getTime();

        resolve({
          group: 'stars',
          elapsedTime: (endTime - startTime) * 0.001
        });
      });
    });
  };

  SolarSystemFactory.prototype.initializeUserInterface = function(currentTarget) {
    let menuController = new MenuController({
      el: '#menu',
      scene: this.scene,
      data: this.data,
      sceneObjects: this.solarSystemObjects,
      currentTarget: currentTarget
    });

    let effectsController = new EffectsController({
      el: '#toggle-effects',
      sceneObjects: this.solarSystemObjects.planets
    });

    $('#social-buttons-corner').addClass('visible');
  };

  SolarSystemFactory.prototype.updateProgress = function(percentage, elapsedTime) {
    let meter = $('.progress-meter');

    meter.css({
      'transitionDuration': elapsedTime +'ms'
    });

    meter.width(percentage+ '%');
  };

  return SolarSystemFactory;
}