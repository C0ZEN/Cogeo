(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .config(config);

  config.$inject = [
    '$stateProvider'
  ];

  function config($stateProvider) {

    // Error route
    $stateProvider
      .state('app.error', {
        url         : '/error',
        templateUrl : 'views/common/error/error.html',
        controller  : 'ErrorCtrl',
        controllerAs: 'vm',
        data        : {
          pageTitle: 'error'
        }
      });
  }

})(window.angular);
