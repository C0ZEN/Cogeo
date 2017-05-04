(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .run(run);

    run.$inject = [
        '$rootScope',
        '$state',
        'goTo',
        'cozenPopupFactory',
        'groupsFactory',
        '$filter',
        'channelsFactory',
        'botFactory',
        'usersFactory',
        'rfc4122',
        'logs',
        'cozenEnhancedLogs',
        'userFactory',
        'cozenLazyLoadRandom',
        'cozenLanguage'
    ];

    function run($rootScope, $state, goTo, cozenPopupFactory, groupsFactory, $filter, channelsFactory, botFactory, usersFactory,
                 rfc4122, logs, cozenEnhancedLogs, userFactory, cozenLazyLoadRandom, cozenLanguage) {
        cozenEnhancedLogs.wrap.starting('windowOnLoad');

        // Public global data
        $rootScope.data = {
            innerHeight: window.innerHeight
        };

        // Public global services
        $rootScope.$state              = $state;
        $rootScope.goTo                = goTo;
        $rootScope.botFactory          = botFactory;
        $rootScope.usersFactory        = usersFactory;
        $rootScope.userFactory         = userFactory;
        $rootScope.logsFactory         = logs;
        $rootScope.groupsFactory       = groupsFactory;
        $rootScope.channelsFactory     = channelsFactory;
        $rootScope.cozenLazyLoadRandom = cozenLazyLoadRandom;
        $rootScope.cozenLanguage       = cozenLanguage;

        // Public global functions
        $rootScope.methods = {
            showPopup        : showPopup,
            getKickBanFor    : getKickBanFor,
            getGroupPicture  : groupsFactory.getGroupPicture,
            getChannelPicture: channelsFactory.getChannelPicture,
            generateUuid     : rfc4122.v4,
            showZoomImage    : showZoomImage
        };

        function showPopup($event, name, data) {

            // Required to avoid an show and hide behavior
            $event.stopPropagation();

            // Show the popup
            cozenPopupFactory.show({
                name: name,
                data: data
            });
        }

        function getKickBanFor(forValue) {
            return $filter('translate')('other_kicked_reason_' + forValue);
        }

        function showZoomImage($event) {
            $event.stopPropagation();
        }
    }

})(window.angular, window);
