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
        'userFactory',
        'httpRequest',
        'usersFactory'
    ];

    function AccountCtrl(CONFIG, $scope, goTo, $rootScope, $filter, userFactory, httpRequest, usersFactory) {
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
            onDisplayEdit         : onDisplayEdit,
            startLoading          : startLoading,
            stopLoading           : stopLoading,
            initSettings          : initSettings,
            initNotifications     : initNotifications,
            initLogs              : initLogs,
            initLogins            : initLogins,
            getAppLanguageFlag    : getAppLanguageFlag,
            getVerboseLanguage    : getVerboseLanguage
        };

        // When a change occur into the popup of test
        $rootScope.$on('newVolumeSetFromTest', vm.methods.onNewVolumeSetFromTest);

        // When the user factory is updated
        userFactory.subscribe($scope, function () {
            vm.user = userFactory.getUser();
            vm.methods.initSettings(vm.user);
            vm.methods.initNotifications(vm.user);
            vm.methods.initLogs(vm.user);
            vm.methods.initLogins(vm.user);
        });

        // On submit, start loading, send request then stop loading
        function save(form) {
            vm.methods.startLoading();
            var updateUser;
            switch (form) {
                case 'settings':
                    var updateSettings = {
                        ports       : vm.settings.ports,
                        micro       : vm.settings.micro,
                        speaker     : vm.settings.speaker,
                        downloadPath: vm.settings.downloadPath,
                        language    : vm.settings.language
                    };
                    userFactory.httpRequest.updateSettings(updateSettings, function () {
                        vm.methods.stopLoading();
                        goTo.view('app.account.settings');
                    }, function () {
                        vm.methods.stopLoading();
                        var btn = angular.element(document.querySelector('#submit-edit-account-settings'));
                        httpRequest.shakeElement(btn);
                    });
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
                    }, function () {
                        vm.methods.stopLoading();
                        var btn = angular.element(document.querySelector('#submit-edit-account-profile'));
                        httpRequest.shakeElement(btn);
                    });
                    break;
                case 'profile-password':
                    updateUser = {
                        currentPassword: vm.userCopy.currentPassword,
                        newPassword    : vm.userCopy.newPassword
                    };
                    userFactory.httpRequest.updateUserPassword(updateUser, function () {
                        vm.methods.stopLoading();
                        goTo.view('app.account.profile');
                    }, function () {
                        vm.methods.stopLoading();
                        var btn = angular.element(document.querySelector('#submit-edit-account-profile-password'));
                        httpRequest.shakeElement(btn);
                    });
                    break;
                case 'notifications':
                    userFactory.httpRequest.updateNotifications(vm.notifications, function () {
                        vm.methods.stopLoading();
                        goTo.view('app.account.notifications');
                    }, function () {
                        vm.methods.stopLoading();
                        var btn = angular.element(document.querySelector('#submit-edit-account-notifications'));
                        httpRequest.shakeElement(btn);
                    });
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
                vm.settings  = angular.copy(user.settings);
                vm.languages = [];
                CONFIG.languages.forEach(function (lang, index) {
                    vm.languages.push({
                        key     : lang,
                        label   : CONFIG.languagesExtended[index],
                        selected: vm.settings.language == lang
                    });
                });
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
                vm.settingsLogs = angular.copy(user.settings.preferences.logs);
            }

            // Logs with js $filter stuff (if in html, then search field is not filtering deeper)
            vm.logs.forEach(function (log) {
                log.text          = $filter('translate')('account_log_' + log.tag, log.values);
                log.formattedDate = $filter('date')(log.date, 'EEEE dd MMMM yyyy à HH:mm');
            });
        }

        // Called on init logins
        function initLogins(user) {
            if (user == null) {
                user = userFactory.getUser();
            }
            if (user != null) {
                vm.accessLogs            = angular.copy(user.accessLogs);
                vm.settingsLogins        = angular.copy(user.settings.preferences.accessLogs);
                vm.settingsLogins.custom = {
                    appLanguage: [],
                    appVersion : [],
                    osName     : [],
                    browserName: []
                };

                // Loop through the logins to create data for the popup filter
                vm.accessLogs.forEach(function (login) {

                    // appLanguage
                    if (!Methods.isInList(vm.settingsLogins.custom.appLanguage, login.appLanguage)) {
                        vm.settingsLogins.custom.appLanguage.push(login.appLanguage);
                    }

                    // appVersion
                    if (!Methods.isInList(vm.settingsLogins.custom.appVersion, login.appVersion)) {
                        vm.settingsLogins.custom.appVersion.push(login.appVersion);
                    }

                    // osName
                    if (!Methods.isInList(vm.settingsLogins.custom.osName, login.osName) && !Methods.isNullOrEmpty(login.osName)) {
                        vm.settingsLogins.custom.osName.push(login.osName);
                    }

                    // browserName
                    if (!Methods.isInList(vm.settingsLogins.custom.browserName, login.browserName) && !Methods.isNullOrEmpty(login.browserName)) {
                        vm.settingsLogins.custom.browserName.push(login.browserName);
                    }
                });
            }
        }

        // Return the src for the flag for this app language
        function getAppLanguageFlag(language) {
            return 'images/flags/' + language + '.png';
        }

        function getVerboseLanguage(language) {
            for (var i = 0, length = CONFIG.languages.length; i < length; i++) {
                if (CONFIG.languages[i] == language) {
                    return CONFIG.languagesExtended[i];
                }
            }
            return language;
        }
    }

})(window.angular);

