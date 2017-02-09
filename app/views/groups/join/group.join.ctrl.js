(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('GroupJoinCtrl', GroupJoinCtrl);

    GroupJoinCtrl.$inject = [
        '$document',
        '$state',
        'CONFIG'
    ];

    function GroupJoinCtrl($document, $state, CONFIG) {
        var vm = this;

        // Common data
        vm.data    = {
            groupName: $state.params.groupName
        };
        vm.join    = {};
        vm.loading = false;
        vm.CONFIG  = CONFIG;

        // Methods
        vm.methods = {
            join: join
        };

        function join() {
            vm.loading = true;
            // @todo request
            vm.loading = false;
        }
    }

})(window.angular);

