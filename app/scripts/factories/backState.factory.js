(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('backState', backState);

    backState.$inject = [
        'goTo',
        'CONFIG'
    ];

    function backState(goTo, CONFIG) {

        // Internal variables
        var backStates = [];

        // Public functions
        return {
            addBackState   : addBackState,
            getBackStates  : getBackStates,
            goToLastState  : goToLastState,
            isBackAvailable: isBackAvailable
        };

        function addBackState(ev, to, toParams, from, fromParams) {
            if (CONFIG.debug) {
                Methods.directiveCallbackLog('backState', 'addBackState');
            }
            backStates.push({
                ev        : ev,
                to        : to,
                toParams  : toParams,
                from      : from,
                fromParams: fromParams
            });
        }

        function getBackStates() {
            if (CONFIG.debug) {
                Methods.directiveCallbackLog('backState', 'getBackStates');
            }
            return backStates;
        }

        function goToLastState() {
            if (CONFIG.debug) {
                Methods.directiveCallbackLog('backState', 'goToLastState');
            }
            if (!isBackAvailable()) {
                return;
            }
            var length = backStates.length;
            goTo.view(backStates[length - 1].from, backStates[length - 1].fromParams);
        }

        function isBackAvailable() {
            if (CONFIG.debug) {
                Methods.directiveCallbackLog('backState', 'isBackAvailable');
            }
            var length = backStates.length;
            if (length == 0) {
                return false;
            }
            else if (backStates[length - 1].from.abstract) {
                return false;
            }
            return true;
        }
    }

})(window.angular);

