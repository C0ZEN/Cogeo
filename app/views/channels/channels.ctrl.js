(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('ChannelsCtrl', ChannelsCtrl);

    ChannelsCtrl.$inject = [
        'CONFIG',
        'channelsFactory',
        '$rootScope',
        '$state',
        'groupsFactory',
        'userFactory',
        'usersFactory',
        '$filter',
        '$scope'
    ];

    function ChannelsCtrl(CONFIG, channelsFactory, $rootScope, $state, groupsFactory, userFactory, usersFactory, $filter, $scope) {
        var vm = this;

        // Methods
        vm.methods = {
            onInit           : onInit,
            onInitAll        : onInitAll,
            onInitDetails    : onInitDetails,
            leaveChannel     : leaveChannel,
            joinChannel      : joinChannel,
            onInitMembers    : onInitMembers,
            getKickedTime    : Utils.getKickedTime,
            getUserFullName  : usersFactory.getUserFullName,
            onInitInvitations: onInitInvitations,
            onInitLogs       : onInitLogs,
            getAllLogs       : getAllLogs,
            onInitNew        : onInitNew
        };

        // Common data
        vm.CONFIG  = CONFIG;
        vm.loading = false;

        function onInit() {
            vm.params   = $state.params;
            vm.group    = groupsFactory.getGroupByName(vm.params.groupName);
            vm.user     = userFactory.getUser();
            vm.channels = channelsFactory.getChannelsWithUserRoles(vm.params.groupName, vm.user.username);
        }

        function onInitAll() {
            vm.methods.onInit();
            vm.allChannels  = angular.copy(vm.user.settings.preferences.allChannels);
            vm.isGroupAdmin = groupsFactory.isUserAdmin(vm.params.groupName, vm.user.username);
        }

        function onInitDetails() {
            vm.methods.onInit();
            vm.channel = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
        }

        function leaveChannel(channelId) {

        }

        function joinChannel(channelId) {

        }

        function onInitMembers() {
            vm.methods.onInit();
            vm.channel         = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel         = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
            vm.members         = usersFactory.addUsersFullNames(vm.channel.users);
            vm.membersSettings = angular.copy(vm.user.settings.preferences.channelsMembers);
        }

        function onInitInvitations() {
            vm.methods.onInit();
            vm.channel             = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel             = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
            vm.invitations         = vm.channel.invitations;
            vm.invitations         = usersFactory.addUsersFullNames(vm.invitations);
            vm.invitationsSettings = angular.copy(vm.user.settings.preferences.channelsInvitations);
        }

        function onInitLogs() {
            vm.methods.onInit();
            vm.channel        = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel        = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
            vm.logs           = vm.channels.logs;
            vm.logsSettings   = angular.copy(vm.user.settings.preferences.channelsLogs);
            vm.allLogsDisplay = false;
        }

        function getAllLogs() {
            vm.allLogsDisplay = true;
        }

        function onInitNew() {
            vm.methods.onInit();
        }
    }

})(window.angular);

