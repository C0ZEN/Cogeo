/**
 * @ngdoc directive
 * @name volume-action
 * @scope
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean}  volumeActionDisplay = true > Hide or show the action
 * @param {function} volumeActionOnClick        > Callback function called on click
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('cogeoApp.actionBar.volume', [])
        .directive('volumeAction', volumeAction);

    volumeAction.$inject = [
        'cozenEnhancedLogs',
        '$rootScope'
    ];

    function volumeAction(cozenEnhancedLogs, $rootScope) {
        return {
            link       : link,
            restrict   : 'E',
            replace    : false,
            transclude : false,
            scope      : {
                volumeActionDisplay: '=?',
                volumeActionOnClick: '&'
            },
            templateUrl: 'views/chat/messages/action-bar/volume/actionBar.volume.template.html'
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
                angular.isUndefined(attrs.volumeActionDisplay) ? scope.volumeActionDisplay = true : null;

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onClick($event) {
                cozenEnhancedLogs.info.functionCalled('volumeAction', 'onClick');
                if (Methods.isFunction(scope.volumeActionOnClick)) {
                    scope.volumeActionOnClick();
                }
                $rootScope.methods.showPopup($event, 'globalVolume');
            }
        }
    }

})(window.angular);