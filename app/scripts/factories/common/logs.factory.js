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
                case 'newGroupCreated':
                case 'newGroupJoined':
                case 'newChannelCreated':
                case 'newChannelJoined':
                    return 'icons8-plus';
                case 'groupLeft':
                case 'channelLeft':
                    return 'icons8-logout-rounded';
                case 'groupEdited':
                case 'channelEdited':
                case 'socialUserRenamed':
                case 'socialUserAliasRemoved':
                    return 'icons8-edit';
                case 'groupInvitationSentOne':
                case 'groupInvitationSentMany':
                case 'groupInvitationReceived':
                case 'channelInvitationSentOne':
                case 'channelInvitationSentMany':
                case 'socialInvitationSent':
                    return 'icons8-message-filled';
                case 'groupPermissionsGrantedReceived':
                case 'groupPermissionsGranted':
                case 'channelPermissionsGranted':
                    return 'icons8-unlock';
                case 'groupPermissionsRevokedReceived':
                case 'groupPermissionsRevoked':
                case 'channelPermissionsRevoked':
                    return 'icons8-lock';
                case 'groupUserKicked':
                case 'groupUserKickedReceived':
                case 'groupUserBanned':
                case 'groupUserBannedReceived':
                case 'channelUserKicked':
                case 'channelUserBanned':
                case 'socialUserBlocked':
                case 'socialUserRemoved':
                    return 'icons8-no-chat';
                case 'groupUserUnbanned':
                case 'groupUserUnbannedReceived':
                case 'channelUserUnbanned':
                case 'socialUserUnblocked':
                case 'socialInvitationAccepted':
                    return 'icons8-chat';
            }
        }
    }

})(window.angular);