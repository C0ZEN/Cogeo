(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('GroupsCtrl', GroupsCtrl);

  GroupsCtrl.$inject = [
    'CONFIG',
    'goTo',
    '$rootScope',
    '$state',
    'groupsFactory'
  ];

  function GroupsCtrl(CONFIG, goTo, $rootScope, $state, groupsFactory) {
    var vm = this;

    // Common data
    vm.CONFIG  = CONFIG;
    vm.loading = false;

    // Get user
    vm.user = $rootScope.data.user;

    // Groups data
    vm.groups = groupsFactory.getGroupsWithUserRoles(vm.user.username);

    // Config for all groups view
    vm.all = angular.copy(vm.user.settings.preferences.allGroups);

    vm.details = {};
    vm.edit    = {};

    // Methods
    vm.methods = {
      updatePills     : updatePills,
      save            : save,
      getGroupPicture : getGroupPicture,
      onDisplayDetails: onDisplayDetails,
      joinGroup       : joinGroup,
      leaveGroup      : leaveGroup,
      getKickedTime   : Utils.getKickedTime,
      onDisplayEdit   : onDisplayEdit
    };

    // To add selected design to the proper pill
    vm.methods.updatePills();
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
      vm.methods.updatePills();
    });

    function updatePills() {
      vm.nav = {
        all    : goTo.isCurrentView('app.groups.all'),
        details: goTo.isCurrentView('app.groups.details'),
        edit   : goTo.isCurrentView('app.groups.edit')
      };
    }

    function save(form) {
      vm.loading = true;
      switch (form) {
        case 'edit':
          vm.loading = false;
          goTo.view('app.groups.details', {groupName: vm.details.group.name});
          break;
      }
    }

    function getGroupPicture(name, pictureUrl) {
      if (Methods.isNullOrEmpty(pictureUrl)) {
        return 'images/groups/' + name.slice(0, 1) + '.png';
      } else return pictureUrl;
    }

    function onDisplayDetails() {
      var name  = $state.params.groupName;
      var group = groupsFactory.getGroupByNameWithUserRoles(name, vm.user.username);
      if (group != null) {
        vm.details.group         = group;
        vm.details.user          = groupsFactory.getUserFromGroup(vm.user.username, name);
        vm.details.userIsInGroup = vm.details.user != null;
        vm.details.userIsAdmin   = vm.details.user != null ? vm.details.user.admin : false;
      } else {
        // @todo error handling
      }
    }

    function joinGroup(groupName) {

    }

    function leaveGroup(groupName) {

    }

    function onDisplayEdit() {
      var name  = $state.params.groupName;
      var group = groupsFactory.getGroupByNameWithUserRoles(name, vm.user.username);
      if (group != null) {
        vm.edit         = angular.copy(group);
        vm.details.user = groupsFactory.getUserFromGroup(vm.user.username, name);
      } else {
        // @todo error handling
      }
    }
  }

})(window.angular);

