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
      }
    ];

    // Public functions
    return {
      getGroups      : getGroups,
      getUserFullName: getUserFullName
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
  }

})(window.angular);

