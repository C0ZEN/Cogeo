(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('GroupNewCtrl', GroupNewCtrl);

    GroupNewCtrl.$inject = [
        '$document',
        '$state',
        'CONFIG'
    ];

    function GroupNewCtrl($document, $state, CONFIG) {
        var vm = this;

        // Common data
        vm.data    = {};
        vm.new     = {};
        vm.CONFIG  = CONFIG;
        vm.isReady = false;

        // Methods
        vm.methods = {
            onReady: onReady
        };

        function onReady() {
            vm.isReady = true;
        }
    }

})(window.angular);

