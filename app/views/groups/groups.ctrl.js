(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
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
        'cozenEnhancedLogs',
        'googleGraphGroupMembers',
        'googleGraphGroupStatus',
        'googleGraphGroupChannelsTypes',
        'cozenPopupFactory',
        '$rootScope'
    ];

    function GroupsCtrl(CONFIG, goTo, httpRequest, $state, groupsFactory, userFactory, usersFactory, $filter, $scope,
                        cozenEnhancedLogs, googleGraphGroupMembers, googleGraphGroupStatus, googleGraphGroupChannelsTypes,
                        cozenPopupFactory, $rootScope) {
        var vm = this;

        // Methods
        vm.methods = {
            save             : save,
            onDisplayDetails : onDisplayDetails,
            joinGroup        : joinGroup,
            leaveGroup       : leaveGroup,
            getKickedTime    : Utils.getKickedTime,
            getUserFullName  : usersFactory.getUserFullName,
            onShowAll        : onShowAll,
            getAllLogs       : getAllLogs,
            onRecruitInit    : onRecruitInit,
            recruit          : recruit,
            toggleRecruitMod : toggleRecruitMod,
            startLoading     : startLoading,
            stopLoading      : stopLoading,
            isEmailDuplicated: isEmailDuplicated,
            onInitDetails    : onInitDetails,
            onInitMembers    : onInitMembers
        };

        // Common data
        vm.CONFIG         = CONFIG;
        vm.loading        = false;
        vm.user           = userFactory.getUser();
        vm.groups         = groupsFactory.getGroupsWithUserRoles(vm.user.username);
        vm.all            = angular.merge({}, vm.all, angular.copy(vm.user.settings.preferences.allGroups));
        vm.details        = {};
        vm.edit           = {};
        vm.invitations    = angular.merge({}, vm.invitations, angular.copy(vm.user.settings.preferences.groupsInvitations));
        vm.members        = angular.merge({}, vm.members, angular.copy(vm.user.settings.preferences.groupsMembers));
        vm.log            = angular.merge({}, vm.log, angular.copy(vm.user.settings.preferences.groupsLogs));
        vm.groupsQuantity = groupsFactory.getGroups().length;
        vm.googleGraph    = {};

        // When the user factory is updated
        userFactory.subscribe($scope, function () {
            vm.methods.onDisplayDetails();
            vm.user        = userFactory.getUser();
            vm.invitations = angular.merge({}, vm.invitations, angular.copy(vm.user.settings.preferences.groupsInvitations));
            vm.members     = angular.merge({}, vm.members, angular.copy(vm.user.settings.preferences.groupsMembers));
            vm.log         = angular.merge({}, vm.log, angular.copy(vm.user.settings.preferences.groupsLogs));
            vm.methods.onInitMembers();
        });

        // When the group
        groupsFactory.subscribe($scope, function () {
            vm.methods.onDisplayDetails();
            vm.user        = userFactory.getUser();
            vm.invitations = angular.merge({}, vm.invitations, angular.copy(vm.user.settings.preferences.groupsInvitations));
            vm.members     = angular.merge({}, vm.members, angular.copy(vm.user.settings.preferences.groupsMembers));
            vm.log         = angular.merge({}, vm.log, angular.copy(vm.user.settings.preferences.groupsLogs));
            vm.methods.onInitMembers();
        });

        function save(form) {
            vm.methods.startLoading();
            switch (form) {
                case 'edit':
                    var updatedGroup = {
                        name       : vm.edit.name,
                        description: vm.edit.description,
                        picture    : vm.edit.picture,
                        username   : vm.user.username
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
                vm.groupMembers          = groupsFactory.getActiveUsers(name);
                vm.logs                  = angular.copy(group.logs);
                if (!Methods.isNullOrEmpty(vm.logs)) {
                    vm.logs.forEach(function (log) {
                        log.text          = $filter('translate')('groups_log_' + log.tag, log.values);
                        log.formattedDate = $filter('date')(log.date, 'EEEE dd MMMM yyyy');
                        log.formattedDate += ' ';
                        log.formattedDate += $filter('translate')('other_time_at');
                        log.formattedDate += ' ';
                        log.formattedDate += $filter('date')(log.date, 'HH:mm');
                    });
                }

                // Send message to redraw graph
                $rootScope.$broadcast('cozenDrawChart');
                $rootScope.$broadcast('drawChartValuesInit');
            }
        }

        function joinGroup(groupName) {
            cozenPopupFactory.show({
                name: 'groupJoin',
                data: {
                    groupName: groupName
                }
            });
        }

        function leaveGroup($event, groupName) {
            $event.stopPropagation();
            cozenPopupFactory.show({
                name: 'groupLeave',
                data: {
                    groupName: groupName
                }
            });
        }

        function onShowAll() {
            vm.groups = groupsFactory.getGroupsWithUserRoles(vm.user.username);

            // It will hide the edit btn
            vm.details.userIsAdmin = false;
        }

        function getAllLogs() {
            vm.log.all = true;
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
            vm.methods.startLoading();

            // Common data
            var data = {
                username: vm.details.user.username
            };

            // Update the data
            switch (type) {
                case 'cogeoUsers':
                    data.invitations = vm.availableUsersSelected;
                    data.request     = 'sendCogeoInvitations';
                    break;
                case 'cogeoEmail':
                    data.invitations = vm.recruitEmail;
                    data.request     = 'sendEmailInvitations';
                    break;
            }
            if (CONFIG.dev) {
                cozenEnhancedLogs.info.explodeObject('GroupsCtrl', 'recruit() executed', data);
            }

            // Execute the request
            groupsFactory.httpRequest[data.request](vm.params.groupName, data, function () {
                vm.methods.stopLoading();
                goTo.view('app.groups.invitations', {
                    groupName: vm.params.groupName
                });
            }, function () {
                vm.methods.stopLoading();
                var btn = angular.element(document.querySelector('#submit-recruit-group-btn'));
                httpRequest.shakeElement(btn);
            });
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

        function isEmailDuplicated() {
            var emails = [];
            angular.forEach(vm.recruitEmail, function (email) {
                emails.push(email.email);
            });
            return Methods.hasDuplicates(emails);
        }

        function onInitDetails() {

            // Get the google graph for members
            vm.googleGraph.members       = googleGraphGroupMembers.getChart($state.params.groupName);
            vm.googleGraph.status        = googleGraphGroupStatus.getChart($state.params.groupName);
            vm.googleGraph.channelsTypes = googleGraphGroupChannelsTypes.getChart($state.params.groupName);
        }

        function onInitMembers() {
            vm.membersList = groupsFactory.getAllUsersExceptHasLeft($state.params.groupName);
            vm.membersList = usersFactory.addUsersFullNames(vm.membersList);
        }
    }

})(window.angular);

