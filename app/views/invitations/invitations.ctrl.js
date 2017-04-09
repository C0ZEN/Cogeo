(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('InvitationsCtrl', InvitationsCtrl);

    InvitationsCtrl.$inject = [
        'CONFIG',
        '$scope',
        'groupsFactory',
        '$rootScope',
        '$filter',
        'userFactory',
        'httpRequest',
        'usersFactory'
    ];

    function InvitationsCtrl(CONFIG, $scope, groupsFactory, $rootScope, $filter, userFactory, httpRequest, usersFactory) {
        var vm = this;

        // Common data
        vm.CONFIG  = CONFIG;
        vm.loading = false;

        // User data
        vm.user = userFactory.getUser();

        // Methods
        vm.methods = {
            startLoading           : startLoading,
            stopLoading            : stopLoading,
            initInvitationsReceived: initInvitationsReceived
        };

        // When the user factory is updated
        userFactory.subscribe($scope, function () {
            vm.user = userFactory.getUser();
        });

        // Start the loader for submit btn
        function startLoading() {
            vm.loading = true;
        }

        // Stop the loader for submit btn
        function stopLoading() {
            vm.loading = false;
        }

        // When the invitations received view is loaded
        function initInvitationsReceived() {
            var tmpUser, tmpGroup, tmpChannel;
            vm.invitationsReceived = angular.copy(vm.user.pendingInvitations);
            vm.invitationsReceived.forEach(function (invitation) {

                // Add some data about the user
                tmpUser              = usersFactory.getUserByUsername(invitation.sentBy);
                invitation.givenName = tmpUser.givenName;
                invitation.surname   = tmpUser.surname;

                // Add some data about the group
                if (invitation.type == 'group') {
                    tmpGroup             = groupsFactory.getGroupById(invitation.groupId);
                    invitation.groupName = tmpGroup.name;
                }

                // Add some data about the channel
                else if (invitation.type == 'channel') {
                    tmpGroup               = groupsFactory.getGroupById(invitation.groupId);
                    invitation.groupName   = tmpGroup.name;
                    tmpChannel             = groupsFactory.getChannelById(tmpGroup.name, invitation.channelId);
                    invitation.channelName = tmpChannel.name;
                }
            });
        }
    }

})(window.angular);

