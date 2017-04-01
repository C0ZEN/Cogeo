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
                controllerAs: 'vm',
                resolve     : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.chat.channel', {
                url        : '/:groupName/:channelName',
                templateUrl: 'views/chat/context/chat.context.channels.html',
                data       : {
                    pageTitle: 'chat_channel'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.chat.user', {
                url        : '/:userName',
                templateUrl: 'views/chat/context/chat.context.users.html',
                data       : {
                    pageTitle: 'chat_user'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            });
    }

})(window.angular);
