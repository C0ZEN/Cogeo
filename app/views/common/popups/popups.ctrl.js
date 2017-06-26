(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .controller('PopupCtrl', PopupCtrl);

    PopupCtrl.$inject = [
        'cozenPopupFactory',
        'CONFIG',
        '$scope',
        '$rootScope',
        'userFactory',
        'botFactory',
        'cozenEnhancedLogs',
        'usersFactory',
        'groupsFactory',
        'channelsFactory',
        '$timeout',
        '$state',
        'directMessagesFactory',
        'goTo',
        'statusFactory'
    ];

    function PopupCtrl(cozenPopupFactory, CONFIG, $scope, $rootScope, userFactory, botFactory, cozenEnhancedLogs, usersFactory,
                       groupsFactory, channelsFactory, $timeout, $state, directMessagesFactory, goTo, statusFactory) {
        var popup = this;

        // Methods
        popup.methods = {
            closePopup              : closePopup,
            logout                  : logout,
            forgottenPassword       : forgottenPassword,
            onPlayerReady           : onPlayerReady,
            onPopupSettingsClose    : onPopupSettingsClose,
            onInitChatSetStatus     : onInitChatSetStatus,
            onFriendActionRenameShow: onFriendActionRenameShow,
            onChatBot               : onChatBot,
            userAction              : {
                granted : userActionGranted,
                revoked : userActionRevoked,
                kicked  : userActionKicked,
                banned  : userActionBanned,
                unbanned: userActionUnbanned
            },
            friendAction            : {
                block  : friendActionBlock,
                unblock: friendActionUnblock,
                rename : friendActionRename,
                remove : friendActionRemove
            },
            invitationAction        : {
                accept: invitationActionAccept,
                refuse: invitationActionRefuse
            },
            startLoading            : startLoading,
            stopLoading             : stopLoading,
            channel                 : {
                remove: channelRemove,
                join  : channelJoin,
                leave : channelLeave
            },
            group                   : {
                join : groupJoin,
                leave: groupLeave
            },
            message                 : {
                remove: messageRemove
            },
            global                  : {
                volume    : globalVolume,
                initVolume: globalInitVolume
            },
            chat                    : {
                saveStatus: chatSaveStatus
            }
        };

        // Common data
        popup.CONFIG = CONFIG;
        popup.user   = userFactory.getUser();

        // forgottenPassword
        popup.forgottenPassword = {};

        // testMicrophone
        popup.testMicrophone = {};

        // testSpeaker
        popup.testSpeaker = {
            video: angular.merge({}, CONFIG.internal.video, {
                sources: [
                    {
                        src : 'images/video/nyan-cat/nyan-cat.mp4',
                        type: 'video/mp4'
                    },
                    {
                        src : 'images/video/nyan-cat/nyan-cat.webm',
                        type: 'video/webm'
                    },
                    {
                        src : 'images/video/nyan-cat/nyan-cat.ogg',
                        type: 'video/ogg'
                    }
                ],
                plugins: {
                    poster: 'images/video/nyan-cat/nyan-cat.png'
                }
            })
        };

        // userActionKicked
        popup.userActionKicked = {
            data: {
                reasons: [
                    {
                        id : '1',
                        key: 'other_kicked_reason_1'
                    },
                    {
                        id : '2',
                        key: 'other_kicked_reason_2'
                    },
                    {
                        id : '3',
                        key: 'other_kicked_reason_3'
                    },
                    {
                        id : '4',
                        key: 'other_kicked_reason_4'
                    },
                    {
                        id : '5',
                        key: 'other_kicked_reason_5'
                    },
                    {
                        id : 'x',
                        key: 'other_kicked_reason_x'
                    }
                ],
                times  : Utils.getKickedTimeList()
            }
        };

        // logsFilter
        popup.logsFilter = {};

        // Bots
        popup.bot = {
            spamobot  : botFactory.getBotById('spamobot'),
            friendybot: botFactory.getBotById('friendybot')
        };

        userFactory.subscribe($scope, function () {
            popup.user = userFactory.getUser();
        });

        function closePopup(name) {
            cozenPopupFactory.hide({
                name: name
            });
        }

        function logout() {
            userFactory.logout(popup.methods.closePopup('logout'));
        }

        function forgottenPassword() {

        }

        function onPlayerReady(API) {
            popup.testSpeaker.video.API        = API;
            popup.testSpeaker.video.API.volume = popup.testSpeakerData.volume / 100;

            // Watch for the volume change and broadcast to inform others of the change
            $scope.$watch('popup.testSpeaker.video.API.volume', function (newVolume) {
                $rootScope.$broadcast('newVolumeSetFromTest', {
                    newVolume: newVolume * 100
                })
            });
        }

        function onPopupSettingsClose(id, name) {
            switch (name) {
                case 'allGroupsFilter':
                    userFactory.httpRequest.updateSettingsAllGroups(popup.allGroupsFilter.data);
                    break;
                case 'groupsInvitationsFilter':
                    userFactory.httpRequest.updateSettingsGroupsInvitations(popup.groupsInvitationsFilter.data);
                    break;
                case 'invitationsFilter':
                    userFactory.httpRequest.updateSettingsInvitations(popup.invitationsFilter.data);
                    break;
                case 'groupsMembersFilter':
                    userFactory.httpRequest.updateSettingsGroupsMembers(popup.groupsMembersFilter.data);
                    break;
                case 'logsFilter':
                    userFactory.httpRequest.updateSettingsLog(popup.logsFilter.data);
                    break;
                case 'accessLogsFilter':
                    userFactory.httpRequest.updateSettingsAccessLogs(popup.accessLogsFilter.data);
                    break;
                case 'groupsLogsFilter':
                    userFactory.httpRequest.updateSettingsGroupsLogs(popup.groupsLogsFilter.data);
                    break;
                case 'allChannelsFilter':
                    userFactory.httpRequest.updateSettingsAllChannels(popup.allChannelsFilter.data);
                    break;
                case 'channelsMembersFilter':
                    userFactory.httpRequest.updateSettingsChannelsMembers(popup.channelsMembersFilter.data);
                    break;
                case 'channelsInvitationsFilter':
                    userFactory.httpRequest.updateSettingsChannelsInvitations(popup.channelsInvitationsFilter.data);
                    break;
                case 'channelsLogsFilter':
                    userFactory.httpRequest.updateSettingsChannelsLogs(popup.channelsLogsFilter.data);
                    break;
                case 'contactsFilter':
                    userFactory.httpRequest.updateSettingsContacts(popup.contactsFilter.data);
                    break;
            }
        }

        function userActionGranted() {
            popup.methods.startLoading();
            if (popup.userActionGrantedData.element == 'channel') {
                channelsFactory.httpRequest.userGrant(popup.userActionGrantedData.groupName, popup.userActionGrantedData.elementName, popup.userActionGrantedData.userName, {
                    username: userFactory.getUser().username
                }, function () {
                    popup.methods.closePopup('userActionGranted');
                    popup.methods.stopLoading();
                }, function () {
                    popup.methods.closePopup('userActionGranted');
                    popup.methods.stopLoading();
                });
            }
            else {
                groupsFactory.httpRequest.userGrant(popup.userActionGrantedData.elementName, popup.userActionGrantedData.userName, {
                    username: userFactory.getUser().username
                }, function () {
                    popup.methods.closePopup('userActionGranted');
                    popup.methods.stopLoading();
                }, function () {
                    popup.methods.closePopup('userActionGranted');
                    popup.methods.stopLoading();
                });
            }
        }

        function userActionRevoked() {
            popup.methods.startLoading();
            if (popup.userActionRevokedData.element == 'channel') {
                channelsFactory.httpRequest.userRevoke(popup.userActionRevokedData.groupName, popup.userActionRevokedData.elementName, popup.userActionRevokedData.userName, {
                    username: userFactory.getUser().username
                }, function () {
                    popup.methods.closePopup('userActionRevoked');
                }, function () {
                    popup.methods.closePopup('userActionRevoked');
                });
            }
            else {
                groupsFactory.httpRequest.userRevoke(popup.userActionRevokedData.elementName, popup.userActionRevokedData.userName, {
                    username: userFactory.getUser().username
                }, function () {
                    popup.methods.closePopup('userActionRevoked');
                    popup.methods.stopLoading();
                }, function () {
                    popup.methods.closePopup('userActionRevoked');
                    popup.methods.stopLoading();
                });
            }
        }

        function userActionKicked() {
            popup.methods.startLoading();
            var kick = {
                by      : userFactory.getUser().username,
                for     : popup.userActionKicked.for,
                time    : popup.userActionKicked.time,
                username: userFactory.getUser().username
            };
            if (popup.userActionKickedData.element == 'channel') {
                channelsFactory.httpRequest.userKick(popup.userActionKickedData.groupName, popup.userActionKickedData.elementName, popup.userActionKickedData.userName, kick, function () {
                    popup.methods.closePopup('userActionKicked');
                    popup.methods.stopLoading();
                }, function () {
                    popup.methods.closePopup('userActionKicked');
                    popup.methods.stopLoading();
                });
            }
            else {
                groupsFactory.httpRequest.userKick(popup.userActionKickedData.elementName, popup.userActionKickedData.userName, kick, function () {
                    popup.methods.closePopup('userActionKicked');
                    popup.methods.stopLoading();
                }, function () {
                    popup.methods.closePopup('userActionKicked');
                    popup.methods.stopLoading();
                });
            }
        }

        function userActionBanned() {
            popup.methods.startLoading();
            var ban = {
                by      : userFactory.getUser().username,
                for     : popup.userActionBanned.for,
                username: userFactory.getUser().username
            };
            if (popup.userActionBannedData.element == 'channel') {
                channelsFactory.httpRequest.userBan(popup.userActionBannedData.groupName, popup.userActionBannedData.elementName, popup.userActionBannedData.userName, ban, function () {
                    popup.methods.closePopup('userActionBanned');
                    popup.methods.stopLoading();
                }, function () {
                    popup.methods.closePopup('userActionBanned');
                    popup.methods.stopLoading();
                });
            }
            else {
                groupsFactory.httpRequest.userBan(popup.userActionBannedData.elementName, popup.userActionBannedData.userName, ban, function () {
                    popup.methods.closePopup('userActionBanned');
                    popup.methods.stopLoading();
                }, function () {
                    popup.methods.closePopup('userActionBanned');
                    popup.methods.stopLoading();
                });
            }
        }

        function userActionUnbanned() {
            popup.methods.startLoading();
            if (popup.userActionUnbannedData.element == 'channel') {
                channelsFactory.httpRequest.userUnban(popup.userActionUnbannedData.groupName, popup.userActionUnbannedData.elementName, popup.userActionUnbannedData.userName, {
                    username: userFactory.getUser().username
                }, function () {
                    popup.methods.closePopup('userActionUnbanned');
                    popup.methods.stopLoading();
                }, function () {
                    popup.methods.closePopup('userActionUnbanned');
                    popup.methods.stopLoading();
                });
            }
            else {
                groupsFactory.httpRequest.userUnban(popup.userActionUnbannedData.elementName, popup.userActionUnbannedData.userName, {
                    username: userFactory.getUser().username
                }, function () {
                    popup.methods.closePopup('userActionUnbanned');
                    popup.methods.stopLoading();
                }, function () {
                    popup.methods.closePopup('userActionUnbanned');
                    popup.methods.stopLoading();
                });
            }
        }

        function onInitChatSetStatus() {
            popup.chatSetStatus = {
                status: statusFactory.getAllStatus()
            };
            var currentStatus   = statusFactory.getCurrentUserStatus();
            popup.chatSetStatus.status.forEach(function (status) {
                status.selected = status.index == currentStatus.index;
            });
        }

        function onFriendActionRenameShow(id, name, data) {
            popup.friendNewAlias = angular.copy(data.alias);
        }

        function onChatBot(botName) {
            popup.methods.closePopup('botProfile' + botName);

            // Specific event when on chat view to force to change a lot of things
            if ($state.current.name == 'app.chat.user' || $state.current.name == 'app.chat.channel') {
                $rootScope.$broadcast('popups:onChatBot', {
                    botName: botName
                });
            }
            else {
                goTo.view('app.chat.user', {'username': botName});
            }
        }

        function friendActionBlock() {
            popup.methods.startLoading();
            userFactory.httpRequest.friendBlock(popup.friendActionBlockData.username, {}, function () {
                popup.methods.closePopup('friendActionBlock');
                popup.methods.stopLoading();
            }, function () {
                popup.methods.closePopup('friendActionBlock');
                popup.methods.stopLoading();
            });
        }

        function friendActionUnblock() {
            popup.methods.startLoading();
            userFactory.httpRequest.friendUnblock(popup.friendActionUnblockData.username, {}, function () {
                popup.methods.closePopup('friendActionUnblock');
                popup.methods.stopLoading();
            }, function () {
                popup.methods.closePopup('friendActionUnblock');
                popup.methods.stopLoading();
            });
        }

        function friendActionRename() {
            popup.methods.startLoading();
            userFactory.httpRequest.friendSetAlias(popup.friendActionRenameData.username, {
                alias: popup.friendNewAlias
            }, function () {
                popup.methods.closePopup('friendActionRename');
                popup.methods.stopLoading();
            }, function () {
                popup.methods.closePopup('friendActionRename');
                popup.methods.stopLoading();
            });
        }

        function friendActionRemove() {
            popup.methods.startLoading();
            userFactory.httpRequest.friendRemove(popup.friendActionRemoveData.username, {}, function () {
                popup.methods.closePopup('friendActionRemove');
                popup.methods.stopLoading();
            }, function () {
                popup.methods.closePopup('friendActionRemove');
                popup.methods.stopLoading();
            });
        }

        function invitationActionAccept() {
            popup.methods.startLoading();
            if (CONFIG.dev) {
                cozenEnhancedLogs.info.functionCalled('popup', 'invitationActionAccept');
                cozenEnhancedLogs.explodeObject(popup.invitationActionAcceptData);
            }
            userFactory.httpRequest.acceptPendingInvitation(popup.invitationActionAcceptData, function () {
                popup.methods.stopLoading();
                popup.methods.closePopup('invitationActionAccept');
                switch (popup.invitationActionAcceptData.tag) {
                    case 'user':
                        usersFactory.httpRequest.getAll();
                        break;
                    case 'channel':
                    case 'group':
                        groupsFactory.httpRequest.getAllGroups();
                }
            }, function () {
                popup.methods.stopLoading();
            });
        }

        function invitationActionRefuse() {
            popup.methods.startLoading();
            if (CONFIG.dev) {
                cozenEnhancedLogs.info.functionCalled('popup', 'invitationActionRefuse');
                cozenEnhancedLogs.explodeObject(popup.invitationActionRefuseData);
            }
            userFactory.httpRequest.refusePendingInvitation(popup.invitationActionRefuseData, function () {
                popup.methods.stopLoading();
                popup.methods.closePopup('invitationActionRefuse');
                switch (popup.invitationActionRefuseData.tag) {
                    case 'user':
                        usersFactory.httpRequest.getAll();
                        break;
                    case 'channel':
                    case 'group':
                        groupsFactory.httpRequest.getAllGroups();
                }
            }, function () {
                popup.methods.stopLoading();
            });
        }

        function startLoading() {
            popup.loading = true;
        }

        function stopLoading() {
            popup.loading = false;
        }

        function channelRemove() {
            groupsFactory.httpRequest.removeChannel(popup.channelRemoveData.groupName, popup.channelRemoveData.channel.originalName, {
                username: userFactory.getUser().username
            }, function () {
                popup.methods.closePopup('channelRemove');
                goTo.view('app.channels.all', popup.channelRemoveData.groupName);
            }, function () {
                popup.methods.closePopup('channelRemove');
            });
        }

        function groupJoin() {
            groupsFactory.httpRequest.joinGroup(popup.groupJoinData.groupName, {
                username: userFactory.getUser().username
            }, function () {
                popup.methods.closePopup('groupJoin');
            }, function () {
                popup.methods.closePopup('groupJoin');
            });
        }

        function groupLeave() {
            groupsFactory.httpRequest.leaveGroup(popup.groupLeaveData.groupName, {
                username: userFactory.getUser().username
            }, function () {
                popup.methods.closePopup('groupLeave');
            }, function () {
                popup.methods.closePopup('groupLeave');
            });
        }

        function channelJoin() {
            channelsFactory.httpRequest.joinChannel(popup.channelJoinData.groupName, popup.channelJoinData.channelName, {
                username: userFactory.getUser().username
            }, function () {
                popup.methods.closePopup('channelJoin');
            }, function () {
                popup.methods.closePopup('channelJoin');
            });
        }

        function channelLeave() {
            channelsFactory.httpRequest.leaveChannel(popup.channelLeaveData.groupName, popup.channelLeaveData.channelName, {
                username: userFactory.getUser().username
            }, function () {
                popup.methods.closePopup('channelLeave');
            }, function () {
                popup.methods.closePopup('channelLeave');
            });
        }

        function messageRemove() {
            popup.methods.startLoading();
            if ($state.current.name == 'app.chat.user') {
                directMessagesFactory.httpRequest.removeMessage($rootScope.directMessageId, popup.messageRemoveData, function () {
                    popup.methods.closePopup('messageRemove');
                    popup.methods.stopLoading();
                }, function () {
                    popup.methods.closePopup('messageRemove');
                    popup.methods.stopLoading();
                });
            }
            else {
                groupsFactory.httpRequest.removeMessage($state.params.groupName, $state.params.channelName, popup.messageRemoveData, function () {
                    popup.methods.closePopup('messageRemove');
                    popup.methods.stopLoading();
                }, function () {
                    popup.methods.closePopup('messageRemove');
                    popup.methods.stopLoading();
                });
            }
        }

        function globalVolume() {
            popup.methods.startLoading();
            userFactory.httpRequest.updateSettingsSpeakerVolume({
                volume: popup.globalVolumeData.speaker.volume
            }, function () {
                popup.methods.closePopup('globalVolume');
                popup.methods.stopLoading();
                $timeout(function () {
                    $rootScope.$broadcast('newGlobalVolume', {
                        volume: popup.globalVolumeData.speaker.volume
                    });
                });
            }, function () {
                popup.methods.closePopup('globalVolume');
                popup.methods.stopLoading();
            }, false);
        }

        function globalInitVolume() {
            popup.globalVolumeData = userFactory.getUser().settings;
            $timeout(function () {
                $rootScope.$broadcast('rzSliderForceRender');
            }, 400);
        }

        function chatSaveStatus() {
            statusFactory.setCurrentUserStatusById(popup.chatSetStatus.newStatus);
            popup.methods.closePopup('chatSetStatus');
        }
    }

})(window.angular);

