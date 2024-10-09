import {Component} from '../index.mjs';
import { lottieWeb } from 'lottie-web';

// import {Actions} from "../nk-menu/this/index.mjs";
// import {lpStream} from 'it-length-prefixed-stream'
// import {multiaddr} from "@multiformats/multiaddr";
// import {proto, protoAudio} from '@newkind/constants'

const name = 'nk-audio';
const component = await Component();

let cutoff = 100;

// Returns a low-pass transform function for use with TransformStream.
function lowPassFilter() {
    const format = 'f32-planar';
    let lastValuePerChannel = undefined;
    return (data, controller) => {
        const rc = 1.0 / (cutoff * 2 * Math.PI);
        const dt = 1.0 / data.sampleRate;
        const alpha = dt / (rc + dt);
        const nChannels = data.numberOfChannels;
        if (!lastValuePerChannel) {
            console.log(`Audio stream has ${nChannels} channels.`);
            lastValuePerChannel = Array(nChannels).fill(0);
        }
        const buffer = new Float32Array(data.numberOfFrames * nChannels);
        for (let c = 0; c < nChannels; c++) {
            const offset = data.numberOfFrames * c;
            const samples = buffer.subarray(offset, offset + data.numberOfFrames);
            data.copyTo(samples, {planeIndex: c, format});
            let lastValue = lastValuePerChannel[c];

            // Apply low-pass filter to samples.
            for (let i = 0; i < samples.length; ++i) {
                lastValue = lastValue + alpha * (samples[i] - lastValue);
                samples[i] = lastValue;
            }

            lastValuePerChannel[c] = lastValue;
        }
        controller.enqueue(new AudioData({
            format,
            sampleRate: data.sampleRate,
            numberOfFrames: data.numberOfFrames,
            numberOfChannels: nChannels,
            timestamp: data.timestamp,
            data: buffer
        }));
    };
}

