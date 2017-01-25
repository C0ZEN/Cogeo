(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .factory('userFactory', userFactory);

  userFactory.$inject = [
    '$state',
    'CONFIG',
    '$stateParams'
  ];

  function userFactory($state, CONFIG, $stateParams) {

    var user = {
      givenName    : 'Testelin',
      surname      : 'Geoffrey',
      email        : 'geoffrey.testelin@gmail.com',
      username     : 'C0ZEN',
      superAdmin   : true,
      private      : {
        profile: true
      },
      type         : 'user',
      date         : {
        register  : 1484561615,
        lastUpdate: 1484561615
      },
      picture      : {
        "$ngfName"    : "3.jpg",
        "$ngfOrigSize": 146126,
        "upload"      : {},
        "result"      : {
          "public_id"        : "ygfsbbfylq91lq753jyo",
          "version"          : 1485115972,
          "signature"        : "439e54b4a9837f4a9f74a9ae219a625762cdcadd",
          "width"            : 600,
          "height"           : 600,
          "format"           : "jpg",
          "resource_type"    : "image",
          "created_at"       : "2017-01-22T20:12:52Z",
          "tags"             : [
            "cozen"
          ],
          "bytes"            : 71142,
          "type"             : "upload",
          "etag"             : "441a0154c495381deb37b1a57f487a33",
          "url"              : "http://res.cloudinary.com/cozen/image/upload/v1485115972/ygfsbbfylq91lq753jyo.jpg",
          "secure_url"       : "https://res.cloudinary.com/cozen/image/upload/v1485115972/ygfsbbfylq91lq753jyo.jpg",
          "context"          : {
            "custom": {
              "photo": "3.jpg"
            }
          },
          "original_filename": "3"
        }
      },
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
          log              : {
            limit  : 9,
            all    : false,
            orderBy: true,
            events : [
              {
                id      : 'group',
                name    : 'account_event_group',
                icon    : 'fa icons8-google-groups',
                color   : 'blue',
                selected: true
              },
              {
                id      : 'channel',
                name    : 'account_event_channel',
                icon    : 'fa icons8-channel-mosaic',
                color   : 'green',
                selected: true
              },
              {
                id      : 'social',
                name    : 'account_event_social',
                icon    : 'fa icons8-user-groups',
                color   : 'purple',
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
                name    : 'groups_kicked',
                icon    : 'fa fa-fw icons8-lock',
                color   : 'yellow',
                selected: true
              },
              {
                id      : 'banned',
                name    : 'groups_banned',
                icon    : 'fa fa-fw icons8-lock',
                color   : 'yellow',
                selected: true
              },
              {
                id      : 'admin',
                name    : 'groups_admin',
                icon    : 'fa fa-fw icons8-user-male',
                color   : 'purple',
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
                name    : 'popup_groupsInvitations_filter_body_rejected',
                icon    : 'fa fa-fw icons8-event-declined-filled',
                color   : 'error',
                selected: true
              },
              {
                id      : 1,
                name    : 'popup_groupsInvitations_filter_body_waiting',
                icon    : 'fa fa-fw icons8-event-accepted-tentatively-filled',
                color   : 'info',
                selected: true
              },
              {
                id      : 2,
                name    : 'popup_groupsInvitations_filter_body_accepted',
                icon    : 'fa fa-fw icons8-event-accepted-filled',
                color   : 'green',
                selected: true
              }
            ]
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
          date  : 1484561615,
          type  : "newGroupCreated",
          event : 'group',
          values: {
            name: "Un groupe de test"
          }
        },
        {
          date  : 1484561616,
          type  : "newGroupJoined",
          event : 'group',
          values: {
            name: "Un groupe de test"
          }
        },
        {
          date  : 1484561816,
          type  : "newGroupJoined",
          event : 'group',
          values: {
            name: "Supinfo"
          }
        },
        {
          date  : 1484561916,
          type  : "newChannelCreated",
          event : 'channel',
          values: {
            name: "Bar"
          }
        },
        {
          date  : 1484561917,
          type  : "newChannelJoined",
          event : 'channel',
          values: {
            name: "Bar"
          }
        },
        {
          date  : 1484561997,
          type  : "channelEdited",
          event : 'channel',
          values: {
            name: "Bar"
          }
        },
        {
          date  : 1484562017,
          type  : "channelLeft",
          event : 'channel',
          values: {
            name: "Bar"
          }
        },
        {
          date  : 1484562117,
          type  : "groupLeft",
          event : 'group',
          values: {
            name: "Supinfo"
          }
        },
        {
          date  : 1484563117,
          type  : "groupEdited",
          event : 'group',
          values: {
            name: "Un groupe de test"
          }
        },
        {
          date  : 1484564117,
          type  : "groupInvitationSentOne",
          event : 'group',
          values: {
            name: "Un groupe de test",
            user: "170862@supinfo.com"
          }
        },
        {
          date  : 1484564117,
          type  : "groupInvitationSentMany",
          event : 'group',
          values: {
            name    : "Un groupe de test",
            quantity: 8
          }
        },
        {
          date  : 1484564117,
          type  : "channelInvitationSentOne",
          event : 'channel',
          values: {
            name: "Lol",
            user: "170862@supinfo.com"
          }
        },
        {
          date  : 1484564117,
          type  : "channelInvitationSentMany",
          event : 'channel',
          values: {
            name    : "Lol",
            quantity: 4
          }
        },
        {
          date  : 1484564118,
          type  : "socialInvitationSent",
          event : 'social',
          values: {
            userId  : 1,
            userName: "@Marco"
          }
        },
        {
          date  : 1484564120,
          type  : "socialUserBlocked",
          event : 'social',
          values: {
            userId  : 1,
            userName: "@Marco"
          }
        },
        {
          date  : 1484564121,
          type  : "socialUserRemoved",
          event : 'social',
          values: {
            userId  : 1,
            userName: "@Marco"
          }
        },
        {
          date  : 1484564122,
          type  : "socialUserUnblocked",
          event : 'social',
          values: {
            userId  : 1,
            userName: "@Marco"
          }
        },
        {
          date  : 1484564123,
          type  : "socialInvitationAccepted",
          event : 'social',
          values: {
            userId  : 1,
            userName: "@Marco"
          }
        },
        {
          date  : 1484564124,
          type  : "socialUserRenamed",
          event : 'social',
          values: {
            userId   : 1,
            userName : "@Marco",
            userAlias: "PGM"
          }
        },
        {
          date  : 1484564125,
          type  : "socialUserAliasRemoved",
          event : 'social',
          values: {
            userId  : 1,
            userName: "@Marco"
          }
        },
        {
          date  : 1484564126,
          type  : "groupPermissionsGranted",
          event : 'group',
          values: {
            userId  : 1,
            userName: "@Marco",
            name    : "Les junkies"
          }
        },
        {
          date  : 1484564126,
          type  : "groupPermissionsRevoked",
          event : 'group',
          values: {
            userId  : 1,
            userName: "@Marco",
            name    : "Les junkies"
          }
        },
        {
          date  : 1484564126,
          type  : "groupUserKicked",
          event : 'group',
          values: {
            userId  : 1,
            userName: "@Marco",
            name    : "Les junkies"
          }
        },
        {
          date  : 1484564126,
          type  : "groupUserBanned",
          event : 'group',
          values: {
            userId  : 1,
            userName: "@Marco",
            name    : "Les junkies"
          }
        },
        {
          date  : 1484564126,
          type  : "groupUserUnbanned",
          event : 'group',
          values: {
            userId  : 1,
            userName: "@Marco",
            name    : "Les junkies"
          }
        },
        {
          date  : 1484564127,
          type  : "channelPermissionsGranted",
          event : 'channel',
          values: {
            userId  : 1,
            userName: "@Marco",
            name    : "Les junkies"
          }
        },
        {
          date  : 1484564127,
          type  : "channelPermissionsRevoked",
          event : 'channel',
          values: {
            userId  : 1,
            userName: "@Marco",
            name    : "Les junkies"
          }
        },
        {
          date  : 1484564127,
          type  : "channelUserKicked",
          event : 'channel',
          values: {
            userId  : 1,
            userName: "@Marco",
            name    : "Les junkies"
          }
        },
        {
          date  : 1484564127,
          type  : "channelUserBanned",
          event : 'channel',
          values: {
            userId  : 1,
            userName: "@Marco",
            name    : "Les junkies"
          }
        },
        {
          date  : 1484564127,
          type  : "channelUserUnbanned",
          event : 'channel',
          values: {
            userId  : 1,
            userName: "@Marco",
            name    : "Les junkies"
          }
        }
      ]
    };

    // Public functions
    return {
      getUser    : getUser,
      getSettings: getSettings
    };

    function getUser() {
      return user;
    }

    function getSettings() {
      return user.settings;
    }
  }

})(window.angular);

