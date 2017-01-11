(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .config(config);

  config.$inject = [
    '$stateProvider'
  ];

  function config($stateProvider) {

    // Account routes
    $stateProvider
      .state('app.account', {
        url         : '/account',
        templateUrl : 'views/account/account.html',
        controller  : 'AccountCtrl',
        controllerAs: 'vm',
        data        : {
          pageTitle: 'account'
        }
      });
  }

})(window.angular);
