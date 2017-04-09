/**
 * @ngdoc directive
 * @name invitation-action
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean} invitationActionAccept     = true > Display the accept action
 * @param {boolean} invitationActionRefuse     = true > Display the refuse action
 * @param {boolean} invitationActionIsVisible  = true > Show/hide the actions
 * @param {object}  invitationActionAcceptData        > Data required by the popup
 * @param {object}  invitationActionRefuseData        > Data required by the popup
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .directive('invitationAction', invitationAction);

    invitationAction.$inject = [
        '$rootScope'
    ];

    function invitationAction($rootScope) {
        return {
            link       : link,
            restrict   : 'E',
            scope      : {
                invitationActionAccept    : '=?',
                invitationActionRefuse    : '=?',
                invitationActionIsVisible : '=?',
                invitationActionAcceptData: '=?',
                invitationActionRefuseData: '=?'
            },
            replace    : false,
            transclude : false,
            templateUrl: 'scripts/directives/invitationAction/invitationAction.template.html'
        };

        function link(scope, element, attrs) {
            var methods = {
                init          : init,
                getMainClass  : getMainClass,
                hasError      : hasError,
                destroy       : destroy,
                onLabelClicked: onLabelClicked,
                showActions   : showActions,
                hideActions   : hideActions,
                toggleActions : toggleActions,
                onClick       : onClick
            };

            var data = {
                directive: 'invitationAction'
            };

            methods.init();

            function init() {

                // Public functions
                scope._methods = {
                    getMainClass  : getMainClass,
                    onLabelClicked: onLabelClicked,
                    onClick       : onClick
                };

                // Checking required stuff
                if (methods.hasError()) {
                    return;
                }

                // Default values (scope)
                angular.isUndefined(attrs.invitationActionAccept) ? scope.invitationActionAccept = true : null;
                angular.isUndefined(attrs.invitationActionRefuse) ? scope.invitationActionRefuse = true : null;

                // Default values (attributes)
                scope.invitationActionIsVisible = true;

                // Watcher
                scope.$watch('invitationActionIsVisible', function (newValue) {
                    if (!newValue) {
                        methods.hideActions();
                    }
                });
            }

            function getMainClass() {
                var classList = [];
                return classList;
            }

            function hasError() {
                return false;
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onLabelClicked($event) {
                $event.stopPropagation();
                methods.toggleActions();
            }

            function showActions() {
                scope.invitationActionIsVisible = true;
            }

            function hideActions() {
                scope.invitationActionIsVisible = false;
            }

            function toggleActions() {
                scope.invitationActionIsVisible = !scope.invitationActionIsVisible;
            }

            function onClick($event, type) {
                switch (type) {
                    case 'accept':
                        $rootScope.methods.showPopup($event, 'invitationActionAccept', scope.invitationActionAcceptData);
                        break;
                    case 'refuse':
                        $rootScope.methods.showPopup($event, 'invitationActionRefuse', scope.invitationActionRefuseData);
                        break;
                }
            }
        }
    }

})(window.angular);

