(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {

        // Log routes
        $stateProvider
            .state('app.log', {
                abstract    : true,
                url         : '/',
                controller  : 'LogCtrl',
                controllerAs: 'vm',
                templateUrl : 'views/log/log.html'
            })
            .state('app.log.login', {
                url        : 'login',
                templateUrl: 'views/log/log.login.html',
                data       : {
                    pageTitle: 'login'
                }
            })
            .state('app.log.register', {
                url        : 'register',
                templateUrl: 'views/log/log.register.html',
                data       : {
                    pageTitle: 'register'
                }
            })
            .state('app.log.newPassword', {
                url        : 'new-password/:token',
                templateUrl: 'views/log/log.newPassword.html',
                data       : {
                    pageTitle: 'new_password'
                }
            });
    }

})(window.angular);
