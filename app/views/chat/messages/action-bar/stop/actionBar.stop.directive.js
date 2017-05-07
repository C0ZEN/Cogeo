/**
 * @ngdoc directive
 * @name stop-action
 * @scope
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean}  stopActionDisplay = true > Hide or show the action
 * @param {function} stopActionOnClick        > Callback function called on click
 * @param {object}   stopActionMessage        > Message object to stop
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('4pjtApp.actionBar.stop', [])
        .directive('stopAction', stopAction);

    stopAction.$inject = [
        'cozenEnhancedLogs'
    ];

    function stopAction(cozenEnhancedLogs) {
        return {
            link       : link,
            restrict   : 'E',
            replace    : false,
            transclude : false,
            scope      : {
                stopActionDisplay: '=?',
                stopActionOnClick : '&',
                stopActionMessage : '=?'
            },
            templateUrl: 'views/chat/messages/action-bar/stop/actionBar.stop.template.html'
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
                angular.isUndefined(attrs.stopActionDisplay) ? scope.stopActionDisplay = true : null;

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onClick($event) {
                cozenEnhancedLogs.info.functionCalled('stopAction', 'onClick');
                if (Methods.isFunction(scope.stopActionOnClick)) {
                    scope.stopActionOnClick();
                }
                if (scope.stopActionMessage.category == 'mp3') {
                    scope.stopActionMessage.sound.stop();
                }
            }
        }
    }

})(window.angular);