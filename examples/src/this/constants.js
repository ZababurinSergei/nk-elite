// peer ids of known bootstrap nodes
export const bootstrapPeers = [
  'QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
  'QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
  'QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
  'QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt',
  'QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
  'QmZa1sAxajnQjVM8WjWXoMbmPd7NsWhfKsPkErzpm9wGkp',
]

export const protoAudio = "/audio/0.1";
export const proto = "/text/0.1";
export const PUBSUB_PEER_DISCOVERY = 'discovery'

const RENDER_QUANTUM = 128;
// The size multiplier for the batch processing frame size (in worker).
const KERNEL_LENGTH = 8;
// The actual batch processing frame size used in Worker.
const FRAME_SIZE = KERNEL_LENGTH * RENDER_QUANTUM;
// export const FRAME_SIZE = KERNEL_LENGTH * RENDER_QUANTUM;
// The maximum size of two SharedArrayBuffers between Worker and
// AudioWorkletProcessor.
const QUEUE_SIZE = 2048;
// WebGPU parallelization parameter
const WORKGROUP_SIZE = 4;

export const getConstants = (type) => {
  let constants = {}
  switch (type) {
    case 'emulator':
      constants = {
        RENDER_QUANTUM: 16,
        KERNEL_LENGTH: 2,
        QUEUE_SIZE: 64,
        WORKGROUP_SIZE: 4
      };

      constants.FRAME_SIZE = constants.KERNEL_LENGTH * constants.RENDER_QUANTUM

      return constants;
    case 'radio':
    default:
      return {
        RENDER_QUANTUM: RENDER_QUANTUM,
        KERNEL_LENGTH: KERNEL_LENGTH,
        FRAME_SIZE: FRAME_SIZE,
        QUEUE_SIZE: QUEUE_SIZE,
        WORKGROUP_SIZE: WORKGROUP_SIZE
      };
  }
};
