(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('NavbarCtrl', NavbarCtrl);

    NavbarCtrl.$inject = [
        '$document',
        '$rootScope',
        'groupsFactory',
        'userFactory',
        '$scope'
    ];

    function NavbarCtrl($document, $rootScope, groupsFactory, userFactory, $scope) {
        var vm = this;

        // Methods
        vm.methods = {
            scrollToElement: scrollToElement,
            isConnected    : userFactory.isConnected,
            onGroupsChanged: onGroupsChanged
        };

        // Common data
        vm.data  = {
            offset  : 60, // Height of the navbar
            duration: 600
        };
        vm.other = {
            hover: false
        };

        // Groups
        vm.group = {
            hover: false
        };

        // Get the current user
        vm.user = userFactory.getUser();
        vm.methods.onGroupsChanged();

        // Listeners
        groupsFactory.subscribe($scope, function () {
            vm.methods.onGroupsChanged();
        });
        userFactory.subscribe($scope, function () {
            vm.user = userFactory.getUser();
        });

        function scrollToElement(element) {
            var div = angular.element(document.getElementById(element));
            $document.scrollToElement(div, vm.data.offset, vm.data.duration);
        }

        function onGroupsChanged() {
            vm.user = userFactory.getUser();
            if (vm.user != null) {
                vm.groups = groupsFactory.getUserGroups(vm.user.username);
            }
        }
    }

})(window.angular);

