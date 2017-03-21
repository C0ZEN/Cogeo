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
            },
            {
                givenName      : 'Geoffrey',
                surname        : 'Testelin',
                email          : 'geoffrey.testelin@gmail.com',
                username       : 'C0ZEN',
                superAdmin     : true,
                hidden         : {
                    profile: true
                },
                type           : 'user',
                date           : {
                    register  : 1484561615,
                    lastUpdate: 1484561615
                },
                picture        : {
                    name  : "3.jpg",
                    width : 600,
                    height: 600,
                    format: "jpg",
                    url   : "http://res.cloudinary.com/cozen/image/upload/v1485115972/ygfsbbfylq91lq753jyo.jpg"
                },
                bio            : 'ma bio',
                starredChannels: [
                    "a"
                ],
                settings       : {
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
                        logs               : {
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
                        allGroups          : {
                            limit        : 9,
                            all          : false,
                            orderBy      : false,
                            myGroups     : false,
                            myGroupsAdmin: false
                        },
                        groupsMembers      : {
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
                        groupsInvitations  : {
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
                        groupsLog          : {
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
                        allChannels        : {
                            limit          : 9,
                            all            : false,
                            orderBy        : false,
                            myChannels     : false,
                            myChannelsAdmin: false,
                            privateChannels: false,
                            defaultChannels: false
                        },
                        channelsMembers    : {
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
                        channelsInvitations: {
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
                        channelsLogs       : {
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
                        }
                    }
                },
                notifications  : {
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
                logs           : [
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
            }
        ];

        // Public functions
        return {
            getUserFullName  : getUserFullName,
            addUsersFullNames: addUsersFullNames,
            addUserFullName  : addUserFullName,
            getUserByUsername: getUserByUsername,
            getUsers         : getUsers,
            formatUserData   : formatUserData,
            updateUser       : updateUser,
            getUserImage     : getUserImage,
            httpRequest      : {
                getAll: httpRequestGetAll
            }
        };

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
            return $user;
        }

        // Update a specific user by username
        function updateUser(user) {
            for (var i = 0, length = users.length; i < length; i++) {
                if (users[i].username == user.username) {
                    users[i] = user;
                }
            }
        }

        // Get the image profile for this user
        function getUserImage(username) {
            for (var i = 0, length = users.length; i < length; i++) {
                if (users[i].username == username) {
                    if (!Methods.isNullOrEmpty(users[i].picture.url)) {
                        return users[i].picture.url;
                    }
                    else {
                        return 'images/groups/' + username.slice(0, 1).toUpperCase() + '.png';
                    }
                }
            }
            return 'images/other/Cat.png';
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

