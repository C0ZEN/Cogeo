(function (angular) {
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
        'goTo',
        '$rootScope',
        '$scope',
        'cozenOnClickService',
        '$filter',
        'botFactory',
        'ngAudio'
    ];

    function ChatCtrl(CONFIG, groupsFactory, userFactory, $state, channelsFactory, goTo, $rootScope, $scope,
                      cozenOnClickService, $filter, botFactory, ngAudio) {
        var vm = this;

        // Methods
        vm.methods = {
            onInit                : onInit,
            setActiveGroup        : setActiveGroup,
            setActiveChannel      : setActiveChannel,
            removeToStarred       : removeToStarred,
            addToStarred          : addToStarred,
            hideChannels          : hideChannels,
            showChannels          : showChannels,
            toggleChannels        : toggleChannels,
            onActionClick         : onActionClick,
            setActiveFriend       : setActiveFriend,
            toggleExpand          : toggleExpand,
            onToggleSingleExpanded: onToggleSingleExpanded,
            isMedia               : isMedia,
            calcMediaLength       : calcMediaLength,
            getUserAlias          : getUserAlias,
            initMp3               : initMp3,
            stopAllMp3            : stopAllMp3,
            stopAllMedia          : stopAllMedia,
            isMediaAudioPresent   : isMediaAudioPresent,
            isAudioMedia          : isAudioMedia,
            onPlayerReady         : onPlayerReady,
            stopAllVideo          : stopAllVideo
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

        // Listener
        userFactory.subscribe($scope, vm.methods.onInit);
        cozenOnClickService.subscribe($scope, vm.methods.onActionClick);

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

            // Add bots as friend
            var bots      = botFactory.getBotFriends();
            vm.friends    = vm.friends.concat(bots);
            vm.allFriends = vm.allFriends.concat(bots);

            // Add status to friends
            vm.friends.forEach(function (friend) {
                friend.status = {
                    id      : 'online',
                    name    : 'other_status_online',
                    selected: true,
                    color   : '#2ecc71'
                };
            });
            vm.blockedFriends.forEach(function (friend) {
                friend.status = {
                    id      : 'online',
                    name    : 'other_status_online',
                    selected: true,
                    color   : '#2ecc71'
                };
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
            vm.methods.stopAllMp3();
            vm.activeChannel = groupsFactory.getChannelById(vm.activeGroup, channelId);
            vm.activeChannel = channelsFactory.getChannelWithUserRoles(vm.activeChannel, vm.user);
            vm.messages      = channelsFactory.getMessages(vm.activeGroup, channelId, 50);
            vm.messages      = [
                {
                    _id     : '1',
                    sender  : 'C0ZEN',
                    sent    : 1484561615,
                    content : '###Yolo\nça boum ?',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '2',
                    sender  : 'Marco',
                    sent    : 1484562715,
                    content : 'Hello, ça va ?!?',
                    edited  : 1484562915,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '17',
                    sender  : 'Pioth',
                    sent    : 1484571615,
                    content : '[Lien](http://www.geoffreytestelin.com/)',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                }
            ];
            vm.methods.calcMediaLength(vm.messages);
            vm.methods.initMp3();
            vm.activeChannel.isStarredChannel = channelsFactory.isStarredChannel(vm.user.username, vm.activeChannel._id);
            vm.activeMembers                  = channelsFactory.getActiveMembers(vm.activeGroup, channelId);
            vm.chatTheme                      = 'channel-theme';
            vm.inputPlaceholder               = $filter('translate')('chat_newMessage_placeholder_channel', {
                channelName: vm.activeChannel.name
            });
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
            if (!Methods.isNullOrEmpty($event)) {
                $event.stopPropagation();
            }
            if (vm.showChannels) {
                vm.showChannels = false;
            }
        }

        // Show the channels and friends col
        function showChannels($event) {
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
            vm.activeChannel = null;
            vm.methods.stopAllMp3();

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
                    _id     : '100',
                    sender  : 'Nitbosmet',
                    sent    : 1484571615,
                    content : {
                        format  : "mp4",
                        url     : "http://res.cloudinary.com/cozen/video/upload/v1494239259/witt-lowry-wonder-if-you-wonder-official-music-video_knoesw.mp4",
                        name    : "witt-lowry-wonder-if-you-wonder-official-music-video_knoesw",
                        fullName: 'witt-lowry-wonder-if-you-wonder-official-music-video_knoesw.mp4',
                        size    : '12.4MB',
                        sources : [
                            {
                                src : "http://res.cloudinary.com/cozen/video/upload/v1494239259/witt-lowry-wonder-if-you-wonder-official-music-video_knoesw.mp4",
                                type: "video/mp4"
                            }
                        ]
                    },
                    edited  : 0,
                    tag     : 'user',
                    category: 'video'
                },
                {
                    _id     : '1',
                    sender  : 'C0ZEN',
                    sent    : 1484561615,
                    content : '###Yolo\nça boum ?',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '2',
                    sender  : 'Marco',
                    sent    : 1484562715,
                    content : 'Hello, ça va ?!?',
                    edited  : 1484562915,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '3',
                    sender  : 'Spamobot',
                    sent    : 1484562715,
                    content : 'Bienvenu !',
                    tag     : 'bot',
                    category: 'text'
                },
                {
                    _id     : '4',
                    sender  : 'Friendybot',
                    sent    : 1484562715,
                    content : 'Yo !',
                    tag     : 'bot',
                    category: 'text'
                },
                {
                    _id     : '5',
                    sender  : 'Pop',
                    sent    : 1484571615,
                    content : '*Yo*',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '6',
                    sender  : 'C0ZEN',
                    sent    : 1484571615,
                    content : '#Titre 1',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '7',
                    sender  : 'C0ZEN',
                    sent    : 1484571615,
                    content : '##Titre 2',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '8',
                    sender  : 'C0ZEN',
                    sent    : 1484571615,
                    content : '###Titre 3',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '9',
                    sender  : 'C0ZEN',
                    sent    : 1484571615,
                    content : '####Titre 4',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '10',
                    sender  : 'C0ZEN',
                    sent    : 1484571615,
                    content : 'Un texte avec le mot en *italique*',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '11',
                    sender  : 'C0ZEN',
                    sent    : 1484571615,
                    content : 'Un texte avec le mot en **gras**',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '12',
                    sender  : 'C0ZEN',
                    sent    : 1484571615,
                    content : '#Titre 1     Bonjour les *amis* !',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '13',
                    sender  : 'C0ZEN',
                    sent    : 1484571615,
                    content : 'Un texte avec le mot en ~rayé~',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '14',
                    sender  : 'C0ZEN',
                    sent    : 1484571615,
                    content : '#####Titre 5',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '15',
                    sender  : 'C0ZEN',
                    sent    : 1484571615,
                    content : '######Titre 6',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '16',
                    sender  : 'C0ZEN',
                    sent    : 1484571615,
                    content : '[Lien](http://www.geoffreytestelin.com/)',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '17',
                    sender  : 'Nitbosmet',
                    sent    : 1484571615,
                    content : '[Lien](http://www.geoffreytestelin.com/)',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '18',
                    sender  : 'Nitbosmet',
                    sent    : 1484571615,
                    content : 'Ceci :smile: est une emoticon',
                    edited  : 0,
                    tag     : 'user',
                    category: 'text'
                },
                {
                    _id     : '19',
                    sender  : 'Nitbosmet',
                    sent    : 1484571615,
                    content : {
                        format  : "jpg",
                        height  : 160,
                        url     : "http://res.cloudinary.com/cozen/image/upload/v1493885388/sgt1q1weswkyyvespywp.jpg",
                        width   : 160,
                        name    : "Maxime",
                        fullName: 'Maxime.jpg',
                        size    : '150KB'
                    },
                    edited  : 0,
                    tag     : 'user',
                    category: 'image'
                },
                {
                    _id     : '20',
                    sender  : 'fzefez',
                    sent    : 1484571615,
                    content : {
                        format  : "jpg",
                        height  : 160,
                        url     : "http://res.cloudinary.com/cozen/image/upload/v1493885388/sgt1q1weswkyyvespywp.jpg",
                        width   : 160,
                        name    : "Maxime",
                        fullName: 'Maxime.jpg',
                        size    : '150KB'
                    },
                    edited  : 0,
                    tag     : 'user',
                    category: 'image'
                },
                {
                    _id     : '21',
                    sender  : 'fzefez',
                    sent    : 1484571615,
                    content : {
                        url     : "http://res.cloudinary.com/cozen/image/upload/v1494095008/001-MagdiWeb--Olivier-BARRE_jug0rc.pdf",
                        name    : "Mes achats",
                        fullName: 'Mes achats.pdf',
                        size    : '160KB'
                    },
                    edited  : 0,
                    tag     : 'user',
                    category: 'pdf'
                },
                {
                    _id     : '22',
                    sender  : 'fzefez',
                    sent    : 1484571615,
                    content : {
                        url     : "http://res.cloudinary.com/cozen/image/upload/v1494095008/001-MagdiWeb--Olivier-BARRE_jug0rc.pdf",
                        name    : "Mes achats",
                        fullName: 'Mes achats.xls',
                        size    : '160KB'
                    },
                    edited  : 0,
                    tag     : 'user',
                    category: 'excel'
                },
                {
                    _id     : '23',
                    sender  : 'zefez',
                    sent    : 1484571615,
                    content : {
                        url     : "http://res.cloudinary.com/cozen/image/upload/v1494095008/001-MagdiWeb--Olivier-BARRE_jug0rc.pdf",
                        name    : "Mes achats",
                        fullName: 'Mes achats.docx',
                        size    : '160KB'
                    },
                    edited  : 0,
                    tag     : 'user',
                    category: 'word'
                },
                {
                    _id     : '24',
                    sender  : 'Nitbosmet',
                    sent    : 1484571615,
                    content : {
                        format  : "gif",
                        height  : 268,
                        url     : "http://res.cloudinary.com/cozen/image/upload/v1494104238/whV9B2T5lDjag_o6stwv.gif",
                        width   : 480,
                        name    : "whV9B2T5lDjag_o6stwv",
                        fullName: 'whV9B2T5lDjag_o6stwv.gif',
                        size    : '1.3MB'
                    },
                    edited  : 0,
                    tag     : 'user',
                    category: 'image'
                },
                {
                    _id     : '25',
                    sender  : 'Nitbosmet',
                    sent    : 1484571615,
                    content : {
                        format  : "mp3",
                        url     : "http://res.cloudinary.com/cozen/video/upload/v1494106319/Sammy_Pharaoh_-_In_the_Running_Official_Music_Video_pxqcmv.mp3",
                        name    : "Sammy_Pharaoh_-_In_the_Running_Official_Music_Video_pxqcmv",
                        fullName: 'Sammy_Pharaoh_-_In_the_Running_Official_Music_Video_pxqcmv.mp3',
                        size    : '2.8MB'
                    },
                    edited  : 0,
                    tag     : 'user',
                    category: 'mp3'
                }
            ];
            vm.methods.calcMediaLength(vm.messages);
            vm.methods.initMp3();
            vm.chatTheme        = 'social-theme';
            vm.inputPlaceholder = $filter('translate')('chat_newMessage_placeholder_user', {
                username: vm.activeFriend.alias || vm.activeFriend.username
            });
            goTo.view('app.chat.user', {
                username: username
            });
            $rootScope.$broadcast('setChatTheme', {
                theme: vm.chatTheme
            });
        }

        function toggleExpand($event) {
            $event.stopPropagation();
            vm.expandAll = !vm.expandAll;
            vm.messages.forEach(function (message) {
                if (Methods.hasOwnProperty(message, 'expanded')) {
                    message.expanded = vm.expandAll;
                }
            });
        }

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

        function isMedia(message) {
            return message.category == 'image'
                || message.category == 'pdf'
                || message.category == 'excel'
                || message.category == 'word'
                || message.category == 'mp3'
                || message.category == 'video';
        }

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

        function getUserAlias(username) {
            for (var i = 0, length = vm.allFriends.length; i < length; i++) {
                if (vm.allFriends[i].username == username) {
                    return vm.allFriends[i].alias;
                }
            }
            return '';
        }

        function initMp3() {
            vm.messages.forEach(function (message) {
                if (message.category == 'mp3') {
                    message.sound        = ngAudio.load(message.content.url);
                    message.sound.volume = vm.user.settings.speaker.volume / 100;
                }
            });
        }

        function stopAllMp3() {
            vm.messages.forEach(function (message) {
                if (message.category == 'mp3' && !Methods.isNullOrEmpty(message.sound)) {
                    message.sound.stop();
                    message.sound.unbind();
                }
            });
        }

        function stopAllMedia($event) {
            $event.stopPropagation();
            vm.methods.stopAllMp3();
            vm.methods.stopAllVideo();
        }

        function isMediaAudioPresent() {
            for (var i = 0, length = vm.messages.length; i < length; i++) {
                if (vm.methods.isAudioMedia(vm.messages[i])) {
                    return true;
                }
            }
            return false;
        }

        function isAudioMedia(message) {
            return message.category == 'mp3' || message.category == 'video';
        }

        function onPlayerReady(message, API) {
            message.content.API    = API;
            message.content.volume = userFactory.getUser().settings.speaker.volume;
        }

        function stopAllVideo() {
            vm.messages.forEach(function (message) {
                if (message.category == 'video') {
                    message.content.API.stop();
                }
            });
        }
    }

})(window.angular);

