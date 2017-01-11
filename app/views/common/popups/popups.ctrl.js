(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('PopupCtrl', PopupCtrl);

  PopupCtrl.$inject = [
    'cozenPopupFactory',
    'CONFIG'
  ];

  function PopupCtrl(cozenPopupFactory, CONFIG) {
    var popup = this;

    // Common data
    popup.forgottenPassword = {};
    popup.CONFIG            = CONFIG;

    // Methods
    popup.methods = {
      closePopup       : closePopup,
      logout           : logout,
      forgottenPassword: forgottenPassword
    };

    function closePopup(name) {
      cozenPopupFactory.hide({
        name: name
      });
    }

    function logout() {

    }

    function forgottenPassword() {

    }
  }

})(window.angular);

