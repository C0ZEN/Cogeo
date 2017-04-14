(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {

        // Dev route
        $stateProvider
            .state('app.dev', {
                abstract    : true,
                url         : '/dev',
                controller  : 'DevCtrl',
                controllerAs: 'vm',
                template    : '<div class="ui-view"></div>',
                resolve     : {
                    isDev: function (CONFIG) {
                        return CONFIG.dev;
                    }
                }
            })
            .state('app.dev.usersList', {
                url        : '/users-list',
                templateUrl: 'views/dev/dev.usersList.html',
                data       : {
                    pageTitle: 'DEV.USERS_LIST.PAGE_TITLE'
                },
                resolve    : {
                    isDev: function (CONFIG) {
                        return CONFIG.dev;
                    }
                }
            });
    }

})(window.angular);
