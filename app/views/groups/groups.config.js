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
        CONFIG.internal.group = {
            description: {
                maxLength: 200,
                minLength: 30,
                required : true,
                name     : 'description'
            },
            name       : {
                length  : 30,
                required: true,
                pattern : '[A-Za-z0-9\\_\\-]*',
                name    : 'name'
            },
            quicklink  : 'http://localhost:9000/#!/app/fr/groups/join/'
        }
    }

})(window.angular);
