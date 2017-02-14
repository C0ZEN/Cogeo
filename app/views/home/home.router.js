(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {

        // Home route (default)
        $stateProvider
            .state('app.home', {
                url         : '/home',
                templateUrl : 'views/home/home.html',
                controller  : 'HomeCtrl',
                controllerAs: 'vm',
                data        : {
                    pageTitle: 'home'
                }
            });
    }

})(window.angular);
