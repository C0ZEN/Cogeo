(function (angular, document) {
    'use strict';

    angular
        .module('cogeoApp')
        .controller('ProfilesCtrl', ProfilesCtrl);

    ProfilesCtrl.$inject = [
        'CONFIG',
        '$state',
        'usersFactory',
        'goTo',
        'userFactory',
        'groupsFactory',
        'httpRequest',
        '$scope'
    ];

    function ProfilesCtrl(CONFIG, $state, usersFactory, goTo, userFactory, groupsFactory, httpRequest, $scope) {
        var vm = this;

        // Common data
        vm.CONFIG = CONFIG;

        // Methods
        vm.methods = {
            onInit      : onInit,
            onUserInit  : onUserInit,
            socialAction: socialAction,
            startLoading: startLoading,
            stopLoading : stopLoading
        };

        // Watchers
        userFactory.subscribe($scope, function () {
            vm.methods.onInit();
            if ($state.current.name == 'app.profiles.user') {
                vm.methods.onUserInit();
            }
        });

        function onInit() {
            vm.params = $state.params;
        }

        function onUserInit() {
            if ($state.params.username == userFactory.getUser().username) {
                goTo.view('app.account.profile');
            }
            else {
                vm.user          = usersFactory.getUserByUsername($state.params.username);
                vm.userGroups    = groupsFactory.getUserActiveGroups($state.params.username);
                vm.friend        = userFactory.getUserFriendObject($state.params.username);
                vm.friendInvited = userFactory.getUserLastInvitationObject($state.params.username);
            }
        }

        function socialAction(action) {
            switch (action) {
                case 'add':
                    vm.methods.startLoading();
                    var invitations = {
                        invitations: [
                            $state.params.username
                        ]
                    };
                    userFactory.httpRequest.sendInvitations(invitations, function () {
                        vm.methods.stopLoading();
                    }, function () {
                        vm.methods.stopLoading();
                        var btn = angular.element(document.querySelector('#user-profile-add-friend-btn'));
                        httpRequest.shakeElement(btn);
                    });
                    break;
            }
        }

        // Start the loader for submit btn
        function startLoading() {
            vm.loading = true;
        }

        // Stop the loader for submit btn
        function stopLoading() {
            vm.loading = false;
        }
    }

})(window.angular, document);

