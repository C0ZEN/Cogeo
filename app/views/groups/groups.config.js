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
      }
    }
  }

})(window.angular);
