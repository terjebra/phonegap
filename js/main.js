require.config({
    paths: {
        "jquery": "jquery-1.7.2",
        "jquery-ui": "jquery-ui-1.9.2.custom",
        "knockout": "knockout-2.1.0",
        "handlebars": "handlebars-1.0.rc.1",
        "jquery-mobile" : "jquery.mobile-1.2.0",
        "hammer" : "hammer",        
    },
    shim: {
        'jquery-ui': {
            deps: ['jquery'],
        },

        'jquery-mobile': {
            deps: ['jquery'],
        },

        'bootstrap': {
            deps: ['jquery']
        }
    }
});


require(['pc','mobile'], function (pc, mobile) {
    var isTouchDevice = !!('ontouchstart' in window)  || !!('onmsgesturechange' in window); 
    var specificMobileDevices = navigator.userAgent.indexOf('IEMobile') != -1 ||  navigator.userAgent.indexOf('IEMobile') !=-1;
	
    if (isTouchDevice ||  specificMobileDevices ) {
	mobile.init();
    }
    else{
        pc.init();
    }
});
