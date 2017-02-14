(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .config(config);

    config.$inject = [
        '$stateProvider',
        '$urlRouterProvider',
        'CONFIG'
    ];

    function config($stateProvider, $urlRouterProvider, CONFIG) {

        // App route (parent)
        $stateProvider
            .state('app', {
                abstract: true,
                url     : '/app/:lang',
                template: '<ui-view/>'
            });

        // Default route
        $urlRouterProvider.otherwise('/app/' + CONFIG.currentLanguage + '/home');
    }

})(window.angular);
