import FreeQueue from "../../../../../this/free-queue/free-queue.js";

class WorkletBasicProcessor extends AudioWorkletProcessor {
    constructor(options) {
        super();
        this.initialized = false;
        this.port.onmessage = (event) => {
            this.ondata(event);
        };
    }

    ondata(event) {
        ///////////////////////////////////////////////////////////////////////////////////////
	// window, globalThis is undefined in this scope...

        let obj = Object.fromEntries(new Map(event.data));

        this.instance = FreeQueue.fromPointers(obj);
        this.initialized = true;
    }

    process(inputs, outputs, parameters) {
        if (this.initialized == false) return true;

        ////////////////////////////////////////////////////////////////////////////////////////
        // outputs count...
        ////////////////////////////////////////////////////////////////////////////////////////

        for (let i = 0; i < outputs.length; i++) {
            let bufferSize = 0;

            let channels = outputs[i].length;
            if (channels == 0) break;

            let dataArray = [channels];

            ////////////////////////////////////////////////////////////////////////////////////////
            // channels count...
            ////////////////////////////////////////////////////////////////////////////////////////

            for (let j = 0; j < channels; j++) {
            }

        }


        ////////////////////////////////////////////////////////////////////////////////////////
        // inputs count...
        ////////////////////////////////////////////////////////////////////////////////////////
        for (let i = 0; i < inputs.length; i++) {

            let bufferSize = 0;

            let channels = inputs[i].length;
            if (channels == 0) break;

            let dataArray = [channels];

            ////////////////////////////////////////////////////////////////////////////////////////
            // channels count...
            ////////////////////////////////////////////////////////////////////////////////////////
            for (let j = 0; j < channels; j++) {
                bufferSize = inputs[i][j].length;
                dataArray[j] = new Float64Array(bufferSize);
                for (let k = 0; k < bufferSize; k++) {
                    dataArray[j][k] = inputs[i][j][k];
                }
            }

            if (this.instance != undefined && this.instance != null) {
                const rc = this.instance.push(dataArray, bufferSize);
                if (rc == false) console.log("processor: queue.push [ " + ((rc == true) ? "true" : "false") + " ]");
                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            }

        }

        return true;

    }

}

registerProcessor("radio-processor", WorkletBasicProcessor);

