(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('LogCtrl', LogCtrl);

  LogCtrl.$inject = [
    '$timeout'
  ];

  function LogCtrl($timeout) {
    var vm = this;

    // Common data
    vm.register = {
      passwordConfig: {
        lowercase  : true,
        uppercase  : true,
        number     : true,
        specialChar: false,
        minLength  : 8
      }
    };
    vm.login    = {};

    // Methods
    vm.methods = {};
  }

})(window.angular);

