(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = [
        'CONFIG',
        'groupsFactory',
        'userFactory'
    ];

    function ChatCtrl(CONFIG, groupsFactory, userFactory) {
        var vm = this;

        // Methods
        vm.methods = {
            onInit: onInit
        };

        // Common data
        vm.CONFIG  = CONFIG;
        vm.loading = false;

        function onInit() {
            vm.user   = userFactory.getUser();
            vm.groups = groupsFactory.getUserGroups(vm.user.username);
        }
    }

})(window.angular);

