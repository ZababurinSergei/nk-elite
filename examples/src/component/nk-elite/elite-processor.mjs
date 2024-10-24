import { FreeQueue } from "../../../../../this/queue.mjs";

export class EliteProcessor
{
	constructor(options) {
		this.instance = FreeQueue.fromObject(options.processorOptions.instance);
		this.pointer = options.processorOptions.pointer;
	}

	process(inputs, outputs, parameters)
	{
		// debugger
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
				dataArray[j] = new Float64Array(bufferSize);
				for ( let k = 0; k < bufferSize; k++ ) {
					dataArray[j][k] = inputs[i][j][k];
				}
			}

			if ( this.instance != undefined && this.instance != null) {
				console.log('========= PUSH ==============', bufferSize)
				const r = this.instance.push( dataArray, bufferSize );
//				console.log( "processor: queue.push [ " + ( ( r == true ) ? "true" : "false" ) + " ]" );
			}

		}

		return true;
	}
}
