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
        '$translate',
        'tmhDynamicLocale',
        '$state'
    ];

    function AppCtrl(CONFIG, userFactory, $scope, localStorageService, $window, usersFactory, groupsFactory,
                     cozenEnhancedLogs, $rootScope, $translate, tmhDynamicLocale, $state) {
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

                // If the new lang is not available, take the first one as callback
                CONFIG.currentLanguage = toParams.lang;
                if (!Methods.isInList(CONFIG.languages, toParams.lang)) {
                    CONFIG.currentLanguage = CONFIG.languages[0];
                }

                // Update the language
                $translate.use(CONFIG.currentLanguage);
                moment.locale(CONFIG.currentLanguage);
                tmhDynamicLocale.set(CONFIG.currentLanguage);
            }
        });

        function onInit() {
            cozenEnhancedLogs.wrap.end('windowOnLoad');
            cozenEnhancedLogs.wrap.starting('cogeoInit');
            var requestQuantity = 3;

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
                    cozenEnhancedLogs.wrap.end('cogeoInit');
                    Methods.safeApply($scope);
                }
            }
        }
    }

})(window.angular);

