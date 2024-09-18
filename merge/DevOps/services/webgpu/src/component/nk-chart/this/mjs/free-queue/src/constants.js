// export const KERNEL_LENGTH = 20;
// export const RENDER_QUANTUM = 128;
// export const FRAME_SIZE = KERNEL_LENGTH * RENDER_QUANTUM;
// export const QUEUE_SIZE = 4096;
export const KERNEL_LENGTH = 2;
export const RENDER_QUANTUM = 16;
export const FRAME_SIZE = KERNEL_LENGTH * RENDER_QUANTUM;
export const QUEUE_SIZE = 64;
// WebGPU parallelization parameter
export const WORKGROUP_SIZE = 4;
