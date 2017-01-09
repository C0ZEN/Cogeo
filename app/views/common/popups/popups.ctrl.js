(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('PopupCtrl', PopupCtrl);

  PopupCtrl.$inject = [
    'cozenPopupFactory'
  ];

  function PopupCtrl(cozenPopupFactory) {
    var vm = this;

    // Methods
    vm.methods = {
      closePopup: closePopup,
      logout    : logout
    };

    function closePopup(name) {
      cozenPopupFactory.hide({
        name: name
      });
    }

    function logout() {

    }
  }

})(window.angular);

