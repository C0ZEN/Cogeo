(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('colors', colors);

    colors.$inject = [
        '$filter'
    ];

    function colors($filter) {

        var _colors = {
            blue  : '#3498DB',
            green : '#2ECC71',
            yellow: '#F1C40F',
            purple: '#9B59B6',
            red   : '#E53935'
        };

        return {
            getColors: getColors
        };

        function getColors() {
            return _colors;
        }
    }

})(window.angular);