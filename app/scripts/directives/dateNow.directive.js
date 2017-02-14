(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
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
            element.text($filter('capitalize')($filter('date')(new Date(), attrs.dateNow)));
        }
    }
})(window.angular);
