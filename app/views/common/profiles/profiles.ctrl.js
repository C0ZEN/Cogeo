(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('ProfilesCtrl', ProfilesCtrl);

    ProfilesCtrl.$inject = [
        'CONFIG',
        '$state',
        'usersFactory',
        'goTo',
        'userFactory'
    ];

    function ProfilesCtrl(CONFIG, $state, usersFactory, goTo, userFactory) {
        var vm = this;

        // Common data
        vm.CONFIG = CONFIG;

        // Methods
        vm.methods = {
            onInit      : onInit,
            onUserInit  : onUserInit,
            socialAction: socialAction
        };

        function onInit() {
            vm.params = $state.params;
        }

        function onUserInit() {
            if ($state.params.username == userFactory.getUser().username) {
                goTo.view('app.account.profile');
            }
            else {
                vm.user = usersFactory.getUserByUsername($state.params.username);
            }
        }

        function socialAction(action) {
            switch (action) {
                case 'add':
                    break;
                case 'remove':
                    break;
            }
        }
    }

})(window.angular);

