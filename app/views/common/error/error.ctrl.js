(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('ErrorCtrl', ErrorCtrl);

  ErrorCtrl.$inject = [];

  function ErrorCtrl() {
    var vm = this;

    // Common data
    vm.data = {};

    // Methods
    vm.methods = {};
  }

})(window.angular);

