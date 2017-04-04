/**
 * @ngdoc directive
 * @name answer-action
 * @scope
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean}  answerActionDisplay = true > Hide or show the action
 * @param {function} answerActionOnClick        > Callback function called on click
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('4pjtApp.actionBar.answer', [])
        .directive('answerAction', answerAction);

    answerAction.$inject = [
        'CONFIG',
        'cozenEnhancedLogs'
    ];

    function answerAction(CONFIG, cozenEnhancedLogs) {
        return {
            link       : link,
            restrict   : 'E',
            replace    : false,
            transclude : false,
            scope      : {
                answerActionDisplay: '=?',
                answerActionOnClick: '&'
            },
            templateUrl: 'views/chat/messages/action-bar/answer/actionBar.answer.template.html'
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
                angular.isUndefined(attrs.answerActionDisplay) ? scope.answerActionDisplay = true : null;

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onClick($event) {
                cozenEnhancedLogs.info.functionCalled('answerAction', 'onClick');
                if (Methods.isFunction(scope.answerActionOnClick)) {
                    scope.answerActionOnClick();
                }
            }
        }
    }

})(window.angular);