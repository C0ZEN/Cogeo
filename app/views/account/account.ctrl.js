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
            initLogs              : initLogs,
            initLogins: initLogins
        };

        // When a change occur into the popup of test
        $rootScope.$on('newVolumeSetFromTest', vm.methods.onNewVolumeSetFromTest);

        // When the user factory is updated
        userFactory.subscribe($scope, function () {
            vm.user = userFactory.getUser();
            vm.methods.initSettings(vm.user);
            vm.methods.initNotifications(vm.user);
            vm.methods.initLogs(vm.user);
        });

        // On submit, start loading, send request then stop loading
        function save(form) {
            vm.methods.startLoading();
            var updateUser;
            switch (form) {
                case 'settings':
                    userFactory.httpRequest.updateSettings(vm.settings, function () {
                        vm.methods.stopLoading();
                        goTo.view('app.account.settings');
                    }, vm.methods.stopLoading);
                    break;
                case 'profile':
                    updateUser = {
                        givenName: vm.userCopy.givenName,
                        surname  : vm.userCopy.surname,
                        email    : vm.userCopy.email,
                        picture  : vm.userCopy.picture,
                        bio      : vm.userCopy.bio,
                        birthday : vm.userCopy.birthday
                    };
                    userFactory.httpRequest.updateUser(updateUser, function () {
                        vm.methods.stopLoading();
                        goTo.view('app.account.profile');
                    }, vm.methods.stopLoading);
                    break;
                case 'profile-password':
                    updateUser = {
                        currentPassword: vm.userCopy.currentPassword,
                        newPassword    : vm.userCopy.newPassword
                    };
                    userFactory.httpRequest.updateUserPassword(updateUser, function () {
                        vm.methods.stopLoading();
                        goTo.view('app.account.profile');
                    }, vm.methods.stopLoading);
                    break;
                case 'notifications':
                    userFactory.httpRequest.updateNotifications(vm.notifications, function () {
                        vm.methods.stopLoading();
                        goTo.view('app.account.notifications');
                    }, vm.methods.stopLoading);
                    break;
            }
        }

        // When the password change, check the matching
        function onPasswordChange(newModel) {
            vm.userCopy.passwordMismatch = newModel != vm.userCopy.checkPassword;
        }

        // When the check password change, check the matching
        function onCheckPasswordChange(newModel) {
            vm.userCopy.passwordMismatch = vm.userCopy.newPassword != newModel;
        }

        // When the volume of the speaker change
        function onNewVolumeSetFromTest(event, eventData) {
            vm.settings.speaker.volume = eventData.newVolume;
        }

        // Return the list of all logs
        function getAllLogs() {
            vm.settingsLogs.all = true;
        }

        // Return the icon of a log based on the type
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

        // Called on init edit
        function onDisplayEdit() {
            vm.userCopy                  = angular.copy(userFactory.getUser());
            vm.userCopy.passwordMismatch = false;
        }

        // Start the loader for submit btn
        function startLoading() {
            vm.loading = true;
        }

        // Stop the loader for submit btn
        function stopLoading() {
            vm.loading = false;
        }

        // Called on init settings
        function initSettings(user) {
            if (user == null) {
                user = userFactory.getUser();
            }
            if (user != null) {
                vm.settings = angular.copy(user.settings);
            }
        }

        // Called on init notifications
        function initNotifications(user) {
            if (user == null) {
                user = userFactory.getUser();
            }
            if (user != null) {
                vm.notifications = angular.copy(user.notifications);
            }
        }

        // Called on init logs
        function initLogs(user) {
            if (user == null) {
                user = userFactory.getUser();
            }
            if (user != null) {
                vm.logs         = angular.copy(user.logs);
                vm.settingsLogs = angular.copy(user.settings.preferences.log);
            }

            // Logs with js $filter stuff (if in html, then search field is not filtering deeper)
            vm.logs.forEach(function (log) {
                log.text          = $filter('translate')('account_log_' + log.type, log.values);
                log.formattedDate = $filter('date')(log.date, 'EEEE dd MMMM yyyy à HH:mm');
            });
        }

        // Called on init logins
        function initLogins(user) {
            if (user == null) {
                user = userFactory.getUser();
            }
            if (user != null) {
                vm.accessLogs = angular.copy(user.accessLogs);
            }
        }
    }

})(window.angular);

