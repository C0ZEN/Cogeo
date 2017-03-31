/**
 * @ngdoc directive
 * @name download-action
 * @scope
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean}  downloadActionDisplay = true > Hide or show the action
 * @param {function} downloadActionOnClick        > Callback function called on click
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('4pjtApp.actionBar.download', [])
        .directive('downloadAction', downloadAction);

    downloadAction.$inject = [
        'CONFIG'
    ];

    function downloadAction(CONFIG) {
        return {
            link       : link,
            restrict   : 'E',
            replace    : false,
            transclude : false,
            scope      : {
                downloadActionDisplay: '=?',
                downloadActionOnClick: '&'
            },
            templateUrl: 'views/chat/messages/action-bar/download/actionBar.download.template.html'
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
                angular.isUndefined(attrs.downloadActionDisplay) ? scope.downloadActionDisplay = true : null;

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onClick($event) {
                if (CONFIG.debug) {
                    Methods.directiveCallbackLog('downloadAction', 'onClick');
                }
                if (Methods.isFunction(scope.downloadActionOnClick)) {
                    scope.downloadActionOnClick();
                }
            }
        }
    }

})(window.angular);