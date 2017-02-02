(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .factory('groupsFactory', groupsFactory);

  groupsFactory.$inject = [
    '$state',
    'CONFIG',
    '$stateParams',
    '$filter'
  ];

  function groupsFactory($state, CONFIG, $stateParams, $filter) {

    var groups = [
      {
        name       : 'Supinfo',
        description: 'Une description',
        quicklink  : 'http://localhost:9000/#!/app/fr/groups/join/Supinfo',
        creator    : 'C0ZEN',
        date       : {
          creation  : 1484561615,
          lastUpdate: 1484561615
        },
        users      : [
          {
            username: 'C0ZEN',
            joined  : 1484661615,
            admin   : true,
            hasLeft : 0,
            kicked  : {
              active: false
            },
            banned  : {
              active: false
            }
          },
          {
            username: 'C0ZEN59',
            joined  : 1484661615,
            admin   : true,
            hasLeft : 0,
            kicked  : {
              active: false
            },
            banned  : {
              active: false
            }
          },
          {
            username: 'Toto59',
            joined  : 1484561615,
            admin   : false,
            hasLeft : 0,
            kicked  : {
              by    : 'Toto',
              on    : 1484561615,
              for   : 'Il a pas dit bonjour',
              time  : 3600,
              active: true
            },
            banned  : {
              by    : 'Toto',
              on    : 1484561615,
              for   : 'Il a pas dit bonjour',
              active: true
            }
          },
          {
            username: 'Toto59',
            joined  : 1484561615,
            admin   : false,
            hasLeft : 0,
            kicked  : {
              by    : 'Toto',
              on    : 1484561615,
              for   : 'Il a pas dit bonjour',
              time  : 3600,
              active: true
            },
            banned  : {
              by    : 'Toto',
              on    : 1484561615,
              for   : 'Il a pas dit bonjour',
              active: false
            }
          },
          {
            username: 'Toto59',
            joined  : 1484561615,
            admin   : false,
            hasLeft : 0,
            kicked  : {
              by    : 'Toto',
              on    : 1484561615,
              for   : 'Il a pas dit bonjour',
              time  : 3600,
              active: false
            },
            banned  : {
              by    : 'Toto',
              on    : 1484561615,
              for   : 'Il a pas dit bonjour',
              active: false
            }
          },
          {
            username: 'Toto59',
            joined  : 1484561615,
            admin   : false,
            hasLeft : 0,
            kicked  : {
              by    : 'Toto',
              on    : 1484561615,
              for   : 'Il a pas dit bonjour',
              time  : 3600,
              active: false
            },
            banned  : {
              by    : 'Toto',
              on    : 1484561615,
              for   : 'Il a pas dit bonjour',
              active: true
            }
          }
        ],
        invitations: [
          {
            _id     : 'zfzefzfz',
            username: 'Totzefzeo',
            status  : {
              date    : 1484561615,
              response: 1
            }
          },
          {
            _id     : 'zfzefzfz',
            username: 'Totfzefzefzefo',
            status  : {
              date    : 1484561615,
              response: 0
            }
          },
          {
            _id     : 'zfzefzfz',
            username: 'Toto',
            status  : {
              date    : 1484561615,
              response: 2
            }
          }
        ],
        logs       : [
          {
            date  : 1484561616,
            type  : "newGroupJoined",
            event : 'group',
            values: {
              userName: "@C0ZEN"
            }
          },
          {
            date  : 1484561816,
            type  : "newGroupJoined",
            event : 'group',
            values: {
              userName: "@C0ZEN"
            }
          },
          {
            date  : 1484561916,
            type  : "newChannelCreated",
            event : 'channel',
            values: {
              name    : "Bar",
              userName: "@C0ZEN"
            }
          },
          {
            date  : 1484561917,
            type  : "newChannelJoined",
            event : 'channel',
            values: {
              name    : "Bar",
              userName: "@C0ZEN"
            }
          },
          {
            date  : 1484561997,
            type  : "channelEdited",
            event : 'channel',
            values: {
              name    : "Bar",
              userName: "@C0ZEN"
            }
          },
          {
            date  : 1484562017,
            type  : "channelLeft",
            event : 'channel',
            values: {
              name    : "Bar",
              userName: "@C0ZEN"
            }
          },
          {
            date  : 1484562117,
            type  : "groupLeft",
            event : 'group',
            values: {
              userName: "@C0ZEN"
            }
          },
          {
            date  : 1484563117,
            type  : "groupEdited",
            event : 'group',
            values: {
              userName: "@C0ZEN"
            }
          },
          {
            date  : 1484564117,
            type  : "groupInvitationSentOne",
            event : 'group',
            values: {
              userName        : "@C0ZEN",
              userEmailInvited: "170862@supinfo.com"
            }
          },
          {
            date  : 1484564117,
            type  : "groupInvitationSentMany",
            event : 'group',
            values: {
              userName: "@C0ZEN",
              quantity: 8
            }
          },
          {
            date  : 1484564117,
            type  : "channelInvitationSentOne",
            event : 'channel',
            values: {
              name            : "Lol",
              userName        : "@C0ZEN",
              userEmailInvited: "170862@supinfo.com"
            }
          },
          {
            date  : 1484564117,
            type  : "channelInvitationSentMany",
            event : 'channel',
            values: {
              name    : "Lol",
              userName: "@C0ZEN",
              quantity: 4
            }
          },
          {
            date  : 1484564126,
            type  : "groupPermissionsGranted",
            event : 'group',
            values: {
              userName       : "@C0ZEN",
              userNameGranted: "@Marco"
            }
          },
          {
            date  : 1484564126,
            type  : "groupPermissionsRevoked",
            event : 'group',
            values: {
              userNameRevoked: "@Marco",
              userName       : "@C0ZEN"
            }
          },
          {
            date  : 1484564126,
            type  : "groupUserKicked",
            event : 'group',
            values: {
              userName      : "@C0ZEN",
              userNameKicked: "@Marco"
            }
          },
          {
            date  : 1484564126,
            type  : "groupUserBanned",
            event : 'group',
            values: {
              userName      : "@C0ZEN",
              userNameBanned: "@Marco"
            }
          },
          {
            date  : 1484564126,
            type  : "groupUserUnbanned",
            event : 'group',
            values: {
              userName        : "@C0ZEN",
              userNameUnbanned: "@Marco"
            }
          },
          {
            date  : 1484564127,
            type  : "channelPermissionsGranted",
            event : 'channel',
            values: {
              userName       : "@C0ZEN",
              userNameGranted: "@Marco",
              name           : "Les junkies"
            }
          },
          {
            date  : 1484564127,
            type  : "channelPermissionsRevoked",
            event : 'channel',
            values: {
              userName       : "@C0ZEN",
              userNameRevoked: "@Marco",
              name           : "Les junkies"
            }
          },
          {
            date  : 1484564127,
            type  : "channelUserKicked",
            event : 'channel',
            values: {
              userName      : "@C0ZEN",
              userNameKicked: "@Marco",
              name          : "Les junkies"
            }
          },
          {
            date  : 1484564127,
            type  : "channelUserBanned",
            event : 'channel',
            values: {
              userName      : "@C0ZEN",
              userNameBanned: "@Marco",
              name          : "Les junkies"
            }
          },
          {
            date  : 1484564127,
            type  : "channelUserUnbanned",
            event : 'channel',
            values: {
              userName        : "@C0ZEN",
              userNameUnbanned: "@Marco",
              name            : "Les junkies"
            }
          }
        ]
      },
      {
        name       : 'Supinfo2',
        description: 'Une description',
        quicklink  : 'http://cogeo.com/app/fr/invites/group/Supinfo2',
        creator    : 'Cger0ZEN',
        date       : {
          creation  : 1484561615,
          lastUpdate: 1484561615
        },
        users      : [
          {
            username: 'C0ZEN',
            joined  : 1484561615,
            admin   : false,
            hasLeft : 0,
            kicked  : {
              active: false
            },
            banned  : {
              active: false
            }
          }
        ]
      },
      {
        name       : 'zefzefzef',
        description: 'Une description',
        quicklink  : 'http://cogeo.com/app/fr/invites/group/zefzefzef',
        creator    : 'C0ZEgegN',
        date       : {
          creation  : 1484561615,
          lastUpdate: 1484561615
        },
        users      : [
          {
            username: 'C0ZEN',
            joined  : 1484561615,
            admin   : false,
            hasLeft : 1484561615,
            kicked  : {
              by    : 'Toto',
              on    : 1484561615,
              for   : 'Il a pas dit bonjour',
              time  : 3600,
              active: true
            },
            banned  : {
              by    : 'Toto',
              on    : 1484561615,
              for   : 'Il a pas dit bonjour',
              active: true
            }
          }
        ]
      },
      {
        name       : '4PJT',
        description: 'Une description',
        quicklink  : 'http://cogeo.com/app/fr/invites/group/4PJT',
        creator    : 'C0ZegeEN',
        date       : {
          creation  : 1484561615,
          lastUpdate: 1484561615
        },
        users      : [
          {
            username: 'zfzef',
            joined  : 1484561615,
            admin   : true,
            hasLeft : 0,
            kicked  : {
              active: false
            },
            banned  : {
              active: false
            }
          }
        ]
      },
      {
        name       : '3PJT',
        description: 'Une description description description description description description description description description description',
        quicklink  : 'http://cogeo.com/app/fr/invites/group/3PJT',
        creator    : 'C0ZeggegegeeEN',
        date       : {
          creation  : 1484561615,
          lastUpdate: 1484561615
        },
        users      : [
          {
            username: 'C0ZEN',
            joined  : 1484661615,
            admin   : true,
            hasLeft : 0,
            kicked  : {
              active: false
            },
            banned  : {
              active: false
            }
          }
        ]
      }
    ];

    // Public functions
    return {
      getGroups                  : getGroups,
      getGroupByName             : getGroupByName,
      getGroupByNameWithUserRoles: getGroupByNameWithUserRoles,
      getUserFromGroup           : getUserFromGroup,
      getGroupsWithUserRoles     : getGroupsWithUserRoles,
      getUserGroups              : getUserGroups,
      updateGroup                : updateGroup,
      doesUserHasRights          : doesUserHasRights
    };

    function getGroups() {
      return groups;
    }

    function getGroupByName(name) {
      for (var i = 0, length = groups.length; i < length; i++) {
        if (groups[i].name == name) return groups[i];
      }
      return null;
    }

    function getGroupByNameWithUserRoles(name, userName) {
      var group = getGroupByName(name);
      if (group != null) {
        return getGroupsWithUserRoles(userName, group);
      } else return null;
    }

    function getUserFromGroup(userName, groupName) {
      var group = getGroupByName(groupName);
      if (group != null) {
        for (var i = 0, length = group.users.length; i < length; i++) {
          if (group.users[i].username == userName) return group.users[i];
        }
      }
      return null;
    }

    function getGroupsWithUserRoles(userName, customGroups) {
      var newGroups, user;
      if (customGroups == null) newGroups = groups;
      else newGroups = customGroups;
      for (var i = 0, length = newGroups.length; i < length; i++) {
        user                   = getUserFromGroup(userName, newGroups[i].name);
        newGroups[i].userRoles = {
          isCreator: newGroups[i].creator == userName,
          isMember : user != null ? user.hasLeft == 0 : false,
          isAdmin  : user != null ? user.admin : false,
          isBanned : user != null ? user.banned.active : false,
          isKicked : user != null ? user.kicked.active : false,
          banned   : user != null ? user.banned : null,
          kicked   : user != null ? user.kicked : null,
          joined   : user != null ? user.joined : null
        }
      }
      return newGroups;
    }

    function getUserGroups(userName) {
      var newGroups = [];
      for (var i = 0, length = groups.length; i < length; i++) {
        for (var y = 0, ylength = groups[i].users.length; y < ylength; y++) {
          if (groups[i].users[y].username == userName) newGroups.push(groups[i]);
        }
      }
      return $filter('orderBy')(newGroups, 'name', false);
    }

    function updateGroup(group) {
      for (var i = 0, length = groups.length; i < length; i++) {
        if (groups[i].name == group.name) {
          groups[i] = group;
          break;
        }
      }
    }

    function doesUserHasRights(user) {
      if (user != null) {
        if (user.kicked != null) {
          if (user.kicked.active) return false;
        }
        if (user.banned != null) {
          if (user.banned.active) return false;
        }
        return true;
      } else return false;
    }
  }

})(window.angular);

