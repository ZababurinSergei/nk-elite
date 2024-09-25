import { init } from './init.js'

export const app = function () {
 init.call(this)
}
// require.config({
//     baseUrl: './component/nk-solar-system/this/modules/solar-system/app',
//     paths: {
//         twig: 'vendor/twig.js/twig',
//         backbone: 'vendor/backbone/backbone',
//         underscore: 'vendor/underscore/underscore'
//     },
//     shim: {
//         underscore: {
//             exports: '_'
//         },
//         backbone: {
//             exports: 'Backbone',
//             deps: ['underscore']
//         },
//         stats: {
//             exports: 'Stats'
//         },
//         twig: {
//             exports: 'Twig'
//         },
//         init: {
//             deps: [
//                 'Extensions/Date',
//                 'Extensions/HSV',
//                 'Modules/Error/InvalidArgumentException',
//                 'Modules/Error/MissingArgumentException'
//             ]
//         }
//     },
//     urlArgs: 'bust=' + new Date().getTime()
// });
//
// // Initialize app
// require(['init']);
