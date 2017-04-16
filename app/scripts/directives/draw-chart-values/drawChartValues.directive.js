/**
 * @ngdoc directive
 * @name draw-chart-values
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Attribute params]
 * @param {string} drawChartValuesFactory > Tell the directive where to find his data [required]
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .directive('drawChartValues', drawChartValues);

    drawChartValues.$inject = [
        'googleGraphChannelMembers',
        'googleGraphChannelStatus'
    ];

    function drawChartValues(googleGraphChannelMembers, googleGraphChannelStatus) {
        return {
            link       : link,
            restrict   : 'E',
            scope      : {},
            replace    : false,
            transclude : false,
            templateUrl: 'scripts/directives/draw-chart-values/drawChartValues.template.html'
        };

        function link(scope, element, attrs) {
            var methods = {
                init   : init,
                destroy: destroy
            };

            methods.init();

            function init() {

                // Default values (attribute)
                scope._drawChartValuesFactory = angular.isDefined(attrs.drawChartValuesFactory) ? attrs.drawChartValuesFactory : '';
                scope._values                 = [];

                // Switch on the factory
                switch (scope._drawChartValuesFactory) {
                    case 'googleGraphChannelMembers':
                        scope._values = googleGraphChannelMembers.getData();
                        break;
                    case 'googleGraphChannelStatus':
                        scope._values = googleGraphChannelStatus.getData();
                        break;
                }

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }
        }
    }

})(window.angular);

