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
        .module('cogeoApp')
        .directive('drawChartValues', drawChartValues);

    drawChartValues.$inject = [
        'googleGraphChannelMembers',
        'googleGraphChannelStatus',
        'googleGraphGroupMembers',
        'googleGraphGroupStatus',
        'googleGraphGroupChannelsTypes',
        '$rootScope'
    ];

    function drawChartValues(googleGraphChannelMembers, googleGraphChannelStatus, googleGraphGroupMembers, googleGraphGroupStatus,
                             googleGraphGroupChannelsTypes, $rootScope) {
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
                destroy: destroy,
                setData: setData
            };

            methods.init();

            function init() {
                if (Utils.canAccessGoogleVisualization()) {
                    // Default values (attribute)
                    scope._drawChartValuesFactory = angular.isDefined(attrs.drawChartValuesFactory) ? attrs.drawChartValuesFactory : '';

                    // Init stuff
                    element.on('$destroy', methods.destroy);
                    methods.setData();

                    // Watch for a rebuild event
                    $rootScope.$on('drawChartValuesInit', methods.setData);
                }
                else {
                    methods.destroy();
                }
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function setData() {
                scope._values = [];

                // Switch on the factory
                switch (scope._drawChartValuesFactory) {
                    case 'googleGraphChannelMembers':
                        scope._values = googleGraphChannelMembers.getData();
                        break;
                    case 'googleGraphChannelStatus':
                        scope._values = googleGraphChannelStatus.getData();
                        break;
                    case 'googleGraphGroupMembers':
                        scope._values = googleGraphGroupMembers.getData();
                        break;
                    case 'googleGraphGroupStatus':
                        scope._values = googleGraphGroupStatus.getData();
                        break;
                    case 'googleGraphGroupChannelsTypes':
                        scope._values = googleGraphGroupChannelsTypes.getData();
                        break;
                }
            }
        }
    }

})(window.angular);

