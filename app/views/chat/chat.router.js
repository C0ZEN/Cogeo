(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {

        // Error route
        $stateProvider
            .state('app.chat', {
                abstract    : true,
                url         : '/chat',
                templateUrl : 'views/chat/chat.html',
                controller  : 'ChatCtrl',
                controllerAs: 'vm'
            })
            .state('app.chat.channel', {
                url        : '/:groupName/:channelName',
                templateUrl: 'views/chat/chat.context.channels.html',
                data       : {
                    pageTitle: 'chat_channel'
                }
            })
            .state('app.chat.user', {
                url        : '/:userName',
                templateUrl: 'views/chat/chat.context.users.html',
                data       : {
                    pageTitle: 'chat_user'
                }
            });
    }

})(window.angular);
