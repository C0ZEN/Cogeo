(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('GroupNewCtrl', GroupNewCtrl);

    GroupNewCtrl.$inject = [
        '$document',
        '$state',
        'CONFIG',
        'goTo',
        '$animate',
        '$timeout'
    ];

    function GroupNewCtrl($document, $state, CONFIG, goTo, $animate, $timeout) {
        var vm = this;

        // Common data
        vm.data     = {
            step1FirstShow: true
        };
        vm.newGroup = {};
        vm.CONFIG   = CONFIG;

        // Methods
        vm.methods = {
            checkGroupName: checkGroupName,
            checkData     : checkData
        };

        function checkGroupName() {
            vm.loading             = true;
            vm.loading             = false;
            vm.data.step1FirstShow = false;
            goTo.view('app.groupNew.secondStep');
        }

        function checkData(step) {
            switch (step) {
                case 2:
                    if (Methods.isNullOrEmpty(vm.newGroup.name)) {
                        goTo.view('app.groupNew.firstStep');
                    }
                    break;
            }
        }
    }

})(window.angular);

