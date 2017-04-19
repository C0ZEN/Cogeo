(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('usersFactory', usersFactory);

    usersFactory.$inject = [
        'httpRequest',
        '$rootScope',
        'CONFIG',
        'cozenEnhancedLogs'
    ];

    function usersFactory(httpRequest, $rootScope, CONFIG, cozenEnhancedLogs) {
        var users = [];

        // Public functions
        return {
            subscribe        : subscribe,
            getUserFullName  : getUserFullName,
            addUsersFullNames: addUsersFullNames,
            addUserFullName  : addUserFullName,
            getUserByUsername: getUserByUsername,
            getUsers         : getUsers,
            formatUserData   : formatUserData,
            updateUser       : updateUser,
            getUserImage     : getUserImage,
            getAvailableUsers: getAvailableUsers,
            httpRequest      : {
                getAll: httpRequestGetAll
            }
        };

        // Subscribe to the notify on this factory for the user
        function subscribe(scope, callback) {
            var handler = $rootScope.$on('usersFactoryUserChanged', callback);
            scope.$on('$destroy', handler);
        }

        // Notify the send message when subscribe is on
        function _notify() {
            $rootScope.$emit('usersFactoryUserChanged');
        }

        // Return the name of the user formatted
        function getUserFullName(userName) {
            for (var i = 0, length = users.length; i < length; i++) {
                if (users[i].username == userName) {
                    return users[i].givenName + ' ' + users[i].surname
                }
            }
        }

        // Add the full name for the users
        function addUsersFullNames(objects) {
            var user;
            angular.forEach(objects, function (object) {
                user = getUserByUsername(object.username);
                if (user != null) {
                    object.givenName = user.givenName;
                    object.surname   = user.surname;
                }
            });
            return objects;
        }

        // Add the full name for the user
        function addUserFullName(user) {
            var user2 = getUserByUsername(user.username);
            if (user2 != null) {
                user.givenName = user2.givenName;
                user.surname   = user2.surname;
            }
            return user;
        }

        // Find a user by his username
        function getUserByUsername(userName) {
            for (var i = 0, length = users.length; i < length; i++) {
                if (users[i].username == userName) {
                    return users[i];
                }
            }
            return null;
        }

        // Return the users
        function getUsers() {
            return users;
        }

        // Update the users
        function setUsers(response) {
            for (var i = 0, length = response.lenth; i < length; i++) {
                response[i] = formatUserData(response[i]);
            }
            users = response;
            _notify();
        }

        // Add custom data to the users
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
                if (event.id == 'group') {
                    event.name  = 'account_event_group';
                    event.icon  = 'fa fa-fw icons8-google-groups';
                    event.color = 'blue';
                }
                else {
                    event.name  = 'account_event_channel';
                    event.icon  = 'fa fa-fw icons8-channel-mosaic';
                    event.color = 'green';
                }
            });
            angular.forEach($user.settings.preferences.invitations.types, function (event) {
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
            return $user;
        }

        // Update a specific user by username
        function updateUser(user) {
            for (var i = 0, length = users.length; i < length; i++) {
                if (users[i].username == user.username) {
                    users[i] = user;
                    _notify();
                }
            }
        }

        // Get the image profile for this user
        function getUserImage(username) {
            for (var i = 0, length = users.length; i < length; i++) {
                if (users[i].username == username) {
                    if (!Methods.isNullOrEmpty(users[i].picture) && !Methods.isNullOrEmpty(users[i].picture.url)) {
                        return users[i].picture.url;
                    }
                    else {
                        return 'images/groups/' + username.slice(0, 1).toUpperCase() + '.png';
                    }
                }
            }
            return 'images/other/Cat.png';
        }

        function getAvailableUsers(user) {
            var availableUsers = [];

            // Get all the users except the current user
            for (var i = 0, length = users.length; i < length; i++) {
                if (users[i].username != user.username) {
                    availableUsers.push(users[i]);
                }
            }

            // If the current user have some contacts
            if (!Methods.isNullOrEmpty(user.contacts) && user.contacts.length > 0) {
                var tmpUsers = [], stillAvailable;
                availableUsers.forEach(function (availableUser) {
                    stillAvailable = true;
                    user.contacts.forEach(function (contact) {

                        // If the user is found in the current user contacts
                        if (contact.username == availableUser.username) {

                            // But is removed, he can be invited as friend
                            if (contact.removed == 0) {
                                stillAvailable = false;
                            }
                        }
                    });

                    // The user is not in the contacts, we can add it
                    if (stillAvailable) {
                        tmpUsers.push(availableUser);
                    }
                });
                availableUsers = tmpUsers;
            }

            // Remove the users which are already invited but without response
            var indexToRemove = [];
            user.invitations.forEach(function (invitation) {
                availableUsers.forEach(function (availableUser, index) {
                    if (invitation.username == availableUser.username) {
                        if (invitation.status.response == 1) {
                            indexToRemove.push(index);
                        }
                    }
                });
            });
            for (i = indexToRemove.length - 1; i >= 0; i--) {
                availableUsers.splice(indexToRemove[i], 1);
            }
            return availableUsers;
        }

        /// HTTP REQUEST ///

        function httpRequestGetAll(callbackSuccess, callbackError) {
            httpRequest.requestGet('user', callbackSuccess, callbackError)
                .then(function (response) {
                    setUsers(response.data.data);
                    if (CONFIG.dev) {
                        cozenEnhancedLogs.info.functionCalled('usersFactory', 'httpRequestGetAll');
                        cozenEnhancedLogs.info.customMessage('usersFactory', users.length + ' users were fetched.');
                    }
                })
            ;
        }
    }

})(window.angular);

