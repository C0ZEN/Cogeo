/**
 * @ngdoc directive
 * @name play-action
 * @scope
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean}  playActionDisplay = true > Hide or show the action
 * @param {function} playActionOnClick        > Callback function called on click
 * @param {object}   playActionMessage        > Message object to play
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('4pjtApp.actionBar.play', [])
        .directive('playAction', playAction);

    playAction.$inject = [
        'cozenEnhancedLogs'
    ];

    function playAction(cozenEnhancedLogs) {
        return {
            link       : link,
            restrict   : 'E',
            replace    : false,
            transclude : false,
            scope      : {
                playActionDisplay: '=?',
                playActionOnClick: '&',
                playActionMessage: '=?'
            },
            templateUrl: 'views/chat/messages/action-bar/play/actionBar.play.template.html'
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
                angular.isUndefined(attrs.playActionDisplay) ? scope.playActionDisplay = true : null;

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onClick($event) {
                cozenEnhancedLogs.info.functionCalled('playAction', 'onClick');
                if (Methods.isFunction(scope.playActionOnClick)) {
                    scope.playActionOnClick();
                }
                if (scope.playActionMessage.category == 'mp3') {
                    scope.playActionMessage.sound.play();
                }
            }
        }
    }

})(window.angular);