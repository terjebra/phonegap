require.config({
    paths: {
        "jquery": "jquery-1.7.2",
        "knockout": "knockout-2.1.0",
        "jquery-mobile" : "jquery.mobile-1.2.0",
        "hammer" : "hammer",        
    },
    shim: {
        'jquery-mobile': {
            deps: ['jquery']
        },
    }
});


require(['mobile'], function (mobile) {
	mobile.init();
});
