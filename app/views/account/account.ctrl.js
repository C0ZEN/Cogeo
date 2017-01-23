(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = [
    'CONFIG',
    '$scope',
    'goTo',
    '$rootScope',
    '$filter',
    'userFactory'
  ];

  function AccountCtrl(CONFIG, $scope, goTo, $rootScope, $filter, userFactory) {
    var vm = this;

    // Common data
    vm.CONFIG  = CONFIG;
    vm.loading = false;

    // User data
    vm.user = $rootScope.data.user;

    // Settings
    vm.settings = angular.copy(vm.user.settings);

    // Notifications
    vm.notifications = angular.copy(vm.user.notifications);

    // Logs
    vm.logs = angular.copy(vm.user.logs);
    vm.log  = angular.copy(vm.user.settings.preferences.log);

    // Logs with js $filter stuff (if in html, then search field is not filtering deeper)
    vm.logs.forEach(function (log) {
      log.text          = $filter('translate')('account_log_' + log.type, log.values);
      log.formattedDate = $filter('date')(log.date * 1000, 'EEEE dd MMMM yyyy à HH:mm');
    });

    // Methods
    vm.methods = {
      updatePills           : updatePills,
      save                  : save,
      onPasswordChange      : onPasswordChange,
      onCheckPasswordChange : onCheckPasswordChange,
      onNewVolumeSetFromTest: onNewVolumeSetFromTest,
      getAllLogs            : getAllLogs,
      getLogSrc             : getLogSrc,
      onDisplayEdit         : onDisplayEdit
    };

    // To add selected design to the proper pill
    vm.methods.updatePills();
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
      vm.methods.updatePills();
    });

    $rootScope.$on('newVolumeSetFromTest', vm.methods.onNewVolumeSetFromTest);

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

    function onNewVolumeSetFromTest(event, eventData) {
      vm.settings.speaker.volume = eventData.newVolume;
    }

    function getAllLogs() {
      vm.log.all = true;
    }

    function getLogSrc(type) {
      switch (type) {
        case 'newGroupCreated':
        case 'newGroupJoined':
        case 'newChannelCreated':
        case 'newChannelJoined':
          return 'icons8-plus';
        case 'groupLeft':
        case 'channelLeft':
          return 'icons8-logout-rounded';
        case 'groupEdited':
        case 'channelEdited':
        case 'socialUserRenamed':
        case 'socialUserAliasRemoved':
          return 'icons8-edit';
        case 'groupInvitationSentOne':
        case 'groupInvitationSentMany':
        case 'channelInvitationSentOne':
        case 'channelInvitationSentMany':
        case 'socialInvitationSent':
          return 'icons8-message-filled';
        case 'groupPermissionsGranted':
        case 'channelPermissionsGranted':
          return 'icons8-unlock';
        case 'groupPermissionsRevoked':
        case 'channelPermissionsRevoked':
          return 'icons8-lock';
        case 'groupUserKicked':
        case 'groupUserBanned':
        case 'channelUserKicked':
        case 'channelUserBanned':
        case 'socialUserBlocked':
        case 'socialUserRemoved':
          return 'icons8-no-chat';
        case 'groupUserUnbanned':
        case 'channelUserUnbanned':
        case 'socialUserUnblocked':
        case 'socialInvitationAccepted':
          return 'icons8-chat';
      }
    }

    function onDisplayEdit() {
      vm.userCopy                  = angular.copy($rootScope.data.user);
      vm.userCopy.passwordMismatch = false;
    }
  }

})
(window.angular);

