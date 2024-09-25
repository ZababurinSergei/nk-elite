import { Detector } from './Detector.mjs'
import { TemplateLoader } from './TemplateLoader.mjs'
import {systemFactory} from '../Factory/SolarSystemFactory.mjs'
export const Loader = async function () {
  const SolarSystemFactory = await systemFactory.call(this)

  const detector = Detector.call(this)

  let seenJsFeaturesModal = false;

  if (window.localStorage) {
    seenJsFeaturesModal = localStorage.getItem('seenJsFeaturesModal');
  }

  if (!seenJsFeaturesModal) {
    console.log('DIALOG НАДО ВСТАВИТЬ !!!!')
    // var browserAlert = new Foundation.Reveal($('#browser-compatibility-modal'));
    // browserAlert.open();

    // $('#browser-compatibility-got-it').on('click', ()=> {
    //   if (window.localStorage) {
    //     localStorage.setItem('seenJsFeaturesModal', 'true');
    //   }
    // });
  }

  if (!detector.webgl) {
    detector.addGetWebGLMessage();
    // notifyGa('Compatibility Check', 'Fail', window.navigator.userAgent);
    return;
  }

  let solarSystemData = null;
  let templateLoader = new TemplateLoader();
  let response = await fetch('./component/nk-solar-system/this/modules/solar-system/data/solarsystem.json');
  let dataRequest
  if (response.ok) {
    dataRequest = response.json();
  }

  // var dataRequest = new HttpRequest(
  //     'GET',
  //     './component/nk-solar-system/this/modules/solar-system/data/solarsystem.json',
  //     true
  // );

  dataRequest.then((data)=> {
    solarSystemData = data;
    var updateUserInterfaceEvent = new CustomEvent('solarsystem.update.ui', { detail: data });
    var solarSystemFactory = new SolarSystemFactory(solarSystemData);
    var introScreen = this.shadowRoot.querySelector('.intro-screen');
    var renderButton = this.shadowRoot.querySelector('#render-scene');
    var solarsystem = this.shadowRoot.querySelector('#solar-system');
    var progressPrompt = this.shadowRoot.querySelector('#loading-prompt');
    var progressBar = this.shadowRoot.querySelector('#progress-bar');

    // solarsystem.fadeOut();

    // console.log('dddddddddddddddd', this)
    // debugger
    //TODO слайдер уходит вверх
    // $('.inner').slideUp(500, ()=> {
      progressPrompt.classList.add('active');

      solarSystemFactory.build(solarSystemData).then(()=> {
        // introScreen.fadeOut(2000, ()=> {
        //   introScreen.remove();
        //   solarsystem.fadeIn(2000, ()=> {
            var seenModal = false;

            if (window.localStorage) {
              seenModal = localStorage.getItem('seenModal');
            }

            if (!seenModal) {
              $('#tutorial').foundation('open');

              $('#tutorial-got-it').on('click', ()=> {
                if (window.localStorage) {
                  localStorage.setItem('seenModal', 'true');
                }
              });
            }
          // });
        // });
      });
    // })

    renderButton.addEventListener('click', () => {
      $('.inner').slideUp(500, ()=> {
        progressPrompt.addClass('active');

        solarSystemFactory.build(solarSystemData).then(()=> {
          introScreen.fadeOut(2000, ()=> {
            introScreen.remove();
            solarsystem.fadeIn(2000, ()=> {
              var seenModal = false;

              if (window.localStorage) {
                seenModal = localStorage.getItem('seenModal');
              }

              if (!seenModal) {
                $('#tutorial').foundation('open');

                $('#tutorial-got-it').on('click', ()=> {
                  if (window.localStorage) {
                    localStorage.setItem('seenModal', 'true');
                  }
                });
              }
            });
          });
        });
      });
    }, { once: true })
  });
}
// define(
// [
//   'vendor/httprequest/httprequest',
//   'Modules/Detector',
//   'Modules/TemplateLoader',
//   'Factory/SolarSystemFactory',
//   'vendor/ajaxrequest/dist/ajaxrequest'
// ],
// function(
//   HttpRequest,
//   Detector,
//   TemplateLoader,
//   SolarSystemFactory,
//   AjaxRequest
// ) {
  'use strict';

// });
