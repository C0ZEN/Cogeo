(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('userFactory', userFactory);

    userFactory.$inject = [
        'httpRequest',
        'usersFactory',
        'localStorageService',
        '$rootScope',
        'goTo',
        'cozenFloatingFeedFactory',
        'accessLog',
        'readableTime',
        '$filter',
        'CONFIG',
        'cozenEnhancedLogs'
    ];

    function userFactory(httpRequest, usersFactory, localStorageService, $rootScope,
                         goTo, cozenFloatingFeedFactory, accessLog, readableTime, $filter, CONFIG, cozenEnhancedLogs) {

        // var user   = {
        //     givenName      : 'Geoffrey',
        //     surname        : 'Testelin',
        //     email          : 'geoffrey.testelin@gmail.com',
        //     username       : 'C0ZEN',
        //     superAdmin     : true,
        //     hidden         : {
        //         profile: true
        //     },
        //     type           : 'user',
        //     date           : {
        //         register  : 1484561615,
        //         lastUpdate: 1484561615
        //     },
        //     picture        : {
        //         name  : "3.jpg",
        //         width : 600,
        //         height: 600,
        //         format: "jpg",
        //         url   : "http://res.cloudinary.com/cozen/image/upload/v1485115972/ygfsbbfylq91lq753jyo.jpg"
        //     },
        //     bio            : 'ma bio',
        //     starredChannels: [
        //         "a"
        //     ],
        //     settings       : {
        //         ports       : {
        //             first : 28,
        //             second: 32
        //         },
        //         downloadPath: 'c:/users/C0ZEN/documents',
        //         micro       : {
        //             volume: 65
        //         },
        //         speaker     : {
        //             volume: 72
        //         },
        //         preferences : {
        //             logs               : {
        //                 limit  : 9,
        //                 all    : false,
        //                 orderBy: true,
        //                 events : [
        //                     {
        //                         id      : 'group',
        //                         selected: true
        //                     },
        //                     {
        //                         id      : 'channel',
        //                         selected: true
        //                     },
        //                     {
        //                         id      : 'social',
        //                         selected: true
        //                     }
        //                 ]
        //             },
        //             allGroups          : {
        //                 limit        : 9,
        //                 all          : false,
        //                 orderBy      : false,
        //                 myGroups     : false,
        //                 myGroupsAdmin: false
        //             },
        //             groupsMembers      : {
        //                 limit  : 9,
        //                 all    : false,
        //                 orderBy: false,
        //                 status : [
        //                     {
        //                         id      : 'kicked',
        //                         selected: true
        //                     },
        //                     {
        //                         id      : 'banned',
        //                         selected: true
        //                     },
        //                     {
        //                         id      : 'admin',
        //                         selected: true
        //                     }
        //                 ]
        //             },
        //             groupsInvitations  : {
        //                 limit  : 9,
        //                 all    : false,
        //                 orderBy: false,
        //                 types  : [
        //                     {
        //                         id      : 0,
        //                         selected: true
        //                     },
        //                     {
        //                         id      : 1,
        //                         selected: true
        //                     },
        //                     {
        //                         id      : 2,
        //                         selected: true
        //                     }
        //                 ]
        //             },
        //             groupsLog          : {
        //                 limit  : 9,
        //                 all    : false,
        //                 orderBy: true,
        //                 events : [
        //                     {
        //                         id      : 'group',
        //                         selected: true
        //                     },
        //                     {
        //                         id      : 'channel',
        //                         selected: true
        //                     }
        //                 ]
        //             },
        //             allChannels        : {
        //                 limit          : 9,
        //                 all            : false,
        //                 orderBy        : false,
        //                 myChannels     : false,
        //                 myChannelsAdmin: false,
        //                 privateChannels: false,
        //                 defaultChannels: false
        //             },
        //             channelsMembers    : {
        //                 limit  : 9,
        //                 all    : false,
        //                 orderBy: false,
        //                 status : [
        //                     {
        //                         id      : 'kicked',
        //                         selected: true
        //                     },
        //                     {
        //                         id      : 'banned',
        //                         selected: true
        //                     },
        //                     {
        //                         id      : 'admin',
        //                         selected: true
        //                     }
        //                 ]
        //             },
        //             channelsInvitations: {
        //                 limit  : 9,
        //                 all    : false,
        //                 orderBy: false,
        //                 types  : [
        //                     {
        //                         id      : 0,
        //                         selected: true
        //                     },
        //                     {
        //                         id      : 1,
        //                         selected: true
        //                     },
        //                     {
        //                         id      : 2,
        //                         selected: true
        //                     }
        //                 ]
        //             },
        //             channelsLogs       : {
        //                 limit  : 9,
        //                 all    : false,
        //                 orderBy: true,
        //                 events : [
        //                     {
        //                         id      : 'group',
        //                         selected: true
        //                     },
        //                     {
        //                         id      : 'channel',
        //                         selected: true
        //                     }
        //                 ]
        //             }
        //         }
        //     },
        //     notifications  : {
        //         groups       : {
        //             creation    : true,
        //             edit        : true,
        //             newMember   : true,
        //             kickedMember: false,
        //             bannedMember: false
        //         },
        //         channels     : {
        //             creation        : true,
        //             edit            : true,
        //             newMember       : true,
        //             kickedMember    : false,
        //             bannedMember    : false,
        //             newMessage      : true,
        //             newMessageTagged: true
        //         },
        //         directMessage: {
        //             newMessage: true
        //         },
        //         other        : {
        //             newFriend: true
        //         }
        //     },
        //     logs           : [
        //         {
        //             date    : 1484561615,
        //             type    : "newGroupCreated",
        //             category: 'group',
        //             values  : {
        //                 name: "Un groupe de test"
        //             }
        //         },
        //         {
        //             date    : 1484561616,
        //             type    : "newGroupJoined",
        //             category: 'group',
        //             values  : {
        //                 name: "Un groupe de test"
        //             }
        //         },
        //         {
        //             date    : 1484561816,
        //             type    : "newGroupJoined",
        //             category: 'group',
        //             values  : {
        //                 name: "Supinfo"
        //             }
        //         },
        //         {
        //             date    : 1484561916,
        //             type    : "newChannelCreated",
        //             category: 'channel',
        //             values  : {
        //                 name: "Bar"
        //             }
        //         },
        //         {
        //             date    : 1484561917,
        //             type    : "newChannelJoined",
        //             category: 'channel',
        //             values  : {
        //                 name: "Bar"
        //             }
        //         },
        //         {
        //             date    : 1484561997,
        //             type    : "channelEdited",
        //             category: 'channel',
        //             values  : {
        //                 name: "Bar"
        //             }
        //         },
        //         {
        //             date    : 1484562017,
        //             type    : "channelLeft",
        //             category: 'channel',
        //             values  : {
        //                 name: "Bar"
        //             }
        //         },
        //         {
        //             date    : 1484562117,
        //             type    : "groupLeft",
        //             category: 'group',
        //             values  : {
        //                 name: "Supinfo"
        //             }
        //         },
        //         {
        //             date    : 1484563117,
        //             type    : "groupEdited",
        //             category: 'group',
        //             values  : {
        //                 name: "Un groupe de test"
        //             }
        //         },
        //         {
        //             date    : 1484564117,
        //             type    : "groupInvitationSentOne",
        //             category: 'group',
        //             values  : {
        //                 name: "Un groupe de test",
        //                 user: "170862@supinfo.com"
        //             }
        //         },
        //         {
        //             date    : 1484564117,
        //             type    : "groupInvitationSentMany",
        //             category: 'group',
        //             values  : {
        //                 name    : "Un groupe de test",
        //                 quantity: 8
        //             }
        //         },
        //         {
        //             date    : 1484564117,
        //             type    : "channelInvitationSentOne",
        //             category: 'channel',
        //             values  : {
        //                 name: "Lol",
        //                 user: "170862@supinfo.com"
        //             }
        //         },
        //         {
        //             date    : 1484564117,
        //             type    : "channelInvitationSentMany",
        //             category: 'channel',
        //             values  : {
        //                 name    : "Lol",
        //                 quantity: 4
        //             }
        //         },
        //         {
        //             date    : 1484564118,
        //             type    : "socialInvitationSent",
        //             category: 'social',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco"
        //             }
        //         },
        //         {
        //             date    : 1484564120,
        //             type    : "socialUserBlocked",
        //             category: 'social',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco"
        //             }
        //         },
        //         {
        //             date    : 1484564121,
        //             type    : "socialUserRemoved",
        //             category: 'social',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco"
        //             }
        //         },
        //         {
        //             date    : 1484564122,
        //             type    : "socialUserUnblocked",
        //             category: 'social',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco"
        //             }
        //         },
        //         {
        //             date    : 1484564123,
        //             type    : "socialInvitationAccepted",
        //             category: 'social',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco"
        //             }
        //         },
        //         {
        //             date    : 1484564124,
        //             type    : "socialUserRenamed",
        //             category: 'social',
        //             values  : {
        //                 userId   : 1,
        //                 userName : "@Marco",
        //                 userAlias: "PGM"
        //             }
        //         },
        //         {
        //             date    : 1484564125,
        //             type    : "socialUserAliasRemoved",
        //             category: 'social',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco"
        //             }
        //         },
        //         {
        //             date    : 1484564126,
        //             type    : "groupPermissionsGranted",
        //             category: 'group',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco",
        //                 name    : "Les junkies"
        //             }
        //         },
        //         {
        //             date    : 1484564126,
        //             type    : "groupPermissionsRevoked",
        //             category: 'group',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco",
        //                 name    : "Les junkies"
        //             }
        //         },
        //         {
        //             date    : 1484564126,
        //             type    : "groupUserKicked",
        //             category: 'group',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco",
        //                 name    : "Les junkies"
        //             }
        //         },
        //         {
        //             date    : 1484564126,
        //             type    : "groupUserBanned",
        //             category: 'group',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco",
        //                 name    : "Les junkies"
        //             }
        //         },
        //         {
        //             date    : 1484564126,
        //             type    : "groupUserUnbanned",
        //             category: 'group',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco",
        //                 name    : "Les junkies"
        //             }
        //         },
        //         {
        //             date    : 1484564127,
        //             type    : "channelPermissionsGranted",
        //             category: 'channel',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco",
        //                 name    : "Les junkies"
        //             }
        //         },
        //         {
        //             date    : 1484564127,
        //             type    : "channelPermissionsRevoked",
        //             category: 'channel',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco",
        //                 name    : "Les junkies"
        //             }
        //         },
        //         {
        //             date    : 1484564127,
        //             type    : "channelUserKicked",
        //             category: 'channel',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco",
        //                 name    : "Les junkies"
        //             }
        //         },
        //         {
        //             date    : 1484564127,
        //             type    : "channelUserBanned",
        //             category: 'channel',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco",
        //                 name    : "Les junkies"
        //             }
        //         },
        //         {
        //             date    : 1484564127,
        //             type    : "channelUserUnbanned",
        //             category: 'channel',
        //             values  : {
        //                 userId  : 1,
        //                 userName: "@Marco",
        //                 name    : "Les junkies"
        //             }
        //         }
        //     ]
        // };
        var user   = [];
        var status = [
            {
                id      : 'online',
                name    : 'other_status_online',
                selected: true,
                color   : '#2ecc71'
            },
            {
                id      : 'absent',
                name    : 'other_status_absent',
                selected: false,
                color   : '#e67e22'
            },
            {
                id      : 'busy',
                name    : 'other_status_busy',
                selected: false,
                color   : '#e74c3c'
            },
            {
                id      : 'off',
                name    : 'other_status_off',
                selected: false,
                color   : '#95a5a6'
            }
        ];

        // Public functions
        return {
            subscribe            : subscribe,
            getUser              : getUser,
            getSettings          : getSettings,
            isConnected          : isConnected,
            logout               : logout,
            setUser              : setUser,
            setUserInLocalStorage: setUserInLocalStorage,
            getFriends           : getFriends,
            getStatus            : getStatus,
            setStatus            : setStatus,
            getAllStatus         : getAllStatus,
            addToStarred         : addToStarred,
            removeToStarred      : removeToStarred,
            httpRequest          : {
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
                refusePendingInvitation          : httpRequestRefusePendingInvitation
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
        function setUser(response) {
            if (response == null) {
                user = null;
            }
            else {
                user          = formatUserData(response);
                user.contacts = [
                    {
                        username: 'Test1',
                        date    : 123,
                        blocked : 0,
                        removed : 0,
                        alias   : ''
                    },
                    {
                        username: 'Test2',
                        date    : 123,
                        blocked : 789123,
                        removed : 0,
                        alias   : ''
                    },
                    {
                        username: 'Test3',
                        date    : 123,
                        blocked : 0,
                        removed : 4567899,
                        alias   : ''
                    },
                    {
                        username: 'Test4',
                        date    : 125593,
                        blocked : 0,
                        removed : 0,
                        alias   : 'Mich mich'
                    }
                ];
                usersFactory.updateUser(user);
            }
            if (CONFIG.dev) {
                cozenEnhancedLogs.info.functionCalled('userFactory', 'setUser');
                console.log(response);
            }
            _notify();
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
                    friend                     = usersFactory.getUserByUsername(user.contacts[i].username);
                    user.contacts[i].givenName = friend.givenName;
                    user.contacts[i].surname   = friend.surname;
                    friends.push(user.contacts[i]);
                }
            }
            return friends;
        }

        // Return the status of the current user
        function getStatus() {
            for (var i = 0, length = status.length; i < length; i++) {
                if (status[i].selected) {
                    return status[i];
                }
            }
        }

        // Update the status for the current user
        function setStatus(status) {
            for (var i = 0, length = status.length; i < length; i++) {
                status[i].selected = false;
            }
            status[status].selected = true;
        }

        // Return the status
        function getAllStatus() {
            return status;
        }

        // Add a channel to the starred
        function addToStarred(channelId) {
            httpRequestAddToStarred({
                id: channelId
            });
            user.starredChannels.push(channelId);
            usersFactory.updateUser(user);
            _notify();
        }

        // Remove a channel to the starred
        function removeToStarred(channelId) {
            httpRequestAddToStarred({
                id: channelId
            });
            var index = user.starredChannels.indexOf(channelId);
            if (index >= 0) {
                user.starredChannels.splice(index, 1);
                usersFactory.updateUser(user);
                _notify();
            }
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
                    goTo.view('app.account.profile');
                })
            ;
        }

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
                    cozenFloatingFeedFactory.addAlert({
                        type : 'info',
                        label: 'alerts_info_logout'
                    });
                })
            ;
        }

        function httpRequestUpdateSettings(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/settings', data, callbackSuccess, callbackError)
                .then(function (response) {
                    setUser(response.data.data);
                    setUserInLocalStorage(response.data.data);
                    cozenFloatingFeedFactory.addAlert({
                        type : 'success',
                        label: 'alerts_success_update_user_settings'
                    });
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
            httpRequest.requestPut('user/' + user.username + '/starredChannels', data, callbackSuccess, callbackError);
        }

        function httpRequestRemoveToStarred(data, callbackSuccess, callbackError) {
            httpRequest.requestPut('user/' + user.username + '/starredChannels', data, callbackSuccess, callbackError);
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
                            type       : 'success',
                            label      : 'alerts_success_send_cogeo_user_invitations',
                            labelValues: {
                                length: data.invitations.length
                            }
                        });
                    }
                    else {
                        cozenFloatingFeedFactory.addAlert({
                            type       : 'success',
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
    }

})(window.angular);