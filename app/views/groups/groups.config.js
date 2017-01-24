(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .config(config);

  config.$inject = [
    'CONFIG'
  ];

  // Account configuration
  function config(CONFIG) {
    CONFIG.internal.group = {
      description: {
        length  : 200,
        required: true,
        name    : 'description'
      },
      name       : {
        length  : 30,
        required: true,
        pattern : '[a-zA-Z0-9]*',
        name    : 'name'
      },
      quicklink: 'http://localhost:9000/#!/app/fr/groups/join/'
    }
  }

})(window.angular);
