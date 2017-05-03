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
            fontSmiley  : true,
            sanitizeHtml: true,
            emoji       : true,
            link        : false,
            linkTarget  : '_self'
        };
    }

})(window.angular);

