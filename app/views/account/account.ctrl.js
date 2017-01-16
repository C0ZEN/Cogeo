(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = [
    'CONFIG',
    '$scope',
    'goTo',
    '$rootScope'
  ];

  function AccountCtrl(CONFIG, $scope, goTo, $rootScope) {
    var vm = this;

    // Common data
    vm.CONFIG                    = CONFIG;
    vm.loading                   = false;
    vm.user                      = {
      givenName : 'Testelin',
      surname   : 'Geoffrey',
      email     : 'geoffrey.testelin@gmail.com',
      username  : 'C0ZEN',
      superAdmin: true,
      private   : {
        profile: true
      },
      type      : 'user',
      date      : {
        register  : 1484561615,
        lastUpdate: 1484561615
      }
    };
    vm.userCopy                  = angular.copy(vm.user);
    vm.userCopy.passwordMismatch = false;
    vm.settings                  = {
      ports       : {
        first : 28,
        second: 32
      },
      downloadPath: 'c:/users/C0ZEN/documents',
      micro       : {
        volume: 65
      },
      speaker     : {
        volume: 72
      }
    };
    vm.notifications             = {
      groups       : {
        creation    : true,
        edit        : true,
        newMember   : true,
        kickedMember: false,
        bannedMember: false
      },
      channels     : {
        creation        : true,
        edit            : true,
        newMember       : true,
        kickedMember    : false,
        bannedMember    : false,
        newMessage      : true,
        newMessageTagged: true
      },
      directMessage: {
        newMessage: true
      }
    };

    // Methods
    vm.methods = {
      updatePills          : updatePills,
      save                 : save,
      onPasswordChange     : onPasswordChange,
      onCheckPasswordChange: onCheckPasswordChange
    };

    // To add selected design to the proper pill
    vm.methods.updatePills();
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
      vm.methods.updatePills();
    });

    function updatePills() {
      vm.nav = {
        profile      : goTo.isOneOfThoseViews('app.account.profile', 'app.account.profileEdit', 'app.account.profileEditPassword'),
        notifications: goTo.isOneOfThoseViews('app.account.notifications', 'app.account.notificationsEdit'),
        settings     : goTo.isOneOfThoseViews('app.account.settings', 'app.account.settingsEdit'),
        log          : goTo.isOneOfThoseViews('app.account.log')
      };
    }

    function save(form) {
      vm.loading = true;
      switch (form) {
        case 'settings':
          vm.loading = false;
          goTo.view('app.account.settings');
          break;
        case 'profile':
          vm.loading = false;
          goTo.view('app.account.profile');
          break;
        case 'profile-password':
          vm.loading = false;
          goTo.view('app.account.profile');
          break;
        case 'notifications':
          vm.loading = false;
          goTo.view('app.account.notifications');
          break;
      }
    }

    function onPasswordChange(newModel) {
      vm.userCopy.passwordMismatch = newModel != vm.userCopy.checkPassword;
    }

    function onCheckPasswordChange(newModel) {
      vm.userCopy.passwordMismatch = vm.userCopy.newPassword != newModel;
    }
  }

})(window.angular);

