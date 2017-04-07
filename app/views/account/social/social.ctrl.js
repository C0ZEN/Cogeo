(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('SocialCtrl', SocialCtrl);

    SocialCtrl.$inject = [
        'CONFIG',
        '$scope',
        'goTo',
        '$rootScope',
        '$filter',
        'userFactory',
        'httpRequest',
        'usersFactory'
    ];

    function SocialCtrl(CONFIG, $scope, goTo, $rootScope, $filter, userFactory, httpRequest, usersFactory) {
        var vm = this;

        // Common data
        vm.CONFIG  = CONFIG;
        vm.loading = false;

        // User data
        vm.user = userFactory.getUser();

        // Methods
        vm.methods = {
            startLoading          : startLoading,
            stopLoading           : stopLoading,
            getAppLanguageFlag    : getAppLanguageFlag,
            initInvitations       : initInvitations,
            initRecruit           : initRecruit,
            recruit               : recruit
        };

        // When the user factory is updated
        userFactory.subscribe($scope, function () {
            vm.user = userFactory.getUser();
            vm.methods.initInvitations(vm.user);
        });

        // Start the loader for submit btn
        function startLoading() {
            vm.loading = true;
        }

        // Stop the loader for submit btn
        function stopLoading() {
            vm.loading = false;
        }

        // Return the src for the flag for this app language
        function getAppLanguageFlag(language) {
            return 'images/flags/' + language + '.png';
        }

        // Called on init invitations
        function initInvitations(user) {
            if (user == null) {
                user = userFactory.getUser();
            }
            if (user != null) {
                // vm.invitations         = angular.copy(user.invitations);
                vm.invitations         = [];
                vm.settingsInvitations = angular.copy(user.settings.preferences.invitations);
            }
        }

        // Called on init recruit
        function initRecruit(user) {
            if (user == null) {
                user = userFactory.getUser();
            }
            if (user != null) {
                vm.availableUsers = usersFactory.getAvailableUsers(user);
            }
        }

        // Send invitations to recruit Cogeo users
        function recruit() {
            vm.methods.startLoading();
            var invitations = {
                invitations: vm.availableUsersSelected
            };
            userFactory.httpRequest.sendInvitations(invitations, function () {
                vm.methods.stopLoading();
                goTo.view('app.social.invitations');
            }, function () {
                vm.methods.stopLoading();
                var btn = angular.element(document.querySelector('#submit-recruit-user-btn'));
                httpRequest.shakeElement(btn);
            });
        }
    }

})(window.angular);

