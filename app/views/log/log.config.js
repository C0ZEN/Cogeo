(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .config(config);

  config.$inject = [
    'CONFIG'
  ];

  // Log configuration
  function config(CONFIG) {
    CONFIG.internal.log = {
      surname      : {
        length  : 30,
        required: true,
        pattern : 'name',
        name    : 'lastname'
      },
      givenName    : {
        length  : 30,
        required: true,
        pattern : 'name',
        name    : 'firstname'
      },
      username    : {
        length  : 30,
        required: true,
        pattern : 'letter',
        name    : 'username'
      },
      email        : {
        length  : 50,
        required: true,
        pattern : 'email',
        name    : 'email'
      },
      password     : {
        length  : 40,
        required: true,
        name    : 'password'
      },
      checkPassword: {
        length  : 40,
        required: true,
        name    : 'checkPassword'
      }
    }
  }

})(window.angular);
