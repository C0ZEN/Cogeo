(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {

        // Groups routes
        $stateProvider
            .state('app.groups', {
                abstract    : true,
                url         : '/groups',
                templateUrl : 'views/groups/groups.html',
                controller  : 'GroupsCtrl',
                controllerAs: 'vm',
                resolve     : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.groups.all', {
                url        : '/all',
                templateUrl: 'views/groups/groups.all.html',
                data       : {
                    pageTitle: 'groups_all'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.groups.details', {
                url        : '/details/:groupName',
                templateUrl: 'views/groups/groups.details.html',
                data       : {
                    pageTitle: 'groups_details'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.groups.edit', {
                url        : '/edit/:groupName',
                templateUrl: 'views/groups/groups.edit.html',
                data       : {
                    pageTitle: 'groups_edit'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.groups.members', {
                url        : '/members/:groupName',
                templateUrl: 'views/groups/groups.members.html',
                data       : {
                    pageTitle: 'groups_members'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.groups.invitations', {
                url        : '/invitations/:groupName',
                templateUrl: 'views/groups/groups.invitations.html',
                data       : {
                    pageTitle: 'groups_invitations'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.groups.log', {
                url        : '/log/:groupName',
                templateUrl: 'views/groups/groups.log.html',
                data       : {
                    pageTitle: 'group_log'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            })
            .state('app.groups.recruit', {
                url        : '/recruit/:groupName',
                templateUrl: 'views/groups/groups.recruit.html',
                data       : {
                    pageTitle: 'account_recruit'
                },
                resolve    : {
                    isConnected: function (navigationFactory) {
                        return navigationFactory.isAllowed();
                    }
                }
            });
    }

})(window.angular);
