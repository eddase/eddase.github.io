var Reverb = function(context, parameters) {

	this.context = context;
	this.input = context.createGain();
	this.reverbLine = context.createConvolver();

	// create nodes
	
	this.wetGain = context.createGain(); 
	this.dryGain = context.createGain();
	




	// connect 
	this.input.connect(this.reverbLine);

	this.reverbLine.connect(this.wetGain);

	this.input.connect(this.dryGain);

	this.dryGain.connect(this.context.destination);
	this.wetGain.connect(this.context.destination);
	
	
	this.wetGain.gain.value = parameters.reverbWetDry;
	this.dryGain.gain.value = (1-parameters.reverbWetDry);

	

	this.parameters = parameters;
}


Reverb.prototype.updateParams = function (params, value) {

	switch (params) {
				
		case 'reverb_dry_wet':
			this.parameters.reverbWetDry = value;
			this.wetGain.gain.value = value;
			this.dryGain.gain.value = 1 - value;
			break;		
	}
}
function loadData(re){
		var request = new XMLHttpRequest();
	  	request.open('GET', "minster1.wav", true);
	  	request.responseType = 'arraybuffer';
	  	request.onload = function() {
	    console.log(" has been loaded.")
	    context.decodeAudioData(request.response, function(buffer) {
	    	myAudioBuffer = buffer;
	    	console.log(" has been decoded.")
	    	re.buffer=buffer;
	    		    
	    });
	  }
	  request.send();
	}
