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
        'logs'
    ];

    function run($rootScope, $state, goTo, cozenPopupFactory, groupsFactory, $filter, channelsFactory, botFactory, usersFactory,
                 rfc4122, logs) {

        // Public global data
        $rootScope.data = {
            innerHeight: window.innerHeight
        };

        // Public global services
        $rootScope.$state       = $state;
        $rootScope.goTo         = goTo;
        $rootScope.botFactory   = botFactory;
        $rootScope.usersFactory = usersFactory;
        $rootScope.logsFactory  = logs;

        // Public global functions
        $rootScope.methods = {
            showPopup        : showPopup,
            getKickBanFor    : getKickBanFor,
            getGroupPicture  : groupsFactory.getGroupPicture,
            getChannelPicture: channelsFactory.getChannelPicture,
            generateUuid     : rfc4122.v4
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
    }

})(window.angular, window);
