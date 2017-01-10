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

    // Methods
    vm.methods = {
      onPasswordChange     : onPasswordChange,
      onCheckPasswordChange: onCheckPasswordChange,
      register             : register
    };

    function onPasswordChange(newModel) {
      console.log(newModel, vm.register.checkPassword);
      vm.register.passwordMismatch = newModel != vm.register.checkPassword;
    }

    function onCheckPasswordChange(newModel) {
      console.log(newModel, vm.register.password);
      vm.register.passwordMismatch = vm.register.password != newModel;
    }

    function register() {

    }
  }

})(window.angular);

