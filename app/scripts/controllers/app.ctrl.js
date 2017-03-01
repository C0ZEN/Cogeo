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
        '$window',
        'usersFactory'
    ];

    function AppCtrl(CONFIG, userFactory, $scope, localStorageService, $window, usersFactory) {
        var app = this;

        // Common data
        app.CONFIG  = CONFIG;
        app.isReady = false;

        // Methods
        app.methods = {
            onInit: onInit
        };

        $window.onload = app.methods.onInit;

        function onInit() {
            var requestQuantity = 2;
            Methods.firstLoadLog(true);

            // Get the stuff about the current connected user (to avoid login)
            var user = localStorageService.get('currentUser');
            if (user != null && user.username != null && user.token != null) {

                // Login with the app (how each load, to make sure that the token is still valid)
                // May be a potential performance leak nevertheless the security is enhanced
                userFactory.httpRequest.login(user, isDone, isDone);
                usersFactory.httpRequest.getAll(isDone, isDone);
            }
            else {
                isDone(2);
            }

            function isDone(quantity) {
                if (quantity == null) quantity = 1;
                requestQuantity = requestQuantity - quantity;
                if (requestQuantity <= 0) {
                    app.isReady = true;
                    Methods.firstLoadLog(false);
                    Methods.safeApply($scope);
                }
            }
        }
    }

})(window.angular);

