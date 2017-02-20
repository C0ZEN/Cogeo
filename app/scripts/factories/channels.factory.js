(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('channelsFactory', channelsFactory);

    channelsFactory.$inject = [
        'groupsFactory',
        'CONFIG',
        '$stateParams',
        '$filter',
        'usersFactory',
        'userFactory',
        'httpRequest',
        '$rootScope'
    ];

    function channelsFactory(groupsFactory, CONFIG, $stateParams, $filter, usersFactory, userFactory, httpRequest, $rootScope) {

        // Public functions
        return {
            getChannelPicture       : getChannelPicture,
            isActiveMember          : isActiveMember,
            getUserByName           : getUserByName,
            getChannelsWithUserRoles: getChannelsWithUserRoles,
            getChannelWithUserRoles : getChannelWithUserRoles
        };

        function getChannelPicture(groupName, channelId) {
            var channel = groupsFactory.getChannelById(groupName, channelId);
            if (!Methods.isNullOrEmpty(channel) && !Methods.isNullOrEmpty(channel.picture) && !Methods.isNullOrEmpty(channel.picture.url)) {
                return channel.picture.url;
            }
            else {
                return 'images/groups/' + channel.name.slice(0, 1) + '.png';
            }
        }

        function isActiveMember(userName, groupName, channelId) {
            var channel = groupsFactory.getChannelById(groupName, channelId);
            if (!Methods.isNullOrEmpty(channel)) {
                for (var i = 0, length = channel.users.length; i < length; i++) {
                    if (channel.users[i].username == userName) {
                        if (channel.users[i].hasLeft == 0) {
                            if (!channel.users[i].kicked.active && !channel.users[i].banned.active) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
        }

        function getUserByName(userName, groupName, channelId) {
            var channel = groupsFactory.getChannelById(groupName, channelId);
            if (!Methods.isNullOrEmpty(channel)) {
                for (var i = 0, length = channel.users.length; i < length; i++) {
                    if (channel.users[i].username == userName) {
                        return channel.users[i];
                    }
                }
            }
            return null;
        }

        function getChannelsWithUserRoles(groupName, userName) {
            var group    = groupsFactory.getGroupByName(groupName);
            var user     = usersFactory.getUserByUsername(userName);
            var channels = [];
            if (group != null && user != null) {
                for (var i = 0, length = group.channels.length; i < length; i++) {
                    channels.push(getChannelWithUserRoles(group.channels[i], user));
                }
                return channels;
            }
            return null;
        }

        function getChannelWithUserRoles(channel, user) {
            channel.isCreator = channel.creator == user.username;
            for (var i = 0, length = channel.users.length; i < length; i++) {
                if (channel.users[i].username == user.username) {
                    channel.isMember = channel.users[i].hasLeft == 0;
                    channel.isAdmin  = channel.users[i].admin;
                    channel.isBanned = channel.users[i].banned.active;
                    channel.isKicked = channel.users[i].kicked.active;
                    break;
                }
            }
            return channel;
        }
    }

})(window.angular);

