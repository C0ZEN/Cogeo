(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .factory('userFactory', userFactory);

    userFactory.$inject = [
        'httpRequest',
        'usersFactory',
        'localStorageService',
        '$rootScope',
        'displayTypesFactory',
        'CozenFloatingFeed',
        'goTo',
        'cozenFloatingFeedFactory',
        'accessLog',
        'readableTime',
        '$filter',
        'CONFIG',
        'cozenEnhancedLogs',
        'cogeoWebRtc',
        'statusFactory'
    ];

    function userFactory(httpRequest, usersFactory, localStorageService, $rootScope, displayTypesFactory, CozenFloatingFeed,
                         goTo, cozenFloatingFeedFactory, accessLog, readableTime, $filter, CONFIG, cozenEnhancedLogs, cogeoWebRtc,
                         statusFactory) {
        var user = [];

        // Public functions
        return {
            subscribe                  : subscribe,
            getUser                    : getUser,
            getSettings                : getSettings,
            isConnected                : isConnected,
            logout                     : logout,
            setUser                    : setUser,
            setUserInLocalStorage      : setUserInLocalStorage,
            getFriends                 : getFriends,
            getUnblockedFriends        : getUnblockedFriends,
            getBlockedFriends          : getBlockedFriends,
            getUserImage               : getUserImage,
            getUserFriendObject        : getUserFriendObject,
            getUserInvitationObject    : getUserInvitationObject,
            getUserInvitationsObjects  : getUserInvitationsObjects,
            getUserLastInvitationObject: getUserLastInvitationObject,
            httpRequest                : {
                getUser                          : httpRequestGetUser,
                register                         : httpRequestRegister,
                login                            : httpRequestLogin,
                logout                           : httpRequestLogout,
                updateSettings                   : httpRequestUpdateSettings,
                updateSettingsLog                : httpRequestUpdateSettingsLog,
                updateSettingsAccessLogs         : httpRequestUpdateSettingsAccessLogs,
                updateSettingsAllGroups          : httpRequestUpdateSettingsAllGroups,
                updateSettingsGroupsMembers      : httpRequestUpdateSettingsGroupsMembers,
                updateSettingsGroupsInvitations  : httpRequestUpdateSettingsGroupsInvitations,
                updateSettingsGroupsLogs         : httpRequestUpdateSettingsGroupsLogs,
                updateUser                       : httpRequestUpdateUser,
                updateUserPassword               : httpRequestUpdateUserPassword,
                updateNotifications              : httpRequestUpdateNotifications,
                updateSettingsAllChannels        : httpRequestUpdateSettingsAllChannels,
                updateSettingsChannelsMembers    : httpRequestUpdateSettingsChannelsMembers,
                updateSettingsChannelsInvitations: httpRequestUpdateSettingsChannelsInvitations,
                updateSettingsChannelsLogs       : httpRequestUpdateSettingsChannelsLogs,
                addToStarred                     : httpRequestAddToStarred,
                removeToStarred                  : httpRequestRemoveToStarred,
                addAccessLog                     : httpRequestAddAccessLog,
                updateSettingsInvitations        : httpRequestUpdateSettingsInvitations,
                sendInvitations                  : httpRequestSendInvitations,
                updateSettingsContacts           : httpRequestUpdateSettingsContacts,
                acceptPendingInvitation          : httpRequestAcceptPendingInvitation,
                refusePendingInvitation          : httpRequestRefusePendingInvitation,
                friendSetAlias                   : httpRequestFriendSetAlias,
                friendBlock                      : httpRequestFriendBlock,
                friendUnblock                    : httpRequestFriendUnblock,
                friendRemove                     : httpRequestFriendRemove,
                updateSettingsSpeakerVolume      : httpRequestUpdateSettingsSpeakerVolume,
                getLogs                          : httpRequestGetLogs
            }
        };

        // Subscribe to the notify on this factory for the user
        function subscribe(scope, callback) {
            var handler = $rootScope.$on('userFactoryUserChanged', callback);
            scope.$on('$destroy', handler);
        }

        // Notify the send message when subscribe is on
        function _notify() {
            $rootScope.$emit('userFactoryUserChanged');
        }

        // Return the current user
        function getUser() {
            return user;
        }

        // Get the settings for the current user
        function getSettings() {
            return user.settings;
        }

        // Check if the user is connected
        function isConnected() {
            return user != null;
        }

        // Logout
        function logout(callback) {
            httpRequestLogout(user.username, callback, callback);
            goTo.view('app.home');
            localStorageService.set('currentUser', {});
            // socialLoginService.logout();
            user = null;
            _notify();
        }

        // Update the current user
        function setUser(response, notify) {
            if (notify == null) {
                notify = true;
            }
            if (response == null) {
                user = null;
            }
            else {
                user = formatUserData(response);
                usersFactory.updateUser(user);
                displayTypesFactory.updateConfig(response.notifications.internal);
            }
            if (CONFIG.dev) {
                cozenEnhancedLogs.info.functionCalled('userFactory', 'setUser');
                console.log(response);
            }
            if (notify) {
                _notify();
            }
        }

        // Add custom info when updating the current user
        function formatUserData($user) {
            angular.forEach($user.settings.preferences.logs.events, function (event) {
                if (event.id == 'group') {
                    event.name  = 'account_event_group';
                    event.icon  = 'fa fa-fw icons8-google-groups';
                    event.color = 'blue';
                }
                else if (event.id == 'channel') {
                    event.name  = 'account_event_channel';
                    event.icon  = 'fa fa-fw icons8-channel-mosaic';
                    event.color = 'green';
                }
                else if (event.id == 'account') {
                    event.name  = 'account_event_account';
                    event.icon  = 'fa fa-fw icons8-user-male';
                    event.color = 'blue';
                }
                else {
                    event.name  = 'account_event_social';
                    event.icon  = 'fa fa-fw icons8-user-groups';
                    event.color = 'purple';
                }
            });
            angular.forEach($user.settings.preferences.groupsMembers.status, function (event) {
                if (event.id == 'kicked') {
                    event.name  = 'groups_kicked';
                    event.icon  = 'fa fa-fw icons8-lock';
                    event.color = 'yellow';
                }
                else if (event.id == 'banned') {
                    event.name  = 'groups_banned';
                    event.icon  = 'fa fa-fw icons8-lock';
                    event.color = 'yellow';
                }
                else {
                    event.name  = 'groups_admin';
                    event.icon  = 'fa fa-fw icons8-user-male';
                    event.color = 'purple';
                }
            });
            angular.forEach($user.settings.preferences.groupsInvitations.types, function (event) {
                if (event.id == 0) {
                    event.name  = 'popup_groupsInvitations_filter_body_rejected';
                    event.icon  = 'fa fa-fw icons8-event-declined-filled';
                    event.color = 'error';
                }
                else if (event.id == 1) {
                    event.name  = 'popup_groupsInvitations_filter_body_waiting';
                    event.icon  = 'fa fa-fw icons8-event-accepted-tentatively-filled';
                    event.color = 'info';
                }
                else {
                    event.name  = 'popup_groupsInvitations_filter_body_accepted';
                    event.icon  = 'fa fa-fw icons8-event-accepted-filled';
                    event.color = 'green';
                }
            });
            angular.forEach($user.settings.preferences.groupsLogs.events, function (event) {
                if (event.id == 'group') {
                    event.name  = 'account_event_group';
                    event.icon  = 'fa fa-fw icons8-google-groups';
                    event.color = 'blue';
                }
                else if (event.id == 'warning') {
                    event.name  = 'account_event_warning';
                    event.icon  = 'fa fa-fw fa-exclamation-triangle';
                    event.color = 'yellow';
                }
                else {
                    event.name  = 'account_event_channel';
                    event.icon  = 'fa fa-fw icons8-channel-mosaic';
                    event.color = 'green';
                }
            });
            angular.forEach($user.settings.preferences.channelsMembers.status, function (event) {
                if (event.id == 'kicked') {
                    event.name  = 'groups_kicked';
                    event.icon  = 'fa fa-fw icons8-lock';
                    event.color = 'yellow';
                }
                else if (event.id == 'banned') {
                    event.name  = 'groups_banned';
                    event.icon  = 'fa fa-fw icons8-lock';
                    event.color = 'yellow';
                }
                else {
                    event.name  = 'groups_admin';
                    event.icon  = 'fa fa-fw icons8-user-male';
                    event.color = 'purple';
                }
            });
            angular.forEach($user.settings.preferences.channelsInvitations.types, function (event) {
                if (event.id == 0) {
                    event.name  = 'popup_groupsInvitations_filter_body_rejected';
                    event.icon  = 'fa fa-fw icons8-event-declined-filled';
                    event.color = 'error';
                }
                else if (event.id == 1) {
                    event.name  = 'popup_groupsInvitations_filter_body_waiting';
                    event.icon  = 'fa fa-fw icons8-event-accepted-tentatively-filled';
                    event.color = 'info';
                }
                else {
                    event.name  = 'popup_groupsInvitations_filter_body_accepted';
                    event.icon  = 'fa fa-fw icons8-event-accepted-filled';
                    event.color = 'green';
                }
            });
            angular.forEach($user.settings.preferences.channelsLogs.events, function (event) {
                if (event.id == 'social') {
                    event.name  = 'account_event_social';
                    event.icon  = 'fa fa-fw icons8-user-groups';
                    event.color = 'purple';
                }
                else if (event.id == 'warning') {
                    event.name  = 'account_event_warning';
                    event.icon  = 'fa fa-fw fa-exclamation-triangle';
                    event.color = 'yellow';
                }
                else {
                    event.name  = 'account_event_channel';
                    event.icon  = 'fa fa-fw icons8-channel-mosaic';
                    event.color = 'green';
                }
            });
            return $user;
        }

        // Update the current user for the local storage module
        function setUserInLocalStorage(userData) {
            var localUser = localStorageService.get('currentUser');
            localStorageService.set('currentUser', {
                username: Methods.isNullOrEmpty(userData.username) ? localUser.username : userData.username,
                token   : Methods.isNullOrEmpty(userData.token) ? localUser.token : userData.token
            });
        }

        // Return the friends of the current user
        function getFriends() {
            var friends = [], friend;
            for (var i = 0, length = user.contacts.length; i < length; i++) {
                if (user.contacts[i].removed == 0) {
                    friend = usersFactory.getUserByUsername(user.contacts[i].username);
                    if (!Methods.isNullOrEmpty(friend)) {
                        user.contacts[i].givenName = friend.givenName;
                        user.contacts[i].surname   = friend.surname;
                        friends.push(user.contacts[i]);
                    }
                }
            }
            return friends;
        }

        function getUnblockedFriends() {
            var friends = [], friend;
            if (!Methods.isNullOrEmpty(user.contacts)) {
                for (var i = 0, length = user.contacts.length; i < length; i++) {
                    if (user.contacts[i].removed == 0 && user.contacts[i].blocked == 0) {
                        friend = usersFactory.getUserByUsername(user.contacts[i].username);
                        if (!Methods.isNullOrEmpty(friend)) {
                            user.contacts[i].givenName = friend.givenName;
                            user.contacts[i].surname   = friend.surname;
                            friends.push(user.contacts[i]);
                        }
                    }
                }
            }
            return friends;
        }

        function getBlockedFriends() {
            var friends = [], friend;
            if (!Methods.isNullOrEmpty(user.contacts)) {
                for (var i = 0, length = user.contacts.length; i < length; i++) {
                    if (user.contacts[i].removed == 0 && user.contacts[i].blocked != 0) {
                        friend = usersFactory.getUserByUsername(user.contacts[i].username);
                        if (!Methods.isNullOrEmpty(friend)) {
                            user.contacts[i].givenName = friend.givenName;
                            user.contacts[i].surname   = friend.surname;
                            friends.push(user.contacts[i]);
                        }
                    }
                }
            }
            return friends;
        }

        function getUserImage(size) {
            if (!Methods.isNullOrEmpty(user.picture) && !Methods.isNullOrEmpty(user.picture.url)) {
                return user.picture.url;
            }
            else {
                return 'images/groups/' + user.username.slice(0, 1).toUpperCase() + '.png';
            }
        }

        function getUserFriendObject(username) {
            for (var i = 0, length = user.contacts.length; i < length; i++) {
                if (user.contacts[i].username == username) {
                    if (user.contacts[i].removed == 0) {
                        return user.contacts[i];
                    }
                    else {
                        return false;
                    }
                }
            }
            return false;
        }

        function getUserInvitationObject(username) {
            for (var i = 0, length = user.invitations.length; i < length; i++) {
                if (user.invitations[i].username == username) {
                    return user.invitations[i];
                }
            }
            return null;
        }

        function getUserInvitationsObjects(username) {
            var invitations = [];
            for (var i = 0, length = user.invitations.length; i < length; i++) {
                if (user.invitations[i].username == username) {
                    invitations.push(user.invitations[i]);
                }
            }
            return invitations;
        }

        function getUserLastInvitationObject(username) {
            for (var i = user.invitations.length; i-- > 0;) {
                if (user.invitations[i].username == username) {
                    return user.invitations[i];
                }
            }
            return null;
        }

        /// HTTP REQUEST ///

        function httpRequestGetUser(callbackSuccess, callbackError) {
            httpRequest.requestGet('user/' + user.username, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestRegister(data, callbackSuccess, callbackError) {
            httpRequest.requestPost('user', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    usersFactory.httpRequest.getAll();
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'success',
                        label      : 'alerts_success_register',
                        labelValues: {
                            username: response.data.data.username
                        }
                    });
                    accessLog.getAccessLog()
                        .then(function (response) {
                            httpRequestAddAccessLog(response);
                        })
                    ;
                    if (CONFIG.dev) {
                        cozenEnhancedLogs.explodeObject(data);
                    }
                    goTo.view('app.account.profile');
                })
            ;
        }

        /**
         * Try to connect the user
         * Data must contain the username associated with a password or a token.
         * The flag updateLastLogin could be added to disable or enable the edit of the data.lastLogin (default true)
         * @param {object} data > User object used to identify which user should be connected
         * @param {function} callbackSuccess > Callback called on success
         * @param {function} callbackError   > Callback called on error
         */
        function httpRequestLogin(data, callbackSuccess, callbackError) {
            httpRequest.requestPost('login', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'success',
                        label      : 'alerts_success_login',
                        labelValues: {
                            username : response.data.data.username,
                            lastLogin: readableTime.convertTimestamp(response.data.data.date.lastLogin, $filter('translate')('other_time_thereIsLess_lower'))
                        }
                    });

                    // Set online status for the current user
                    statusFactory.setCurrentUserStatus(0);

                    // Create the peer
                    cogeoWebRtc.createPeer(response.data.data.username);
                })
                .catch(function (response) {

                    // The null is important here
                    // By default, the user is equal []
                    // When a resolve occur with checking if connected, [] tell us that we don"t know yet
                    // Null say that we are offline
                    // So basically, this will avoid to redirect to the error offline page
                    user = null;
                })
            ;
        }

        function httpRequestLogout(username, callbackSuccess, callbackError) {
            httpRequest.requestGet('logout/' + username, callbackSuccess, callbackError)
                .then(function (response) {

                    // Set offline status for the current user
                    statusFactory.setCurrentUserStatus(3);

                    // Destroy the peer
                    cogeoWebRtc.destroyPeer();

                    CozenFloatingFeed.rollbackOriginDisplayTypes();
                    cozenFloatingFeedFactory.addAlert({
                        type : 'info',
                        label: 'alerts_info_logout'
                    });
                })
            ;
        }

        function httpRequestUpdateSettings(data, callbackSuccess, callbackError, notify) {
            httpRequest.requestPut('user/' + user.username + '/settings', data, callbackSuccess, callbackError)
                .then(function (response) {
                    if (CONFIG.dev) {
                        cozenEnhancedLogs.info.functionCalled('userFactory', 'httpRequestUpdateSettings');
                        cozenEnhancedLogs.explodeObject(data, true);
                    }
                    setUser(response.data.data, notify);
                    setUserInLocalStorage(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type : 'success',
                        label: 'alerts_success_update_user_settings'
                    });
                })
            ;
        }

        function httpRequestUpdateSettingsLog(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings/logs', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestUpdateSettingsAccessLogs(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings/access-logs', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestUpdateSettingsAllGroups(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings/all-groups', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestUpdateSettingsGroupsMembers(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings/groups-members', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestUpdateSettingsGroupsInvitations(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings/groups-invitations', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestUpdateSettingsGroupsLogs(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings/groups-logs', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestUpdateUser(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username, data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type : 'success',
                        label: 'alerts_success_update_user'
                    });
                })
            ;
        }

        function httpRequestUpdateUserPassword(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/password', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type : 'success',
                        label: 'alerts_success_update_user_password'
                    });
                })
            ;
        }

        function httpRequestUpdateNotifications(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/notifications', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type : 'success',
                        label: 'alerts_success_update_user_notifications'
                    });
                })
            ;
        }

        function httpRequestUpdateSettingsAllChannels(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings/all-channels', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestUpdateSettingsChannelsMembers(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings/channels-members', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestUpdateSettingsChannelsInvitations(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings/channels-invitations', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestUpdateSettingsChannelsLogs(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings/channels-logs', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestAddToStarred(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/add-to-starred', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    if (CONFIG.dev) {
                        cozenEnhancedLogs.explodeObject(data);
                    }
                })
            ;
        }

        function httpRequestRemoveToStarred(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/remove-from-starred', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    if (CONFIG.dev) {
                        cozenEnhancedLogs.explodeObject(data);
                    }
                })
            ;
        }

        function httpRequestAddAccessLog(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/accessLog', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestUpdateSettingsInvitations(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings/invitations', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestSendInvitations(data, callbackSuccess, callbackError) {
            httpRequest.requestPost('user/' + user.username + '/invitations/cogeo', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    if (data.invitations.length > 1) {
                        cozenFloatingFeedFactory.addAlert({
                            type       : 'purple',
                            label      : 'alerts_success_send_cogeo_user_invitations',
                            labelValues: {
                                length: data.invitations.length
                            }
                        });
                    }
                    else {
                        cozenFloatingFeedFactory.addAlert({
                            type       : 'purple',
                            label      : 'alerts_success_send_cogeo_user_invitation',
                            labelValues: {
                                username: data.invitations[0]
                            }
                        });
                    }
                })
            ;
        }

        function httpRequestUpdateSettingsContacts(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings/contacts', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestAcceptPendingInvitation(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/invitations/pending/accept', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    var type, label;
                    switch (data.tag) {
                        case 'user':
                            type  = 'purple';
                            label = 'alerts_invitations_user_accept';
                            break;
                        case 'group':
                            type  = 'blue';
                            label = 'alerts_invitations_group_accept';
                            break;
                        case 'channel':
                            type  = 'green';
                            label = 'alerts_invitations_channel_accept';
                            break;
                    }
                    cozenFloatingFeedFactory.addAlert({
                        type       : type,
                        label      : label,
                        labelValues: data
                    });
                })
            ;
        }

        function httpRequestRefusePendingInvitation(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/invitations/pending/refuse', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    var type, label;
                    switch (data.tag) {
                        case 'user':
                            type  = 'purple';
                            label = 'alerts_invitations_user_refuse';
                            break;
                        case 'group':
                            type  = 'blue';
                            label = 'alerts_invitations_group_refuse';
                            break;
                        case 'channel':
                            type  = 'green';
                            label = 'alerts_invitations_channel_refuse';
                            break;
                    }
                    cozenFloatingFeedFactory.addAlert({
                        type       : type,
                        label      : label,
                        labelValues: data
                    });
                })
            ;
        }

        function httpRequestFriendSetAlias(friend, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/friend/' + friend + '/alias', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    if (Methods.isNullOrEmpty(data.alias)) {
                        cozenFloatingFeedFactory.addAlert({
                            type       : 'purple',
                            label      : 'alerts_success_friend_set_alias_empty',
                            labelValues: {
                                friend: friend
                            }
                        });
                    }
                    else {
                        cozenFloatingFeedFactory.addAlert({
                            type       : 'purple',
                            label      : 'alerts_success_friend_set_alias',
                            labelValues: {
                                friend: friend,
                                alias : data.alias
                            }
                        });
                    }
                })
            ;
        }

        function httpRequestFriendBlock(friend, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/friend/' + friend + '/block', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'purple',
                        label      : 'alerts_success_friend_blocked',
                        labelValues: {
                            friend: friend
                        }
                    });
                })
            ;
        }

        function httpRequestFriendUnblock(friend, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/friend/' + friend + '/unblock', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'purple',
                        label      : 'alerts_success_friend_unblocked',
                        labelValues: {
                            friend: friend
                        }
                    });
                })
            ;
        }

        function httpRequestFriendRemove(friend, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/friend/' + friend + '/remove', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type       : 'purple',
                        label      : 'alerts_success_friend_remove',
                        labelValues: {
                            friend: friend
                        }
                    });
                })
            ;
        }

        function httpRequestUpdateSettingsSpeakerVolume(data, callbackSuccess, callbackError, notify) {
            httpRequest.requestPut('user/' + user.username + '/settings/speaker/volume', data, callbackSuccess, callbackError)
                .then(function (response) {
                    if (CONFIG.dev) {
                        cozenEnhancedLogs.info.functionCalled('userFactory', 'httpRequestUpdateSettingsSpeakerVolume');
                        cozenEnhancedLogs.explodeObject(data, true);
                    }
                    setUser(response.data.data, notify);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestGetLogs(callbackSuccess, callbackError) {
            httpRequest.requestGet('user/' + user.username + '/logs', callbackSuccess, callbackError)
                .then(function (response) {
                    user.logs = response.data.data;
                })
            ;
        }
    }

})(window.angular);