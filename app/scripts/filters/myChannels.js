(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .filter('myChannels', myChannels);

    myChannels.$inject = [
        'channelsFactory'
    ];

    function myChannels(channelsFactory) {
        return myChannelsFilter;

        function myChannelsFilter(channels, groupName, userName, isActivated, onlyAdminChannels, onlyPrivateChannels) {
            if (isActivated) {
                var newChannels = [], user;
                channels.forEach(function (channel) {
                    user = channelsFactory.getUserByName(userName, groupName, channel.id);
                    if (user != null && user.hasLeft == 0) {
                        if (onlyAdminChannels && user.admin) {
                            newChannels.push(channel);
                        }
                        else if (onlyPrivateChannels && channel.private) {
                            newChannels.push(channel);
                        }
                        else {
                            newChannels.push(channel);
                        }
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



