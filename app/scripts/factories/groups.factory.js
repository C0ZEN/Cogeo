(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .factory('groupsFactory', groupsFactory);

  groupsFactory.$inject = [
    '$state',
    'CONFIG',
    '$stateParams'
  ];

  function groupsFactory($state, CONFIG, $stateParams) {

    var groups = [
      {
        name       : 'Supinfo',
        description: 'Une description',
        quicklink  : 'http://cogeo.com/app/fr/invites/group/Supinfo',
        users      : [
          {
            username: 'C0ZEN',
            joined  : 1484561615,
            admin   : true
          }
        ]
      },
      {
        name       : '4PJT',
        description: 'Une description',
        quicklink  : 'http://cogeo.com/app/fr/invites/group/4PJT',
        users      : [
          {
            username: 'zfzef',
            joined  : 1484561615,
            admin   : true
          }
        ]
      },
      {
        name       : '3PJT',
        description: 'Une description description description description description description description description description description',
        quicklink  : 'http://cogeo.com/app/fr/invites/group/3PJT',
        users      : []
      }
    ];

    // Public functions
    return {
      getGroups       : getGroups,
      getGroupByName  : getGroupByName,
      getUserFromGroup: getUserFromGroup
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

    function getUserFromGroup(userName, groupName) {
      var group = getGroupByName(groupName);
      if (group != null) {
        for (var i = 0, length = group.users.length; i < length; i++) {
          if (group.users[i].username == userName) return group.users[i];
        }
      }
      return null;
    }
  }

})(window.angular);

