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
 * [Attribute params]
 * @param {string} downloadActionSrc  > Source of the file to download
 * @param {string} downloadActionName > Name of the file to download
 *
 */
(function (angular, window) {
    'use strict';

    angular
        .module('cogeoApp.actionBar.download', [])
        .directive('downloadAction', downloadAction);

    downloadAction.$inject = [
        'CONFIG',
        'cozenEnhancedLogs'
    ];

    function downloadAction(CONFIG, cozenEnhancedLogs) {
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

                // Default values (attributes)
                scope._downloadActionSrc  = angular.isDefined(attrs.downloadActionSrc) ? attrs.downloadActionSrc : '';
                scope._downloadActionName = angular.isDefined(attrs.downloadActionName) ? attrs.downloadActionName : '';

                // Init stuff
                element.on('$destroy', methods.destroy);
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function onClick($event) {
                $event.stopPropagation();
                cozenEnhancedLogs.info.functionCalled('downloadAction', 'onClick');
                if (Methods.isFunction(scope.downloadActionOnClick)) {
                    scope.downloadActionOnClick();
                }
            }
        }
    }

})(window.angular, window);