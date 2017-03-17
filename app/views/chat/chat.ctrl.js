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
        '$rootScope'
    ];

    function ChatCtrl(CONFIG, groupsFactory, userFactory, $state, channelsFactory, $animate, goTo, $rootScope) {
        var vm = this;

        // Methods
        vm.methods = {
            onInit          : onInit,
            setActiveGroup  : setActiveGroup,
            setActiveChannel: setActiveChannel,
            removeToStarred : removeToStarred,
            addToStarred    : addToStarred,
            hideChannels    : hideChannels,
            showChannels    : showChannels
        };

        // Common data
        vm.CONFIG  = CONFIG;
        vm.loading = false;

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

        function setActiveGroup(groupName) {
            vm.activeGroup     = groupName;
            vm.starredChannels = channelsFactory.getMyStarredChannels(groupName);
            vm.othersChannels  = channelsFactory.getMyOthersChannels(groupName);
            vm.methods.showChannels();
        }

        function setActiveChannel(channelName, channelId) {
            vm.activeChannel = channelName;
            vm.messages      = channelsFactory.getMessages(vm.activeGroup, channelId, 50);
            vm.chatTheme     = 'channel-theme';
            goTo.view('app.chat.channel', {
                groupName  : vm.activeGroup,
                channelName: vm.activeChannel
            });
            $rootScope.$broadcast('setChatTheme', {
                theme: vm.chatTheme
            });
        }

        function removeToStarred($event, channelId) {
            $event.stopPropagation();
        }

        function addToStarred($event, channelId) {
            $event.stopPropagation();
            if (vm.starredChannels.length < 5) {

            }
        }

        function hideChannels($event) {
            $event.stopPropagation();
            if (vm.showChannels && !vm.showChannelsBlocked) {
                vm.showChannels        = false;
                var channels           = angular.element(document.querySelector('#atom-chat-channels-container'));
                vm.showChannelsBlocked = true;
                $animate.addClass(channels, 'slideOutLeft').then(function () {
                    $animate.addClass(channels, 'hide');
                    $animate.removeClass(channels, 'slideOutLeft');
                    vm.showChannelsBlocked = false;
                });
            }
        }

        function showChannels() {
            if (!vm.showChannels && !vm.showChannelsBlocked) {
                vm.showChannels        = true;
                var channels           = angular.element(document.querySelector('#atom-chat-channels-container'));
                vm.showChannelsBlocked = true;
                $animate.removeClass(channels, 'hide');
                $animate.addClass(channels, 'slideInLeft').then(function () {
                    $animate.removeClass(channels, 'slideInLeft');
                    vm.showChannelsBlocked = false;
                });
            }
        }
    }

})(window.angular, window.document);

