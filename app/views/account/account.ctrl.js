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
        vm.user = userFactory.getUser();

        // Methods
        vm.methods = {
            save                  : save,
            onPasswordChange      : onPasswordChange,
            onCheckPasswordChange : onCheckPasswordChange,
            onNewVolumeSetFromTest: onNewVolumeSetFromTest,
            getAllLogs            : getAllLogs,
            getLogSrc             : getLogSrc,
            onDisplayEdit         : onDisplayEdit,
            startLoading          : startLoading,
            stopLoading           : stopLoading,
            initSettings          : initSettings,
            initNotifications     : initNotifications,
            initLogs              : initLogs
        };

        $rootScope.$on('newVolumeSetFromTest', vm.methods.onNewVolumeSetFromTest);

        function save(form) {
            vm.methods.startLoading();
            switch (form) {
                case 'settings':
                    console.log(vm.settings);
                    userFactory.httpRequest.updateSettings(vm.settings, vm.methods.stopLoading, vm.methods.stopLoading);
                    goTo.view('app.account.settings');
                    break;
                case 'profile':
                    goTo.view('app.account.profile');
                    break;
                case 'profile-password':
                    goTo.view('app.account.profile');
                    break;
                case 'notifications':
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
            vm.userCopy                  = angular.copy(userFactory.getUser());
            vm.userCopy.passwordMismatch = false;
        }

        function startLoading() {
            vm.loading = true;
        }

        function stopLoading() {
            vm.loading = false;
        }

        function initSettings() {
            vm.settings = angular.copy(userFactory.getUser().settings);
        }

        function initNotifications() {
            vm.notifications = angular.copy(userFactory.getUser().notifications);
        }

        function initLogs() {
            vm.logs = angular.copy(userFactory.getUser().logs);
            vm.log  = angular.copy(userFactory.getUser().settings.preferences.log);

            // Logs with js $filter stuff (if in html, then search field is not filtering deeper)
            vm.logs.forEach(function (log) {
                log.text          = $filter('translate')('account_log_' + log.type, log.values);
                log.formattedDate = $filter('date')(log.date * 1000, 'EEEE dd MMMM yyyy à HH:mm');
            });
        }
    }

})(window.angular);

