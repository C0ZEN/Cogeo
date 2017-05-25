(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {

        // Invitations routes
        $stateProvider
            .state('app.invitations', {
                abstract    : true,
                url         : '/invitations',
                templateUrl : 'views/invitations/invitations.html',
                controller  : 'InvitationsCtrl',
                controllerAs: 'vm',
                resolve     : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.invitations.received', {
                url        : '/received',
                templateUrl: 'views/invitations/invitations.received.html',
                data       : {
                    pageTitle: 'INVITATIONS.RECEIVED.PAGE_TITLE'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            });
    }

})(window.angular);
