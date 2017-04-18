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
        'groupsFactory'
    ];

    function PopupCtrl(cozenPopupFactory, CONFIG, $scope, $rootScope, userFactory, botFactory, cozenEnhancedLogs, usersFactory,
                       groupsFactory) {
        var popup = this;

        // Methods
        popup.methods = {
            closePopup          : closePopup,
            logout              : logout,
            forgottenPassword   : forgottenPassword,
            onPlayerReady       : onPlayerReady,
            onPopupSettingsClose: onPopupSettingsClose,
            onInitChatSetStatus : onInitChatSetStatus,
            userAction          : {
                granted : userActionGranted,
                revoked : userActionRevoked,
                kicked  : userActionKicked,
                banned  : userActionBanned,
                unbanned: userActionUnbanned
            },
            friendAction        : {
                block  : friendActionBlock,
                unblock: friendActionUnblock,
                rename : friendActionRename,
                remove : friendActionRemove
            },
            invitationAction    : {
                accept: invitationActionAccept,
                refuse: invitationActionRefuse
            },
            startLoading        : startLoading,
            stopLoading         : stopLoading,
            channel             : {
                remove: channelRemove
            },
            group               : {
                join : groupJoin,
                leave: groupLeave
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

        // Bot
        popup.bot = {
            spamobot  : botFactory.getBotById('spamobot'),
            friendybot: botFactory.getBotById('friendybot')
        };

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
            popup.testSpeaker.video.API = API;

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
            popup.methods.closePopup('userActionGranted');
        }

        function userActionRevoked() {
            popup.methods.closePopup('userActionRevoked');
        }

        function userActionKicked() {
            popup.methods.closePopup('userActionKicked');
        }

        function userActionBanned() {
            popup.methods.closePopup('userActionBanned');
        }

        function userActionUnbanned() {
            popup.methods.closePopup('userActionUnbanned');
        }

        function onInitChatSetStatus() {
            popup.chatSetStatus = {
                status: userFactory.getAllStatus()
            }
        }

        function friendActionBlock() {
            userFactory.httpRequest.friendBlock(popup.friendActionBlockData.username, {}, function () {
                popup.methods.closePopup('friendActionBlock');
            }, function () {
                popup.methods.closePopup('friendActionBlock');
            });
        }

        function friendActionUnblock() {
            userFactory.httpRequest.friendUnblock(popup.friendActionUnblockData.username, {}, function () {
                popup.methods.closePopup('friendActionUnblock');
            }, function () {
                popup.methods.closePopup('friendActionUnblock');
            });
        }

        function friendActionRename() {
            userFactory.httpRequest.friendSetAlias(popup.friendActionRenameData.username, {
                alias: popup.friendNewAlias
            }, function () {
                popup.methods.closePopup('friendActionRename');
            }, function () {
                popup.methods.closePopup('friendActionRename');
            });
        }

        function friendActionRemove() {
            userFactory.httpRequest.friendRemove(popup.friendActionRemoveData.username, {}, function () {
                popup.methods.closePopup('friendActionRemove');
            }, function () {
                popup.methods.closePopup('friendActionRemove');
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
    }

})(window.angular);

