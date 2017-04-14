(function (angular, document) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('GroupNewCtrl', GroupNewCtrl);

    GroupNewCtrl.$inject = [
        'userFactory',
        'httpRequest',
        'CONFIG',
        'goTo',
        'groupsFactory',
        '$timeout',
        '$filter',
        'rfc4122',
        'cozenLazyLoadRandom',
        'cozenLazyLoadInternal'
    ];

    function GroupNewCtrl(userFactory, httpRequest, CONFIG, goTo, groupsFactory, $timeout, $filter, rfc4122,
                          cozenLazyLoadRandom, cozenLazyLoadInternal) {
        var vm = this;

        // Methods
        vm.methods = {
            checkGroupName         : checkGroupName,
            checkData              : checkData,
            checkSettings          : checkSettings,
            createGroup            : createGroup,
            goStepBackward         : goStepBackward,
            addChannel             : addChannel,
            isChannelNameDuplicated: isChannelNameDuplicated,
            startLoading           : startLoading,
            stopLoading            : stopLoading,
            setRandomGroupName     : setRandomGroupName,
            setRandomStep2         : setRandomStep2
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
            vm.methods.startLoading();
            groupsFactory.httpRequest.isAvailableGroupName(vm.newGroup.name, function () {
                vm.methods.stopLoading();
                vm.stepForward         = true;
                vm.data.step1FirstShow = false;
                $timeout(function () {
                    goTo.view('app.groupNew.secondStep');
                });
            }, function (response) {
                vm.methods.stopLoading();
                var btn = angular.element(document.querySelector('#submit-btn-new-group-step-1'));
                httpRequest.shakeElement(btn);
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
            vm.stepForward      = true;
            vm.newGroup.creator = userFactory.getUser().username;
            groupsFactory.httpRequest.addGroup(vm.newGroup, function () {
                vm.methods.stopLoading();
                goTo.view('app.groups.details', {
                    groupName: vm.newGroup.name
                });
            }, function (response) {
                vm.methods.stopLoading();
                var btn = angular.element(document.querySelector('#submit-btn-new-group-step-3'));
                httpRequest.shakeElement(btn);
            });
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

        function startLoading() {
            vm.loading = true;
        }

        function stopLoading() {
            vm.loading = false;
        }

        function setRandomGroupName() {
            vm.newGroup.name = cozenLazyLoadRandom.getRandomWord(Methods.getRandomFromRange(4, 22));
            cozenLazyLoadInternal.sendBroadcastForm('newGroup1');
        }

        function setRandomStep2() {
            vm.newGroup.description = cozenLazyLoadRandom.getRandomSentence(15);
            var channelQuantity     = Methods.getRandomFromRange(1, 5);
            vm.newGroup.channels    = [];
            for (var i = 0; i < channelQuantity; i++) {
                vm.newGroup.channels.push({
                    name   : cozenLazyLoadRandom.getRandomWord(Methods.getRandomFromRange(4, 22)),
                    default: true,
                    id     : rfc4122.v4()
                });
            }
            cozenLazyLoadInternal.sendBroadcastForm('newGroup2');
        }
    }

})(window.angular, window.document);

