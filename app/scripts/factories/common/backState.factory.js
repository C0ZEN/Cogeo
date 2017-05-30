(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .factory('backState', backState);

    backState.$inject = [
        'goTo',
        'CONFIG',
        'cozenEnhancedLogs'
    ];

    function backState(goTo, CONFIG, cozenEnhancedLogs) {

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
            cozenEnhancedLogs.info.functionCalled('backState', 'addBackState');
            backStates.push({
                ev        : ev,
                to        : to,
                toParams  : toParams,
                from      : from,
                fromParams: fromParams
            });
        }

        function getBackStates() {
            cozenEnhancedLogs.info.functionCalled('backState', 'getBackStates');
            return backStates;
        }

        function goToLastState() {
            cozenEnhancedLogs.info.functionCalled('backState', 'goToLastState');
            if (!isBackAvailable()) {
                return;
            }
            var length = backStates.length;
            goTo.view(backStates[length - 1].from, backStates[length - 1].fromParams);
        }

        function isBackAvailable() {
            cozenEnhancedLogs.info.functionCalled('backState', 'isBackAvailable');
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

