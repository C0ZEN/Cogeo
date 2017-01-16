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
        abstract    : true,
        url         : '/account',
        templateUrl : 'views/account/account.html',
        controller  : 'AccountCtrl',
        controllerAs: 'vm'
      })
      .state('app.account.profile', {
        url        : '/profile',
        templateUrl: 'views/account/account.profile.html',
        data       : {
          pageTitle: 'account_profile'
        }
      })
      .state('app.account.profileEdit', {
        url        : '/profile/edit',
        templateUrl: 'views/account/account.profile.edit.html',
        data       : {
          pageTitle: 'account_profile_edit'
        }
      })
      .state('app.account.profileEditPassword', {
        url        : '/profile/edit/password',
        templateUrl: 'views/account/account.profile.edit.password.html',
        data       : {
          pageTitle: 'account_profile_edit_password'
        }
      })
      .state('app.account.notifications', {
        url        : '/notifications',
        templateUrl: 'views/account/account.notifications.html',
        data       : {
          pageTitle: 'account_notifications'
        }
      })
      .state('app.account.notificationsEdit', {
        url        : '/notifications/edit',
        templateUrl: 'views/account/account.notifications.edit.html',
        data       : {
          pageTitle: 'account_notifications_edit_title'
        }
      })
      .state('app.account.settings', {
        url        : '/settings',
        templateUrl: 'views/account/account.settings.html',
        data       : {
          pageTitle: 'account_settings'
        }
      })
      .state('app.account.settingsEdit', {
        url        : '/settings/edit',
        templateUrl: 'views/account/account.settings.edit.html',
        data       : {
          pageTitle: 'account_settings_edit'
        }
      })
      .state('app.account.log', {
        url        : '/log',
        templateUrl: 'views/account/account.log.html',
        data       : {
          pageTitle: 'account_log'
        }
      });
  }

})(window.angular);
