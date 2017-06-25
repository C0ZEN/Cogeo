(function (angular, document) {
    'use strict';

    angular
        .module('cogeoApp')
        .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = [
        'CONFIG',
        'groupsFactory',
        'userFactory',
        '$state',
        'channelsFactory',
        'goTo',
        '$rootScope',
        '$scope',
        '$anchorScroll',
        'cozenOnClickService',
        '$filter',
        'botFactory',
        'ngAudio',
        '$location',
        'cozenEnhancedLogs',
        '$timeout',
        'directMessagesFactory',
        'cogeoWebRtc',
        'usersFactory',
        'statusFactory',
        'cozenFloatingFeedFactory'
    ];

    function ChatCtrl(CONFIG, groupsFactory, userFactory, $state, channelsFactory, goTo, $rootScope, $scope, $anchorScroll,
                      cozenOnClickService, $filter, botFactory, ngAudio, $location, cozenEnhancedLogs, $timeout, directMessagesFactory,
                      cogeoWebRtc, usersFactory, statusFactory, cozenFloatingFeedFactory) {
        var vm = this;

        // Methods
        vm.methods = {
            onInit                  : onInit,
            setActiveGroup          : setActiveGroup,
            setActiveChannel        : setActiveChannel,
            removeToStarred         : removeToStarred,
            addToStarred            : addToStarred,
            hideChannels            : hideChannels,
            showChannels            : showChannels,
            toggleChannels          : toggleChannels,
            onActionClick           : onActionClick,
            setActiveFriend         : setActiveFriend,
            toggleExpand            : toggleExpand,
            onToggleSingleExpanded  : onToggleSingleExpanded,
            isMedia                 : isMedia,
            calcMediaLength         : calcMediaLength,
            getUserAlias            : getUserAlias,
            initMp3                 : initMp3,
            stopAllMp3              : stopAllMp3,
            pauseAllMp3             : pauseAllMp3,
            stopAllMedia            : stopAllMedia,
            pauseAllMedia           : pauseAllMedia,
            isMediaAudioPresent     : isMediaAudioPresent,
            isAudioMedia            : isAudioMedia,
            onPlayerReady           : onPlayerReady,
            stopAllVideo            : stopAllVideo,
            pauseAllVideo           : pauseAllVideo,
            isMediaPresent          : isMediaPresent,
            scrollToBottom          : scrollToBottom,
            sendNewMessage          : sendNewMessage,
            stopAllEdit             : stopAllEdit,
            startEdit               : startEdit,
            editMessage             : editMessage,
            addSmiley               : addSmiley,
            sendMessageToChannelPeer: sendMessageToChannelPeer,
            isMessageVisible        : isMessageVisible
        };

        // Common data
        vm.CONFIG    = CONFIG;
        vm.loading   = false;
        vm.actionBar = {
            options: {
                down: false
            }
        };
        vm.expandAll = true;
        vm.messages  = [];
        vm.upload    = {
            config   : CONFIG.internal.uploadChat,
            onSuccess: function (model, file) {
                {

                    // Define and set data by category
                    var category, content;
                    switch (model.type) {
                        case 'application/vnd.ms-excel':
                        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            category = 'excel';
                            content  = {
                                url     : model.url,
                                name    : model.originalName,
                                fullName: model.fullName,
                                size    : model.readableSize
                            };
                            break;
                        case 'application/msword':
                        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            category = 'word';
                            content  = {
                                url     : model.url,
                                name    : model.originalName,
                                fullName: model.fullName,
                                size    : model.readableSize
                            };
                            break;
                        case 'application/vnd.ms-powerpoint':
                        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                            category = 'powerpoint';
                            content  = {
                                url     : model.url,
                                name    : model.originalName,
                                fullName: model.fullName,
                                size    : model.readableSize
                            };
                            break;
                        case 'application/pdf':
                            category = 'pdf';
                            content  = {
                                url     : model.url,
                                name    : model.originalName,
                                fullName: model.fullName,
                                size    : model.readableSize
                            };
                            break;
                        case 'text/plain':
                            category = 'txt';
                            content  = {
                                url     : model.url,
                                name    : model.originalName,
                                fullName: model.fullName,
                                size    : model.readableSize
                            };
                            break;
                        case 'image/jpeg':
                        case 'image/png':
                        case 'image/gif':
                            category = 'image';
                            content  = {
                                url     : model.url,
                                name    : model.originalName,
                                fullName: model.fullName,
                                size    : model.readableSize,
                                format  : model.format,
                                height  : model.height,
                                width   : model.width
                            };
                            break;
                        case 'video/mpeg':
                        case 'video/mp4':
                        case 'video/quicktime':
                        case 'video/x-ms-wmv':
                        case 'video/webm':
                        case 'video/x-msvideo':
                        case 'video/x-flv':
                            category = 'video';
                            content  = {
                                url     : model.url,
                                name    : model.originalName,
                                fullName: model.fullName,
                                size    : model.readableSize,
                                format  : model.format
                            };
                            break;
                        case 'audio/mpeg':
                        case 'audio/mp3':
                            category = 'mp3';
                            content  = {
                                url     : model.url,
                                name    : model.originalName,
                                fullName: model.fullName,
                                size    : model.readableSize,
                                format  : model.format
                            };
                            break;
                    }

                    // Create the message
                    var message = {
                        sender  : userFactory.getUser().username,
                        content : content,
                        tag     : 'user',
                        category: category
                    };

                    // Send the message to the right entity
                    if (!Methods.isNullOrEmpty(message.content) && !Methods.isNullOrEmpty(message.category)) {
                        if ($state.current.name == 'app.chat.user') {
                            directMessagesFactory.httpRequest.addMessage($rootScope.directMessageId, message, function (response) {
                                cogeoWebRtc.connectionSend({
                                    message  : response.data.data,
                                    tag      : 'friend',
                                    messageId: $rootScope.directMessageId
                                });
                            });
                        }
                        else {
                            groupsFactory.httpRequest.addMessage($state.params.groupName, $state.params.channelName, message, function (response) {
                                sendMessageToChannelPeer(response.data.data);
                            });
                        }
                    }
                }
            }
        };
        vm.chat      = {
            friends : {
                isVisible: false,
                isCalling: false
            },
            channels: {}
        };

        // Listener
        userFactory.subscribe($scope, vm.methods.onInit);
        cozenOnClickService.subscribe($scope, vm.methods.onActionClick);
        statusFactory.subscribe($scope, function () {
            vm.status = statusFactory.getCurrentUserStatus();
        });
        directMessagesFactory.subscribe($scope, function () {
            var directMessage          = directMessagesFactory.getMessages(vm.activeFriend.username, vm.user.username, false);
            $rootScope.directMessageId = directMessage._id;
            vm.messages                = directMessage.messages;
            vm.methods.addSmiley(vm.messages);
            vm.methods.calcMediaLength(vm.messages);
            vm.methods.initMp3();
            vm.methods.scrollToBottom({
                data: vm.messages[vm.messages.length - 1]
            });
        });
        groupsFactory.subscribe($scope, function () {
            vm.messages = channelsFactory.getMessages(vm.activeGroup, vm.activeChannel._id, 50);
            vm.methods.addSmiley(vm.messages);
            vm.methods.calcMediaLength(vm.messages);
            vm.methods.initMp3();
            vm.methods.scrollToBottom({
                data: vm.messages[vm.messages.length - 1]
            });
        });

        // Update the volume
        $rootScope.$on('newGlobalVolume', function () {
            vm.messages.forEach(function (message) {
                if (message.category == 'mp3') {
                    message.sound.volume = userFactory.getUser().settings.speaker.volume / 100;
                }
                else if (message.category == 'video') {
                    message.content.API.setVolume(userFactory.getUser().settings.speaker.volume / 100);
                }
            });
        });

        // Listen the change state to stop all mp3 from running
        $rootScope.$on('$stateChangeStart', function () {
            vm.methods.stopAllMp3();
        });

        // Listen to know if the call was refused
        $rootScope.$on('cogeoWebRtc:refusedCall', function () {
            vm.chat.friends.isCalling = false;
        });

        // Listen to know when the stream start
        $rootScope.$on('cogeoWebRtc:streamStarted', function () {
            vm.chat.friends.isVisible = true;
            vm.chat.friends.isCalling = false;
        });

        // Listen to know when the profile bot popup btn is called to set new active friend bot
        $rootScope.$on('popups:onChatBot', function ($event, $eventData) {
            vm.methods.setActiveFriend($eventData.botName);
        });

        // Listen to know when a friend status is updated
        $rootScope.$on('cogeoWebRtc:newStatus', function ($event, $eventData) {
            updateStatusForFriends($eventData);

            // Force the change of status to occur (UI)
            Methods.safeApply($scope);
        });

        $rootScope.$on('safeApplyChat', function () {
            Methods.safeApply($scope);
        });

        // Listener called when the user wish to start a call with a friend
        $rootScope.$on('cogeoWebRtc:setActiveFriendStream', function ($event, $eventData) {
            if (Methods.isNullOrEmpty($eventData)) {
                vm.friendStream = angular.copy(vm.activeFriend);
            }
            else {
                vm.allFriends.forEach(function (friend) {
                    if (friend.username == $eventData.username) {
                        vm.friendStream = friend;
                    }
                });
            }
        });

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
            vm.status         = statusFactory.getCurrentUserStatus();
            vm.methods.showChannels();

            // Add bots as friend
            var bots      = botFactory.getBotFriends();
            vm.friends    = vm.friends.concat(bots);
            vm.allFriends = vm.allFriends.concat(bots);

            // Add status to friends
            vm.friends.forEach(function (friend) {
                friend = usersFactory.setStatus(friend, 3);
            });
            vm.blockedFriends.forEach(function (oldFriend) {
                oldFriend = usersFactory.setStatus(oldFriend, 3);
            });

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
            vm.activeGroupId   = groupsFactory.getGroupByName(groupName)._id;
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
            vm.loadingDomMessages = true;
            vm.methods.stopAllEdit();
            vm.activeChannel = groupsFactory.getChannelById(vm.activeGroup, channelId);
            vm.activeChannel = channelsFactory.getChannelWithUserRoles(vm.activeChannel, vm.user);
            vm.messages      = channelsFactory.getMessages(vm.activeGroup, channelId, 50);
            vm.methods.addSmiley(vm.messages);
            vm.methods.calcMediaLength(vm.messages);
            vm.methods.initMp3();
            vm.activeChannel.isStarredChannel = channelsFactory.isStarredChannel(vm.user.username, vm.activeChannel._id);
            vm.activeMembers                  = channelsFactory.getActiveMembers(vm.activeGroup, channelId);
            vm.chatTheme                      = 'channel-theme';
            vm.inputPlaceholder               = $filter('translate')('chat_newMessage_placeholder_channel', {
                channelName: vm.activeChannel.name
            });

            // Check if the user is in the group (active) and admin of the channel (active too)
            vm.isUserAdmin = channelsFactory.isActiveAdmin(vm.user.username, vm.activeGroup, vm.activeChannel._id)
                && groupsFactory.isActiveMember(vm.user.username, vm.activeGroup);

            // Change the theme
            $rootScope.$broadcast('setChatTheme', {
                theme: vm.chatTheme
            });

            // Change the route
            goTo.view('app.chat.channel', {
                groupName  : vm.activeGroup,
                channelName: channelName
            });

            // Scroll to the last message
            vm.methods.scrollToBottom({
                data: vm.messages[vm.messages.length - 1]
            });

            // Connect with all people
            cogeoWebRtc.connectFriends(vm.activeMembers);
        }

        // Remove this channel from the starred
        function removeToStarred($event, channelId) {
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.functionCalled('ChatCtrl', 'removeToStarred');
            }
            $event.stopPropagation();
            userFactory.httpRequest.removeToStarred({
                channelId: channelId
            });
        }

        // Add this channel to the starred
        function addToStarred($event, channelId) {
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.functionCalled('ChatCtrl', 'addToStarred');
            }
            $event.stopPropagation();
            userFactory.httpRequest.addToStarred({
                channelId: channelId
            });
        }

        // Hide the channels and friends col
        function hideChannels($event) {
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.functionCalled('ChatCtrl', 'hideChannels');
            }
            if (!Methods.isNullOrEmpty($event)) {
                $event.stopPropagation();
            }
            if (vm.showChannels) {
                vm.showChannels = false;
            }
        }

        // Show the channels and friends col
        function showChannels($event) {
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.functionCalled('ChatCtrl', 'showChannels');
            }
            if (!Methods.isNullOrEmpty($event)) {
                $event.stopPropagation();
            }
            if (!vm.showChannels) {
                vm.showChannels = true;
            }
        }

        function toggleChannels($event) {
            vm.showChannels ? vm.methods.hideChannels($event) : vm.methods.showChannels($event);
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
            vm.activeChannel      = null;
            vm.loadingDomMessages = true;
            vm.methods.stopAllEdit();

            // Find the active friend
            var isRealFriend = false;
            vm.allFriends.forEach(function (friend) {
                if (friend.username == username) {
                    isRealFriend    = true;
                    vm.activeFriend = friend;
                }
            });

            // Get the messages
            if (isRealFriend) {
                var directMessage          = directMessagesFactory.getMessages(vm.activeFriend.username, vm.user.username, true);
                $rootScope.directMessageId = directMessage._id;
                vm.messages                = directMessage.messages;
                vm.methods.addSmiley(vm.messages);
                vm.methods.calcMediaLength(vm.messages);
                vm.inputPlaceholder = $filter('translate')('chat_newMessage_placeholder_user', {
                    username: vm.activeFriend.alias || vm.activeFriend.username
                });
                vm.friendStatus = vm.activeFriend.status;
            }
            vm.methods.initMp3();
            vm.chatTheme   = 'social-theme';
            vm.isUserAdmin = false;

            // Change the theme
            $rootScope.$broadcast('setChatTheme', {
                theme: vm.chatTheme
            });

            // If the user is not a friend
            if (!isRealFriend) {
                cozenFloatingFeedFactory.addAlert({
                    type       : 'error',
                    label      : 'alerts_error_chat_friendNotFound',
                    labelValues: {
                        username: username
                    }
                });

                // Change the view
                goTo.view('app.notFriend', {
                    username: username
                });
            }
            else {

                // Change the view
                goTo.view('app.chat.user', {
                    username: username
                });

                // Scroll to the last message
                vm.methods.scrollToBottom({
                    data: vm.messages[vm.messages.length - 1]
                });

                // Connect with all people
                cogeoWebRtc.connectFriends(vm.friends);
            }
        }

        // Toggle the global expand value
        // Hide or show all the media
        function toggleExpand($event) {
            $event.stopPropagation();
            vm.expandAll = !vm.expandAll;
            vm.messages.forEach(function (message) {
                if (Methods.hasOwnProperty(message, 'expanded')) {
                    message.expanded = vm.expandAll;
                }
            });
        }

        // Called to calc the number of expanded media and edit the expandAll value
        // Only if there is an opposing value (single expand of all media, but expandAll is false, it makes no sense)
        // So we change the the expandAll accordingly
        function onToggleSingleExpanded() {
            var isFirst = true, firstExpanded = vm.expandAll, equals = true;
            vm.messages.forEach(function (message) {
                if (Methods.hasOwnProperty(message, 'expanded') && vm.methods.isMedia(message)) {
                    if (isFirst) {
                        isFirst       = false;
                        firstExpanded = message.expanded;
                    }
                    else {
                        if (firstExpanded != message.expanded) {
                            equals = false;
                        }
                    }
                }
            });
            if (equals) {
                vm.expandAll = firstExpanded;
            }
        }

        // Check if the message is a media (mp3 or video)
        function isMedia(message) {
            return message.category == 'image'
                || message.category == 'pdf'
                || message.category == 'excel'
                || message.category == 'word'
                || message.category == 'mp3'
                || message.category == 'video'
                || message.category == 'powerpoint'
                || message.category == 'txt';
        }

        // Get the number of media present in the messages
        function calcMediaLength(messages) {
            var media = 0;
            messages.forEach(function (message) {
                message.expanded = vm.expandAll;
                if (vm.methods.isMedia(message)) {
                    media++;
                }
            });
            vm.mediaLength = media;
        }

        // Get all the alias for the users by checking the friends alias of the current user
        function getUserAlias(username) {
            for (var i = 0, length = vm.allFriends.length; i < length; i++) {
                if (vm.allFriends[i].username == username) {
                    return vm.allFriends[i].alias;
                }
            }
            return '';
        }

        // Init mp3 audio file
        function initMp3() {
            vm.messages.forEach(function (message) {
                if (message.category == 'mp3') {
                    message.sound        = ngAudio.load(message.content.url);
                    message.sound.volume = vm.user.settings.speaker.volume / 100;
                }
            });
        }

        // Stop all mp3
        function stopAllMp3() {
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.functionCalled('ChatCtrl', 'stopAllMp3');
            }
            vm.messages.forEach(function (message) {
                if (message.category == 'mp3' && !Methods.isNullOrEmpty(message.sound)) {
                    message.sound.stop();
                }
            });
        }

        // Pause all mp3
        function pauseAllMp3() {
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.functionCalled('ChatCtrl', 'pauseAllMp3');
            }
            vm.messages.forEach(function (message) {
                if (message.category == 'mp3' && !Methods.isNullOrEmpty(message.sound)) {
                    message.sound.pause();
                }
            });
        }

        // Stop all mp3 and video
        function stopAllMedia($event) {
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.functionCalled('ChatCtrl', 'stopAllMedia');
            }
            $event.stopPropagation();
            vm.methods.stopAllMp3();
            vm.methods.stopAllVideo();
        }

        // Pause all mp3 and video
        function pauseAllMedia($event) {
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.functionCalled('ChatCtrl', 'pauseAllMedia');
            }
            $event.stopPropagation();
            vm.methods.pauseAllMp3();
            vm.methods.pauseAllVideo();
        }

        // Check in the current messages if there is one of type mp3 or video
        function isMediaAudioPresent() {
            for (var i = 0, length = vm.messages.length; i < length; i++) {
                if (vm.methods.isAudioMedia(vm.messages[i])) {
                    return true;
                }
            }
            return false;
        }

        // Check if the message is audio or video
        function isAudioMedia(message) {
            return message.category == 'mp3' || message.category == 'video';
        }

        // Called by the videogular directive when she's ready
        function onPlayerReady(message, API) {
            message.content.API = API;
            message.content.API.setVolume(userFactory.getUser().settings.speaker.volume / 100);
        }

        // Stop all the videos
        function stopAllVideo() {
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.functionCalled('ChatCtrl', 'stopAllVideo');
            }
            vm.messages.forEach(function (message) {
                if (message.category == 'video') {
                    message.content.API.stop();
                }
            });
        }

        // Pause all the videos
        function pauseAllVideo() {
            if (CONFIG.debug) {
                cozenEnhancedLogs.info.functionCalled('ChatCtrl', 'pauseAllVideo');
            }
            vm.messages.forEach(function (message) {
                if (message.category == 'video') {
                    message.content.API.pause();
                }
            });
        }

        // Check if a media is present in the list of current messages
        function isMediaPresent() {
            for (var i = 0, length = vm.messages.length; i < length; i++) {
                if (vm.methods.isMedia(vm.messages[i])) {
                    return true;
                }
            }
            return false;
        }

        // Scroll to a specific message (double call to better speed)
        function scrollToBottom(data) {
            if (Methods.isNullOrEmpty(data) || Methods.isNullOrEmpty(data.data)) {
                return;
            }
            $timeout(function () {
                $timeout(function () {
                    $location.hash('message-' + data.data._id);
                    $anchorScroll();
                    vm.loadingDomMessages = false;
                });
            });
        }

        function sendNewMessage(name, model) {
            if (!Methods.isNullOrEmpty(model)) {
                var message = {
                    sender  : userFactory.getUser().username,
                    content : {
                        text: model
                    },
                    tag     : 'user',
                    category: 'text'
                };
                if ($state.current.name == 'app.chat.user') {
                    directMessagesFactory.httpRequest.addMessage($rootScope.directMessageId, message, function (response) {
                        cogeoWebRtc.connectionSend({
                            message  : response.data.data,
                            tag      : 'friend',
                            messageId: $rootScope.directMessageId
                        });
                    });
                }
                else {
                    groupsFactory.httpRequest.addMessage($state.params.groupName, $state.params.channelName, message, function (response) {
                        sendMessageToChannelPeer(response.data.data);
                    });
                }
                $timeout(function () {
                    vm.message = null;
                });
            }
        }

        function stopAllEdit() {
            vm.messages.forEach(function (message) {
                message.editMod = false;
            });
        }

        function startEdit(messageId) {
            for (var i = 0, length = vm.messages.length; i < length; i++) {
                if (vm.messages[i]._id == messageId) {
                    vm.messages[i].editMod   = true;
                    vm.messages[i].editModel = vm.messages[i].content.text;
                    break;
                }
            }
        }

        function editMessage(message) {
            message.content.text = message.editModel;
            if ($state.current.name == 'app.chat.user') {
                directMessagesFactory.httpRequest.editMessage($rootScope.directMessageId, message);
            }
            else {
                var username = userFactory.getUser().username;
                if (username != message.sender) {
                    message.editedBy = username;
                }
                groupsFactory.httpRequest.editMessage($state.params.groupName, $state.params.channelName, message);
            }
            message.editMod = false;
        }

        function addSmiley(messages) {
            messages.forEach(function (message) {
                if (message.category == 'text') {

                    // Only for the BOT purpose, translate stuff
                    if (message.tag == 'bot') {
                        message.content.text = $filter('translate')(message.content.text, message.content.values);
                    }

                    // Create the emoticons
                    message.content.compiledText = $filter('embed')(message.content.text, CONFIG.internal.embed);
                }
            });
        }

        function sendMessageToChannelPeer(newMessage) {

            // Get all the active members from this channel
            var channelId     = channelsFactory.getChannelIdByName($state.params.groupName, $state.params.channelName);
            var activeMembers = channelsFactory.getActiveMembers($state.params.groupName, channelId);
            var currentUser   = userFactory.getUser().username;

            // Send them a new message
            activeMembers.forEach(function (activeMember) {

                // Avoid to send a message to myself
                if (activeMember.username != currentUser.username) {
                    newMessage.targetedUsername = activeMember.username;
                    cogeoWebRtc.connectionSend({
                        message    : newMessage,
                        tag        : 'channel',
                        groupName  : $state.params.groupName,
                        channelName: $state.params.channelName,
                        channelId  : channelId
                    });
                }
            });
        }

        // Update the status for the friend
        function updateStatusForFriends($eventData) {
            vm.friends.forEach(function (friend) {
                if (friend.username == $eventData.username) {
                    friend = usersFactory.setStatus(friend, $eventData.statusIndex);
                }
            });
            vm.blockedFriends.forEach(function (oldFriend) {
                if (friend.username == $eventData.username) {
                    oldFriend = usersFactory.setStatus(oldFriend, $eventData.statusIndex);
                }
            });
            vm.allFriends.forEach(function (friend) {
                if (friend.username == $eventData.username) {
                    friend = usersFactory.setStatus(friend, $eventData.statusIndex);
                }
                if (vm.activeFriend.username == friend.username) {
                    vm.friendStatus = friend.status;
                }
            });
            
        }

        function isMessageVisible(message) {
            if (message.isBotCommand) {
                return message.sender == vm.user.username;
            }
            else {
                return true;
            }
        }
    }

})(window.angular, window.document);

