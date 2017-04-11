(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('ChannelsCtrl', ChannelsCtrl);

    ChannelsCtrl.$inject = [
        'CONFIG',
        'channelsFactory',
        'googleGraphChannelMembers',
        '$state',
        'groupsFactory',
        'userFactory',
        'usersFactory',
        'goTo',
        'httpRequest',
        '$filter',
        'cozenEnhancedLogs'
    ];

    function ChannelsCtrl(CONFIG, channelsFactory, googleGraphChannelMembers, $state, groupsFactory, userFactory,
                          usersFactory, goTo, httpRequest, $filter, cozenEnhancedLogs) {
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
            updateChannel    : updateChannel,
            startLoading     : startLoading,
            stopLoading      : stopLoading,
            recruit          : recruit
        };

        // Common data
        vm.CONFIG      = CONFIG;
        vm.loading     = false;
        vm.googleGraph = {};

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

            // Get the google graph for members
            vm.googleGraph.members = googleGraphChannelMembers.getChart();
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
            vm.logs           = vm.channel.logs;
            vm.logsSettings   = angular.copy(vm.user.settings.preferences.channelsLogs);
            vm.allLogsDisplay = false;

            // Logs with js $filter stuff (if in html, then search field is not filtering deeper)
            vm.logs.forEach(function (log) {
                log.text          = $filter('translate')('channels_log_' + log.tag, log.values);
                log.formattedDate = $filter('date')(log.date, 'EEEE dd MMMM yyyy à HH:mm');
            });
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
            return channelsFactory.isActiveAdmin(vm.user.username, vm.params.groupName, vm.channel._id);
        }

        // Called on recruit view
        function onInitRecruit() {
            vm.methods.onInit();
            vm.channel        = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel        = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
            vm.userCanRecruit = vm.methods.canRecruit();
            vm.availableUsers = channelsFactory.getAvailableUsers(vm.params.groupName, vm.channel._id);
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
            startLoading();
            var newChannel = {
                name       : vm.newChannel.name,
                description: vm.newChannel.description,
                picture    : vm.newChannel.picture,
                private    : vm.newChannel.private,
                default    : vm.newChannel.default,
                creator    : vm.user.username,
                groupName  : vm.params.groupName
            };
            channelsFactory.httpRequest.addChannel(vm.params.groupName, newChannel, function () {
                vm.methods.stopLoading();
                goTo.view('app.channels.details', {
                    groupName  : vm.params.groupName,
                    channelName: newChannel.name
                });
            }, function () {
                vm.methods.stopLoading();
                var btn = angular.element(document.querySelector('#submit-new-channel-btn'));
                httpRequest.shakeElement(btn);
            });
        }

        // Update a channel
        function updateChannel() {
            vm.methods.startLoading();
            var updatedChannel = {
                name       : vm.editedChannel.name,
                description: vm.editedChannel.description,
                picture    : vm.editedChannel.picture,
                private    : vm.editedChannel.private,
                default    : vm.editedChannel.default,
                groupName  : vm.params.groupName,
                username   : vm.user.username
            };
            channelsFactory.httpRequest.updateChannel(vm.params.groupName, vm.params.channelName, updatedChannel, function () {
                vm.methods.stopLoading();
                goTo.view('app.channels.details', {
                    groupName  : vm.params.groupName,
                    channelName: updatedChannel.name
                });
            }, function () {
                vm.methods.stopLoading();
                var btn = angular.element(document.querySelector('#submit-edit-channel-btn'));
                httpRequest.shakeElement(btn);
            });
        }

        // Start loading
        function startLoading() {
            vm.loading = true;
        }

        // Stop loading
        function stopLoading() {
            vm.loading = false;
        }

        // Send invitations to recruit cogeo users
        function recruit() {
            vm.methods.startLoading();
            var invitations = {
                username   : vm.user.username,
                invitations: vm.availableUsersSelected
            };
            if (CONFIG.dev) {
                cozenEnhancedLogs.info.explodeObject('ChannelsCtrl', 'recruit() executed', invitations);
            }
            channelsFactory.httpRequest.sendInvitations(vm.params.groupName, vm.params.channelName, invitations, function () {
                vm.methods.stopLoading();
                goTo.view('app.channels.invitations', {
                    groupName  : vm.params.groupName,
                    channelName: vm.params.channelName
                });
            }, function () {
                vm.methods.stopLoading();
                var btn = angular.element(document.querySelector('#submit-recruit-channel-btn'));
                httpRequest.shakeElement(btn);
            });
        }
    }

})(window.angular);

