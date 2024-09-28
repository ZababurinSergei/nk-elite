export const factoryListener = function () {

    document.addEventListener('solarsystem.build.start', logStart);
    document.addEventListener('solarsystem.build.end', logEnd);
    document.addEventListener('solarsystem.build.object.complete', logObjectComplete);

    function logStart() {
        console.log('ssssssssssssssssssssssss LOG START ssssssssssssssssssssssss')
    }

    function logEnd(event) {
        console.log('ssssssssssssssssssssssss LOG END ssssssssssssssssssssssss')
        // console.log('Build took', event.detail);
    }

    function logObjectComplete(event) {
        // var object =  event.detail;
        // console.debug('Done building ', event.detail);
        // console.debug('Build took', detail.elapsedTime);
    }
}