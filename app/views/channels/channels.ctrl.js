(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
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
        'cozenEnhancedLogs',
        'googleGraphChannelStatus',
        'cozenLazyLoadRandom',
        'cozenLazyLoadInternal',
        '$scope',
        'cozenPopupFactory',
        '$rootScope',
        '$timeout'
    ];

    function ChannelsCtrl(CONFIG, channelsFactory, googleGraphChannelMembers, $state, groupsFactory, userFactory,
                          usersFactory, goTo, httpRequest, $filter, cozenEnhancedLogs, googleGraphChannelStatus, cozenLazyLoadRandom,
                          cozenLazyLoadInternal, $scope, cozenPopupFactory, $rootScope, $timeout) {
        var vm = this;

        // Methods
        vm.methods = {
            onInit             : onInit,
            onInitAll          : onInitAll,
            onInitDetails      : onInitDetails,
            leaveChannel       : leaveChannel,
            joinChannel        : joinChannel,
            onInitMembers      : onInitMembers,
            getKickedTime      : Utils.getKickedTime,
            getUserFullName    : usersFactory.getUserFullName,
            onInitInvitations  : onInitInvitations,
            onInitLogs         : onInitLogs,
            getAllLogs         : getAllLogs,
            onInitNew          : onInitNew,
            canRecruit         : canRecruit,
            onInitRecruit      : onInitRecruit,
            onInitEdit         : onInitEdit,
            newChannel         : newChannel,
            updateChannel      : updateChannel,
            startLoading       : startLoading,
            stopLoading        : stopLoading,
            recruit            : recruit,
            createRandomChannel: createRandomChannel,
            disableChat        : disableChat
        };

        // Common data
        vm.CONFIG      = CONFIG;
        vm.loading     = false;
        vm.googleGraph = {};

        // Listener
        groupsFactory.subscribe($scope, function () {
            vm.methods.onInitDetails();
            vm.methods.onInitMembers();
        });
        userFactory.subscribe($scope, function () {
            vm.user = userFactory.getUser();
        });

        // Called on each view
        function onInit() {
            vm.params   = $state.params;
            vm.group    = groupsFactory.getGroupByName(vm.params.groupName);
            vm.user     = userFactory.getUser();
            vm.channels = channelsFactory.getChannelsWithUserRoles(vm.params.groupName, vm.user.username);

            // Get the user and kicked/banned object
            var userGroup = groupsFactory.getUserFromGroup(vm.user.username, vm.group.name);
            if (Methods.isNullOrEmpty(userGroup)) {
                userGroup = {
                    banned : false,
                    kicked : false,
                    hasLeft: 1
                }
            }
            vm.groupUserBanned = userGroup.banned;
            vm.groupUserKicked = userGroup.kicked;

            // Common variable to know if the user has access
            vm.userHasGroupRights = !vm.groupUserBanned.active
                && !vm.groupUserKicked.active
                && userGroup.hasLeft == 0;
        }

        // Called on all view
        function onInitAll() {
            vm.methods.onInit();
            vm.allChannels  = angular.merge({}, vm.allChannels, angular.copy(vm.user.settings.preferences.allChannels));
            vm.isGroupAdmin = groupsFactory.isUserAdmin(vm.params.groupName, vm.user.username);
            vm.disabledChat = vm.methods.disableChat();
        }

        // Called on details view
        function onInitDetails() {
            vm.methods.onInit();
            vm.channel = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            if (!Methods.isNullOrEmpty(vm.channel)) {
                vm.channel      = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
                vm.disabledChat = vm.methods.disableChat();

                // Get the google graph for members
                vm.googleGraph.members = googleGraphChannelMembers.getChart(vm.params.groupName, vm.channel._id);
                vm.googleGraph.status  = googleGraphChannelStatus.getChart(vm.params.groupName, vm.channel._id);

                // Send message to redraw graph
                $rootScope.$broadcast('cozenDrawChart');
                $rootScope.$broadcast('drawChartValuesInit');
            }
        }

        // Leave a channel
        function leaveChannel($event) {
            $event.stopPropagation();
            cozenPopupFactory.show({
                name: 'channelLeave',
                data: {
                    groupName  : vm.params.groupName,
                    channelName: vm.params.channelName
                }
            });
        }

        // Join a channel
        function joinChannel() {
            cozenPopupFactory.show({
                name: 'channelJoin',
                data: {
                    groupName  : vm.params.groupName,
                    channelName: vm.params.channelName
                }
            });
        }

        // Called on members view
        function onInitMembers() {
            vm.methods.onInit();
            vm.channel = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            if (!Methods.isNullOrEmpty(vm.channel)) {
                vm.channel         = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
                vm.disabledChat    = vm.methods.disableChat();
                vm.membersList     = channelsFactory.getAllUsersExceptHasLeft($state.params.groupName, vm.channel._id);
                vm.membersList     = usersFactory.addUsersFullNames(vm.membersList);
                vm.membersSettings = angular.merge({}, vm.membersSettings, angular.copy(vm.user.settings.preferences.channelsMembers));
            }
        }

        // Called on invitations view
        function onInitInvitations() {
            vm.methods.onInit();
            vm.channel             = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel             = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
            vm.disabledChat        = vm.methods.disableChat();
            vm.invitations         = vm.channel.invitations;
            vm.invitations         = usersFactory.addUsersFullNames(vm.invitations);
            vm.invitationsSettings = angular.merge({}, vm.invitationsSettings, angular.copy(vm.user.settings.preferences.channelsInvitations));
            vm.userCanRecruit      = vm.methods.canRecruit();
        }

        // Called on logs view
        function onInitLogs() {
            vm.methods.onInit();
            vm.channel        = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel        = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
            vm.disabledChat   = vm.methods.disableChat();
            vm.logs           = vm.channel.logs;
            vm.logsSettings   = angular.merge({}, vm.logsSettings, angular.copy(vm.user.settings.preferences.channelsLogs));
            vm.allLogsDisplay = false;

            // Logs with js $filter stuff (if in html, then search field is not filtering deeper)
            vm.logs.forEach(function (log) {
                log.text          = $filter('translate')('channels_log_' + log.tag, log.values);
                log.formattedDate = $filter('date')(log.date, 'EEEE dd MMMM yyyy');
                log.formattedDate += ' ';
                log.formattedDate += $filter('translate')('other_time_at');
                log.formattedDate += ' ';
                log.formattedDate += $filter('date')(log.date, 'HH:mm');
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
            vm.disabledChat   = vm.methods.disableChat();
            vm.userCanRecruit = vm.methods.canRecruit();
            vm.availableUsers = channelsFactory.getAvailableUsers2(vm.params.groupName, vm.channel._id);
        }

        // Called on edit view
        function onInitEdit() {
            vm.methods.onInit();
            vm.channel                    = groupsFactory.getChannelByName(vm.params.groupName, vm.params.channelName);
            vm.channel                    = channelsFactory.getChannelWithUserRoles(vm.channel, vm.user);
            vm.disabledChat               = vm.methods.disableChat();
            vm.editedChannel              = angular.copy(vm.channel);
            vm.editedChannel.originalName = vm.params.channelName;
            vm.defaultChannels            = channelsFactory.getDefaultChannels(vm.params.groupName);
            if (vm.defaultChannels.length == 5) {
                vm.canAddDefaultChannel = vm.channel.byDefault;
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
                byDefault  : vm.newChannel.byDefault,
                creator    : vm.user.username,
                groupName  : vm.params.groupName
            };
            channelsFactory.httpRequest.addChannel(vm.params.groupName, newChannel, function () {
                if (CONFIG.dev) {
                    cozenEnhancedLogs.explodeObject(newChannel);
                }
                vm.methods.stopLoading();
                $timeout(function () {
                    goTo.view('app.channels.details', {
                        groupName  : vm.params.groupName,
                        channelName: newChannel.name
                    });
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
                byDefault  : vm.editedChannel.byDefault,
                groupName  : vm.params.groupName,
                username   : vm.user.username
            };

            // Update the channel
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

            // Update the starred channels
            if (vm.editedChannel.isStarred) {
                userFactory.httpRequest.removeToStarred({
                    channelId: vm.channel._id
                });
            }
            else {
                userFactory.httpRequest.addToStarred({
                    channelId: vm.channel._id
                });
            }
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

        function createRandomChannel() {
            vm.newChannel.name        = $filter('cozenCapitalize')(cozenLazyLoadRandom.getRandomWord(Methods.getRandomFromRange(4, 22)), true, true);
            vm.newChannel.description = cozenLazyLoadRandom.getRandomSentence(15);
            vm.newChannel.private     = Methods.getRandomBoolean();
            vm.newChannel.byDefault   = false;
            cozenLazyLoadInternal.sendBroadcastBtnClick('submit-new-channel-btn');
        }

        function disableChat() {
            if (Methods.isNullOrEmpty(vm.channel)) {
                return !vm.userHasGroupRights;
            }
            else {
                return !(vm.userHasGroupRights && vm.channel.isMember && !vm.channel.isKicked && !vm.channel.isBanned);
            }
        }
    }

})(window.angular);

