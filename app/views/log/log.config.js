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
      surname  : {
        length  : 30,
        required: true,
        pattern : 'name',
        name    : 'lastname'
      },
      givenName: {
        length  : 30,
        required: true,
        pattern : 'name',
        name    : 'firstname'
      }
    }
  }

})(window.angular);
