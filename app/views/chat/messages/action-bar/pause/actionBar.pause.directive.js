/**
 * @ngdoc directive
 * @name pause-action
 * @scope
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean}  pauseActionDispause = true > Hide or show the action
 * @param {function} pauseActionOnClick        > Callback function called on click
 * @param {object}   pauseActionMessage        > Message object to pause
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('4pjtApp.actionBar.pause', [])
        .directive('pauseAction', pauseAction);

    pauseAction.$inject = [
        'cozenEnhancedLogs'
    ];

    function pauseAction(cozenEnhancedLogs) {
        return {
            link       : link,
            restrict   : 'E',
            replace    : false,
            transclude : false,
            scope      : {
                pauseActionDispause: '=?',
                pauseActionOnClick: '&',
                pauseActionMessage: '=?'
            },
            templateUrl: 'views/chat/messages/action-bar/pause/actionBar.pause.template.html'
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
                angular.isUndefined(attrs.pauseActionDispause) ? scope.pauseActionDispause = true : null;

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onClick($event) {
                cozenEnhancedLogs.info.functionCalled('pauseAction', 'onClick');
                if (Methods.isFunction(scope.pauseActionOnClick)) {
                    scope.pauseActionOnClick();
                }
                if (scope.pauseActionMessage.category == 'mp3') {
                    scope.pauseActionMessage.sound.pause();
                }
            }
        }
    }

})(window.angular);