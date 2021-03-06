(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
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
        'cozenLanguage',
        'CONFIG',
        'cogeoWebRtc'
    ];

    function run($rootScope, $state, goTo, cozenPopupFactory, groupsFactory, $filter, channelsFactory, botFactory, usersFactory,
                 rfc4122, logs, cozenEnhancedLogs, userFactory, cozenLazyLoadRandom, cozenLanguage, CONFIG, cogeoWebRtc) {
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
        $rootScope.Utils               = Utils;
        $rootScope.$CONFIG             = CONFIG;
        $rootScope.cogeoWebRtc         = cogeoWebRtc;

        // Public global functions
        $rootScope.methods = {
            showPopup        : showPopup,
            closePopup       : closePopup,
            getKickBanFor    : getKickBanFor,
            getGroupPicture  : groupsFactory.getGroupPicture,
            getChannelPicture: channelsFactory.getChannelPicture,
            generateUuid     : rfc4122.v4,
            showZoomImage    : showZoomImage,
            broadcastEvent   : broadcastEvent
        };

        function showPopup($event, name, data) {

            // Required to avoid an show and hide behavior
            if (!Methods.isNullOrEmpty($event)) {
                $event.stopPropagation();
            }

            // Show the popup
            cozenPopupFactory.show({
                name: name,
                data: data
            });
        }

        function closePopup($event, name) {

            // Required to avoid an show and hide behavior
            if (!Methods.isNullOrEmpty($event)) {
                $event.stopPropagation();
            }

            // Show the popup
            cozenPopupFactory.hide({
                name: name
            });
        }

        function getKickBanFor(forValue) {
            return $filter('translate')('other_kicked_reason_' + forValue);
        }

        function showZoomImage($event, image) {
            $event.stopPropagation();
            $rootScope.$broadcast('cogeoShowZoomImage', image);
        }

        function broadcastEvent(eventName, data) {
            $rootScope.$broadcast(eventName, data);
        }
    }

})(window.angular, window);
