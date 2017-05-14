(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .config(config);

    config.$inject = [
        'CONFIG'
    ];

    function config(CONFIG) {
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
            codepenEmbed     : true,
            codepenHeight    : 300,
            jsfiddleEmbed    : true,
            jsfiddleHeight   : 300,
            jsbinEmbed       : true,
            jsbinHeight      : 300,
            plunkerEmbed     : true,
            githubgistEmbed  : true,
            ideoneEmbed      : true,
            ideoneHeight     : 300
        };
    }

})(window.angular);

