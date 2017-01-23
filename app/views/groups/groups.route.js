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
      .state('app.groups', {
        abstract    : true,
        url         : '/groups',
        templateUrl : 'views/groups/groups.html',
        controller  : 'GroupsCtrl',
        controllerAs: 'vm'
      })
      .state('app.groups.all', {
        url        : '/all',
        templateUrl: 'views/groups/groups.all.html',
        data       : {
          pageTitle: 'groups_all'
        }
      })
      .state('app.groups.details', {
        url        : '/details/:groupName',
        templateUrl: 'views/groups/groups.details.html',
        data       : {
          pageTitle: 'groups_details'
        }
      })
      .state('app.groups.edit', {
        url        : '/edit/:groupName',
        templateUrl: 'views/groups/groups.edit.html',
        data       : {
          pageTitle: 'groups_edit'
        }
      });
  }

})(window.angular);
