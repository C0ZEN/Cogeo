/**
 * @ngdoc directive
 * @name friend-action
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean} friendActionBlock        = true > Display the block action
 * @param {boolean} friendActionUnblock      = true > Display the unblock action
 * @param {boolean} friendActionRename       = true > Display the rename action
 * @param {boolean} friendActionRemove       = true > Display the remove action
 * @param {boolean} friendActionChat         = true > Display the chat action
 * @param {boolean} friendActionIsVisible    = true > Show/hide the actions
 * @param {object}  friendActionBlockData           > Data required by the popup
 * @param {object}  friendActionUnblockData         > Data required by the popup
 * @param {object}  friendActionRenameData          > Data required by the popup
 * @param {object}  friendActionRemoveData          > Data required by the popup
 * @param {object}  friendActionChatUsername        > Username required to go to the view for chatting
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .directive('friendAction', friendAction);

    friendAction.$inject = [
        '$rootScope',
        'goTo'
    ];

    function friendAction($rootScope, goTo) {
        return {
            link       : link,
            restrict   : 'E',
            scope      : {
                friendActionBlock       : '=?',
                friendActionUnblock     : '=?',
                friendActionRename      : '=?',
                friendActionRemove      : '=?',
                friendActionChat        : '=?',
                friendActionIsVisible   : '=?',
                friendActionBlockData   : '=?',
                friendActionUnblockData : '=?',
                friendActionRenameData  : '=?',
                friendActionRemoveData  : '=?',
                friendActionChatUsername: '=?'
            },
            replace    : false,
            transclude : false,
            templateUrl: 'scripts/directives/friendAction/friendAction.template.html'
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
                directive: 'friendAction'
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
                angular.isUndefined(attrs.friendActionBlock) ? scope.friendActionBlock = true : null;
                angular.isUndefined(attrs.friendActionUnblock) ? scope.friendActionUnblock = true : null;
                angular.isUndefined(attrs.friendActionRename) ? scope.friendActionRename = true : null;
                angular.isUndefined(attrs.friendActionRemove) ? scope.friendActionRemove = true : null;
                angular.isUndefined(attrs.friendActionChat) ? scope.friendActionChat = true : null;

                // Default values (attributes)
                scope.friendActionIsVisible = true;

                // Watcher
                scope.$watch('friendActionIsVisible', function (newValue) {
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
                scope.friendActionIsVisible = true;
            }

            function hideActions() {
                scope.friendActionIsVisible = false;
            }

            function toggleActions() {
                scope.friendActionIsVisible = !scope.friendActionIsVisible;
            }

            function onClick($event, type) {
                switch (type) {
                    case 'block':
                        $rootScope.methods.showPopup($event, 'friendActionBlock', scope.friendActionBlockData);
                        break;
                    case 'unblock':
                        $rootScope.methods.showPopup($event, 'friendActionUnblock', scope.friendActionUnblockData);
                        break;
                    case 'rename':
                        $rootScope.methods.showPopup($event, 'friendActionRename', scope.friendActionRenameData);
                        break;
                    case 'remove':
                        $rootScope.methods.showPopup($event, 'friendActionRemove', scope.friendActionRemoveData);
                        break;
                    case 'chat':
                        goTo.view('app.chat.user', {username: scope.friendActionChatUsername});
                        break;
                }
            }
        }
    }

})(window.angular);

