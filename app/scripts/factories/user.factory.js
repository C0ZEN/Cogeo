(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('userFactory', userFactory);

    userFactory.$inject = [
        'httpRequest',
        'usersFactory',
        'localStorageService',
        'socialLoginService',
        '$rootScope',
        'goTo'
    ];

    function userFactory(httpRequest, usersFactory, localStorageService, socialLoginService, $rootScope, goTo) {

        var user = {
            givenName    : 'Geoffrey',
            surname      : 'Testelin',
            email        : 'geoffrey.testelin@gmail.com',
            username     : 'C0ZEN',
            superAdmin   : true,
            hidden       : {
                profile: true
            },
            type         : 'user',
            date         : {
                register  : 1484561615,
                lastUpdate: 1484561615
            },
            picture      : {
                name  : "3.jpg",
                width : 600,
                height: 600,
                format: "jpg",
                url   : "http://res.cloudinary.com/cozen/image/upload/v1485115972/ygfsbbfylq91lq753jyo.jpg"
            },
            bio          : 'ma bio',
            settings     : {
                ports       : {
                    first : 28,
                    second: 32
                },
                downloadPath: 'c:/users/C0ZEN/documents',
                micro       : {
                    volume: 65
                },
                speaker     : {
                    volume: 72
                },
                preferences : {
                    logs             : {
                        limit  : 9,
                        all    : false,
                        orderBy: true,
                        events : [
                            {
                                id      : 'group',
                                selected: true
                            },
                            {
                                id      : 'channel',
                                selected: true
                            },
                            {
                                id      : 'social',
                                selected: true
                            }
                        ]
                    },
                    allGroups        : {
                        limit        : 9,
                        all          : false,
                        orderBy      : false,
                        myGroups     : false,
                        myGroupsAdmin: false
                    },
                    groupsMembers    : {
                        limit  : 9,
                        all    : false,
                        orderBy: false,
                        status : [
                            {
                                id      : 'kicked',
                                selected: true
                            },
                            {
                                id      : 'banned',
                                selected: true
                            },
                            {
                                id      : 'admin',
                                selected: true
                            }
                        ]
                    },
                    groupsInvitations: {
                        limit  : 9,
                        all    : false,
                        orderBy: false,
                        types  : [
                            {
                                id      : 0,
                                selected: true
                            },
                            {
                                id      : 1,
                                selected: true
                            },
                            {
                                id      : 2,
                                selected: true
                            }
                        ]
                    },
                    groupsLog        : {
                        limit  : 9,
                        all    : false,
                        orderBy: true,
                        events : [
                            {
                                id      : 'group',
                                selected: true
                            },
                            {
                                id      : 'channel',
                                selected: true
                            }
                        ]
                    },
                    allChannels      : {
                        limit          : 9,
                        all            : false,
                        orderBy        : false,
                        myChannels     : false,
                        myChannelsAdmin: false,
                        privateChannels: false,
                        defaultChannels: false
                    }
                }
            },
            notifications: {
                groups       : {
                    creation    : true,
                    edit        : true,
                    newMember   : true,
                    kickedMember: false,
                    bannedMember: false
                },
                channels     : {
                    creation        : true,
                    edit            : true,
                    newMember       : true,
                    kickedMember    : false,
                    bannedMember    : false,
                    newMessage      : true,
                    newMessageTagged: true
                },
                directMessage: {
                    newMessage: true
                },
                other        : {
                    newFriend: true
                }
            },
            logs         : [
                {
                    date    : 1484561615,
                    type    : "newGroupCreated",
                    category: 'group',
                    values  : {
                        name: "Un groupe de test"
                    }
                },
                {
                    date    : 1484561616,
                    type    : "newGroupJoined",
                    category: 'group',
                    values  : {
                        name: "Un groupe de test"
                    }
                },
                {
                    date    : 1484561816,
                    type    : "newGroupJoined",
                    category: 'group',
                    values  : {
                        name: "Supinfo"
                    }
                },
                {
                    date    : 1484561916,
                    type    : "newChannelCreated",
                    category: 'channel',
                    values  : {
                        name: "Bar"
                    }
                },
                {
                    date    : 1484561917,
                    type    : "newChannelJoined",
                    category: 'channel',
                    values  : {
                        name: "Bar"
                    }
                },
                {
                    date    : 1484561997,
                    type    : "channelEdited",
                    category: 'channel',
                    values  : {
                        name: "Bar"
                    }
                },
                {
                    date    : 1484562017,
                    type    : "channelLeft",
                    category: 'channel',
                    values  : {
                        name: "Bar"
                    }
                },
                {
                    date    : 1484562117,
                    type    : "groupLeft",
                    category: 'group',
                    values  : {
                        name: "Supinfo"
                    }
                },
                {
                    date    : 1484563117,
                    type    : "groupEdited",
                    category: 'group',
                    values  : {
                        name: "Un groupe de test"
                    }
                },
                {
                    date    : 1484564117,
                    type    : "groupInvitationSentOne",
                    category: 'group',
                    values  : {
                        name: "Un groupe de test",
                        user: "170862@supinfo.com"
                    }
                },
                {
                    date    : 1484564117,
                    type    : "groupInvitationSentMany",
                    category: 'group',
                    values  : {
                        name    : "Un groupe de test",
                        quantity: 8
                    }
                },
                {
                    date    : 1484564117,
                    type    : "channelInvitationSentOne",
                    category: 'channel',
                    values  : {
                        name: "Lol",
                        user: "170862@supinfo.com"
                    }
                },
                {
                    date    : 1484564117,
                    type    : "channelInvitationSentMany",
                    category: 'channel',
                    values  : {
                        name    : "Lol",
                        quantity: 4
                    }
                },
                {
                    date    : 1484564118,
                    type    : "socialInvitationSent",
                    category: 'social',
                    values  : {
                        userId  : 1,
                        userName: "@Marco"
                    }
                },
                {
                    date    : 1484564120,
                    type    : "socialUserBlocked",
                    category: 'social',
                    values  : {
                        userId  : 1,
                        userName: "@Marco"
                    }
                },
                {
                    date    : 1484564121,
                    type    : "socialUserRemoved",
                    category: 'social',
                    values  : {
                        userId  : 1,
                        userName: "@Marco"
                    }
                },
                {
                    date    : 1484564122,
                    type    : "socialUserUnblocked",
                    category: 'social',
                    values  : {
                        userId  : 1,
                        userName: "@Marco"
                    }
                },
                {
                    date    : 1484564123,
                    type    : "socialInvitationAccepted",
                    category: 'social',
                    values  : {
                        userId  : 1,
                        userName: "@Marco"
                    }
                },
                {
                    date    : 1484564124,
                    type    : "socialUserRenamed",
                    category: 'social',
                    values  : {
                        userId   : 1,
                        userName : "@Marco",
                        userAlias: "PGM"
                    }
                },
                {
                    date    : 1484564125,
                    type    : "socialUserAliasRemoved",
                    category: 'social',
                    values  : {
                        userId  : 1,
                        userName: "@Marco"
                    }
                },
                {
                    date    : 1484564126,
                    type    : "groupPermissionsGranted",
                    category: 'group',
                    values  : {
                        userId  : 1,
                        userName: "@Marco",
                        name    : "Les junkies"
                    }
                },
                {
                    date    : 1484564126,
                    type    : "groupPermissionsRevoked",
                    category: 'group',
                    values  : {
                        userId  : 1,
                        userName: "@Marco",
                        name    : "Les junkies"
                    }
                },
                {
                    date    : 1484564126,
                    type    : "groupUserKicked",
                    category: 'group',
                    values  : {
                        userId  : 1,
                        userName: "@Marco",
                        name    : "Les junkies"
                    }
                },
                {
                    date    : 1484564126,
                    type    : "groupUserBanned",
                    category: 'group',
                    values  : {
                        userId  : 1,
                        userName: "@Marco",
                        name    : "Les junkies"
                    }
                },
                {
                    date    : 1484564126,
                    type    : "groupUserUnbanned",
                    category: 'group',
                    values  : {
                        userId  : 1,
                        userName: "@Marco",
                        name    : "Les junkies"
                    }
                },
                {
                    date    : 1484564127,
                    type    : "channelPermissionsGranted",
                    category: 'channel',
                    values  : {
                        userId  : 1,
                        userName: "@Marco",
                        name    : "Les junkies"
                    }
                },
                {
                    date    : 1484564127,
                    type    : "channelPermissionsRevoked",
                    category: 'channel',
                    values  : {
                        userId  : 1,
                        userName: "@Marco",
                        name    : "Les junkies"
                    }
                },
                {
                    date    : 1484564127,
                    type    : "channelUserKicked",
                    category: 'channel',
                    values  : {
                        userId  : 1,
                        userName: "@Marco",
                        name    : "Les junkies"
                    }
                },
                {
                    date    : 1484564127,
                    type    : "channelUserBanned",
                    category: 'channel',
                    values  : {
                        userId  : 1,
                        userName: "@Marco",
                        name    : "Les junkies"
                    }
                },
                {
                    date    : 1484564127,
                    type    : "channelUserUnbanned",
                    category: 'channel',
                    values  : {
                        userId  : 1,
                        userName: "@Marco",
                        name    : "Les junkies"
                    }
                }
            ]
        };

        // Public functions
        return {
            subscribe            : subscribe,
            getUser              : getUser,
            getSettings          : getSettings,
            isConnected          : isConnected,
            logout               : logout,
            setUserInLocalStorage: setUserInLocalStorage,
            getFriends           : getFriends,
            httpRequest          : {
                getUser                        : httpRequestGetUser,
                register                       : httpRequestRegister,
                login                          : httpRequestLogin,
                logout                         : httpRequestLogout,
                updateSettings                 : httpRequestUpdateSettings,
                updateSettingsLog              : httpRequestUpdateSettingsLog,
                updateSettingsAllGroups        : httpRequestUpdateSettingsAllGroups,
                updateSettingsGroupsMembers    : httpRequestUpdateSettingsGroupsMembers,
                updateSettingsGroupsInvitations: httpRequestUpdateSettingsGroupsInvitations,
                updateSettingsGroupsLogs       : httpRequestUpdateSettingsGroupsLogs,
                updateUser                     : httpRequestUpdateUser,
                updateNotifications            : httpRequestUpdateNotifications,
                updateSettingsAllChannels      : httpRequestUpdateSettingsAllChannels
            }
        };

        function subscribe(scope, callback) {
            var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler);
        }

        function _notify() {
            $rootScope.$emit('notifying-service-event');
        }

        function getUser() {
            return user;
        }

        function getSettings() {
            return user.settings;
        }

        function isConnected() {
            return user != null;
        }

        function logout(callback) {
            httpRequestLogout(user.username, callback, callback);
            localStorageService.set('currentUser', {});
            socialLoginService.logout();
            user = null;
            goTo.view('app.home');
            _notify();
        }

        function setUser(response) {
            user = formatUserData(response);
            _notify();
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

        function setUserInLocalStorage(userData) {
            localStorageService.set('currentUser', {
                username: userData.username,
                token   : userData.token.login
            });
        }

        function getFriends() {
            return [];
        }

        /// HTTP REQUEST ///

        function httpRequestGetUser(callbackSuccess, callbackError) {
            httpRequest.requestGet('user/' + user.username, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                });
        }

        function httpRequestRegister(data, callbackSuccess, callbackError) {
            httpRequest.requestPost('user', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    usersFactory.httpRequest.getAll();
                })
            ;
        }

        function httpRequestLogin(data, callbackSuccess, callbackError) {
            httpRequest.requestPost('login', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestLogout(username, callbackSuccess, callbackError) {
            httpRequest.requestGet('logout/' + username, callbackSuccess, callbackError);
        }

        function httpRequestUpdateSettings(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                })
            ;
        }

        function httpRequestUpdateSettingsLog(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings/log', data, callbackSuccess, callbackError)
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
                })
            ;
        }

        function httpRequestUpdateNotifications(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/notifications', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
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
    }

})(window.angular);

