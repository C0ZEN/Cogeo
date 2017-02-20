(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('ChannelsCtrl', ChannelsCtrl);

    ChannelsCtrl.$inject = [
        'CONFIG',
        'channelsFactory',
        '$rootScope',
        '$state',
        'groupsFactory',
        'userFactory',
        'usersFactory',
        '$filter',
        '$scope'
    ];

    function ChannelsCtrl(CONFIG, channelsFactory, $rootScope, $state, groupsFactory, userFactory, usersFactory, $filter, $scope) {
        var vm = this;

        // Methods
        vm.methods = {
            onInitAll: onInitAll
        };

        // Common data
        vm.CONFIG  = CONFIG;
        vm.loading = false;

        function onInitAll() {
            vm.params      = $state.params;
            vm.group       = groupsFactory.getGroupByName(vm.params.groupName);
            vm.user        = userFactory.getUser();
            vm.channels    = channelsFactory.getChannelsWithUserRoles(vm.params.groupName, vm.user.username);
            vm.allChannels = angular.copy(vm.user.settings.preferences.allChannels);
        }
    }

})(window.angular);

