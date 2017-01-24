(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .config(config);

  config.$inject = [
    '$stateProvider'
  ];

  function config($stateProvider) {

    // Join group route
    $stateProvider
      .state('app.groupJoin', {
        url         : '/groups/join/:groupName',
        templateUrl : 'views/groups/join/group.join.html',
        controller  : 'GroupJoinCtrl',
        controllerAs: 'vm',
        data        : {
          pageTitle: 'groups_join'
        }
      });
  }

})(window.angular);
