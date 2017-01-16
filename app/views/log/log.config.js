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
      username     : {
        length  : 30,
        required: true,
        pattern : '[a-zA-Z0-9]*',
        name    : 'username'
      },
      email        : {
        length  : 50,
        required: true,
        pattern : 'email',
        name    : 'email'
      },
      password     : {
        length        : 40,
        required      : true,
        name          : 'password',
        passwordConfig: {
          lowercase  : true,
          uppercase  : true,
          number     : true,
          specialChar: false,
          minLength  : 8
        }
      },
      checkPassword: {
        length  : 40,
        required: true,
        name    : 'checkPassword'
      }
    }
  }

})(window.angular);
