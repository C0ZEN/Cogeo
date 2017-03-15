(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('ChatCtrl', ChatCtrl);

    ChatCtrl.$inject = [
        'CONFIG',
        'groupsFactory',
        'userFactory',
        '$state',
        'channelsFactory'
    ];

    function ChatCtrl(CONFIG, groupsFactory, userFactory, $state, channelsFactory) {
        var vm = this;

        // Methods
        vm.methods = {
            onInit          : onInit,
            setActiveGroup  : setActiveGroup,
            setActiveChannel: setActiveChannel
        };

        // Common data
        vm.CONFIG  = CONFIG;
        vm.loading = false;

        function onInit() {
            vm.params   = $state.params;
            vm.user     = userFactory.getUser();
            vm.groups   = groupsFactory.getUserGroups(vm.user.username);
            vm.hasGroup = vm.groups.length > 0;
            if (vm.hasGroup) {
                vm.methods.setActiveGroup(vm.params.groupName);
                vm.methods.setActiveChannel(vm.params.channelName)
            }
        }

        function setActiveGroup(groupName) {
            vm.activeGroup     = groupName;
            vm.starredChannels = channelsFactory.getMyStarredChannels(groupName);
            vm.othersChannels  = channelsFactory.getMyOthersChannels(groupName);
        }

        function setActiveChannel(channelName) {
            vm.activeChannel = channelName;
        }
    }

})(window.angular);

