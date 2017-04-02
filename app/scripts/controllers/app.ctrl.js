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
        'usersFactory',
        'groupsFactory'
    ];

    function AppCtrl(CONFIG, userFactory, $scope, localStorageService, $window, usersFactory, groupsFactory) {
        var app = this;

        // Common data
        app.CONFIG  = CONFIG;
        app.isReady = false;

        // Methods
        app.methods = {
            onInit: onInit
        };

        // When the window is ready
        $window.onload = app.methods.onInit;

        function onInit() {
            var requestQuantity = 3;
            Methods.firstLoadLog(true);

            // Get the stuff about the current connected user (to avoid login)
            var user = localStorageService.get('currentUser');
            if (user != null && user.username != null && user.token != null) {

                // Login with the app (how each load, to make sure that the token is still valid)
                // May be a potential performance leak nevertheless the security is enhanced
                userFactory.httpRequest.login(user, isDone, isDone);
                usersFactory.httpRequest.getAll(isDone, isDone);

                // Get all the groups
                groupsFactory.httpRequest.getAllGroups(isDone, isDone);
            }
            else {
                userFactory.setUser(null);
                isDone(3);
            }

            function isDone(quantity) {
                if (quantity == null) {
                    quantity = 1;
                }
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

