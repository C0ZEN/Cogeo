(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('LogCtrl', LogCtrl);

  LogCtrl.$inject = [];

  function LogCtrl() {
    var vm = this;

    // Common data
    vm.data = {};

    // Methods
    vm.methods = {};
  }

})(window.angular);

