import FreeQueue from "../free-queue/free-queue-sab.js";
import CONFIG from './global.mjs';

class WorkletBasicProcessor extends AudioWorkletProcessor {
	constructor(options) {
		super();
	}
	
	process(inputs, outputs, parameters) 
	{
		////////////////////////////////////////////////////////////////////////////////////////
		// outputs count...
		////////////////////////////////////////////////////////////////////////////////////////

		for ( let i = 0; i < outputs.length; i++ ) {
			let bufferSize = 0;

			let channels = outputs[i].length;
			if ( channels == 0 ) break;

			let dataArray = [ channels ];

			////////////////////////////////////////////////////////////////////////////////////////
			// channels count...
			////////////////////////////////////////////////////////////////////////////////////////

			for ( let j = 0; j < channels; j++ ) {  
			}
		}

		////////////////////////////////////////////////////////////////////////////////////////
		// inputs count...
		////////////////////////////////////////////////////////////////////////////////////////
		for ( let i = 0; i < inputs.length; i++ ) {

			let bufferSize = 0;

			let channels = inputs[i].length;
			if ( channels == 0 ) break;

			let dataArray = [ channels ];

			////////////////////////////////////////////////////////////////////////////////////////
			// channels count...
			////////////////////////////////////////////////////////////////////////////////////////

			for ( let j = 0; j < channels; j++ ) {  
				bufferSize = inputs[i][j].length;
				dataArray[ j ] = new Float64Array(bufferSize);
				for ( let k = 0; k < bufferSize; k++ ) {
					dataArray[j][k] = inputs[i][j][k];
				}
			}


			if ( CONFIG.queue.instance != undefined && CONFIG.queue.instance != null) {

				const rc = CONFIG.queue.instance.push( dataArray, bufferSize );
				//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
				if ( rc == true ) console.log( "processor: queue.push [ " + ( ( rc == true ) ? "true" : "false" ) + " ]" );
				//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			}

		}

		return true;
	}

}

registerProcessor("radio-processor", WorkletBasicProcessor);
