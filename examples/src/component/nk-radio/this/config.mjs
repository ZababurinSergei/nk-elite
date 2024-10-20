
export let CONFIG = {
                audio: {
                    ctx: undefined,
                    node: undefined,
                    init: false
                },
                html: {
                    scope: {
                        canvas: false,
                        context: false
                    },
                    button: {
                        start: false,
                        radios: {
                            this: false,
                            length: false
                        }
                    }
                },
                player: {
                    isPlaying: false
                },
                stream: {
                    song: undefined,
                    source: undefined,
                    path: undefined,
                },
                web: {
                    crossOrigin: 'anonymous'
                },
                queue: {
                    api: {
                        lock: undefined,
                        trylock: undefined,
                        unlock: undefined,
                    },
                    instance: undefined,
                    pointer: undefined,
                    object: undefined
                },
                application: {
                    instance: undefined,
                    channels: 2,
                    goniometer: "goniometer-off",
                    holdChart: "holdchart-off",
                    inputType: "default", // "audio"; // "osc"
                    renderType: "stereo",
                    kdX: 500,
                    kdY: 10,
                    zoomX: 100,
                    zoomY: 100,
                    holdBuffer: undefined,
                    renderBuffer: undefined,
                    sampleRate: 44100,
                    volumeRate: 1.0,
                    nameOfFile: "",
                    frameOffset: 0
                }
            };

export default CONFIG;
