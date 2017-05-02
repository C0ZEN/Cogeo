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
            onActionClick   : onActionClick,
            setActiveFriend : setActiveFriend
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

            // Avoid empty channel name
            if ($state.current.name == 'app.chat.channel' && Methods.isNullOrEmpty($state.params.channelName)) {
                $state.params.channelName = groupsFactory.getGroupByName($state.params.groupName).channels[0].name;
            }
            vm.params         = $state.params;
            vm.user           = userFactory.getUser();
            vm.friends        = userFactory.getUnblockedFriends();
            vm.blockedFriends = userFactory.getBlockedFriends();
            vm.allFriends     = userFactory.getFriends();
            vm.groups         = groupsFactory.getUserActiveGroups(vm.user.username);
            vm.groups         = groupsFactory.removeGroupsWhereNoActiveMemberChannel(vm.groups, vm.user.username);
            vm.hasGroup       = vm.groups.length > 0;
            vm.methods.showChannels();
            vm.status = userFactory.getStatus();
            if (vm.hasGroup) {

                // Set default active group
                if (Methods.isNullOrEmpty(vm.params.groupName)) {
                    vm.params.groupName = vm.groups[0].name;
                }
                vm.methods.setActiveGroup(vm.params.groupName);

                // Active channel only if in a channel route
                if ($state.current.name == 'app.chat.channel') {
                    vm.methods.setActiveChannel(vm.params.channelName, channelsFactory.getChannelIdByName(vm.params.groupName, vm.params.channelName));
                }
            }
            if ($state.current.name == 'app.chat.user') {
                vm.methods.setActiveFriend(vm.params.username);
            }
        }

        // Called when the user click on a new group
        function setActiveGroup(groupName, goToFirstChannel) {
            if (Methods.isNullOrEmpty(goToFirstChannel)) {
                goToFirstChannel = false;
            }
            vm.activeGroup     = groupName;
            vm.starredChannels = channelsFactory.getMyStarredChannels(groupName);
            vm.othersChannels  = channelsFactory.getMyOthersChannels(groupName);
            vm.methods.showChannels();

            // Set the context as channel
            if (goToFirstChannel) {
                var channel;
                if (vm.starredChannels.length > 0) {
                    channel = vm.starredChannels[0];
                }
                else {
                    channel = vm.othersChannels[0];
                }
                vm.methods.setActiveChannel(channel.name, channel._id);
            }
        }

        // Called when the user click on a new channel
        function setActiveChannel(channelName, channelId) {
            vm.activeChannel                  = groupsFactory.getChannelById(vm.activeGroup, channelId);
            vm.activeChannel                  = channelsFactory.getChannelWithUserRoles(vm.activeChannel, vm.user);
            vm.messages                       = channelsFactory.getMessages(vm.activeGroup, channelId, 50);
            vm.messages                       = [
                {
                    _id    : '1',
                    sender : 'C0ZEN',
                    sent   : 1484561615,
                    content: '###Yolo\nça boum ?',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '2',
                    sender : 'Marco',
                    sent   : 1484562715,
                    content: 'Hello, ça va ?!?',
                    edited : 1484562915,
                    tag    : 'user'
                },
                {
                    _id    : '17',
                    sender : 'Pioth',
                    sent   : 1484571615,
                    content: '[Lien](http://www.geoffreytestelin.com/)',
                    edited : 0,
                    tag    : 'user'
                }
            ];
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
            userFactory.httpRequest.removeToStarred({
                channelId: channelId
            });
        }

        // Add this channel to the starred
        function addToStarred($event, channelId) {
            $event.stopPropagation();
            userFactory.httpRequest.addToStarred({
                channelId: channelId
            });
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

        // Active the user context
        function setActiveFriend(username) {
            vm.activeChannel = null;

            // Find the active friend
            vm.allFriends.forEach(function (friend) {
                if (friend.username == username) {
                    vm.activeFriend = friend;
                }
            });

            vm.friendStatus = {
                id      : 'online',
                name    : 'other_status_online',
                selected: true,
                color   : '#2ecc71'
            };
            vm.messages     = [
                {
                    _id    : '1',
                    sender : 'C0ZEN',
                    sent   : 1484561615,
                    content: '###Yolo\nça boum ?',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '2',
                    sender : 'Marco',
                    sent   : 1484562715,
                    content: 'Hello, ça va ?!?',
                    edited : 1484562915,
                    tag    : 'user'
                },
                {
                    _id    : '3',
                    sender : 'Spamobot',
                    sent   : 1484562715,
                    content: 'Bienvenu !',
                    tag    : 'bot'
                },
                {
                    _id    : '4',
                    sender : 'Friendybot',
                    sent   : 1484562715,
                    content: 'Yo !',
                    tag    : 'bot'
                },
                {
                    _id    : '5',
                    sender : 'C0ZEN',
                    sent   : 1484571615,
                    content: '*Yo*',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '6',
                    sender : 'C0ZEN',
                    sent   : 1484571615,
                    content: '#Titre 1',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '7',
                    sender : 'C0ZEN',
                    sent   : 1484571615,
                    content: '##Titre 2',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '8',
                    sender : 'C0ZEN',
                    sent   : 1484571615,
                    content: '###Titre 3',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '9',
                    sender : 'C0ZEN',
                    sent   : 1484571615,
                    content: '####Titre 4',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '10',
                    sender : 'C0ZEN',
                    sent   : 1484571615,
                    content: 'Un texte avec le mot en *italique*',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '11',
                    sender : 'C0ZEN',
                    sent   : 1484571615,
                    content: 'Un texte avec le mot en **gras**',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '12',
                    sender : 'C0ZEN',
                    sent   : 1484571615,
                    content: '#Titre 1     Bonjour les *amis* !',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '13',
                    sender : 'C0ZEN',
                    sent   : 1484571615,
                    content: 'Un texte avec le mot en ~~rayé~~',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '14',
                    sender : 'C0ZEN',
                    sent   : 1484571615,
                    content: '#####Titre 5',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '15',
                    sender : 'C0ZEN',
                    sent   : 1484571615,
                    content: '######Titre 6',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '16',
                    sender : 'C0ZEN',
                    sent   : 1484571615,
                    content: '[Lien](http://www.geoffreytestelin.com/)',
                    edited : 0,
                    tag    : 'user'
                },
                {
                    _id    : '17',
                    sender : 'Nitbosmet',
                    sent   : 1484571615,
                    content: '[Lien](http://www.geoffreytestelin.com/)',
                    edited : 0,
                    tag    : 'user'
                }
            ];
            vm.chatTheme    = 'social-theme';
            goTo.view('app.chat.user', {
                username: username
            });
            $rootScope.$broadcast('setChatTheme', {
                theme: vm.chatTheme
            });
        }
    }

})(window.angular, window.document);

