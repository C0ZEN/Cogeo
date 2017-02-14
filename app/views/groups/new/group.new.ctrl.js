(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('GroupNewCtrl', GroupNewCtrl);

    GroupNewCtrl.$inject = [
        'userFactory',
        '$state',
        'CONFIG',
        'goTo',
        '$animate',
        '$timeout',
        '$filter',
        'rfc4122'
    ];

    function GroupNewCtrl(userFactory, $state, CONFIG, goTo, $animate, $timeout, $filter, rfc4122) {
        var vm = this;

        // Methods
        vm.methods = {
            checkGroupName         : checkGroupName,
            checkData              : checkData,
            checkSettings          : checkSettings,
            createGroup            : createGroup,
            goStepBackward         : goStepBackward,
            addChannel             : addChannel,
            isChannelNameDuplicated: isChannelNameDuplicated
        };

        // Common data
        vm.CONFIG      = CONFIG;
        vm.rfc4122     = rfc4122;
        vm.data        = {
            step1FirstShow: true
        };
        vm.newGroup    = {
            channels: []
        };
        vm.details     = {
            group: {}
        };
        vm.stepForward = true;
        vm.methods.addChannel($filter('translate')('groups_new_2_default_channel'));

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
                    vm.availableUsers     = userFactory.getFriends();
                    vm.details.group.name = angular.copy(vm.newGroup.name);
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

        function addChannel(name) {
            vm.newGroup.channels.push({
                name   : name,
                default: true,
                id     : rfc4122.v4()
            });
        }

        function isChannelNameDuplicated() {
            var channelsNames = [];
            angular.forEach(vm.newGroup.channels, function (channel) {
                channelsNames.push(channel.name);
            });
            return Methods.hasDuplicates(channelsNames);
        }
    }

})(window.angular);

