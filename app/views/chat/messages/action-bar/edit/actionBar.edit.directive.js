/**
 * @ngdoc directive
 * @name edit-action
 * @scope
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean}  editActionDisplay = true > Hide or show the action
 * @param {function} editActionOnClick        > Callback function called on click
 * @param {object}   editActionMessage        > Object message to edit
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('cogeoApp.actionBar.edit', [])
        .directive('editAction', editAction);

    editAction.$inject = [
        '$rootScope',
        'cozenEnhancedLogs'
    ];

    function editAction($rootScope, cozenEnhancedLogs) {
        return {
            link       : link,
            restrict   : 'E',
            replace    : false,
            transclude : false,
            scope      : {
                editActionDisplay: '=?',
                editActionOnClick: '&',
                editActionMessage: '=?'
            },
            templateUrl: 'views/chat/messages/action-bar/edit/actionBar.edit.template.html'
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
                angular.isUndefined(attrs.editActionDisplay) ? scope.editActionDisplay = true : null;

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onClick($event) {
                cozenEnhancedLogs.info.functionCalled('editAction', 'onClick');
                if (Methods.isFunction(scope.editActionOnClick)) {
                    scope.editActionOnClick();
                }
            }
        }
    }

})(window.angular);