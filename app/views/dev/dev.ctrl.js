(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .controller('DevCtrl', DevCtrl);

    DevCtrl.$inject = [
        'usersFactory'
    ];

    function DevCtrl(usersFactory) {
        var vm = this;

        // Methods
        vm.methods = {
            onInitUsersList: onInitUsersList
        };

        function onInitUsersList() {
            vm.usersList         = usersFactory.getUsers();
            vm.usersListSettings = {
                limit: 20
            }
        }
    }

})(window.angular);

