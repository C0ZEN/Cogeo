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

    // Groups
    vm.group  = {
      hover: false
    };
    vm.groups = [
      {
        name       : 'Supinfo',
        description: 'Une description'
      },
      {
        name       : '4PJT',
        description: 'Une description'
      }
    ];

    // Methods
    vm.methods = {
      scrollToElement: scrollToElement,
      getGroupPicture: getGroupPicture
    };

    function scrollToElement(element) {
      var div = angular.element(document.getElementById(element));
      $document.scrollToElement(div, vm.data.offset, vm.data.duration);
    }

    function getGroupPicture(name, pictureUrl) {
      if (Methods.isNullOrEmpty(pictureUrl)) {
        return 'images/groups/' + name.slice(0, 1) + '.png';
      } else return pictureUrl;
    }
  }

})(window.angular);

