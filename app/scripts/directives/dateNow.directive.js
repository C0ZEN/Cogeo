(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .directive('dateNow', dateNow);

    dateNow.$inject = [
        '$filter'
    ];

    function dateNow($filter) {
        return {
            link      : link,
            restrict  : 'A',
            replace   : false,
            transclude: false
        };

        function link(scope, element, attrs) {
            element.text($filter('cozenCapitalize')($filter('date')(new Date(), attrs.dateNow), true, true));
        }
    }
})(window.angular);
