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
    'groupsFactory',
    'userFactory',
    'usersFactory'
  ];

  function GroupsCtrl(CONFIG, goTo, $rootScope, $state, groupsFactory, userFactory, usersFactory) {
    var vm = this;

    // Common data
    vm.CONFIG  = CONFIG;
    vm.loading = false;


    vm.user        = userFactory.getUser();
    vm.groups      = groupsFactory.getGroupsWithUserRoles(vm.user.username);
    vm.all         = angular.copy(vm.user.settings.preferences.allGroups);
    vm.details     = {};
    vm.edit        = {};
    vm.invitations = angular.copy(vm.user.settings.preferences.groupsInvitations);

    // Methods
    vm.methods = {
      updatePills     : updatePills,
      save            : save,
      getGroupPicture : getGroupPicture,
      onDisplayDetails: onDisplayDetails,
      joinGroup       : joinGroup,
      leaveGroup      : leaveGroup,
      getKickedTime   : Utils.getKickedTime,
      getUserFullName : usersFactory.getUserFullName
    };

    // To add selected design to the proper pill
    vm.methods.updatePills();
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
      vm.methods.updatePills();
      vm.params = $state.params;
    });

    function updatePills() {
      vm.nav = {
        all        : goTo.isCurrentView('app.groups.all'),
        details    : goTo.isCurrentView('app.groups.details'),
        edit       : goTo.isCurrentView('app.groups.edit'),
        invitations: goTo.isCurrentView('app.groups.invitations')
      };
    }

    function save(form) {
      vm.loading = true;
      switch (form) {
        case 'edit':
          vm.loading = false;
          groupsFactory.updateGroup(vm.edit);
          goTo.view('app.groups.details', {groupName: vm.details.name});
          break;
      }
    }

    function getGroupPicture(name, pictureUrl) {
      if (Methods.isNullOrEmpty(pictureUrl)) {
        return 'images/groups/' + name.slice(0, 1) + '.png';
      } else return pictureUrl;
    }

    function onDisplayDetails() {
      vm.user   = userFactory.getUser();
      vm.params = $state.params;
      var name  = $state.params.groupName;
      var group = groupsFactory.getGroupByNameWithUserRoles(name, vm.user.username);
      if (group != null) {
        vm.details.group         = group;
        vm.details.user          = groupsFactory.getUserFromGroup(vm.user.username, name);
        vm.details.userIsInGroup = vm.details.user != null;
        vm.details.userIsAdmin   = vm.details.user != null ? vm.details.user.admin : false;
        vm.edit                  = angular.copy(group);
        vm.groupInvitations      = group.invitations;
      } else {
        // @todo error handling
      }
    }

    function joinGroup(groupName) {

    }

    function leaveGroup(groupName) {

    }
  }

})(window.angular);

