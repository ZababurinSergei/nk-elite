import * as THREE from 'three'
import {stats} from '../Environment/Stats.mjs'
import {tweenInit} from 'tween-js'

// import {Tween as TWEEN, Easing} from 'https://unpkg.com/@tweenjs/tween.js@23.1.3/dist/tween.esm.js'

export const renderControllerInit = function () {
  const self = this
  const Stats = stats.call(this)
  const TWEEN = tweenInit.call(this)
  var tweening = false;

  document.addEventListener('travelStart', (e)=> {
    tweening = true;
  }, false);

  document.addEventListener('travelComplete', (e)=> {
    tweening = false;
  }, false);

  function getElapsedTimeSec(start, end) {
    return (end - start) * 0.001;
  }

  function roundHundred(value) {
    return Math.round(value / 100) * 100;
  }

  function RenderController(scene) {
    console.log('========== RenderController ===========')
    this._renderEngine = new THREE.WebGLRenderer();
    console.log('  this._renderEngine ',   this._renderEngine )
    // debugger
    this._scene = scene;
    this._camera = scene.camera;

    this.setFrame();

    var frameEvent = new CustomEvent('frame');

    let self = this
    function render() {
      // Moniter javascript performance
      Stats.begin();

      requestAnimationFrame(render);
      TWEEN.update();
      document.dispatchEvent(frameEvent);
      self._renderEngine.render(self._scene, self._camera);

      Stats.end();
    }

    render();
  }

  RenderController.prototype.setFrame = function() {
    var framecontainer = self.shadowRoot.querySelector('#solar-system');

    this._renderEngine.setSize(window.innerWidth, window.innerHeight);

    console.log('ddddddddddddd RENDER CANVAS dddddddddddddddd', this._renderEngine.domElement)

    if (framecontainer) {
      framecontainer.appendChild(this._renderEngine.domElement);
    } else {
      document.body.appendChild(this._renderEngine.domElement);
    }
  };

  return RenderController;
}

