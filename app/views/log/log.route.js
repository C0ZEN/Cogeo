(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .config(config);

  config.$inject = [
    '$stateProvider'
  ];

  function config($stateProvider) {

    // Log route
    $stateProvider
      .state('app.login', {
        url         : '/login',
        templateUrl : 'views/log/login.html',
        controller  : 'LogCtrl',
        controllerAs: 'vm',
        data        : {
          pageTitle: 'login'
        }
      })
      .state('app.register', {
        url         : '/register',
        templateUrl : 'views/log/register.html',
        controller  : 'LogCtrl',
        controllerAs: 'vm',
        data        : {
          pageTitle: 'register'
        }
      });
  }

})(window.angular);
