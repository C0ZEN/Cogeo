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
        name       : 'Supinfo',
        description: 'Une description'
      },
      {
        name       : '4PJT',
        description: 'Une description'
      },
      {
        name       : '3PJT',
        description: 'Une description description description description description description description description description description'
      }
    ];

    // Public functions
    return {
      getGroups: getGroups
    };

    function getGroups() {
      return users;
    }
  }

})(window.angular);

