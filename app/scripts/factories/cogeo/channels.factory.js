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
        'cozenFloatingFeedFactory'
    ];

    function channelsFactory(groupsFactory, CONFIG, $stateParams, $filter, usersFactory, userFactory, httpRequest, cozenFloatingFeedFactory) {

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
            getMessages             : getMessages,
            getChannelIdByName      : getChannelIdByName,
            isStarredChannel        : isStarredChannel,
            getActiveMembers        : getActiveMembers,
            isAdmin                 : isAdmin,
            isActiveAdmin           : isActiveAdmin,
            getAvailableUsers       : getAvailableUsers,
            getDefaultChannels      : getDefaultChannels,
            httpRequest             : {
                updateChannel  : httpRequestUpdateChannel,
                addChannel     : httpRequestAddChannel,
                sendInvitations: httpRequestSendInvitations
            }
        };

        // Get the picture for this channel
        function getChannelPicture(groupName, channelId) {
            var channel = groupsFactory.getChannelById(groupName, channelId);
            if (!Methods.isNullOrEmpty(channel) && !Methods.isNullOrEmpty(channel.picture) && !Methods.isNullOrEmpty(channel.picture.url)) {
                return channel.picture.url;
            }
            else if (!Methods.isNullOrEmpty(channel) && !Methods.isNullOrEmpty(channel.name)) {
                return 'images/groups/' + channel.name.slice(0, 1) + '.png';
            }
            else {
                return 'images/groups/other/Cat.png'
            }
        }

        // Check if the user is an active member of this channel (not banned, not left, not kicked)
        function isActiveMember(username, groupName, channelId) {
            var channel = groupsFactory.getChannelById(groupName, channelId);
            if (!Methods.isNullOrEmpty(channel)) {
                for (var i = 0, length = channel.users.length; i < length; i++) {
                    if (channel.users[i].username == username) {
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

        // Return the user (from users) for this channel
        function getUserByName(username, groupName, channelId) {
            var channel = groupsFactory.getChannelById(groupName, channelId);
            if (!Methods.isNullOrEmpty(channel)) {
                for (var i = 0, length = channel.users.length; i < length; i++) {
                    if (channel.users[i].username == username) {
                        return channel.users[i];
                    }
                }
            }
            return null;
        }

        // Add the roles for all the channels (isMember, isBanned...)
        function getChannelsWithUserRoles(groupName, username) {
            var group    = groupsFactory.getGroupByName(groupName);
            var user     = usersFactory.getUserByUsername(username);
            var channels = [];
            if (group != null && user != null) {
                for (var i = 0, length = group.channels.length; i < length; i++) {
                    channels.push(getChannelWithUserRoles(group.channels[i], user));
                }
                return channels;
            }
            return null;
        }

        // Add the roles for this channel (isMember, isBanned...)
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

        // Return all the channels of the current user from this group
        function getMyChannels(groupName) {
            var group    = groupsFactory.getGroupByName(groupName);
            var user     = userFactory.getUser();
            var channels = [];
            if (group != null) {
                for (var i = 0, length = group.channels.length; i < length; i++) {
                    if (isActiveMember(user.username, groupName, group.channels[i]._id)) {
                        channels.push(group.channels[i]);
                    }
                }
                return channels;
            }
            else {
                return null;
            }
        }

        // Return all the starred channels of the current user for this group
        function getMyStarredChannels(groupName) {
            var channels        = getMyChannels(groupName);
            var user            = userFactory.getUser();
            var starredChannels = [];
            if (channels != null) {
                for (var i = 0, length = channels.length; i < length; i++) {
                    for (var y = 0, ylength = user.starredChannels.length; y < ylength; y++) {
                        if (channels[i]._id == user.starredChannels[y]) {
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

        // Return all the unstarred channels of the current user for this group
        function getMyOthersChannels(groupName) {
            var channels       = getMyChannels(groupName);
            var user           = userFactory.getUser();
            var othersChannels = [];
            var isStarred      = false;
            if (channels != null) {
                for (var i = 0, length = channels.length; i < length; i++) {
                    isStarred = false;
                    for (var y = 0, ylength = user.starredChannels.length; y < ylength; y++) {
                        if (channels[i]._id == user.starredChannels[y]) {
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

        // Get the messages from this channel by quantity
        function getMessages(groupName, channelId, quantity) {
            var channel = groupsFactory.getChannelById(groupName, channelId);
            if (!Methods.isNullOrEmpty(channel)) {
                if (channel.messages != null) {
                    // return channel.messages.slice(0, quantity);
                    return channel.messages;
                }
            }
            return [];
        }

        // Find the id of a channel by his name
        function getChannelIdByName(groupName, channelName) {
            var channel = groupsFactory.getChannelByName(groupName, channelName);
            if (!Methods.isNullOrEmpty(channel)) {
                return channel._id;
            }
            return null;
        }

        // Check if this channel is starred for this user
        function isStarredChannel(username, channelId) {
            var user = usersFactory.getUserByUsername(username);
            if (user != null) {
                for (var i = 0, length = user.starredChannels.length; i < length; i++) {
                    if (user.starredChannels[i] == channelId) {
                        return true;
                    }
                }
            }
            return false;
        }

        // Get the list of actives members
        function getActiveMembers(groupName, channelId) {
            var channel = groupsFactory.getChannelById(groupName, channelId);
            var users   = [];
            if (!Methods.isNullOrEmpty(channel)) {
                for (var i = 0, length = channel.users.length; i < length; i++) {
                    if (channel.users[i].hasLeft == 0) {
                        if (!channel.users[i].kicked.active && !channel.users[i].banned.active) {
                            users.push(channel.users[i]);
                        }
                    }
                }
            }
            return [];
        }

        // Check if the user is admin
        function isAdmin(username, groupName, channelId) {
            var channel = groupsFactory.getChannelById(groupName, channelId);
            if (!Methods.isNullOrEmpty(channel)) {
                for (var i = 0, length = channel.users.length; i < length; i++) {
                    if (channel.users[i].username == username) {
                        return channel.users[i].admin;
                    }
                }
            }
            return false;
        }

        // Check if the user is an active member and is admin
        function isActiveAdmin(username, groupName, channelId) {
            var channel = groupsFactory.getChannelById(groupName, channelId);
            if (!Methods.isNullOrEmpty(channel)) {
                for (var i = 0, length = channel.users.length; i < length; i++) {
                    if (channel.users[i].username == username) {
                        if (channel.users[i].hasLeft == 0) {
                            if (!channel.users[i].kicked.active && !channel.users[i].banned.active) {
                                return channel.users[i].admin;
                            }
                        }
                    }
                }
            }
            return false;
        }

        // Return the list of users which can be recruited
        function getAvailableUsers(groupName, channelId) {
            var activeMembers  = getActiveMembers(groupName, channelId);
            var groupMembers   = groupsFactory.getActiveUsers(groupName);
            var currentUser    = userFactory.getUser();
            var availableUsers = [], match;
            groupMembers.forEach(function (groupMember) {
                match = false;
                activeMembers.forEach(function (channelMember) {
                    if (groupMember.username == channelMember.username) {
                        match = true;
                    }
                });
                if (!match) {
                    availableUsers.push(groupMember);
                }
            });
            var userIndex = -1;
            availableUsers.forEach(function (user, index) {
                if (user.username == currentUser.username) {
                    userIndex = index
                }
            });
            if (userIndex != -1) {
                availableUsers.splice(userIndex, 1);
            }
            return availableUsers;
        }

        // Return the list of default channels for this group
        function getDefaultChannels(groupName) {
            var group           = groupsFactory.getGroupByName(groupName);
            var defaultChannels = [];
            if (!Methods.isNullOrEmpty(group) && !Methods.isNullOrEmpty(group.channels)) {
                for (var i = 0, length = group.channels.length; i < length; i++) {
                    if (group.channels[i].default) {
                        defaultChannels.push(group.channels[i]);
                    }
                }
            }
            return defaultChannels;
        }

        /// HTTP REQUEST ///

        function httpRequestUpdateChannel(groupName, channelName, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('group/' + groupName + '/channel/' + channelName, data, callbackSuccess, callbackError)
                .then(function (response) {
                    groupsFactory.updateGroup(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'success',
                        label      : 'alerts_success_update_channel',
                        labelValues: {
                            groupName  : groupName,
                            channelName: data.name
                        }
                    });
                })
            ;
        }

        function httpRequestAddChannel(groupName, data, callbackSuccess, callbackError) {
            httpRequest.requestPost('group/' + groupName + '/channel', data, callbackSuccess, callbackError)
                .then(function (response) {
                    groupsFactory.updateGroup(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'success',
                        label      : 'alerts_success_post_channel',
                        labelValues: {
                            groupName  : groupName,
                            channelName: data.name
                        }
                    });
                })
            ;
        }

        function httpRequestSendInvitations(groupName, channelName, data, callbackSuccess, callbackError) {
            httpRequest.requestPost('group/' + groupName + '/channel/' + channelName + '/invitations/cogeo', data, callbackSuccess, callbackError)
                .then(function (response) {
                    groupsFactory.updateGroup(response.data.data);
                    if (data.invitations.length > 1) {
                        cozenFloatingFeedFactory.addAlert({
                            type       : 'success',
                            label      : 'alerts_success_send_cogeo_groups_invitations',
                            labelValues: {
                                groupName: groupName,
                                length   : data.invitations.length
                            }
                        });
                    }
                    else {
                        cozenFloatingFeedFactory.addAlert({
                            type       : 'success',
                            label      : 'alerts_success_send_cogeo_groups_invitation',
                            labelValues: {
                                groupName: groupName,
                                username : data.invitations[0]
                            }
                        });
                    }
                })
            ;
        }
    }

})
(window.angular);

