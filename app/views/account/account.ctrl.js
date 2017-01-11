(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = [
    'CONFIG'
  ];

  function AccountCtrl(CONFIG) {
    var vm = this;

    // Common data
    vm.CONFIG = CONFIG;

    // Methods
    vm.methods = {};
  }

})(window.angular);

