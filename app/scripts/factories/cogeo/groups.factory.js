(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
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

        // var groups = [
        //     {
        //         name       : 'Supinfo',
        //         description: 'Une description',
        //         quicklink  : 'http://localhost:9000/#!/app/fr/groups/join/Supinfo',
        //         creator    : 'C0ZEN',
        //         date       : {
        //             creation  : 1484561615,
        //             lastUpdate: 1484561615
        //         },
        //         picture    : {},
        //         users      : [
        //             {
        //                 username: 'C0ZEN',
        //                 joined  : 1484661615,
        //                 admin   : true,
        //                 hasLeft : 0,
        //                 kicked  : {
        //                     active: false
        //                 },
        //                 banned  : {
        //                     active: false
        //                 }
        //             },
        //             {
        //                 username: 'C0ZEN59',
        //                 joined  : 1484661615,
        //                 admin   : true,
        //                 hasLeft : 0,
        //                 kicked  : {
        //                     active: false
        //                 },
        //                 banned  : {
        //                     active: false
        //                 }
        //             },
        //             {
        //                 username: 'Toto1',
        //                 joined  : 1484561615,
        //                 admin   : false,
        //                 hasLeft : 0,
        //                 kicked  : {
        //                     by    : 'Toto',
        //                     on    : 1484561615,
        //                     for   : '1',
        //                     time  : 3600,
        //                     active: true
        //                 },
        //                 banned  : {
        //                     by    : 'Toto',
        //                     on    : 1484561615,
        //                     for   : '2',
        //                     active: true
        //                 }
        //             },
        //             {
        //                 username: 'Toto2',
        //                 joined  : 1484561615,
        //                 admin   : false,
        //                 hasLeft : 0,
        //                 kicked  : {
        //                     by    : 'Toto',
        //                     on    : 1484561615,
        //                     for   : '3',
        //                     time  : 3600,
        //                     active: true
        //                 },
        //                 banned  : {
        //                     by    : 'Toto',
        //                     on    : 1484561615,
        //                     for   : '4',
        //                     active: false
        //                 }
        //             },
        //             {
        //                 username: 'Toto3',
        //                 joined  : 1484561615,
        //                 admin   : false,
        //                 hasLeft : 0,
        //                 kicked  : {
        //                     by    : 'Toto',
        //                     on    : 1484561615,
        //                     for   : '5',
        //                     time  : 3600,
        //                     active: false
        //                 },
        //                 banned  : {
        //                     by    : 'Toto',
        //                     on    : 1484561615,
        //                     for   : 'x',
        //                     active: false
        //                 }
        //             },
        //             {
        //                 username: 'Toto4',
        //                 joined  : 1484561615,
        //                 admin   : false,
        //                 hasLeft : 0,
        //                 kicked  : {
        //                     by    : 'Toto',
        //                     on    : 1484561615,
        //                     for   : '1',
        //                     time  : 3600,
        //                     active: false
        //                 },
        //                 banned  : {
        //                     by    : 'Toto',
        //                     on    : 1484561615,
        //                     for   : '2',
        //                     active: true
        //                 }
        //             }
        //         ],
        //         invitations: [
        //             {
        //                 _id     : 'zfzefzfz',
        //                 username: 'Totzefzeo',
        //                 sentBy  : 'C0ZEN',
        //                 status  : {
        //                     date    : 1484561615,
        //                     response: 1
        //                 }
        //             },
        //             {
        //                 _id     : 'zfzefzfz',
        //                 username: 'User1',
        //                 sentBy  : 'C0ZEN',
        //                 status  : {
        //                     date    : 1484561615,
        //                     response: 0
        //                 }
        //             },
        //             {
        //                 _id     : 'zfzefzfz',
        //                 username: 'Totfzefzefzefo',
        //                 sentBy  : 'C0ZEN',
        //                 status  : {
        //                     date    : 1484561615,
        //                     response: 0
        //                 }
        //             },
        //             {
        //                 _id     : 'zfzefzfz',
        //                 username: 'Toto',
        //                 sentBy  : 'C0ZEN',
        //                 status  : {
        //                     date    : 1484561615,
        //                     response: 2
        //                 }
        //             }
        //         ],
        //         logs       : [
        //             {
        //                 date    : 1484561616,
        //                 type    : "newGroupJoined",
        //                 category: 'group',
        //                 values  : {
        //                     userName: "@C0ZEN"
        //                 }
        //             },
        //             {
        //                 date    : 1484561816,
        //                 type    : "newGroupJoined",
        //                 category: 'group',
        //                 values  : {
        //                     userName: "@C0ZEN"
        //                 }
        //             },
        //             {
        //                 date    : 1484561916,
        //                 type    : "newChannelCreated",
        //                 category: 'channel',
        //                 values  : {
        //                     name    : "Bar",
        //                     userName: "@C0ZEN"
        //                 }
        //             },
        //             {
        //                 date    : 1484561917,
        //                 type    : "newChannelJoined",
        //                 category: 'channel',
        //                 values  : {
        //                     name    : "Bar",
        //                     userName: "@C0ZEN"
        //                 }
        //             },
        //             {
        //                 date    : 1484561997,
        //                 type    : "channelEdited",
        //                 category: 'channel',
        //                 values  : {
        //                     name    : "Bar",
        //                     userName: "@C0ZEN"
        //                 }
        //             },
        //             {
        //                 date    : 1484562017,
        //                 type    : "channelLeft",
        //                 category: 'channel',
        //                 values  : {
        //                     name    : "Bar",
        //                     userName: "@C0ZEN"
        //                 }
        //             },
        //             {
        //                 date    : 1484562117,
        //                 type    : "groupLeft",
        //                 category: 'group',
        //                 values  : {
        //                     userName: "@C0ZEN"
        //                 }
        //             },
        //             {
        //                 date    : 1484563117,
        //                 type    : "groupEdited",
        //                 category: 'group',
        //                 values  : {
        //                     userName: "@C0ZEN"
        //                 }
        //             },
        //             {
        //                 date    : 1484564117,
        //                 type    : "groupInvitationSentOne",
        //                 category: 'group',
        //                 values  : {
        //                     userName        : "@C0ZEN",
        //                     userEmailInvited: "170862@supinfo.com"
        //                 }
        //             },
        //             {
        //                 date    : 1484564117,
        //                 type    : "groupInvitationSentMany",
        //                 category: 'group',
        //                 values  : {
        //                     userName: "@C0ZEN",
        //                     quantity: 8
        //                 }
        //             },
        //             {
        //                 date    : 1484564117,
        //                 type    : "channelInvitationSentOne",
        //                 category: 'channel',
        //                 values  : {
        //                     name            : "Lol",
        //                     userName        : "@C0ZEN",
        //                     userEmailInvited: "170862@supinfo.com"
        //                 }
        //             },
        //             {
        //                 date    : 1484564117,
        //                 type    : "channelInvitationSentMany",
        //                 category: 'channel',
        //                 values  : {
        //                     name    : "Lol",
        //                     userName: "@C0ZEN",
        //                     quantity: 4
        //                 }
        //             },
        //             {
        //                 date    : 1484564126,
        //                 type    : "groupPermissionsGranted",
        //                 category: 'group',
        //                 values  : {
        //                     userName       : "@C0ZEN",
        //                     userNameGranted: "@Marco"
        //                 }
        //             },
        //             {
        //                 date    : 1484564126,
        //                 type    : "groupPermissionsRevoked",
        //                 category: 'group',
        //                 values  : {
        //                     userNameRevoked: "@Marco",
        //                     userName       : "@C0ZEN"
        //                 }
        //             },
        //             {
        //                 date    : 1484564126,
        //                 type    : "groupUserKicked",
        //                 category: 'group',
        //                 values  : {
        //                     userName      : "@C0ZEN",
        //                     userNameKicked: "@Marco"
        //                 }
        //             },
        //             {
        //                 date    : 1484564126,
        //                 type    : "groupUserBanned",
        //                 category: 'group',
        //                 values  : {
        //                     userName      : "@C0ZEN",
        //                     userNameBanned: "@Marco"
        //                 }
        //             },
        //             {
        //                 date    : 1484564126,
        //                 type    : "groupUserUnbanned",
        //                 category: 'group',
        //                 values  : {
        //                     userName        : "@C0ZEN",
        //                     userNameUnbanned: "@Marco"
        //                 }
        //             },
        //             {
        //                 date    : 1484564127,
        //                 type    : "channelPermissionsGranted",
        //                 category: 'channel',
        //                 values  : {
        //                     userName       : "@C0ZEN",
        //                     userNameGranted: "@Marco",
        //                     name           : "Les junkies"
        //                 }
        //             },
        //             {
        //                 date    : 1484564127,
        //                 type    : "channelPermissionsRevoked",
        //                 category: 'channel',
        //                 values  : {
        //                     userName       : "@C0ZEN",
        //                     userNameRevoked: "@Marco",
        //                     name           : "Les junkies"
        //                 }
        //             },
        //             {
        //                 date    : 1484564127,
        //                 type    : "channelUserKicked",
        //                 category: 'channel',
        //                 values  : {
        //                     userName      : "@C0ZEN",
        //                     userNameKicked: "@Marco",
        //                     name          : "Les junkies"
        //                 }
        //             },
        //             {
        //                 date    : 1484564127,
        //                 type    : "channelUserBanned",
        //                 category: 'channel',
        //                 values  : {
        //                     userName      : "@C0ZEN",
        //                     userNameBanned: "@Marco",
        //                     name          : "Les junkies"
        //                 }
        //             },
        //             {
        //                 date    : 1484564127,
        //                 type    : "channelUserUnbanned",
        //                 category: 'channel',
        //                 values  : {
        //                     userName        : "@C0ZEN",
        //                     userNameUnbanned: "@Marco",
        //                     name            : "Les junkies"
        //                 }
        //             }
        //         ],
        //         channels   : [
        //             {
        //                 id         : 'a',
        //                 name       : 'Membre public',
        //                 private    : false,
        //                 picture    : {},
        //                 date       : {
        //                     creation  : 1484561615,
        //                     lastUpdate: 1484561615
        //                 },
        //                 creator    : 'C0ZEgN',
        //                 description: 'Une description',
        //                 default    : true,
        //                 users      : [
        //                     {
        //                         username: 'C0ZEN',
        //                         joined  : 1484661615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'C0ZEN59',
        //                         joined  : 1484661615,
        //                         admin   : true,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '3',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '4',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '5',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : 'x',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     }
        //                 ],
        //                 invitations: [
        //                     {
        //                         _id     : 'zfzefzfz',
        //                         username: 'Totzefzeo',
        //                         sentBy  : 'C0ZEN',
        //                         status  : {
        //                             date    : 1484561615,
        //                             response: 1
        //                         }
        //                     },
        //                     {
        //                         _id     : 'zfzefzfz',
        //                         username: 'User1',
        //                         sentBy  : 'C0ZEN',
        //                         status  : {
        //                             date    : 1484561615,
        //                             response: 0
        //                         }
        //                     },
        //                     {
        //                         _id     : 'zfzefzfz',
        //                         username: 'Totfzefzefzefo',
        //                         sentBy  : 'C0ZEN',
        //                         status  : {
        //                             date    : 1484561615,
        //                             response: 0
        //                         }
        //                     },
        //                     {
        //                         _id     : 'zfzefzfz',
        //                         username: 'Toto',
        //                         sentBy  : 'C0ZEN',
        //                         status  : {
        //                             date    : 1484561615,
        //                             response: 2
        //                         }
        //                     }
        //                 ],
        //                 logs       : [
        //                     {
        //                         date    : 1484561916,
        //                         type    : "newChannelCreated",
        //                         category: 'channel',
        //                         values  : {
        //                             name    : "Bar",
        //                             userName: "@C0ZEN"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484561917,
        //                         type    : "newChannelJoined",
        //                         category: 'channel',
        //                         values  : {
        //                             name    : "Bar",
        //                             userName: "@C0ZEN"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484561997,
        //                         type    : "channelEdited",
        //                         category: 'channel',
        //                         values  : {
        //                             name    : "Bar",
        //                             userName: "@C0ZEN"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484562017,
        //                         type    : "channelLeft",
        //                         category: 'channel',
        //                         values  : {
        //                             name    : "Bar",
        //                             userName: "@C0ZEN"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564117,
        //                         type    : "channelInvitationSentOne",
        //                         category: 'channel',
        //                         values  : {
        //                             name            : "Lol",
        //                             userName        : "@C0ZEN",
        //                             userEmailInvited: "170862@supinfo.com"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564117,
        //                         type    : "channelInvitationSentMany",
        //                         category: 'channel',
        //                         values  : {
        //                             name    : "Lol",
        //                             userName: "@C0ZEN",
        //                             quantity: 4
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564127,
        //                         type    : "channelPermissionsGranted",
        //                         category: 'channel',
        //                         values  : {
        //                             userName       : "@C0ZEN",
        //                             userNameGranted: "@Marco",
        //                             name           : "Les junkies"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564127,
        //                         type    : "channelPermissionsRevoked",
        //                         category: 'channel',
        //                         values  : {
        //                             userName       : "@C0ZEN",
        //                             userNameRevoked: "@Marco",
        //                             name           : "Les junkies"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564127,
        //                         type    : "channelUserKicked",
        //                         category: 'channel',
        //                         values  : {
        //                             userName      : "@C0ZEN",
        //                             userNameKicked: "@Marco",
        //                             name          : "Les junkies"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564127,
        //                         type    : "channelUserBanned",
        //                         category: 'channel',
        //                         values  : {
        //                             userName      : "@C0ZEN",
        //                             userNameBanned: "@Marco",
        //                             name          : "Les junkies"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564127,
        //                         type    : "channelUserUnbanned",
        //                         category: 'channel',
        //                         values  : {
        //                             userName        : "@C0ZEN",
        //                             userNameUnbanned: "@Marco",
        //                             name            : "Les junkies"
        //                         }
        //                     }
        //                 ],
        //                 messages   : [
        //                     {
        //                         id     : '1',
        //                         sender : 'C0ZEN',
        //                         sent   : 1484561615,
        //                         content: 'Bonjour !',
        //                         edited : 0,
        //                         type   : 'user'
        //                     },
        //                     {
        //                         id     : '2',
        //                         sender : 'Marco',
        //                         sent   : 1484562715,
        //                         content: 'Hello, ça va ?!?',
        //                         edited : 1484562915,
        //                         type   : 'user'
        //                     },
        //                     {
        //                         id     : '3',
        //                         sender : 'Spamobot',
        //                         sent   : 1484562715,
        //                         content: 'Bienvenu !',
        //                         type   : 'bot'
        //                     },
        //                     {
        //                         id     : '4',
        //                         sender : 'Friendybot',
        //                         sent   : 1484562715,
        //                         content: 'Yo !',
        //                         type   : 'bot'
        //                     }
        //                 ]
        //             },
        //             {
        //                 id         : 'daddaa',
        //                 name       : 'Membre public super long pour test la longueur',
        //                 private    : false,
        //                 picture    : {},
        //                 date       : {
        //                     creation  : 1484561615,
        //                     lastUpdate: 1484561615
        //                 },
        //                 creator    : 'C0ZEN',
        //                 description: 'Une description',
        //                 default    : true,
        //                 users      : [
        //                     {
        //                         username: 'C0ZEN',
        //                         joined  : 1484661615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'C0ZEN59',
        //                         joined  : 1484661615,
        //                         admin   : true,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '3',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '4',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '5',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : 'x',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     }
        //                 ],
        //                 invitations: [
        //                     {
        //                         _id     : 'zfzefzfz',
        //                         username: 'Totzefzeo',
        //                         sentBy  : 'C0ZEN',
        //                         status  : {
        //                             date    : 1484561615,
        //                             response: 1
        //                         }
        //                     },
        //                     {
        //                         _id     : 'zfzefzfz',
        //                         username: 'User1',
        //                         sentBy  : 'C0ZEN',
        //                         status  : {
        //                             date    : 1484561615,
        //                             response: 0
        //                         }
        //                     },
        //                     {
        //                         _id     : 'zfzefzfz',
        //                         username: 'Totfzefzefzefo',
        //                         sentBy  : 'C0ZEN',
        //                         status  : {
        //                             date    : 1484561615,
        //                             response: 0
        //                         }
        //                     },
        //                     {
        //                         _id     : 'zfzefzfz',
        //                         username: 'Toto',
        //                         sentBy  : 'C0ZEN',
        //                         status  : {
        //                             date    : 1484561615,
        //                             response: 2
        //                         }
        //                     }
        //                 ],
        //                 logs       : [
        //                     {
        //                         date    : 1484561916,
        //                         type    : "newChannelCreated",
        //                         category: 'channel',
        //                         values  : {
        //                             name    : "Bar",
        //                             userName: "@C0ZEN"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484561917,
        //                         type    : "newChannelJoined",
        //                         category: 'channel',
        //                         values  : {
        //                             name    : "Bar",
        //                             userName: "@C0ZEN"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484561997,
        //                         type    : "channelEdited",
        //                         category: 'channel',
        //                         values  : {
        //                             name    : "Bar",
        //                             userName: "@C0ZEN"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484562017,
        //                         type    : "channelLeft",
        //                         category: 'channel',
        //                         values  : {
        //                             name    : "Bar",
        //                             userName: "@C0ZEN"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564117,
        //                         type    : "channelInvitationSentOne",
        //                         category: 'channel',
        //                         values  : {
        //                             name            : "Lol",
        //                             userName        : "@C0ZEN",
        //                             userEmailInvited: "170862@supinfo.com"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564117,
        //                         type    : "channelInvitationSentMany",
        //                         category: 'channel',
        //                         values  : {
        //                             name    : "Lol",
        //                             userName: "@C0ZEN",
        //                             quantity: 4
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564127,
        //                         type    : "channelPermissionsGranted",
        //                         category: 'channel',
        //                         values  : {
        //                             userName       : "@C0ZEN",
        //                             userNameGranted: "@Marco",
        //                             name           : "Les junkies"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564127,
        //                         type    : "channelPermissionsRevoked",
        //                         category: 'channel',
        //                         values  : {
        //                             userName       : "@C0ZEN",
        //                             userNameRevoked: "@Marco",
        //                             name           : "Les junkies"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564127,
        //                         type    : "channelUserKicked",
        //                         category: 'channel',
        //                         values  : {
        //                             userName      : "@C0ZEN",
        //                             userNameKicked: "@Marco",
        //                             name          : "Les junkies"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564127,
        //                         type    : "channelUserBanned",
        //                         category: 'channel',
        //                         values  : {
        //                             userName      : "@C0ZEN",
        //                             userNameBanned: "@Marco",
        //                             name          : "Les junkies"
        //                         }
        //                     },
        //                     {
        //                         date    : 1484564127,
        //                         type    : "channelUserUnbanned",
        //                         category: 'channel',
        //                         values  : {
        //                             userName        : "@C0ZEN",
        //                             userNameUnbanned: "@Marco",
        //                             name            : "Les junkies"
        //                         }
        //                     }
        //                 ]
        //             },
        //             {
        //                 id         : 'aa',
        //                 name       : 'Membre public admin',
        //                 private    : false,
        //                 picture    : {},
        //                 date       : {
        //                     creation  : 1484561615,
        //                     lastUpdate: 1484561615
        //                 },
        //                 creator    : 'C0ZEgN',
        //                 description: 'Une description',
        //                 default    : false,
        //                 users      : [
        //                     {
        //                         username: 'user1',
        //                         joined  : 1484661615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'C0ZEN',
        //                         joined  : 1484661615,
        //                         admin   : true,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '3',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '4',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '5',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : 'x',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     }
        //                 ]
        //             },
        //             {
        //                 id         : 'aadazdad',
        //                 name       : 'Membre public admin créateur',
        //                 private    : false,
        //                 picture    : {},
        //                 date       : {
        //                     creation  : 1484561615,
        //                     lastUpdate: 1484561615
        //                 },
        //                 creator    : 'C0ZEN',
        //                 description: 'Une description',
        //                 default    : false,
        //                 users      : [
        //                     {
        //                         username: 'C0ZEN',
        //                         joined  : 1484661615,
        //                         admin   : true,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     }
        //                 ]
        //             },
        //             {
        //                 id         : 'b',
        //                 name       : 'Membre privé admin',
        //                 private    : true,
        //                 picture    : {},
        //                 date       : {
        //                     creation  : 1484561615,
        //                     lastUpdate: 1484561615
        //                 },
        //                 creator    : 'C0ZgEN',
        //                 description: 'Une description',
        //                 default    : false,
        //                 users      : [
        //                     {
        //                         username: 'C0ZEN',
        //                         joined  : 1484661615,
        //                         admin   : true,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     }
        //                 ]
        //             },
        //             {
        //                 id         : 'c',
        //                 name       : 'Non membre public',
        //                 private    : false,
        //                 picture    : {},
        //                 date       : {
        //                     creation  : 1484561615,
        //                     lastUpdate: 1484561615
        //                 },
        //                 creator    : 'C0ZEgN',
        //                 description: 'Une description',
        //                 default    : true,
        //                 users      : [
        //                     {
        //                         username: 'C0ZEgegN',
        //                         joined  : 1484661615,
        //                         admin   : true,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     }
        //                 ]
        //             },
        //             {
        //                 id         : 'd',
        //                 name       : 'Non membre privé',
        //                 private    : true,
        //                 picture    : {},
        //                 date       : {
        //                     creation  : 1484561615,
        //                     lastUpdate: 1484561615
        //                 },
        //                 creator    : 'C0ZEgregN',
        //                 description: 'Une description',
        //                 default    : true,
        //                 users      : [
        //                     {
        //                         username: 'C0ZEggN',
        //                         joined  : 1484661615,
        //                         admin   : true,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     }
        //                 ]
        //             },
        //             {
        //                 id         : 'dazdazdazdazsa',
        //                 name       : 'Non membre privé 2',
        //                 private    : true,
        //                 picture    : {},
        //                 date       : {
        //                     creation  : 1484561615,
        //                     lastUpdate: 1484561615
        //                 },
        //                 creator    : 'C0ZEgregN',
        //                 description: 'Une description',
        //                 default    : true,
        //                 users      : [
        //                     {
        //                         username: 'C0ZEggN',
        //                         joined  : 1484661615,
        //                         admin   : true,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         name       : 'Supinfo2',
        //         description: 'Une description',
        //         quicklink  : 'http://cogeo.com/app/fr/invites/group/Supinfo2',
        //         creator    : 'Cger0ZEN',
        //         date       : {
        //             creation  : 1484561615,
        //             lastUpdate: 1484561615
        //         },
        //         users      : [
        //             {
        //                 username: 'C0ZEN',
        //                 joined  : 1484561615,
        //                 admin   : false,
        //                 hasLeft : 0,
        //                 kicked  : {
        //                     active: false
        //                 },
        //                 banned  : {
        //                     active: false
        //                 }
        //             }
        //         ],
        //         channels   : [
        //             {
        //                 id         : '111',
        //                 name       : '111',
        //                 private    : false,
        //                 picture    : {},
        //                 date       : {
        //                     creation  : 1484561615,
        //                     lastUpdate: 1484561615
        //                 },
        //                 creator    : 'C0ZEgN',
        //                 description: 'Une description',
        //                 default    : false,
        //                 users      : [
        //                     {
        //                         username: 'C0ZEN',
        //                         joined  : 1484661615,
        //                         admin   : true,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '3',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '4',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '5',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : 'x',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         name       : 'zefzefzef',
        //         description: 'Une description',
        //         quicklink  : 'http://cogeo.com/app/fr/invites/group/zefzefzef',
        //         creator    : 'C0ZEgegN',
        //         date       : {
        //             creation  : 1484561615,
        //             lastUpdate: 1484561615
        //         },
        //         users      : [
        //             {
        //                 username: 'C0ZEN',
        //                 joined  : 1484561615,
        //                 admin   : false,
        //                 hasLeft : 1484561615,
        //                 kicked  : {
        //                     by    : 'Toto',
        //                     on    : 1484561615,
        //                     for   : '1',
        //                     time  : 3600,
        //                     active: true
        //                 },
        //                 banned  : {
        //                     by    : 'Toto',
        //                     on    : 1484561615,
        //                     for   : '2',
        //                     active: true
        //                 }
        //             }
        //         ],
        //         channels   : [
        //             {
        //                 id         : '222',
        //                 name       : '222',
        //                 private    : false,
        //                 picture    : {},
        //                 date       : {
        //                     creation  : 1484561615,
        //                     lastUpdate: 1484561615
        //                 },
        //                 creator    : 'C0ZEgN',
        //                 description: 'Une description',
        //                 default    : false,
        //                 users      : [
        //                     {
        //                         username: 'C0ZEN',
        //                         joined  : 1484661615,
        //                         admin   : true,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '3',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '4',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '5',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : 'x',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         name       : '4PJT',
        //         description: 'Une description',
        //         quicklink  : 'http://cogeo.com/app/fr/invites/group/4PJT',
        //         creator    : 'C0ZegeEN',
        //         date       : {
        //             creation  : 1484561615,
        //             lastUpdate: 1484561615
        //         },
        //         users      : [
        //             {
        //                 username: 'zfzef',
        //                 joined  : 1484561615,
        //                 admin   : true,
        //                 hasLeft : 0,
        //                 kicked  : {
        //                     active: false
        //                 },
        //                 banned  : {
        //                     active: false
        //                 }
        //             }
        //         ],
        //         channels   : [
        //             {
        //                 id         : '333',
        //                 name       : '333',
        //                 private    : false,
        //                 picture    : {},
        //                 date       : {
        //                     creation  : 1484561615,
        //                     lastUpdate: 1484561615
        //                 },
        //                 creator    : 'C0ZEgN',
        //                 description: 'Une description',
        //                 default    : false,
        //                 users      : [
        //                     {
        //                         username: 'C0ZEN',
        //                         joined  : 1484661615,
        //                         admin   : true,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '3',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '4',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '5',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : 'x',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     }
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         name       : '3PJT',
        //         description: 'Une description description description description description description description description description description',
        //         quicklink  : 'http://cogeo.com/app/fr/invites/group/3PJT',
        //         creator    : 'C0ZeggegegeeEN',
        //         date       : {
        //             creation  : 1484561615,
        //             lastUpdate: 1484561615
        //         },
        //         users      : [
        //             {
        //                 username: 'C0ZEN',
        //                 joined  : 1484661615,
        //                 admin   : true,
        //                 hasLeft : 0,
        //                 kicked  : {
        //                     active: false
        //                 },
        //                 banned  : {
        //                     active: false
        //                 }
        //             }
        //         ],
        //         channels   : [
        //             {
        //                 id         : '555',
        //                 name       : '555',
        //                 private    : false,
        //                 picture    : {},
        //                 date       : {
        //                     creation  : 1484561615,
        //                     lastUpdate: 1484561615
        //                 },
        //                 creator    : 'C0ZEgN',
        //                 description: 'Une description',
        //                 default    : false,
        //                 users      : [
        //                     {
        //                         username: 'C0ZEN',
        //                         joined  : 1484661615,
        //                         admin   : true,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             active: false
        //                         },
        //                         banned  : {
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '3',
        //                             time  : 3600,
        //                             active: true
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '4',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '5',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : 'x',
        //                             active: false
        //                         }
        //                     },
        //                     {
        //                         username: 'Toto59',
        //                         joined  : 1484561615,
        //                         admin   : false,
        //                         hasLeft : 0,
        //                         kicked  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '1',
        //                             time  : 3600,
        //                             active: false
        //                         },
        //                         banned  : {
        //                             by    : 'Toto',
        //                             on    : 1484561615,
        //                             for   : '2',
        //                             active: true
        //                         }
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // ];
        var groups = [];

        // Public functions
        return {
            subscribe                     : subscribe,
            getGroups                     : getGroups,
            getGroupByName                : getGroupByName,
            getGroupById                  : getGroupById,
            getGroupByNameWithUserRoles   : getGroupByNameWithUserRoles,
            getUserFromGroup              : getUserFromGroup,
            getGroupsWithUserRoles        : getGroupsWithUserRoles,
            getUserGroups                 : getUserGroups,
            updateGroup                   : updateGroup,
            updateOrPushGroup             : updateOrPushGroup,
            updateGroupWithNewName        : updateGroupWithNewName,
            doesUserHasRights             : doesUserHasRights,
            getAvailableUsers             : getAvailableUsers,
            isUserInGroup                 : isUserInGroup,
            getInvitationForUserFromGroup : getInvitationForUserFromGroup,
            addGroup                      : addGroup,
            getGroupPicture               : getGroupPicture,
            getGroupPictureByGroupId      : getGroupPictureByGroupId,
            getChannelById                : getChannelById,
            getChannelByName              : getChannelByName,
            isUserAdmin                   : isUserAdmin,
            getActiveUsers                : getActiveUsers,
            getUnavailableUsers           : getUnavailableUsers,
            setAllGroups                  : setAllGroups,
            isActiveMember                : isActiveMember,
            getGroupNotLeftMembersQuantity: getGroupNotLeftMembersQuantity,
            httpRequest                   : {
                addGroup            : httpRequestAddGroup,
                isAvailableGroupName: httpRequestIsAvailableGroupName,
                getAllGroups        : httpRequestGetAllGroups,
                updateGroup         : httpRequestUpdateGroup,
                sendCogeoInvitations: httpRequestSendCogeoInvitations,
                sendEmailInvitations: httpRequestSendEmailInvitations
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
            for (var i = 0, length = group.users.length; i < length; i++) {
                if (group.users[i].username == username) {
                    return group.users[i].hasLeft == 0 && !group.users[i].kicked.active && !group.users[i].banned.active;
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
    }

})(window.angular);

