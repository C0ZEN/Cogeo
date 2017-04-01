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
        var user = userFactory.getUser();
        vm.methods.onGroupsChanged();

        // Listeners
        groupsFactory.subscribe($scope, vm.methods.onGroupsChanged);

        function scrollToElement(element) {
            var div = angular.element(document.getElementById(element));
            $document.scrollToElement(div, vm.data.offset, vm.data.duration);
        }

        function onGroupsChanged() {
            if (user != null) {
                vm.groups = groupsFactory.getUserGroups(user.username);
            }
        }
    }

})(window.angular);

