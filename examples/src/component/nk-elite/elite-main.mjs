import {initFreeQueue, FreeQueue} from "../../../../../this/queue.mjs"
import { logger } from '@libp2p/logger'
const log = logger('LElite')
export const freeQueueInit = function(self, CONFIG)  {

    self.LFreeQueue = {
        setStatus: function (e) {
            if (e !== "") {
                log(e)
            }
        }
    };

    self.LFreeQueue.onRuntimeInitialized = async function()
    {
        ///////////////////////////////////////////////////////////////////////////////////////
        // FreeQueue initialization
        ///////////////////////////////////////////////////////////////////////////////////////
        self.LFreeQueue.callMain("");

        const GetFreeQueueThreads = self.LFreeQueue.cwrap('GetFreeQueueThreads', 'number', ['']);
        const GetFreeQueuePointers = self.LFreeQueue.cwrap('GetFreeQueuePointers', 'number', ['number', 'string']);
        const PrintQueueInfo = self.LFreeQueue.cwrap('PrintQueueInfo', '', ['number']);
        const CreateFreeQueue = self.LFreeQueue.cwrap('CreateFreeQueue', 'number', ['number', 'number']);
        const PrintQueueAddresses = self.LFreeQueue.cwrap('PrintQueueAddresses', '', ['number']);

        CONFIG.queue.pointer = GetFreeQueueThreads();
        const bufferLengthPtr = GetFreeQueuePointers(CONFIG.queue.pointer, "buffer_length");
        const channelCountPtr = GetFreeQueuePointers(CONFIG.queue.pointer, "channel_count");
        const statePtr = GetFreeQueuePointers(CONFIG.queue.pointer, "state");
        const channelDataPtr = GetFreeQueuePointers(CONFIG.queue.pointer, "channel_data");

        const pointers = new Object();
        pointers.memory = self.LFreeQueue.HEAPU8;
        pointers.bufferLengthPointer = bufferLengthPtr;
        pointers.channelCountPointer = channelCountPtr;
        pointers.statePointer = statePtr;
        pointers.channelDataPointer = channelDataPtr;

        CONFIG.queue.instance = FreeQueue.fromPointers(pointers);
        if (CONFIG.queue.instance != undefined) CONFIG.queue.instance.printAvailableReadAndWrite();
    }

    initFreeQueue(self.LFreeQueue).then( async (module) => {
        self.LFreeQueue.setStatus("initWasmFreeQueue completed...");

        self.LFreeQueue.Store = async function( _key, _value ) {
            let _convert = "";

            if ( typeof _value === "string" ) _convert = _value;
            else if ( typeof _value === "number" ) _convert = _value.toString();
            else if ( typeof _value === "boolean" ) _convert = (_value == true ) ? "true" : "false";

            await self.LFreeQueue.ccall( "Store", "", [ "string", "string" ], [ _key, _convert ], { async: true } );
        }

        self.LFreeQueue.Load = async function( _key ) {
            return await self.LFreeQueue.ccall( "Load", "string", [ "string" ], [ _key ], { async: true } );
        }
    });

}