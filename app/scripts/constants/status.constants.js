(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .constant('cogeoStatus', {
            status: [
                {
                    id       : 'online',
                    name     : 'other_status_online',
                    selected : false,
                    color    : '#2ecc71',
                    colorName: 'green',
                    index    : 0
                },
                {
                    id       : 'absent',
                    name     : 'other_status_absent',
                    selected : false,
                    color    : '#e67e22',
                    colorName: 'orange',
                    index    : 1
                },
                {
                    id       : 'busy',
                    name     : 'other_status_busy',
                    selected : false,
                    color    : '#e74c3c',
                    colorName: 'red',
                    index    : 2
                },
                {
                    id       : 'off',
                    name     : 'other_status_off',
                    selected : false,
                    color    : '#95a5a6',
                    colorName: 'grey',
                    index    : 3
                }
            ]
        });

})(window.angular);
