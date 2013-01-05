define(['pc','mobile'], function (pc, mobile) {
	function init() {

		if(Modernizer.touch){
			mobile.init();
		}
		else{
			pc.init();
		}

    }
    return {
   	     init: init
    };
});