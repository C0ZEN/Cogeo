(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('logs', logs);

    logs.$inject = [];

    function logs() {
        return {
            getLogSrc: getLogSrc
        };

        function getLogSrc(tag) {
            switch (tag) {
                case 'channelRemoved':
                    return 'icons8-trash';
                case 'channelNowPrivate':
                    return 'fa-eye-slash';
                case 'channelNowPublic':
                    return 'fa-eye';
                case 'channelNowDefault':
                    return 'icons8-event-accepted-filled';
                case 'channelNowNotDefault':
                    return 'icons8-event-declined-filled';
                case 'accountCreated':
                    return 'icons8-handshake';
                case 'newGroupCreated':
                    return 'icons8-google-groups';
                case 'newChannelCreated':
                    return 'icons8-channel-mosaic';
                case 'newGroupJoined':
                case 'newChannelJoined':
                    return 'icons8-login-rounded-right';
                case 'groupLeft':
                case 'channelLeft':
                    return 'icons8-logout-rounded';
                case 'groupEdited':
                case 'channelEdited':
                case 'socialUserRenamed':
                case 'socialUserAliasRemoved':
                case 'accountEdited':
                case 'accountSettingsEdited':
                case 'accountNotificationsEdited':
                case 'channelNewName':
                    return 'icons8-edit';
                case 'groupInvitationSentOne':
                case 'groupInvitationSentMany':
                case 'groupInvitationReceived':
                case 'channelInvitationSentOne':
                case 'channelInvitationSentMany':
                case 'channelInvitationReceived':
                case 'socialInvitationSentOne':
                case 'socialInvitationSentMany':
                case 'socialInvitationReceived':
                case 'socialInvitationSent':
                    return 'icons8-message-filled';
                case 'groupPermissionsGrantedReceived':
                case 'groupPermissionsGranted':
                case 'channelPermissionsGrantedReceived':
                case 'channelPermissionsGranted':
                    return 'icons8-unlock';
                case 'groupPermissionsRevokedReceived':
                case 'groupPermissionsRevoked':
                case 'channelPermissionsRevokedReceived':
                case 'channelPermissionsRevoked':
                    return 'icons8-lock';
                case 'groupUserKicked':
                case 'groupUserKickedReceived':
                case 'groupUserBanned':
                case 'groupUserBannedReceived':
                case 'channelUserKicked':
                case 'channelUserKickedReceived':
                case 'channelUserBanned':
                case 'channelUserBannedReceived':
                case 'socialUserBlocked':
                case 'socialUserRemoved':
                    return 'icons8-no-chat';
                case 'groupUserUnbanned':
                case 'groupUserUnbannedReceived':
                case 'channelUserUnbanned':
                case 'channelUserUnbannedReceived':
                case 'socialUserUnblocked':
                case 'socialInvitationAccepted':
                    return 'icons8-chat';
            }
        }
    }

})(window.angular);