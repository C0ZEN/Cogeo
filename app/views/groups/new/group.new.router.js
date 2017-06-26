(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {

        // New group route
        $stateProvider
            .state('app.groupNew', {
                abstract    : true,
                url         : '/groups/new',
                controller  : 'GroupNewCtrl',
                controllerAs: 'vm',
                templateUrl : 'views/groups/new/group.html',
                resolve     : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.groupNew.firstStep', {
                url        : '/name',
                templateUrl: 'views/groups/new/group.step1.html',
                data       : {
                    pageTitle: 'group_new'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.groupNew.secondStep', {
                url        : '/details',
                templateUrl: 'views/groups/new/group.step2.html',
                data       : {
                    pageTitle: 'group_new'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.groupNew.thirdStep', {
                url        : '/recruit',
                templateUrl: 'views/groups/new/group.step3.html',
                data       : {
                    pageTitle: 'group_new'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            });
    }

})(window.angular);
