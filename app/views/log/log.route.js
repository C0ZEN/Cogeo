(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .config(config);

  config.$inject = [
    '$stateProvider'
  ];

  function config($stateProvider) {

    // Log routes
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
      })
      .state('app.newPassword', {
        url         : '/new-password/:token',
        templateUrl : 'views/log/new.password.html',
        controller  : 'LogCtrl',
        controllerAs: 'vm',
        data        : {
          pageTitle: 'new_password'
        }
      });
  }

})(window.angular);
