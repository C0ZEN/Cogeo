(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .factory('usersFactory', usersFactory);

  usersFactory.$inject = [
    '$state',
    'CONFIG',
    '$stateParams'
  ];

  function usersFactory($state, CONFIG, $stateParams) {

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
      }
    ];

    // Public functions
    return {
      getGroups        : getGroups,
      getUserFullName  : getUserFullName,
      addUsersFullNames: addUsersFullNames,
      getUserByUsername: getUserByUsername
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
        if (users[i].username == userName) return users[i];
      }
      return null;
    }
  }

})(window.angular);

