(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('LogCtrl', LogCtrl);

    LogCtrl.$inject = [
        '$timeout',
        'CONFIG',
        'userFactory',
        '$rootScope'
    ];

    function LogCtrl($timeout, CONFIG, userFactory, $rootScope) {
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
            onPasswordChange     : onPasswordChange,
            onCheckPasswordChange: onCheckPasswordChange,
            register             : register,
            login                : login,
            newPassword          : newPassword,
            startLoading         : startLoading,
            stopLoading          : stopLoading,
            onSocialSignInSuccess: onSocialSignInSuccess,
            onReady              : onReady,
            onInit               : onInit
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
            userFactory.httpRequest.register(data, vm.methods.stopLoading, vm.methods.stopLoading);
        }

        function login() {
            vm.methods.startLoading();
            var data = {
                username: vm.login.username,
                password: vm.login.password
            };
            userFactory.httpRequest.login(data, vm.methods.stopLoading, vm.methods.stopLoading);
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

        function onReady() {
            vm.isReady = true;
        }

        function onInit() {
            vm.isReady = false;
        }
    }

})(window.angular);

