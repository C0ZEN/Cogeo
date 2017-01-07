(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = [
    '$document'
  ];

  function HomeCtrl($document) {
    var vm = this;

    // Common data
    vm.data = {
      offset  : 0,
      duration: 600
    };

    // Methods
    vm.methods = {
      goToAbout: goToAbout
    };

    // Let's animate
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
      duration: 600,
      scale   : 0.3,
      distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
      duration: 1000,
      delay   : 200
    });


    function goToAbout() {
      var about = angular.element(document.getElementById('about'));
      $document.scrollToElement(about, vm.data.offset, vm.data.duration);
    }
  }

})(window.angular);

