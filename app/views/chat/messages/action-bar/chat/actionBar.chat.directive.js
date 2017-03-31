/**
 * @ngdoc directive
 * @name chat-action
 * @scope
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean}  chatActionDisplay = true > Hide or show the action
 * @param {function} chatActionOnClick        > Callback function called on click
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('4pjtApp.actionBar.chat', [])
        .directive('chatAction', chatAction);

    chatAction.$inject = [
        'CONFIG'
    ];

    function chatAction(CONFIG) {
        return {
            link       : link,
            restrict   : 'E',
            replace    : false,
            transclude : false,
            scope      : {
                chatActionDisplay: '=?',
                chatActionOnClick: '&'
            },
            templateUrl: 'views/chat/messages/action-bar/chat/actionBar.chat.template.html'
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
                angular.isUndefined(attrs.chatActionDisplay) ? scope.chatActionDisplay = true : null;

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onClick($event) {
                if (CONFIG.debug) {
                    Methods.directiveCallbackLog('chatAction', 'onClick');
                }
                if (Methods.isFunction(scope.chatActionOnClick)) {
                    scope.chatActionOnClick();
                }
            }
        }
    }

})(window.angular);