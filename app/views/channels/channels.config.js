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
        CONFIG.internal.group = {
            name: {
                length  : 30,
                required: true,
                pattern : '[a-zA-Z0-9]*',
                name    : 'name'
            }
        }
    }

})(window.angular);
