(function (angular, document) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = [
        'CONFIG',
        'groupsFactory',
        'userFactory',
        '$state',
        'channelsFactory',
        '$animate',
        'goTo',
        '$rootScope',
        '$scope',
        'cozenOnClickService',
        'usersFactory'
    ];

    function ChatCtrl(CONFIG, groupsFactory, userFactory, $state, channelsFactory, $animate, goTo, $rootScope, $scope,
                      cozenOnClickService, usersFactory) {
        var vm = this;

        // Methods
        vm.methods = {
            onInit          : onInit,
            setActiveGroup  : setActiveGroup,
            setActiveChannel: setActiveChannel,
            removeToStarred : removeToStarred,
            addToStarred    : addToStarred,
            hideChannels    : hideChannels,
            showChannels    : showChannels,
            onActionClick   : onActionClick
        };

        // Common data
        vm.CONFIG    = CONFIG;
        vm.loading   = false;
        vm.actionBar = {
            options: {
                down: false
            }
        };

        // Listener
        userFactory.subscribe($scope, vm.methods.onInit);
        cozenOnClickService.subscribe($scope, vm.methods.onActionClick);

        // Called each time a view is loaded
        function onInit() {
            vm.params   = $state.params;
            vm.user     = userFactory.getUser();
            vm.groups   = groupsFactory.getUserGroups(vm.user.username);
            vm.hasGroup = vm.groups.length > 0;
            vm.methods.showChannels();
            vm.status = userFactory.getStatus();
            if (vm.hasGroup) {
                vm.methods.setActiveGroup(vm.params.groupName);
                vm.methods.setActiveChannel(vm.params.channelName, channelsFactory.getChannelIdByName(vm.params.groupName, vm.params.channelName));
            }
        }

        // Called when the user click on a new group
        function setActiveGroup(groupName) {
            vm.activeGroup     = groupName;
            vm.starredChannels = channelsFactory.getMyStarredChannels(groupName);
            vm.othersChannels  = channelsFactory.getMyOthersChannels(groupName);
            vm.methods.showChannels();
        }

        // Called when the user click on a new channel
        function setActiveChannel(channelName, channelId) {
            vm.activeChannel                  = groupsFactory.getChannelById(vm.activeGroup, channelId);
            vm.activeChannel                  = channelsFactory.getChannelWithUserRoles(vm.activeChannel, vm.user);
            vm.messages                       = channelsFactory.getMessages(vm.activeGroup, channelId, 50);
            vm.activeChannel.isStarredChannel = channelsFactory.isStarredChannel(vm.user.username, vm.activeChannel._id);
            vm.activeMembers                  = channelsFactory.getActiveMembers(vm.activeGroup, channelId);
            vm.chatTheme                      = 'channel-theme';
            goTo.view('app.chat.channel', {
                groupName  : vm.activeGroup,
                channelName: channelName
            });
            $rootScope.$broadcast('setChatTheme', {
                theme: vm.chatTheme
            });
        }

        // Remove this channel from the starred
        function removeToStarred($event, channelId) {
            $event.stopPropagation();
            userFactory.removeToStarred(channelId);
        }

        // Add this channel to the starred
        function addToStarred($event, channelId) {
            $event.stopPropagation();
            if (vm.starredChannels.length < 5) {
                userFactory.addToStarred(channelId);
            }
        }

        // Hide the channels and friends col
        function hideChannels($event) {
            $event.stopPropagation();
            if (vm.showChannels && !vm.showChannelsBlocked) {
                vm.showChannels        = false;
                var channels           = angular.element(document.querySelector('#chat-channels-container'));
                vm.showChannelsBlocked = true;
                $animate.addClass(channels, 'slideOutLeft').then(function () {
                    $animate.addClass(channels, 'hide');
                    $animate.removeClass(channels, 'slideOutLeft');
                    vm.showChannelsBlocked = false;
                });
            }
        }

        // Show the channels and friends col
        function showChannels() {
            if (!vm.showChannels && !vm.showChannelsBlocked) {
                vm.showChannels        = true;
                var channels           = angular.element(document.querySelector('#chat-channels-container'));
                vm.showChannelsBlocked = true;
                $animate.removeClass(channels, 'hide');
                $animate.addClass(channels, 'slideInLeft').then(function () {
                    $animate.removeClass(channels, 'slideInLeft');
                    vm.showChannelsBlocked = false;
                });
            }
        }

        // When the user click on an option in the action bar
        function onActionClick($event, target) {
            if ($event !== null) {
                $event.stopPropagation();
            }
            switch (target) {
                case 'options':
                    vm.actionBar.options.down = !vm.actionBar.options.down;
                    break;
                default:
                    vm.actionBar.options.down = false;
                    Methods.safeApply($scope);
            }
        }
    }

})(window.angular, window.document);

