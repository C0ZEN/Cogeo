(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('AppCtrl', AppCtrl);

    AppCtrl.$inject = [
        'CONFIG',
        'userFactory',
        '$scope',
        'localStorageService',
        'cfpLoadingBar'
    ];

    function AppCtrl(CONFIG, userFactory, $scope, localStorageService, cfpLoadingBar) {
        var app = this;

        // Common data
        app.CONFIG  = CONFIG;
        app.isReady = false;

        // Methods
        app.methods = {
            onInit: onInit
        };

        cfpLoadingBar.start();
        cfpLoadingBar.inc();
        window.onload = app.methods.onInit;

        function onInit() {
            var requestQuantity = 1;
            Methods.firstLoadLog(true);

            // Get the stuff about the current connected user (to avoid login)
            var user = localStorageService.get('currentUser');
            if (user != null && user.username != null && user.token != null) {

                // Login with the app (how each load, to make sure that the token is still valid)
                // May be a potential performance leak nevertheless the security is enhanced
                cfpLoadingBar.inc();
                userFactory.httpRequest.login(user, isDone, isDone);
            }
            else {
                isDone();
            }

            function isDone() {
                requestQuantity--;
                cfpLoadingBar.inc();
                if (requestQuantity <= 0) {
                    cfpLoadingBar.complete();
                    app.isReady = true;
                    Methods.firstLoadLog(false);
                    Methods.safeApply($scope);
                }
            }
        }
    }

})(window.angular);

