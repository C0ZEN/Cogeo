/**
 * @ngdoc directive
 * @name zoom-action
 * @scope
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean}  zoomActionDisplay = true > Hide or show the action
 * @param {function} zoomActionOnClick        > Callback function called on click
 * @param {object}   zoomActionImage          > Picture object (name, src, height, width, size)
 *
 */
(function (angular, window) {
    'use strict';

    angular
        .module('4pjtApp.actionBar.zoom', [])
        .directive('zoomAction', zoomAction);

    zoomAction.$inject = [
        'CONFIG',
        'cozenEnhancedLogs',
        '$rootScope'
    ];

    function zoomAction(CONFIG, cozenEnhancedLogs, $rootScope) {
        return {
            link       : link,
            restrict   : 'E',
            replace    : false,
            transclude : false,
            scope      : {
                zoomActionDisplay: '=?',
                zoomActionOnClick: '&',
                zoomActionImage  : '=?'
            },
            templateUrl: 'views/chat/messages/action-bar/zoom/actionBar.zoom.template.html'
        };

        function link(scope, element, attrs) {
            var methods = {
                init   : init,
                destroy: destroy,
                onClick: onClick
            };

            methods.init();

            function init() {

                // Public methods
                scope.methods = {
                    onClick: onClick
                };

                // Default values (scope)
                angular.isUndefined(attrs.zoomActionDisplay) ? scope.zoomActionDisplay = true : null;

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onClick($event) {
                cozenEnhancedLogs.info.functionCalled('zoomAction', 'onClick');
                if (Methods.isFunction(scope.zoomActionOnClick)) {
                    scope.zoomActionOnClick();
                }
                $rootScope.methods.showZoomImage($event, scope.zoomActionImage);
            }
        }
    }

})(window.angular, window);