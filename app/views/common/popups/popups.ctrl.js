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
        'userFactory'
    ];

    function PopupCtrl(cozenPopupFactory, CONFIG, $scope, $rootScope, userFactory) {
        var popup = this;

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

        // Methods
        popup.methods = {
            closePopup          : closePopup,
            logout              : logout,
            forgottenPassword   : forgottenPassword,
            onPlayerReady       : onPlayerReady,
            onPopupSettingsClose: onPopupSettingsClose,
            userAction          : {
                granted : userActionGranted,
                revoked : userActionRevoked,
                kicked  : userActionKicked,
                banned  : userActionBanned,
                unbanned: userActionUnbanned
            }
        };

        function closePopup(name) {
            cozenPopupFactory.hide({
                name: name
            });
        }

        function logout() {
            userFactory.logout();
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
                case 'groupsMembersFilter':
                    userFactory.httpRequest.updateSettingsGroupsMembers(popup.groupsMembersFilter.data);
                    break;
                case 'logsFilter':
                    userFactory.httpRequest.updateSettingsLog(popup.logsFilter.data);
                    break;
                case 'groupsLogsFilter':
                    userFactory.httpRequest.updateSettingsGroupsLogs(popup.groupsLogsFilter.data);
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
    }

})(window.angular);