Object.defineProperties(component.prototype, {
    DOM: {
        value: {},
        writable: true
    },
    processedStream: {
        value: null,
        writable: true
    },
    worker: {
        value: null,
        writable: true
    },
    processor: {
        value: null,
        writable: true
    },
    generator: {
        value: null,
        writable: true
    },
    stream: {
        value: null,
        writable: true
    },
    constraints: {
        value: function() {
            return {
                audio: true,
                video: false
            }
        },
        writable: true
    },
    connected: {
        value: async function (property) {
            this.DOM = {
                audio: function () {
                    return this.shadowRoot.querySelector('audio');
                }
            }

            for(let key in this.DOM) {
                this.DOM[key] = this.DOM[key].bind(this)
            }

            const shadow = this.shadowRoot;
            const audioPlayerContainer = shadow.getElementById('audio-player-container');
            const playIconContainer = shadow.getElementById('play-icon');
            const seekSlider = shadow.getElementById('seek-slider');
            const volumeSlider = shadow.getElementById('volume-slider');
            const muteIconContainer = shadow.getElementById('mute-icon');
            const audio = shadow.querySelector('audio');
            const durationContainer = shadow.getElementById('duration');
            const currentTimeContainer = shadow.getElementById('current-time');
            const outputContainer = shadow.getElementById('volume-output');
            let playState = 'play';
            let muteState = 'unmute';
            let raf = null;

            audio.src = this.getAttribute('data-src');

            const playAnimation = lottieWeb.loadAnimation({
                container: playIconContainer,
                path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json',
                renderer: 'svg',
                loop: false,
                autoplay: false,
                name: "Play Animation",
            });

            const muteAnimation = lottieWeb.loadAnimation({
                container: muteIconContainer,
                path: 'https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json',
                renderer: 'svg',
                loop: false,
                autoplay: false,
                name: "Mute Animation",
            });

            playAnimation.goToAndStop(14, true);

            const whilePlaying = () => {
                seekSlider.value = Math.floor(audio.currentTime);
                currentTimeContainer.textContent = calculateTime(seekSlider.value);
                audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
                raf = requestAnimationFrame(whilePlaying);
            }

            const showRangeProgress = (rangeInput) => {
                if(rangeInput === seekSlider) audioPlayerContainer.style.setProperty('--seek-before-width', rangeInput.value / rangeInput.max * 100 + '%');
                else audioPlayerContainer.style.setProperty('--volume-before-width', rangeInput.value / rangeInput.max * 100 + '%');
            }

            const calculateTime = (secs) => {
                const minutes = Math.floor(secs / 60);
                const seconds = Math.floor(secs % 60);
                const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
                return `${minutes}:${returnedSeconds}`;
            }

            const displayDuration = () => {
                durationContainer.textContent = calculateTime(audio.duration);
            }

            const setSliderMax = () => {
                seekSlider.max = Math.floor(audio.duration);
            }

            const displayBufferedAmount = () => {
                if(audio.buffered.length > 0) {
                    const bufferedAmount = Math.floor(audio.buffered.end(audio.buffered.length - 1));
                    audioPlayerContainer.style.setProperty('--buffered-width', `${(bufferedAmount / seekSlider.max) * 100}%`);
                }
            }

            if (audio.readyState > 0) {
                displayDuration();
                setSliderMax();
                displayBufferedAmount();
            } else {
                audio.addEventListener('loadedmetadata', () => {
                    displayDuration();
                    setSliderMax();
                    displayBufferedAmount();
                });
            }

            playIconContainer.addEventListener('click', async () => {
                if(playState === 'play') {

                    let abortController = null
                    this.stream = audio.captureStream();

                    console.log('this.id: ', this.id)

                    if(this.id === 'nk-audio_0') {
                        this.task = {
                            id: 'nk-chat_0',
                            component: 'nk-chat',
                            type: 'self',
                            execute: (self) => {
                                self.stream = this.stream
                            }
                        }
                    }

                    const audioTracks = this.stream.getAudioTracks();

                    this.stream.oninactive = () => {
                        console.log('Stream ended');
                    };

                    this.processor = new MediaStreamTrackProcessor(audioTracks[0]);

                    console.log('----- this.processor -----', this.processor)
                    this.generator = new MediaStreamTrackGenerator('audio');
                    const source = this.processor.readable;
                    const sink = this.generator.writable;
                    // const transformer = new TransformStream({transform: lowPassFilter()});
                    abortController = new AbortController();
                    const signal = abortController.signal;
                    const promise = source.pipeTo(sink);
                    promise.catch((e) => {
                        if (signal.aborted) {
                            console.log('Shutting down streams after abort.');
                        } else {
                            console.error('Error from stream transform:', e);
                        }
                        source.cancel(e);
                        sink.abort(e);
                    })

                    await audio.play();
                    playAnimation.playSegments([14, 27], true);
                    requestAnimationFrame(whilePlaying);
                    playState = 'pause';
                } else {
                    audio.pause();
                    playAnimation.playSegments([0, 14], true);
                    cancelAnimationFrame(raf);
                    playState = 'play';
                }
            });

            muteIconContainer.addEventListener('click', () => {
                if(muteState === 'unmute') {
                    muteAnimation.playSegments([0, 15], true);
                    audio.muted = true;
                    muteState = 'mute';
                } else {
                    muteAnimation.playSegments([15, 25], true);
                    audio.muted = false;
                    muteState = 'unmute';
                }
            });

            audio.addEventListener('progress', displayBufferedAmount);

            seekSlider.addEventListener('input', (e) => {
                showRangeProgress(e.target);
                currentTimeContainer.textContent = calculateTime(seekSlider.value);
                if(!audio.paused) {
                    cancelAnimationFrame(raf);
                }
            });

            seekSlider.addEventListener('change', () => {
                audio.currentTime = seekSlider.value;
                if(!audio.paused) {
                    requestAnimationFrame(whilePlaying);
                }
            });

            volumeSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                showRangeProgress(e.target);
                outputContainer.textContent = value;
                audio.volume = value / 100;
            });

            if('mediaSession' in navigator) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: 'Komorebi',
                    artist: 'Anitek',
                    album: 'MainStay',
                    artwork: [
                        { src: './component/nk-audio/img.png', sizes: '96x96', type: 'image/png' },
                        { src: './component/nk-audio/img.png', sizes: '128x128', type: 'image/png' },
                        { src: './component/nk-audio/img.png', sizes: '192x192', type: 'image/png' },
                        { src: './component/nk-audio/img.png', sizes: '256x256', type: 'image/png' },
                        { src: './component/nk-audio/img.png', sizes: '384x384', type: 'image/png' },
                        { src: './component/nk-audio/img.png', sizes: '512x512', type: 'image/png' }
                    ]
                });

                navigator.mediaSession.setActionHandler('play', () => {
                    if(playState === 'play') {
                        audio.play();
                        playAnimation.playSegments([14, 27], true);
                        requestAnimationFrame(whilePlaying);
                        playState = 'pause';
                    } else {
                        audio.pause();
                        playAnimation.playSegments([0, 14], true);
                        cancelAnimationFrame(raf);
                        playState = 'play';
                    }
                });

                navigator.mediaSession.setActionHandler('pause', () => {
                    if(playState === 'play') {
                        audio.play();
                        playAnimation.playSegments([14, 27], true);
                        requestAnimationFrame(whilePlaying);
                        playState = 'pause';
                    } else {
                        audio.pause();
                        playAnimation.playSegments([0, 14], true);
                        cancelAnimationFrame(raf);
                        playState = 'play';
                    }
                });

                navigator.mediaSession.setActionHandler('seekbackward', (details) => {
                    audio.currentTime = audio.currentTime - (details.seekOffset || 10);
                });

                navigator.mediaSession.setActionHandler('seekforward', (details) => {
                    audio.currentTime = audio.currentTime + (details.seekOffset || 10);
                });

                navigator.mediaSession.setActionHandler('seekto', (details) => {
                    if (details.fastSeek && 'fastSeek' in audio) {
                        audio.fastSeek(details.seekTime);
                        return;
                    }
                    audio.currentTime = details.seekTime;
                });

                navigator.mediaSession.setActionHandler('stop', () => {
                    audio.currentTime = 0;
                    seekSlider.value = 0;
                    audioPlayerContainer.style.setProperty('--seek-before-width', '0%');
                    currentTimeContainer.textContent = '0:00';
                    if(playState === 'pause') {
                        playAnimation.playSegments([0, 14], true);
                        cancelAnimationFrame(raf);
                        playState = 'play';
                    }
                });
            }

            return true;
        },
        writable: true
    },
    disconnected: {
        value: async function () {
            return true
        },
        writable: false
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e);
}

export default {};




