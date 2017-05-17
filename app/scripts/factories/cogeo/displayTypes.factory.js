(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('displayTypesFactory', displayTypesFactory);

    displayTypesFactory.$inject = [
        'CONFIG',
        'cozenEnhancedLogs'
    ];

    function displayTypesFactory(CONFIG, cozenEnhancedLogs) {

        // Public functions
        return {
            updateConfig: updateConfig
        };

        function updateConfig(notificationsInternal) {
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.functionCalled('displayTypesFactory', 'updateConfig');
            }
            CONFIG.floatingFeed.displayTypes.success = notificationsInternal.success;
            CONFIG.floatingFeed.displayTypes.info    = notificationsInternal.info;
            CONFIG.floatingFeed.displayTypes.blue    = notificationsInternal.group;
            CONFIG.floatingFeed.displayTypes.green   = notificationsInternal.channel;
            CONFIG.floatingFeed.displayTypes.purple  = notificationsInternal.social;
        }
    }

})(window.angular);