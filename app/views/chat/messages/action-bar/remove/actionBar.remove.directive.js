/**
 * @ngdoc directive
 * @name remove-action
 * @scope
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean}  removeActionDisplay = true > Hide or show the action
 * @param {function} removeActionOnClick        > Callback function called on click
 * @param {object}   removeActionMessage        > Object message to remove
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('cogeoApp.actionBar.remove', [])
        .directive('removeAction', removeAction);

    removeAction.$inject = [
        '$rootScope',
        'cozenEnhancedLogs',
        '$state'
    ];

    function removeAction($rootScope, cozenEnhancedLogs, $state) {
        return {
            link       : link,
            restrict   : 'E',
            replace    : false,
            transclude : false,
            scope      : {
                removeActionDisplay: '=?',
                removeActionOnClick: '&',
                removeActionMessage: '=?'
            },
            templateUrl: 'views/chat/messages/action-bar/remove/actionBar.remove.template.html'
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
                angular.isUndefined(attrs.removeActionDisplay) ? scope.removeActionDisplay = true : null;

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onClick($event) {
                cozenEnhancedLogs.info.functionCalled('removeAction', 'onClick');
                if (Methods.isFunction(scope.removeActionOnClick)) {
                    scope.removeActionOnClick();
                }
                $rootScope.methods.showPopup($event, 'messageRemove', scope.removeActionMessage);
            }
        }
    }

})(window.angular);