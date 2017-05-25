(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .filter('defaultChannels', defaultChannels);

    defaultChannels.$inject = [];

    function defaultChannels() {
        return defaultChannelsFilter;

        function defaultChannelsFilter(channels, isActivated) {
            if (isActivated) {
                var newChannels = [];
                channels.forEach(function (channel) {
                    if (channel.byDefault) {
                        newChannels.push(channel);
                    }
                });
                return newChannels;
            }
            else {
                return channels;
            }
        }
    }

})(window.angular);



