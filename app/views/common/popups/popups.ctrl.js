(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
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
        '$timeout'
    ];

    function PopupCtrl(cozenPopupFactory, CONFIG, $scope, $rootScope, userFactory, botFactory, cozenEnhancedLogs, usersFactory,
                       groupsFactory, channelsFactory, $timeout) {
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
                        src : "images/video/nyan-cat/nyan-cat.mp4",
                        type: "video/mp4"
                    },
                    {
                        src : "images/video/nyan-cat/nyan-cat.webm",
                        type: "video/webm"
                    },
                    {
                        src : "images/video/nyan-cat/nyan-cat.ogg",
                        type: "video/ogg"
                    }
                ],
                plugins: {
                    poster: "images/video/nyan-cat/nyan-cat.png"
                }
            })
        };

        // userActionKicked
        popup.userActionKicked = {
            data: {
                reasons: [
                    {
                        id : "1",
                        key: "other_kicked_reason_1"
                    },
                    {
                        id : "2",
                        key: "other_kicked_reason_2"
                    },
                    {
                        id : "3",
                        key: "other_kicked_reason_3"
                    },
                    {
                        id : "4",
                        key: "other_kicked_reason_4"
                    },
                    {
                        id : "5",
                        key: "other_kicked_reason_5"
                    },
                    {
                        id : "x",
                        key: "other_kicked_reason_x"
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
            if (popup.userActionGrantedData.element == 'channel') {
                channelsFactory.httpRequest.userGrant(popup.userActionGrantedData.groupName, popup.userActionGrantedData.elementName, popup.userActionGrantedData.userName, {}, function () {
                    popup.methods.closePopup('userActionGranted');
                }, function () {
                    popup.methods.closePopup('userActionGranted');
                });
            }
            else {
                groupsFactory.httpRequest.userGrant(popup.userActionGrantedData.elementName, popup.userActionGrantedData.userName, {}, function () {
                    popup.methods.closePopup('userActionGranted');
                }, function () {
                    popup.methods.closePopup('userActionGranted');
                });
            }
        }

        function userActionRevoked() {
            if (popup.userActionRevokedData.element == 'channel') {
                channelsFactory.httpRequest.userRevoke(popup.userActionRevokedData.groupName, popup.userActionRevokedData.elementName, popup.userActionRevokedData.userName, {}, function () {
                    popup.methods.closePopup('userActionRevoked');
                }, function () {
                    popup.methods.closePopup('userActionRevoked');
                });
            }
            else {
                groupsFactory.httpRequest.userRevoke(popup.userActionRevokedData.elementName, popup.userActionRevokedData.userName, {}, function () {
                    popup.methods.closePopup('userActionRevoked');
                }, function () {
                    popup.methods.closePopup('userActionRevoked');
                });
            }
        }

        function userActionKicked() {
            var kick = {
                from: userFactory.getUser().username,
                for : popup.userActionKicked.for,
                time: popup.userActionKicked.time
            };
            if (popup.userActionKickedData.element == 'channel') {
                channelsFactory.httpRequest.userKick(popup.userActionKickedData.groupName, popup.userActionKickedData.elementName, popup.userActionKickedData.userName, kick, function () {
                    popup.methods.closePopup('userActionKicked');
                }, function () {
                    popup.methods.closePopup('userActionKicked');
                });
            }
            else {
                groupsFactory.httpRequest.userKick(popup.userActionKickedData.elementName, popup.userActionKickedData.userName, kick, function () {
                    popup.methods.closePopup('userActionKicked');
                }, function () {
                    popup.methods.closePopup('userActionKicked');
                });
            }
        }

        function userActionBanned() {
            var ban = {
                from: userFactory.getUser().username,
                for : popup.userActionBanned.for
            };
            if (popup.userActionBannedData.element == 'channel') {
                channelsFactory.httpRequest.userBan(popup.userActionBannedData.groupName, popup.userActionBannedData.elementName, popup.userActionBannedData.userName, ban, function () {
                    popup.methods.closePopup('userActionBanned');
                }, function () {
                    popup.methods.closePopup('userActionBanned');
                });
            }
            else {
                groupsFactory.httpRequest.userBan(popup.userActionBannedData.elementName, popup.userActionBannedData.userName, ban, function () {
                    popup.methods.closePopup('userActionBanned');
                }, function () {
                    popup.methods.closePopup('userActionBanned');
                });
            }
        }

        function userActionUnbanned() {
            if (popup.userActionUnbannedData.element == 'channel') {
                channelsFactory.httpRequest.userUnban(popup.userActionUnbannedData.groupName, popup.userActionUnbannedData.elementName, popup.userActionUnbannedData.userName, {}, function () {
                    popup.methods.closePopup('userActionUnbanned');
                }, function () {
                    popup.methods.closePopup('userActionUnbanned');
                });
            }
            else {
                groupsFactory.httpRequest.userUnban(popup.userActionUnbannedData.elementName, popup.userActionUnbannedData.userName, {}, function () {
                    popup.methods.closePopup('userActionUnbanned');
                }, function () {
                    popup.methods.closePopup('userActionUnbanned');
                });
            }
        }

        function onInitChatSetStatus() {
            popup.chatSetStatus = {
                status: userFactory.getAllStatus()
            }
        }

        function onFriendActionRenameShow(id, name, data) {
            popup.friendNewAlias = angular.copy(data.alias);
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

        }

        function groupJoin() {
            groupsFactory.httpRequest.joinGroup(popup.groupJoinData.groupName, {
                username: userFactory.getUser().username
            }, function () {
                closePopup('groupJoin');
            }, function () {
                closePopup('groupJoin');
            });
        }

        function groupLeave() {
            groupsFactory.httpRequest.leaveGroup(popup.groupLeaveData.groupName, {
                username: userFactory.getUser().username
            }, function () {
                closePopup('groupLeave');
            }, function () {
                closePopup('groupLeave');
            });
        }

        function channelJoin() {
            channelsFactory.httpRequest.joinChannel(popup.channelJoinData.groupName, popup.channelJoinData.channelName, {
                username: userFactory.getUser().username
            }, function () {
                closePopup('channelJoin');
            }, function () {
                closePopup('channelJoin');
            });
        }

        function channelLeave() {
            channelsFactory.httpRequest.leaveChannel(popup.channelLeaveData.groupName, popup.channelLeaveData.channelName, {
                username: userFactory.getUser().username
            }, function () {
                closePopup('channelLeave');
            }, function () {
                closePopup('channelLeave');
            });
        }

        function messageRemove() {

            popup.methods.closePopup('messageRemove');
            popup.methods.stopLoading();
        }

        function globalVolume() {
            popup.methods.startLoading();
            userFactory.httpRequest.updateSettings(popup.globalVolumeData, function () {
                popup.methods.closePopup('globalVolume');
                popup.methods.stopLoading();
                $timeout(function () {
                    $rootScope.$broadcast('newGlobalVolume');
                });
            }, function () {
                popup.methods.closePopup('globalVolume');
                popup.methods.stopLoading();
            });
        }

        function globalInitVolume() {
            popup.globalVolumeData = userFactory.getUser().settings;
        }
    }

})(window.angular);

