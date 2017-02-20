(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('usersFactory', usersFactory);

    usersFactory.$inject = [
        'httpRequest'
    ];

    function usersFactory(httpRequest) {

        var users = [
            {
                givenName : 'givenName',
                surname   : 'surname',
                email     : 'geoffrey.testelin@gmail.com',
                username  : 'Totzefzeo',
                superAdmin: true
            },
            {
                givenName : 'Totfzefzefzefo',
                surname   : 'ergerge',
                email     : 'geoffrey.testelin@gmail.com',
                username  : 'Totfzefzefzefo',
                superAdmin: true
            },
            {
                givenName : 'Marco',
                surname   : 'Polo',
                email     : 'geoffrey.testelin@gmail.com',
                username  : 'Toto',
                superAdmin: true
            },
            {
                givenName : 'Marco',
                surname   : 'Polo',
                email     : 'geoffrey.testelin@gmail.com',
                username  : 'Toto59',
                superAdmin: true
            },
            {
                givenName : 'Testelin',
                surname   : 'Geoffrey',
                email     : 'geoffrey.testelin@gmail.com',
                username  : 'C0ZEN',
                superAdmin: true,
                private   : {
                    profile: true
                },
                type      : 'user',
                date      : {
                    register  : 1484561615,
                    lastUpdate: 1484561615
                }
            },
            {
                givenName : 'Unknown',
                surname   : 'User',
                email     : 'unknown.user@mystery.com',
                username  : 'User1',
                superAdmin: false,
                private   : {
                    profile: false
                },
                type      : 'user',
                date      : {
                    register  : 1484561615,
                    lastUpdate: 1484561615
                }
            },
            {
                givenName : 'Unknown2',
                surname   : 'User2',
                email     : 'unknown2.user2@mystery.com',
                username  : 'User2',
                superAdmin: false,
                private   : {
                    profile: false
                },
                type      : 'user',
                date      : {
                    register  : 1484561615,
                    lastUpdate: 1484561615
                }
            }
        ];

        // Public functions
        return {
            getGroups        : getGroups,
            getUserFullName  : getUserFullName,
            addUsersFullNames: addUsersFullNames,
            getUserByUsername: getUserByUsername,
            getUsers         : getUsers,
            formatUserData   : formatUserData,
            httpRequest      : {
                getAll: httpRequestGetAll
            }
        };

        function getGroups() {
            return users;
        }

        function getUserFullName(userName) {
            for (var i = 0, length = users.length; i < length; i++) {
                if (users[i].username == userName) {
                    return users[i].givenName + ' ' + users[i].surname
                }
            }
        }

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

        function getUserByUsername(userName) {
            for (var i = 0, length = users.length; i < length; i++) {
                if (users[i].username == userName) {
                    return users[i];
                }
            }
            return null;
        }

        function getUsers() {
            return users;
        }

        function setUsers(response) {
            for (var i = 0, length = response.lenth; i < length; i++) {
                response[i] = formatUserData(response[i]);
            }
            users = response;
        }

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
            return $user;
        }

        /// HTTP REQUEST ///
        function httpRequestGetAll(callbackSuccess, callbackError) {
            httpRequest.requestGet('user', callbackSuccess, callbackError)
                .then(function (response) {
                    setUsers(response);
                })
            ;
        }
    }

})(window.angular);

