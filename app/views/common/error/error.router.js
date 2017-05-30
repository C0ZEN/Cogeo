(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {

        // Error routes
        $stateProvider
            .state('app.error', {
                abstract    : true,
                url         : '/error',
                templateUrl : 'views/common/error/error.html',
                controller  : 'ErrorCtrl',
                controllerAs: 'vm'
            })
            .state('app.error.disconnected', {
                url        : '/disconnected',
                templateUrl: 'views/common/error/error.disconnected.html',
                data       : {
                    pageTitle: 'errors_disconnected'
                }
            });
    }

})(window.angular);
