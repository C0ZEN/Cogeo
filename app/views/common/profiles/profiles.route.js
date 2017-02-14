(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {

        // Account routes
        $stateProvider
            .state('app.profiles', {
                abstract    : true,
                url         : '/profiles',
                templateUrl : 'views/common/profiles/profiles.html',
                controller  : 'ProfilesCtrl',
                controllerAs: 'vm'
            })
            .state('app.profiles.user', {
                url        : '/user/:username',
                templateUrl: 'views/common/profiles/user.profile.html',
                data       : {
                    pageTitle: 'profiles_user'
                }
            });
    }

})(window.angular);
