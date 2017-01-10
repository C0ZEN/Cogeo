(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('LogCtrl', LogCtrl);

  LogCtrl.$inject = [
    '$timeout',
    'CONFIG'
  ];

  function LogCtrl($timeout, CONFIG) {
    var vm = this;

    // Common data
    vm.register = {
      passwordConfig  : {
        lowercase  : true,
        uppercase  : true,
        number     : true,
        specialChar: false,
        minLength  : 8
      },
      passwordMismatch: false
    };
    vm.login    = {};
    vm.form     = {};
    vm.CONFIG   = CONFIG;

    // Methods
    vm.methods = {
      onPasswordChange     : onPasswordChange,
      onCheckPasswordChange: onCheckPasswordChange,
      register             : register
    };

    function onPasswordChange(newModel) {
      vm.register.passwordMismatch = newModel != vm.register.checkPassword;
    }

    function onCheckPasswordChange(newModel) {
      vm.register.passwordMismatch = vm.register.password != newModel;
    }

    function register() {

    }
  }

})(window.angular);

