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
        'goTo',
        '$scope'
    ];

    function ChannelsCtrl(CONFIG, channelsFactory, $rootScope, $state, groupsFactory, userFactory, usersFactory, goTo, $scope) {
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
            onInitNew        : onInitNew,
            canRecruit       : canRecruit,
            onInitRecruit    : onInitRecruit,
            onInitEdit       : onInitEdit,
            newChannel       : newChannel,
            updateChannel    : updateChannel
        };

        // Common data
        vm.CONFIG  = CONFIG;
        vm.loading = false;

        // Called on each view
        function onInit() {
            vm.params   = $state.params;
            vm.group    = groupsFactory.getGroupByName(vm.params.groupName);
            vm.user     = userFactory.getUser();
            vm.channels = channelsFactory.getChannelsWithUserRoles(vm.params.groupName, vm.user.username);
        }

        // Called on all view
        function onInitAll() {
            vm.methods.onInit();
            vm.allChannels  = angular.copy(vm.user.settings.preferences.allChannels);
            vm.isGroupAdmin = groupsFactory.isUserAdmin(vm.params.groupName, vm.user.username);
        }

        // Called on details view
        function onInitDetails() {
            vm.methods.onInit();
            vm.channel = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
        }

        // Leave a channel
        function leaveChannel(channelId) {

        }

        // Join a channel
        function joinChannel(channelId) {

        }

        // Called on members view
        function onInitMembers() {
            vm.methods.onInit();
            vm.channel         = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel         = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
            vm.members         = usersFactory.addUsersFullNames(vm.channel.users);
            vm.membersSettings = angular.copy(vm.user.settings.preferences.channelsMembers);
        }

        // Called on invitations view
        function onInitInvitations() {
            vm.methods.onInit();
            vm.channel             = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel             = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
            vm.invitations         = vm.channel.invitations;
            vm.invitations         = usersFactory.addUsersFullNames(vm.invitations);
            vm.invitationsSettings = angular.copy(vm.user.settings.preferences.channelsInvitations);
            vm.userCanRecruit      = vm.methods.canRecruit();
        }

        // Called on logs view
        function onInitLogs() {
            vm.methods.onInit();
            vm.channel        = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel        = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
            vm.logs           = vm.channels.logs;
            vm.logsSettings   = angular.copy(vm.user.settings.preferences.channelsLogs);
            vm.allLogsDisplay = false;
        }

        // Get all the logs
        function getAllLogs() {
            vm.allLogsDisplay = true;
        }

        // Called on new view
        function onInitNew() {
            vm.methods.onInit();
            vm.newChannel           = {};
            vm.defaultChannels      = channelsFactory.getDefaultChannels(vm.params.groupName);
            vm.canAddDefaultChannel = vm.defaultChannels.length < 5;
        }

        // Check if the user can recruit members
        function canRecruit() {
            return channelsFactory.isActiveAdmin(vm.user.username, vm.params.groupName, vm.channel.id);
        }

        // Called on recruit view
        function onInitRecruit() {
            vm.methods.onInit();
            vm.channel        = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel        = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
            vm.userCanRecruit = vm.methods.canRecruit();
            vm.availableUsers = channelsFactory.getAvailableUsers(vm.params.groupName, vm.channel.id);
        }

        // Called on edit view
        function onInitEdit() {
            vm.methods.onInit();
            vm.channel         = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel         = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
            vm.editedChannel   = angular.copy(vm.channel);
            vm.defaultChannels = channelsFactory.getDefaultChannels(vm.params.groupName);
            if (vm.defaultChannels.length == 5) {
                vm.canAddDefaultChannel = vm.channel.default;
            }
            else {
                vm.canAddDefaultChannel = vm.defaultChannels.length <= 5;
            }
        }

        // Create a new channel
        function newChannel() {
            vm.loading = true;
            vm.loading = false;
            goTo.view('app.channels.recruit', {
                groupName  : vm.params.groupName,
                channelName: vm.newChannel.name
            });
        }

        // Update the channel
        function updateChannel() {
            vm.loading = true;
            vm.loading = false;
            goTo.view('app.channels.details', {
                groupName  : vm.params.groupName,
                channelName: vm.editedChannel.name
            });
        }
    }

})(window.angular);

