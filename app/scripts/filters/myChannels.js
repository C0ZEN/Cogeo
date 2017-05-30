(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .filter('myChannels', myChannels);

    myChannels.$inject = [
        'channelsFactory'
    ];

    function myChannels(channelsFactory) {
        return myChannelsFilter;

        function myChannelsFilter(channels, groupName, userName, isActivated, onlyAdminChannels) {
            if (isActivated) {
                var newChannels = [], user;
                channels.forEach(function (channel) {
                    user = channelsFactory.getUserByName(userName, groupName, channel._id);
                    if (user != null && user.hasLeft == 0) {
                        if (onlyAdminChannels) {
                            if (user.admin) {
                                newChannels.push(channel);
                            }
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



