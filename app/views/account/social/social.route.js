(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {

        // Social routes
        $stateProvider
            .state('app.social', {
                abstract    : true,
                url         : '/social',
                templateUrl : 'views/account/social/social.html',
                controller  : 'SocialCtrl',
                controllerAs: 'vm',
                resolve     : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.social.invitations', {
                url        : '/invitations',
                templateUrl: 'views/account/social/social.invitations.html',
                data       : {
                    pageTitle: 'account_invitations'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.social.recruit', {
                url        : '/recruit',
                templateUrl: 'views/account/social/social.recruit.html',
                data       : {
                    pageTitle: 'account_recruit_pageTitle'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.social.friends', {
                url        : '/friends',
                templateUrl: 'views/account/social/social.friends.html',
                data       : {
                    pageTitle: 'account_friends'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            });
    }

})(window.angular);
