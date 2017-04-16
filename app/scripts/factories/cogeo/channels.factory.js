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
            getChannelPicture               : getChannelPicture,
            isActiveMember                  : isActiveMember,
            getUserByName                   : getUserByName,
            getChannelsWithUserRoles        : getChannelsWithUserRoles,
            getChannelWithUserRoles         : getChannelWithUserRoles,
            getMyChannels                   : getMyChannels,
            getMyStarredChannels            : getMyStarredChannels,
            getMyOthersChannels             : getMyOthersChannels,
            getMessages                     : getMessages,
            getChannelIdByName              : getChannelIdByName,
            isStarredChannel                : isStarredChannel,
            getActiveMembers                : getActiveMembers,
            isAdmin                         : isAdmin,
            isActiveAdmin                   : isActiveAdmin,
            getAvailableUsers               : getAvailableUsers,
            getAvailableUsers2              : getAvailableUsers2,
            getDefaultChannels              : getDefaultChannels,
            getChannelById                  : getChannelById,
            getChannelAdminQuantity         : getChannelAdminQuantity,
            getChannelNoneAdminQuantity     : getChannelNoneAdminQuantity,
            getChannelNotLeftMembersQuantity: getChannelNotLeftMembersQuantity,
            httpRequest                     : {
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
                channels.forEach(function (channel) {
                    channel.membersQuantity = getChannelNotLeftMembersQuantity(channel.users);
                });
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

            // Get all the active members of the channel (to remove them after that)
            var activeMembers = getActiveMembers(groupName, channelId);

            // Get all the members of the group (available users)
            var groupMembers = groupsFactory.getActiveUsers(groupName);

            // Get all the invitations for this channel
            var channelInvitations = getChannelById(groupName, channelId).invitations;
            var currentUser        = userFactory.getUser();
            var availableUsers     = [], match;

            // For each group member, check if he is in the channel, if not, keep it
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

            // Remove the current from the list
            var userIndex = -1;
            availableUsers.forEach(function (user, index) {
                if (user.username == currentUser.username) {
                    userIndex = index
                }
            });
            if (userIndex != -1) {
                availableUsers.splice(userIndex, 1);
            }

            // Check if the user is already invited
            var indexToRemove = [];
            channelInvitations.forEach(function (invitation) {
                availableUsers.forEach(function (user, index) {
                    if (user.username == invitation.username && invitation.status.response == 1) {
                        if (!Methods.isInList(indexToRemove, index)) {
                            indexToRemove.push(index);
                        }
                    }
                });
            });

            // Remove the matches
            for (var i = indexToRemove.length - 1; i >= 0; i--) {
                availableUsers.splice(indexToRemove[i], 1);
            }

            // Return the users
            return availableUsers;
        }

        // Return the list of users which can be recruited
        function getAvailableUsers2(groupName, channelId) {

            // Get all the data required
            var cogeoUsers              = usersFactory.getUsers();
            var currentUser             = userFactory.getUser();
            var channelInvitations      = getChannelById(groupName, channelId).invitations;
            var groupUnavailableMembers = groupsFactory.getUnavailableUsers(groupName);
            var availableUsers          = [];

            // Keep all the users except the current user
            cogeoUsers.forEach(function (cogeoUser) {
                if (cogeoUser.username != currentUser.username) {
                    availableUsers.push(cogeoUser);
                }
            });

            // Check if the user is already invited
            var indexToRemove = [];
            channelInvitations.forEach(function (channelInvitation) {
                availableUsers.forEach(function (availableUser, index) {
                    if (availableUser.username == channelInvitation.username && channelInvitation.status.response == 1) {
                        if (!Methods.isInList(indexToRemove, index)) {
                            indexToRemove.push(index);
                        }
                    }
                });
            });

            // Remove the matches
            for (var i = indexToRemove.length - 1; i >= 0; i--) {
                availableUsers.splice(indexToRemove[i], 1);
            }

            // Find the match between username and add index to the array
            indexToRemove = [];
            groupUnavailableMembers.forEach(function (toRemoveUser) {
                availableUsers.forEach(function (availableUser, index) {
                    if (toRemoveUser.username == availableUser.username) {
                        if (!Methods.isInList(indexToRemove, index)) {
                            indexToRemove.push(index);
                        }
                    }
                })
            });

            // Remove the matches
            for (i = indexToRemove.length - 1; i >= 0; i--) {
                availableUsers.splice(indexToRemove[i], 1);
            }

            // Return the users
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

        function getChannelById(groupName, channelId) {
            var group = groupsFactory.getGroupByName(groupName);
            for (var i = 0, length = group.channels.length; i < length; i++) {
                if (group.channels[i]._id == channelId) {
                    return group.channels[i];
                }
            }
            return null;
        }

        function getChannelAdminQuantity(groupName, channelId) {
            var channel = getChannelById(groupName, channelId);
            var admin   = 0;
            channel.users.forEach(function (member) {
                if (member.hasLeft == 0) {
                    if (member.admin) {
                        admin++;
                    }
                }
            });
            return admin;
        }

        function getChannelNoneAdminQuantity(groupName, channelId) {
            var channel   = getChannelById(groupName, channelId);
            var noneAdmin = 0;
            channel.users.forEach(function (member) {
                if (member.hasLeft == 0) {
                    if (!member.admin) {
                        noneAdmin++;
                    }
                }
            });
            return noneAdmin;
        }

        function getChannelNotLeftMembersQuantity(users) {
            var notLeft = 0;
            users.forEach(function (user) {
                if (user.hasLeft == 0) {
                    notLeft++;
                }
            });
            return notLeft;
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
                            type       : 'green',
                            label      : 'alerts_success_send_cogeo_groups_invitations',
                            labelValues: {
                                groupName: groupName,
                                length   : data.invitations.length
                            }
                        });
                    }
                    else {
                        cozenFloatingFeedFactory.addAlert({
                            type       : 'green',
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

