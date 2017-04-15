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
        'groupsFactory',
        'cozenEnhancedLogs',
        '$rootScope',
        '$state',
        '$stateParams',
        'cozenLanguage'
    ];

    function AppCtrl(CONFIG, userFactory, $scope, localStorageService, $window, usersFactory, groupsFactory,
                     cozenEnhancedLogs, $rootScope, $state, $stateParams, cozenLanguage) {
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

        // Update the configuration of the language when the url lang param was changed
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toParams.lang != fromParams.lang) {
                cozenLanguage.updateCurrentLanguage(toParams.lang);
            }
        });

        function onInit() {
            cozenEnhancedLogs.wrap.end('windowOnLoad');
            cozenEnhancedLogs.wrap.starting('cogeoInit');
            var requestQuantity = 3;

            // Get the stuff about the current connected user (to avoid manual login)
            var user = localStorageService.get('currentUser');
            if (user != null && user.username != null && user.token != null) {

                // Login with the app (how each load, to make sure that the token is still valid)
                // May be a potential performance leak nevertheless the security is enhanced
                userFactory.httpRequest.login(user, function (response) {
                    if (response.data.data.settings.language != cozenLanguage.getCurrentLanguage()) {
                        cozenLanguage.updateCurrentLanguage(response.data.data.settings.language);

                        // Refresh the state with new lang param
                        var params  = angular.copy($stateParams);
                        params.lang = cozenLanguage.getCurrentLanguage();
                        $state.transitionTo($state.current, params, {
                            reload : false,
                            inherit: false,
                            notify : false
                        });
                    }
                    isDone();
                }, function () {
                    isDone();
                });
                usersFactory.httpRequest.getAll(function () {
                    isDone();
                }, function () {
                    isDone();
                });

                // Get all the groups
                groupsFactory.httpRequest.getAllGroups(function () {
                    isDone();
                }, function () {
                    isDone();
                });
            }
            else {
                userFactory.setUser(null);

                // Get some data only if mod dev
                if (CONFIG.dev) {
                    usersFactory.httpRequest.getAll(function () {
                        isDone();
                    }, function () {
                        isDone();
                    });
                    groupsFactory.httpRequest.getAllGroups(function () {
                        isDone();
                    }, function () {
                        isDone();
                    });
                    isDone();
                }
                else {
                    isDone(3);
                }
            }

            function isDone(quantity) {
                if (Methods.isNullOrEmpty(quantity)) {
                    quantity = 1;
                }
                requestQuantity = requestQuantity - quantity;
                if (requestQuantity <= 0) {
                    app.isReady = true;
                    cozenEnhancedLogs.wrap.end('cogeoInit');
                    Methods.safeApply($scope);
                }
            }
        }
    }

})(window.angular);

