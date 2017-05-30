(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .filter('startFrom', startFrom);

    function startFrom() {
        return startFromFilter;

        function startFromFilter(input, start) {
            if (input == null) {
                return null;
            }
            else {
                start = +start;
                return input.slice(start);
            }
        }
    }

})(window.angular);



