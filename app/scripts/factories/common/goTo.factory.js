(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('goTo', goTo);

    goTo.$inject = [
        '$state',
        'CONFIG',
        '$stateParams',
        'cozenEnhancedLogs'
    ];

    function goTo($state, CONFIG, $stateParams, cozenEnhancedLogs) {

        // Public functions
        return {
            view                : view,
            isCurrentView       : isCurrentView,
            hasThisParent       : hasThisParent,
            getCurrentParam     : getCurrentParam,
            isOneOfThoseViews   : isOneOfThoseViews,
            viewUserProfile     : viewUserProfile,
            hasOneOfThoseParents: hasOneOfThoseParents
        };

        function view(view, param, $event) {
            if ($event != null) {
                $event.preventDefault();
            }

            // Add the :lang as param (for app param)
            param = angular.merge({}, {
                lang: CONFIG.currentLanguage
            }, param);

            cozenEnhancedLogs.info.changeRouteWithParams('goTo', view, param);
            $state.go(view, param);
        }

        function isCurrentView(view) {
            return $state.is(view);
        }

        function hasThisParent(parent) {
            return Methods.isInList($state.current.name, parent);
        }

        function isOneOfThoseViews(views) {
            var i, length;
            if (typeof views == 'object') {
                for (i = 0, length = views.length; i < length; i++) {
                    if (isCurrentView(views[i])) {
                        return true;
                    }
                }
            }
            else {
                for (i = 0, length = arguments.length; i < length; i++) {
                    if (isCurrentView(arguments[i])) {
                        return true;
                    }
                }
            }
            return false;
        }

        function getCurrentParam(param, formatted) {
            cozenEnhancedLogs.info.functionCalled('goTo', 'getCurrentParam');
            if (formatted) {
                var data    = {};
                data[param] = $stateParams[param];
                return data;
            }
            else {
                return $stateParams[param];
            }
        }

        function viewUserProfile(view, params, $event) {
            if ($event != null) {
                $event.preventDefault();
            }

            // Remove the @ tag
            if (params.username != null) {
                if (params.username.charAt(0) == '@') {
                    params.username = params.username.substr(1);
                }
            }
            this.view(view, params);
        }

        function hasOneOfThoseParents() {
            for (var i = 0, length = arguments.length; i < length; i++) {
                if (Methods.isInList($state.current.name, arguments[i])) {
                    return true;
                }
            }
            return false;
        }
    }

})(window.angular);

