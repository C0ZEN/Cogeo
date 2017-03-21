(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .config(config);

    config.$inject = [
        'CONFIG'
    ];

    // Account configuration
    function config(CONFIG) {
        CONFIG.internal.channel = {
            maxDefault : 5,
            name       : {
                length  : 30,
                required: true,
                pattern : 'words',
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
