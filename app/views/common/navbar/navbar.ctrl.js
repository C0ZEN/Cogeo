(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = [
    '$document'
  ];

  function NavbarCtrl($document) {
    var vm = this;

    // Common data
    vm.data  = {
      offset  : 60, // Height of the navbar
      duration: 600
    };
    vm.other = {
      hover: false
    };

    // Methods
    vm.methods = {
      scrollToElement: scrollToElement
    };

    function scrollToElement(element) {
      var div = angular.element(document.getElementById(element));
      $document.scrollToElement(div, vm.data.offset, vm.data.duration);
    }
  }

})(window.angular);

