(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('AppCtrl', AppCtrl);

  AppCtrl.$inject = [
    'CONFIG',
    'userFactory',
    '$scope'
  ];

  function AppCtrl(CONFIG, userFactory, $scope) {
    var app = this;

    // Common data
    app.CONFIG  = CONFIG;
    app.isReady = false;

    // Methods
    app.methods = {
      onInit: onInit
    };

    function onInit() {
      var requestQuantity = 1;
      Methods.firstLoadLog(true);
      userFactory.httpRequest.getUser(function () {
        isDone();
      });

      function isDone() {
        requestQuantity--;
        if (requestQuantity <= 0) {
          app.isReady = true;
          Methods.firstLoadLog(false);
          Methods.safeApply($scope);
        }
      }
    }
  }

})(window.angular);

