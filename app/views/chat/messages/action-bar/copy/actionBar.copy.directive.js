/**
 * @ngdoc directive
 * @name copy-action
 * @scope
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean}  copyActionDisplay   = true > Hide or show the action
 * @param {function} copyActionOnClick          > Callback function called on click
 * @param {string}   copyActionMessageId        > Id of the message to copy it with ng clipboard
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('4pjtApp.actionBar.copy', [])
        .directive('copyAction', copyAction);

    copyAction.$inject = [
        'CONFIG',
        'cozenEnhancedLogs'
    ];

    function copyAction(CONFIG, cozenEnhancedLogs) {
        return {
            link       : link,
            restrict   : 'E',
            replace    : false,
            transclude : false,
            scope      : {
                copyActionDisplay  : '=?',
                copyActionOnClick  : '&',
                copyActionMessageId: '=?'
            },
            templateUrl: 'views/chat/messages/action-bar/copy/actionBar.copy.template.html'
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
                angular.isUndefined(attrs.copyActionDisplay) ? scope.copyActionDisplay = true : null;

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onClick($event) {
                cozenEnhancedLogs.info.functionCalled('copyAction', 'onClick');
                if (Methods.isFunction(scope.copyActionOnClick)) {
                    scope.copyActionOnClick();
                }
            }
        }
    }

})(window.angular);