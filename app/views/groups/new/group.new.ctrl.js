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
        '$timeout',
        '$filter'
    ];

    function GroupNewCtrl($document, $state, CONFIG, goTo, $animate, $timeout, $filter) {
        var vm = this;

        // Common data
        vm.data        = {
            step1FirstShow: true
        };
        vm.newGroup    = {
            channels: [
                {
                    name   : $filter('translate')('groups_new_2_default_channel'),
                    default: true
                }
            ]
        };
        vm.CONFIG      = CONFIG;
        vm.stepForward = true;

        // Methods
        vm.methods = {
            checkGroupName: checkGroupName,
            checkData     : checkData,
            checkSettings : checkSettings,
            createGroup   : createGroup,
            goStepBackward: goStepBackward
        };

        function checkGroupName() {
            vm.stepForward         = true;
            vm.loading             = true;
            vm.loading             = false;
            vm.data.step1FirstShow = false;
            $timeout(function () {
                goTo.view('app.groupNew.secondStep');
            });
        }

        function checkData(step) {
            switch (step) {
            case 2:
                if (Methods.isNullOrEmpty(vm.newGroup.name)) {
                    goTo.view('app.groupNew.firstStep');
                }
                break;
            case 3:
                if (Methods.isNullOrEmpty(vm.newGroup.name) || Methods.isNullOrEmpty(vm.newGroup.description)) {
                    goTo.view('app.groupNew.firstStep');
                }
                break;
            }
        }

        function checkSettings() {
            vm.stepForward = true;
            vm.loading     = true;
            vm.loading     = false;
            $timeout(function () {
                goTo.view('app.groupNew.thirdStep');
            });
        }

        function createGroup() {
            vm.stepForward = true;
            vm.loading     = true;
            vm.loading     = false;
        }

        function goStepBackward(step) {
            vm.stepForward = false;
            switch (step) {
            case 1:
                $timeout(function () {
                    goTo.view('app.groupNew.firstStep');
                });
                break;
            case 2:
                $timeout(function () {
                    goTo.view('app.groupNew.secondStep');
                });
                break;
            }
        }
    }

})(window.angular);

