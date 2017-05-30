/**
 * @ngdoc directive
 * @name zoom-image
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Attribute params]
 *
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .directive('zoomImage', zoomImage);

    zoomImage.$inject = [
        '$animate',
        '$window',
        '$rootScope'
    ];

    function zoomImage($animate, $window, $rootScope) {
        return {
            link       : link,
            restrict   : 'E',
            scope      : {},
            replace    : false,
            transclude : false,
            templateUrl: 'scripts/directives/zoom-image/zoomImage.template.html'
        };

        function link(scope, element, attrs) {
            var methods = {
                init     : init,
                destroy  : destroy,
                show     : show,
                hide     : hide,
                onKeyDown: onKeyDown
            };

            methods.init();

            function init() {

                // Public methods
                scope.methods = {
                    hide: hide
                };

                // Default values (scope)
                scope.zoomImageDisplay = false;

                // Default values (attribute)

                // Init stuff
                element.on('$destroy', methods.destroy);
                $rootScope.$on('cogeoShowZoomImage', function ($event, image) {
                    scope.zoomImageData = image;
                    methods.show();
                });
            }

            function destroy() {
                element.off('$destroy', methods.destroy);
            }

            function show() {

                // Start listening keydown
                $window.addEventListener('keydown', methods.onKeyDown);

                // Create show animation
                var container = angular.element(element.children()[0]);
                $animate.addClass(container, 'visible-container');
                scope.zoomImageDisplay = true;
            }

            function hide($event) {

                // Stop click event
                if (!Methods.isNullOrEmpty($event)) {
                    $event.stopPropagation();
                }

                // Stop listening keydown
                $window.removeEventListener('keydown', methods.onKeyDown);

                // Add close animation then hide
                var container = angular.element(element.children()[0]);
                $animate.addClass(container, 'hiding-container').then(function () {
                    $animate.removeClass(container, 'visible-container hiding-container');
                    scope.zoomImageDisplay = false;
                });

                // Avoid $animate to failed
                Methods.safeApply(scope);
            }

            function onKeyDown($event) {
                $event.stopPropagation();
                switch ($event.keyCode) {

                    // Escape
                    case 27:
                        methods.hide(null);
                        break;
                }
            }
        }
    }

})(window.angular);

