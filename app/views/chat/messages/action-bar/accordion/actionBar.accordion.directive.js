/**
 * @ngdoc directive
 * @name accordion-action
 * @scope
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean}  accordionActionDisplay  = true > Hide or show the action
 * @param {boolean}  accordionActionExpanded = true > Toggle the mod (expanded/collapsed)
 * @param {function} accordionActionOnClick         > Callback function called on click
 *
 */
(function (angular, window) {
    'use strict';

    angular
        .module('4pjtApp.actionBar.accordion', [])
        .directive('accordionAction', accordionAction);

    accordionAction.$inject = [
        'CONFIG',
        'cozenEnhancedLogs'
    ];

    function accordionAction(CONFIG, cozenEnhancedLogs) {
        return {
            link       : link,
            restrict   : 'E',
            replace    : false,
            transclude : false,
            scope      : {
                accordionActionDisplay : '=?',
                accordionActionExpanded: '=?',
                accordionActionOnClick : '&'
            },
            templateUrl: 'views/chat/messages/action-bar/accordion/actionBar.accordion.template.html'
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
                angular.isUndefined(attrs.accordionActionDisplay) ? scope.accordionActionDisplay = true : null;
                angular.isUndefined(attrs.accordionActionExpanded) ? scope.accordionActionExpanded = true : null;
                if (typeof scope.accordionActionExpanded != 'boolean') {
                    scope.accordionActionExpanded = true;
                }

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onClick($event) {
                $event.stopPropagation();
                cozenEnhancedLogs.info.functionCalled('accordionAction', 'onClick');
                scope.accordionActionExpanded = !scope.accordionActionExpanded;
                if (Methods.isFunction(scope.accordionActionOnClick)) {
                    scope.accordionActionOnClick();
                }
            }
        }
    }

})(window.angular, window);