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
      passwordMismatch: false
    };
    vm.loading  = false;
    vm.login    = {};
    vm.form     = {};
    vm.CONFIG   = CONFIG;

    // Methods
    vm.methods = {
      onPasswordChange     : onPasswordChange,
      onCheckPasswordChange: onCheckPasswordChange,
      register             : register,
      login                : login,
      newPassword          : newPassword
    };

    function onPasswordChange(newModel, parent) {
      vm[parent].passwordMismatch = newModel != vm[parent].checkPassword;
    }

    function onCheckPasswordChange(newModel, parent) {
      vm[parent].passwordMismatch = vm[parent].password != newModel;
    }

    function register() {
      vm.loading             = true;
      vm.register.type       = 'user';
      vm.register.superAdmin = false;
      vm.loading             = false;
    }

    function login() {
      vm.loading = true;
      vm.loading = false;
    }

    function newPassword() {

    }
  }

})(window.angular);

