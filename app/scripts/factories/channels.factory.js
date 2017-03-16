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
            getChannelWithUserRoles : getChannelWithUserRoles,
            getMyChannels           : getMyChannels,
            getMyStarredChannels    : getMyStarredChannels,
            getMyOthersChannels     : getMyOthersChannels,
            getMessages             : getMessages
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
                    channel.joined   = channel.users[i].joined;
                    break;
                }
            }
            return channel;
        }

        function getMyChannels(groupName) {
            var group    = groupsFactory.getGroupByName(groupName);
            var user     = userFactory.getUser();
            var channels = [];
            if (group != null) {
                for (var i = 0, length = group.channels.length; i < length; i++) {
                    if (isActiveMember(user.username, groupName, group.channels[i].id)) {
                        channels.push(group.channels[i]);
                    }
                }
                return channels;
            }
            else {
                return null;
            }
        }

        function getMyStarredChannels(groupName) {
            var channels        = getMyChannels(groupName);
            var user            = userFactory.getUser();
            var starredChannels = [];
            if (channels != null) {
                for (var i = 0, length = channels.length; i < length; i++) {
                    for (var y = 0, ylength = user.starredChannels.length; y < ylength; y++) {
                        if (channels[i].id == user.starredChannels[y]) {
                            starredChannels.push(channels[i]);
                        }
                    }
                }
                return starredChannels;
            }
            else {
                return null;
            }
        }

        function getMyOthersChannels(groupName) {
            var channels       = getMyChannels(groupName);
            var user           = userFactory.getUser();
            var othersChannels = [];
            var isStarred      = false;
            if (channels != null) {
                for (var i = 0, length = channels.length; i < length; i++) {
                    isStarred = false;
                    for (var y = 0, ylength = user.starredChannels.length; y < ylength; y++) {
                        if (channels[i].id == user.starredChannels[y]) {
                            isStarred = true;
                        }
                    }
                    if (!isStarred) {
                        othersChannels.push(channels[i]);
                    }
                }
                return othersChannels;
            }
            else {
                return null;
            }
        }

        function getMessages(groupName, channelId, quantity) {
            var channel = groupsFactory.getChannelById(groupName, channelId);
            if (!Methods.isNullOrEmpty(channel)) {
                if (channel.messages != null) {
                    return channel.messages.slice(0, quantity);
                }
            }
            return [];
        }
    }

})(window.angular);

