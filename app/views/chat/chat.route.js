(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
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
                url        : '/:username',
                templateUrl: 'views/chat/context/chat.context.users.html',
                data       : {
                    pageTitle: 'chat_user'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.notFriend', {
                url        : '/not-friend',
                templateUrl: 'views/chat/not-friend/not-friend.template.html',
                data       : {
                    pageTitle: 'chat_not_friend'
                }
            });
    }

})(window.angular);
