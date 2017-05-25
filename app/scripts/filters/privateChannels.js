(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .filter('privateChannels', privateChannels);

    privateChannels.$inject = [];

    function privateChannels() {
        return privateChannelsFilter;

        function privateChannelsFilter(channels, isActivated) {
            if (isActivated) {
                var newChannels = [];
                channels.forEach(function (channel) {
                    if (channel.private) {
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



