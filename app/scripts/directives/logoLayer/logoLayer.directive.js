/**
 * @ngdoc directive
 * @name logo-layer
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .directive('logoLayer', logoLayer);

    logoLayer.$inject = [
        'VG_STATES'
    ];

    function logoLayer(VG_STATES) {
        return {
            link       : link,
            restrict   : 'E',
            require    : "^videogular",
            replace    : false,
            transclude : false,
            templateUrl: 'scripts/directives/logoLayer/logoLayer.template.html'
        };

        function link(scope, element, attrs, API) {
            scope.API = API;
        }
    }

})(window.angular);

