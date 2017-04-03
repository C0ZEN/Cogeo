(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('GroupsCtrl', GroupsCtrl);

    GroupsCtrl.$inject = [
        'CONFIG',
        'goTo',
        'httpRequest',
        '$state',
        'groupsFactory',
        'userFactory',
        'usersFactory',
        '$filter',
        '$scope',
        '$timeout'
    ];

    function GroupsCtrl(CONFIG, goTo, httpRequest, $state, groupsFactory, userFactory, usersFactory, $filter, $scope, $timeout) {
        var vm = this;

        // Methods
        vm.methods = {
            save            : save,
            onDisplayDetails: onDisplayDetails,
            joinGroup       : joinGroup,
            leaveGroup      : leaveGroup,
            getKickedTime   : Utils.getKickedTime,
            getUserFullName : usersFactory.getUserFullName,
            onShowAll       : onShowAll,
            getAllLogs      : getAllLogs,
            getLogSrc       : getLogSrc,
            onRecruitInit   : onRecruitInit,
            recruit         : recruit,
            toggleRecruitMod: toggleRecruitMod,
            startLoading    : startLoading,
            stopLoading     : stopLoading
        };

        // Common data
        vm.CONFIG      = CONFIG;
        vm.loading     = false;
        vm.user        = userFactory.getUser();
        vm.groups      = groupsFactory.getGroupsWithUserRoles(vm.user.username);
        vm.all         = angular.copy(vm.user.settings.preferences.allGroups);
        vm.details     = {};
        vm.edit        = {};
        vm.invitations = angular.copy(vm.user.settings.preferences.groupsInvitations);
        vm.members     = angular.copy(vm.user.settings.preferences.groupsMembers);
        vm.log         = angular.copy(vm.user.settings.preferences.groupsLog);

        // When the user factory is updated
        userFactory.subscribe($scope, function () {
            vm.methods.onDisplayDetails();
            vm.user        = userFactory.getUser();
            vm.invitations = angular.copy(vm.user.settings.preferences.groupsInvitations);
            vm.members     = angular.copy(vm.user.settings.preferences.groupsMembers);
            vm.log         = angular.copy(vm.user.settings.preferences.groupsLog);
        });

        function save(form) {
            startLoading();
            switch (form) {
                case 'edit':
                    var updatedGroup = {
                        name       : vm.edit.name,
                        description: vm.edit.description,
                        picture    : vm.edit.picture
                    };
                    groupsFactory.httpRequest.updateGroup(vm.details.group.name, updatedGroup, function () {
                        vm.methods.stopLoading();
                        goTo.view('app.groups.details', {groupName: updatedGroup.name});
                    }, function () {
                        vm.methods.stopLoading();
                        var btn = angular.element(document.querySelector('#submit-edit-group-btn'));
                        httpRequest.shakeElement(btn);
                    });
                    break;
            }
        }

        function onDisplayDetails() {
            vm.user   = userFactory.getUser();
            vm.params = $state.params;
            var name  = $state.params.groupName;
            var group = groupsFactory.getGroupByNameWithUserRoles(name, vm.user.username);
            if (group != null) {
                vm.details.group         = group;
                vm.details.user          = groupsFactory.getUserFromGroup(vm.user.username, name);
                vm.details.userIsInGroup = vm.details.user != null ? vm.details.user.hasLeft == 0 : false;
                vm.details.userIsAdmin   = vm.details.user != null ? vm.details.user.admin : false;
                vm.details.userHasRights = groupsFactory.doesUserHasRights(vm.details.user);
                vm.edit                  = angular.copy(group);
                vm.groupInvitations      = usersFactory.addUsersFullNames(group.invitations);
                vm.groupMembers          = usersFactory.addUsersFullNames(group.users);
                vm.logs                  = angular.copy(group.logs);
                if (!Methods.isNullOrEmpty(vm.logs)) {
                    vm.logs.forEach(function (log) {
                        log.text          = $filter('translate')('groups_log_' + log.type, log.values);
                        log.formattedDate = $filter('date')(log.date, 'EEEE dd MMMM yyyy à HH:mm');
                    });
                }
            }
            else {
                // @todo error handling
            }
        }

        function joinGroup(groupName) {

        }

        function leaveGroup(groupName) {

        }

        function onShowAll() {

            // It will hide the edit btn
            vm.details.userIsAdmin = false;
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

        function onRecruitInit() {
            vm.availableUsers = groupsFactory.getAvailableUsers($state.params.groupName);
            vm.recruitMod     = 'users';
            vm.recruitEmail   = [
                {
                    email: ''
                }
            ];
        }

        function recruit(type) {
            switch (type) {
                case 'cogeoUsers':
                    vm.methods.onRecruitInit();
                    break;
                case 'cogeoEmail':
                    vm.recruitEmail = [
                        {
                            email: ''
                        }
                    ];
                    break;
            }
        }

        function toggleRecruitMod() {
            vm.recruitMod = vm.recruitMod == 'users' ? 'email' : 'users';
        }

        function startLoading() {
            vm.loading = true;
        }

        function stopLoading() {
            vm.loading = false;
        }
    }

})(window.angular);

