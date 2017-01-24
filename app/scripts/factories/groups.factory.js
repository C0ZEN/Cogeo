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
            joined  : 1484561615,
            admin   : true,
            kicked  : {
              active: false
            },
            banned  : {
              active: false
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
        users      : []
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
      updateGroup                : updateGroup
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
          isMember : user != null,
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
  }

})(window.angular);

