(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .config(config);

    config.$inject = [
        'CONFIG'
    ];

    // Account configuration
    function config(CONFIG) {
        CONFIG.internal.channel = {
            maxDefault : 5,
            max        : 15,
            name       : {
                length  : 30,
                required: true,
                pattern : '[A-Za-z0-9\\_\\-]*',
                name    : 'name'
            },
            description: {
                maxLength: 200,
                minLength: 0,
                required : false,
                name     : 'description'
            }
        }
    }

})(window.angular);
