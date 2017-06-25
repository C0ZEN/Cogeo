(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .factory('groupsFactory', groupsFactory);

    groupsFactory.$inject = [
        '$filter',
        'usersFactory',
        'userFactory',
        'httpRequest',
        '$rootScope',
        'cozenFloatingFeedFactory',
        'cozenEnhancedLogs',
        'CONFIG'
    ];

    function groupsFactory($filter, usersFactory, userFactory, httpRequest, $rootScope, cozenFloatingFeedFactory,
                           cozenEnhancedLogs, CONFIG) {
        var groups = [];

        // Listener when new message is posted
        $rootScope.$on('groupsFactory:newMessage', function ($event, data) {
            addMessage(data.groupName, data.channelName, data.newMessage);
        });

        // Public functions
        return {
            subscribe                             : subscribe,
            _notify                               : _notify,
            getGroups                             : getGroups,
            getGroupByName                        : getGroupByName,
            getGroupById                          : getGroupById,
            getGroupByNameWithUserRoles           : getGroupByNameWithUserRoles,
            getUserFromGroup                      : getUserFromGroup,
            getGroupsWithUserRoles                : getGroupsWithUserRoles,
            getUserGroups                         : getUserGroups,
            getUserActiveGroups                   : getUserActiveGroups,
            removeGroupsWhereNoActiveMemberChannel: removeGroupsWhereNoActiveMemberChannel,
            updateGroup                           : updateGroup,
            updateOrPushGroup                     : updateOrPushGroup,
            updateGroupWithNewName                : updateGroupWithNewName,
            doesUserHasRights                     : doesUserHasRights,
            getAvailableUsers                     : getAvailableUsers,
            isUserInGroup                         : isUserInGroup,
            getInvitationForUserFromGroup         : getInvitationForUserFromGroup,
            addGroup                              : addGroup,
            getGroupPicture                       : getGroupPicture,
            getGroupPictureByGroupId              : getGroupPictureByGroupId,
            getChannelById                        : getChannelById,
            getChannelByName                      : getChannelByName,
            isUserAdmin                           : isUserAdmin,
            getActiveUsers                        : getActiveUsers,
            getUnavailableUsers                   : getUnavailableUsers,
            setAllGroups                          : setAllGroups,
            isActiveMember                        : isActiveMember,
            getGroupNotLeftMembersQuantity        : getGroupNotLeftMembersQuantity,
            getAdminMembersQuantity               : getAdminMembersQuantity,
            getNoneAdminMembersQuantity           : getNoneAdminMembersQuantity,
            getNotLeftMembersQuantity             : getNotLeftMembersQuantity,
            getKickedMembersQuantity              : getKickedMembersQuantity,
            getBannedMembersQuantity              : getBannedMembersQuantity,
            getDefaultChannelsQuantity            : getDefaultChannelsQuantity,
            getPublicChannelsQuantity             : getPublicChannelsQuantity,
            getPrivateChannelsQuantity            : getPrivateChannelsQuantity,
            getAllUsersExceptHasLeft              : getAllUsersExceptHasLeft,
            addMessage                            : addMessage,
            httpRequest                           : {
                addGroup            : httpRequestAddGroup,
                isAvailableGroupName: httpRequestIsAvailableGroupName,
                getAllGroups        : httpRequestGetAllGroups,
                updateGroup         : httpRequestUpdateGroup,
                sendCogeoInvitations: httpRequestSendCogeoInvitations,
                sendEmailInvitations: httpRequestSendEmailInvitations,
                joinGroup           : httpRequestJoinGroup,
                leaveGroup          : httpRequestLeaveGroup,
                userKick            : httpRequestUserKick,
                userBan             : httpRequestUserBan,
                userUnban           : httpRequestUserUnban,
                userGrant           : httpRequestUserGrant,
                userRevoke          : httpRequestUserRevoke,
                addMessage          : httpRequestAddMessage,
                editMessage         : httpRequestEditMessage,
                removeMessage       : httpRequestRemoveMessage,
                removeChannel       : httpRequestRemoveChannel
            }
        };

        function subscribe(scope, callback) {
            var handler = $rootScope.$on('groupsFactoryUsersChanged', callback);
            scope.$on('$destroy', handler);
        }

        function _notify() {
            $rootScope.$emit('groupsFactoryUsersChanged');
        }

        function getGroups() {
            return groups;
        }

        function getGroupByName(groupName) {
            for (var i = 0, length = groups.length; i < length; i++) {
                if (groups[i].name == groupName) {
                    return groups[i];
                }
            }
            return null;
        }

        function getGroupById(groupId) {
            for (var i = 0, length = groups.length; i < length; i++) {
                if (groups[i]._id == groupId) {
                    return groups[i];
                }
            }
            return null;
        }

        function getGroupByNameWithUserRoles(name, userName) {
            var group = getGroupByName(name);
            if (group != null) {
                return getGroupsWithUserRoles(userName, group);
            }
            return null;
        }

        function getUserFromGroup(userName, groupName) {
            var group = getGroupByName(groupName);
            if (group != null) {
                for (var i = 0, length = group.users.length; i < length; i++) {
                    if (group.users[i].username == userName) {
                        return group.users[i];
                    }
                }
            }
            return null;
        }

        function getGroupsWithUserRoles(userName, customGroups) {
            var newGroups, user;
            if (customGroups == null) {
                newGroups = groups;
            }
            else {
                newGroups = customGroups;
            }
            for (var i = 0, length = newGroups.length; i < length; i++) {
                user                         = getUserFromGroup(userName, newGroups[i].name);
                newGroups[i].userRoles       = {
                    isCreator: newGroups[i].creator == userName,
                    isMember : user != null ? user.hasLeft == 0 : false,
                    isAdmin  : user != null ? user.admin : false,
                    isBanned : user != null ? user.banned.active : false,
                    isKicked : user != null ? user.kicked.active : false,
                    banned   : user != null ? user.banned : null,
                    kicked   : user != null ? user.kicked : null,
                    joined   : user != null ? user.joined : null
                };
                newGroups[i].membersQuantity = getGroupNotLeftMembersQuantity(newGroups[i].users);
            }
            return newGroups;
        }

        function getUserGroups(userName) {
            var newGroups = [];
            for (var i = 0, length = groups.length; i < length; i++) {
                for (var y = 0, ylength = groups[i].users.length; y < ylength; y++) {
                    if (groups[i].users[y].username == userName) {
                        newGroups.push(groups[i]);
                    }
                }
            }
            return $filter('orderBy')(newGroups, 'name', false);
        }

        function getUserActiveGroups(userName) {
            var newGroups = [];
            for (var i = 0, length = groups.length; i < length; i++) {
                for (var y = 0, ylength = groups[i].users.length; y < ylength; y++) {
                    if (groups[i].users[y].username == userName && isActiveMember(userName, groups[i].name)) {
                        newGroups.push(groups[i]);
                    }
                }
            }
            return $filter('orderBy')(newGroups, 'name', false);
        }

        function removeGroupsWhereNoActiveMemberChannel(groups, username) {
            var newGroups = [];

            // For each group
            groups.forEach(function (group) {

                // Check on each channel
                channelLoop:
                    for (var i = 0, length = group.channels.length; i < length; i++) {

                        // Find the user in the users list
                        for (var indexMember = 0, totalMembers = group.channels[i].users.length; indexMember < totalMembers; indexMember++) {
                            if (username == group.channels[i].users[indexMember].username) {

                                // If the user is in the channel, and is not ban or kick
                                if (group.channels[i].users[indexMember].hasLeft == 0
                                    && group.channels[i].users[indexMember].kicked.active == 0
                                    && group.channels[i].users[indexMember].banned.active == 0) {

                                    // We can keep the group and check for the next
                                    newGroups.push(group);
                                    break channelLoop;
                                }
                            }
                        }
                    }
            });
            return newGroups;
        }

        function updateGroup(group) {
            for (var i = 0, length = groups.length; i < length; i++) {
                if (groups[i].name == group.name) {
                    groups[i] = group;
                    _notify();
                    break;
                }
            }
        }

        function updateOrPushGroup(group) {
            var found = false;
            for (var i = 0, length = groups.length; i < length; i++) {
                if (groups[i].name == group.name) {
                    groups[i] = group;
                    _notify();
                    found = true;
                    break;
                }
            }
            if (!found) {
                groups.push(group);
                _notify();
            }
        }

        function updateGroupWithNewName(oldName, group) {
            for (var i = 0, length = groups.length; i < length; i++) {
                if (groups[i].name == oldName) {
                    groups[i] = group;
                    _notify();
                    break;
                }
            }
        }

        function doesUserHasRights(user) {
            if (user != null) {
                if (user.kicked != null) {
                    if (user.kicked.active) {
                        return false;
                    }
                }
                if (user.banned != null) {
                    if (user.banned.active) {
                        return false;
                    }
                }
                return true;
            }
            else {
                return false;
            }
        }

        function getAvailableUsers(groupName) {
            var users          = usersFactory.getUsers(), availableUsers = [], unavailable, tmpUser, tmpInvitation;
            var activeUsername = userFactory.getUser().username;
            angular.forEach(users, function (user) {
                unavailable = false;

                // Remove active user
                if (user.username == activeUsername) {
                    unavailable = true;
                }
                else {
                    tmpUser = getUserFromGroup(user.username, groupName);

                    // The user is in the group
                    if (tmpUser != null) {
                        if (tmpUser.hasLeft == 0) {
                            unavailable = true;
                        }
                        else if (tmpUser.kicked.active || tmpUser.banned.active) {
                            unavailable = true;
                        }
                    }

                    // The user is not in the group but check the invitations
                    else {
                        tmpInvitation = getInvitationForUserFromGroup(user.username, groupName);

                        if (tmpInvitation != null) {
                            if (tmpInvitation.status.response != 0) {
                                unavailable = true;
                            }
                        }
                    }
                }
                if (!unavailable) {
                    availableUsers.push(user);
                }
            });
            return availableUsers;
        }

        function isUserInGroup(userName, groupName) {
            var group = getGroupByName(groupName);
            if (group != null) {
                for (var i = 0, length = group.users.length; i < length; i++) {
                    if (group.users[i].username == userName) {
                        return group.users[i].hasLeft == 0;
                    }
                }
            }
            return false;
        }

        function getInvitationForUserFromGroup(userName, groupName) {
            var group = getGroupByName(groupName);
            if (group != null) {
                for (var i = 0, length = group.invitations.length; i < length; i++) {
                    if (group.invitations[i].username == userName) {
                        return group.invitations[i];
                    }
                }
            }
            return null;
        }

        function addGroup(group) {
            groups.push(group);
            _notify();
        }

        function getGroupPicture(groupName) {
            if (!Methods.isNullOrEmpty(groupName)) {
                var group = getGroupByName(groupName);
                if (!Methods.isNullOrEmpty(group) && !Methods.isNullOrEmpty(group.picture) && !Methods.isNullOrEmpty(group.picture.url)) {
                    return group.picture.url;
                }
                else {
                    return 'images/groups/' + groupName.slice(0, 1) + '.png';
                }
            }
            return '';
        }

        function getGroupPictureByGroupId(groupId, groupName) {
            if (!Methods.isNullOrEmpty(groupId)) {
                var group = getGroupById(groupId);
                if (!Methods.isNullOrEmpty(group) && !Methods.isNullOrEmpty(group.picture) && !Methods.isNullOrEmpty(group.picture.url)) {
                    return group.picture.url;
                }
                else {
                    return 'images/groups/' + groupName.slice(0, 1) + '.png';
                }
            }
            return '';
        }

        function getChannelById(groupName, channelId) {
            var group = getGroupByName(groupName);
            for (var i = 0, length = group.channels.length; i < length; i++) {
                if (group.channels[i]._id == channelId) {
                    return group.channels[i];
                }
            }
            return null;
        }

        function getChannelByName(groupName, channelName) {
            var group = getGroupByName(groupName);
            for (var i = 0, length = group.channels.length; i < length; i++) {
                if (group.channels[i].name == channelName) {
                    return group.channels[i];
                }
            }
            return null;
        }

        function isUserAdmin(groupName, username) {
            var group = getGroupByName(groupName);
            for (var i = 0, length = group.users.length; i < length; i++) {
                if (group.users[i].username == username) {
                    return isActiveMember(username, groupName) && group.users[i].admin;
                }
            }
            return false;
        }

        function getActiveUsers(groupName) {
            var group       = getGroupByName(groupName);
            var activeUsers = [];
            for (var i = 0, length = group.users.length; i < length; i++) {
                if (group.users[i].hasLeft == 0) {
                    if (!group.users[i].kicked.active && !group.users[i].banned.active) {
                        group.users[i] = usersFactory.addUserFullName(group.users[i]);
                        activeUsers.push(group.users[i]);
                    }
                }
            }
            return activeUsers;
        }

        function getUnavailableUsers(groupName) {
            var group            = getGroupByName(groupName);
            var unavailableUsers = [], add;
            for (var i = 0, length = group.users.length; i < length; i++) {
                add = false;
                if (group.users[i].hasLeft == 0) {
                    add = true;
                }
                else if (group.users[i].kicked.active || group.users[i].banned.active) {
                    add = true;
                }
                if (add) {
                    group.users[i] = usersFactory.addUserFullName(group.users[i]);
                    unavailableUsers.push(group.users[i]);
                }
            }
            return unavailableUsers;
        }

        function setAllGroups(allGroups) {
            groups = allGroups;
            _notify();
        }

        function isActiveMember(username, groupName) {
            if (Methods.isNullOrEmpty(username)) {
                username = userFactory.getUser().username;
            }
            var group = getGroupByName(groupName);
            if (!Methods.isNullOrEmpty(group)) {
                for (var i = 0, length = group.users.length; i < length; i++) {
                    if (group.users[i].username == username) {
                        return group.users[i].hasLeft == 0 && !group.users[i].kicked.active && !group.users[i].banned.active;
                    }
                }
            }
            return false;
        }

        function getGroupNotLeftMembersQuantity(users) {
            var notLeft = 0;
            users.forEach(function (user) {
                if (user.hasLeft == 0) {
                    notLeft++;
                }
            });
            return notLeft;
        }

        function getAdminMembersQuantity(groupName) {
            var group = getGroupByName(groupName);
            var admin = 0;
            group.users.forEach(function (member) {
                if (member.hasLeft == 0) {
                    if (member.admin) {
                        admin++;
                    }
                }
            });
            return admin;
        }

        function getNoneAdminMembersQuantity(groupName) {
            var group     = getGroupByName(groupName);
            var noneAdmin = 0;
            group.users.forEach(function (member) {
                if (member.hasLeft == 0) {
                    if (!member.admin) {
                        noneAdmin++;
                    }
                }
            });
            return noneAdmin;
        }

        function getNotLeftMembersQuantity(users) {
            var notLeft = 0;
            users.forEach(function (user) {
                if (user.hasLeft == 0) {
                    notLeft++;
                }
            });
            return notLeft;
        }

        function getKickedMembersQuantity(groupName) {
            var group  = getGroupByName(groupName);
            var kicked = 0;
            group.users.forEach(function (member) {
                if (member.hasLeft == 0) {
                    if (member.kicked.active) {
                        kicked++;
                    }
                }
            });
            return kicked;
        }

        function getBannedMembersQuantity(groupName) {
            var group  = getGroupByName(groupName);
            var banned = 0;
            group.users.forEach(function (member) {
                if (member.hasLeft == 0) {
                    if (member.banned.active) {
                        banned++;
                    }
                }
            });
            return banned;
        }

        function getDefaultChannelsQuantity(groupName) {
            var group          = getGroupByName(groupName);
            var defaultChannel = 0;
            group.channels.forEach(function (channel) {
                if (channel.byDefault) {
                    defaultChannel++;
                }
            });
            return defaultChannel;
        }

        function getPublicChannelsQuantity(groupName) {
            var group         = getGroupByName(groupName);
            var publicChannel = 0;
            group.channels.forEach(function (channel) {
                if (!channel.private) {
                    publicChannel++;
                }
            });
            return publicChannel;
        }

        function getPrivateChannelsQuantity(groupName) {
            var group          = getGroupByName(groupName);
            var privateChannel = 0;
            group.channels.forEach(function (channel) {
                if (channel.private) {
                    privateChannel++;
                }
            });
            return privateChannel;
        }

        function getAllUsersExceptHasLeft(groupName) {
            var group       = getGroupByName(groupName);
            var activeUsers = [];
            if (!Methods.isNullOrEmpty(group)) {
                for (var i = 0, length = group.users.length; i < length; i++) {
                    if (group.users[i].hasLeft == 0) {
                        activeUsers.push(group.users[i]);
                    }
                }
            }
            return activeUsers;
        }

        function addMessage(groupName, channelName, newMessage) {
            var channel = getChannelByName(groupName, channelName);
            channel.messages.push(newMessage);
            _notify();
        }

        /// HTTP REQUEST ///

        function httpRequestAddGroup(data, callbackSuccess, callbackError) {
            httpRequest.requestPost('group', data, callbackSuccess, callbackError)
                .then(function (response) {
                    addGroup(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'success',
                        label      : 'alerts_success_post_group',
                        labelValues: {
                            groupName: response.data.data.name
                        }
                    });
                })
            ;
        }

        function httpRequestIsAvailableGroupName(groupName, callbackSuccess, callbackError) {
            httpRequest.requestGet('group/' + groupName + '/isAvailable', callbackSuccess, callbackError);
        }

        function httpRequestGetAllGroups(callbackSuccess, callbackError) {
            httpRequest.requestGet('group', callbackSuccess, callbackError)
                .then(function (response) {
                    setAllGroups(response.data.data);
                    if (CONFIG.dev) {
                        cozenEnhancedLogs.info.functionCalled('groupsFactory', 'httpRequestGetAllGroups');
                        cozenEnhancedLogs.info.customMessage('groupsFactory', groups.length + ' groups were fetched.');
                    }
                })
            ;
        }

        function httpRequestUpdateGroup(groupName, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('group/' + groupName, data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateGroupWithNewName(groupName, response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'success',
                        label      : 'alerts_success_update_group',
                        labelValues: {
                            groupName: response.data.data.name
                        }
                    });
                })
            ;
        }

        function httpRequestSendCogeoInvitations(groupName, data, callbackSuccess, callbackError) {
            httpRequest.requestPost('group/' + groupName + '/invitations/cogeo', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateGroup(response.data.data);
                    if (data.invitations.length > 1) {
                        cozenFloatingFeedFactory.addAlert({
                            type       : 'blue',
                            label      : 'alerts_success_send_cogeo_groups_invitations',
                            labelValues: {
                                groupName: groupName,
                                length   : data.invitations.length
                            }
                        });
                    }
                    else {
                        cozenFloatingFeedFactory.addAlert({
                            type       : 'blue',
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

        function httpRequestSendEmailInvitations(groupName, data, callbackSuccess, callbackError) {
            httpRequest.requestPost('group/' + groupName + '/invitations/email', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateGroup(response.data.data);
                    if (data.invitations.length > 1) {
                        cozenFloatingFeedFactory.addAlert({
                            type       : 'blue',
                            label      : 'alerts_success_send_email_groups_invitations',
                            labelValues: {
                                groupName: groupName,
                                length   : data.invitations.length
                            }
                        });
                    }
                    else {
                        cozenFloatingFeedFactory.addAlert({
                            type       : 'blue',
                            label      : 'alerts_success_send_email_groups_invitation',
                            labelValues: {
                                groupName: groupName,
                                email    : data.invitations[0].email
                            }
                        });
                    }
                })
            ;
        }

        function httpRequestJoinGroup(groupName, data, callbackSuccess, callbackError) {
            httpRequest.requestPost('group/' + groupName + '/join', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateGroup(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'blue',
                        label      : 'alerts_success_joined_group',
                        labelValues: {
                            groupName: groupName
                        }
                    });
                })
            ;
        }

        function httpRequestLeaveGroup(groupName, data, callbackSuccess, callbackError) {
            httpRequest.requestPost('group/' + groupName + '/leave', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateGroup(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'blue',
                        label      : 'alerts_success_leaved_group',
                        labelValues: {
                            groupName: groupName
                        }
                    });
                })
            ;
        }

        function httpRequestUserKick(groupName, username, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('group/' + groupName + '/user/' + username + '/kick', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateGroup(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'blue',
                        label      : 'alerts_success_user_kick',
                        labelValues: {
                            groupName: groupName,
                            username : username,
                            time     : $filter('translate')('other_time_' + data.time)
                        }
                    });
                    cozenEnhancedLogs.explodeObject(data, true);
                })
            ;
        }

        function httpRequestUserBan(groupName, username, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('group/' + groupName + '/user/' + username + '/ban', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateGroup(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'blue',
                        label      : 'alerts_success_user_ban',
                        labelValues: {
                            groupName: groupName,
                            username : username
                        }
                    });
                })
            ;
        }

        function httpRequestUserUnban(groupName, username, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('group/' + groupName + '/user/' + username + '/unban', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateGroup(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'blue',
                        label      : 'alerts_success_user_unban',
                        labelValues: {
                            groupName: groupName,
                            username : username
                        }
                    });
                })
            ;
        }

        function httpRequestUserGrant(groupName, username, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('group/' + groupName + '/user/' + username + '/grant', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateGroup(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'blue',
                        label      : 'alerts_success_user_grant',
                        labelValues: {
                            groupName: groupName,
                            username : username
                        }
                    });
                })
            ;
        }

        function httpRequestUserRevoke(groupName, username, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('group/' + groupName + '/user/' + username + '/revoke', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateGroup(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'blue',
                        label      : 'alerts_success_user_revoke',
                        labelValues: {
                            groupName: groupName,
                            username : username
                        }
                    });
                })
            ;
        }

        function httpRequestAddMessage(groupName, channelName, data, callbackSuccess, callbackError) {
            httpRequest.requestPost('group/' + groupName + '/channel/' + channelName + '/message/add', data, callbackSuccess, callbackError)
                .then(function (response) {
                    addMessage(groupName, channelName, response.data.data);

                    // The bot answered this message
                    if (!Methods.isNullOrEmpty(response.data.newBotMessage)) {
                        cozenEnhancedLogs.info.customMessage('groupsFactory', 'New bot message');
                        addMessage(groupName, channelName, response.data.newBotMessage);
                    }
                })
            ;
        }

        function httpRequestEditMessage(groupName, channelName, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('group/' + groupName + '/channel/' + channelName + '/message/edit', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateGroup(response.data.data);
                })
            ;
        }

        function httpRequestRemoveMessage(groupName, channelName, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('group/' + groupName + '/channel/' + channelName + '/message/remove', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateGroup(response.data.data);
                })
            ;
        }

        function httpRequestRemoveChannel(groupName, channelName, data, callbackSuccess, callbackError) {
            httpRequest.requestPost('group/' + groupName + '/channel/' + channelName + '/remove', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateGroup(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'green',
                        label      : 'alerts_success_channel_removed',
                        labelValues: {
                            groupName  : groupName,
                            channelName: channelName
                        }
                    });
                })
            ;
        }
    }

})(window.angular);

