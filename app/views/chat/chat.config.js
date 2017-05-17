(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .config(config);

    config.$inject = [
        'CONFIG'
    ];

    function config(CONFIG) {

        // Used for emoticons
        CONFIG.internal.embed = {
            fontSmiley      : true,
            sanitizeHtml    : false,
            emoji           : true,
            link            : false,
            linkTarget      : '_self',
            gdevAuth        : "AIzaSyANiSj4N--3txST9re2QhbPuiifbx2HNQU",
            video           : {
                embed           : true,
                ytTheme         : 'dark',
                details         : false,
                thumbnailQuality: 'high',
                autoPlay        : false
            },
            twitchtvEmbed   : true,
            dailymotionEmbed: true,
            tedEmbed        : true,
            dotsubEmbed     : true,
            liveleakEmbed   : true,
            ustreamEmbed    : true,
            codepenEmbed    : true,
            codepenHeight   : 300,
            jsfiddleEmbed   : true,
            jsfiddleHeight  : 300,
            jsbinEmbed      : true,
            jsbinHeight     : 300,
            plunkerEmbed    : true,
            githubgistEmbed : true,
            ideoneEmbed     : true,
            ideoneHeight    : 300
        };

        // Used for chat upload btn
        CONFIG.internal.uploadChat = {
            pattern  : '.jpg,.jpeg,.png,.gif,.txt,.pdf,.mp3,.m4v,.mp4,.mov,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            maxSize  : '100MB',
            minHeight: 0,
            maxHeight: 10000,
            minWidth : 0,
            maxWidth : 10000,
            resize   : {}
        }
    }

})(window.angular);

