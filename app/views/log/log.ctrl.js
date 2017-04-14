(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('LogCtrl', LogCtrl);

    LogCtrl.$inject = [
        '$timeout',
        'CONFIG',
        'userFactory',
        '$rootScope',
        'goTo',
        'accessLog',
        'httpRequest',
        'groupsFactory',
        'cozenLazyLoadPreBuild',
        'cozenLazyLoadInternal'
    ];

    function LogCtrl($timeout, CONFIG, userFactory, $rootScope, goTo, accessLog, httpRequest, groupsFactory,
                     cozenLazyLoadPreBuild, cozenLazyLoadInternal) {
        var vm = this;

        // Common data
        vm.register = {
            passwordMismatch: false
        };
        vm.loading  = false;
        vm.login    = {};
        vm.form     = {
            register: null,
            login   : null
        };
        vm.CONFIG   = CONFIG;

        // Methods
        vm.methods = {
            onPasswordChange        : onPasswordChange,
            onCheckPasswordChange   : onCheckPasswordChange,
            register                : register,
            login                   : login,
            newPassword             : newPassword,
            startLoading            : startLoading,
            stopLoading             : stopLoading,
            onSocialSignInSuccess   : onSocialSignInSuccess,
            generateRegisterLazyData: generateRegisterLazyData
        };

        // Events
        $rootScope.$on('event:social-sign-in-success', vm.methods.onSocialSignInSuccess);

        function onPasswordChange(newModel, parent) {
            vm[parent].passwordMismatch = newModel != vm[parent].checkPassword;
        }

        function onCheckPasswordChange(newModel, parent) {
            vm[parent].passwordMismatch = vm[parent].password != newModel;
        }

        function register() {
            vm.methods.startLoading();
            var data = {
                surname  : vm.register.surname,
                givenName: vm.register.givenName,
                username : vm.register.username,
                email    : vm.register.email,
                password : vm.register.password
            };
            userFactory.httpRequest.register(data, function () {
                groupsFactory.httpRequest.getAllGroups();
                vm.methods.stopLoading();
            }, vm.methods.stopLoading);
        }

        function login() {
            vm.methods.startLoading();
            var data = {
                username: vm.login.username,
                password: vm.login.password
            };

            userFactory.httpRequest.login(data, function () {

                // Log the connexion
                accessLog.getAccessLog()
                    .then(function (response) {
                        userFactory.httpRequest.addAccessLog(response, callback, callback);
                    })
                ;

                // Get all the groups
                groupsFactory.httpRequest.getAllGroups();
            }, function () {
                vm.methods.stopLoading();
                var btn = angular.element(document.querySelector('#submit-login-btn'));
                httpRequest.shakeElement(btn);
            });

            // The timeout avoid empty user in the userFactory because we need to wait 1 digest before changing view
            // If not, the resolve with connected will fire as false
            function callback() {
                $timeout(function () {
                    vm.methods.stopLoading();
                    goTo.view('app.account.profile');
                });
            }
        }

        function newPassword() {

        }

        function startLoading() {
            vm.loading = true;
        }

        function stopLoading() {
            vm.loading = false;
        }

        function onSocialSignInSuccess($event, socialData) {
            // socialData => name, email, image_url, uid, provider, token
        }

        function generateRegisterLazyData() {
            var simpleUser            = cozenLazyLoadPreBuild.getPreBuildSimpleUser('register', 'formRegister');
            vm.register.surname       = simpleUser.firstName;
            vm.register.givenName     = simpleUser.lastName;
            vm.register.username      = simpleUser.username;
            vm.register.email         = simpleUser.email;
            vm.register.password      = simpleUser.password;
            vm.register.checkPassword = simpleUser.password;
            cozenLazyLoadInternal.sendBroadcastBtnClick('formRegister');
        }
    }

})(window.angular);

