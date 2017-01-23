(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('GroupsCtrl', GroupsCtrl);

  GroupsCtrl.$inject = [
    'CONFIG',
    '$scope',
    'goTo',
    '$rootScope',
    '$filter',
    '$state',
    'groupsFactory',
    'userFactory'
  ];

  function GroupsCtrl(CONFIG, $scope, goTo, $rootScope, $filter, $state, groupsFactory, userFactory) {
    var vm = this;

    // Common data
    vm.CONFIG  = CONFIG;
    vm.loading = false;

    // Get user
    vm.user = userFactory.getUser();

    // Groups data
    vm.groups = groupsFactory.getGroups();

    // Config for all groups view
    vm.all = angular.copy(vm.user.settings.preferences.allGroups);

    vm.details = {};

    // Methods
    vm.methods = {
      updatePills     : updatePills,
      save            : save,
      getGroupPicture : getGroupPicture,
      onDisplayDetails: onDisplayDetails,
      joinGroup       : joinGroup,
      leaveGroup      : leaveGroup
    };

    // To add selected design to the proper pill
    vm.methods.updatePills();
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
      vm.methods.updatePills();
    });

    function updatePills() {
      vm.nav = {
        all    : goTo.isCurrentView('app.groups.all'),
        details: goTo.isCurrentView('app.groups.details')
      };
    }

    function save(form) {
      vm.loading = true;
      switch (form) {
        case 'settings':
          vm.loading = false;
          goTo.view('app.account.settings');
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
      var group = groupsFactory.getGroupByName(name);
      if (group != null) {
        vm.details.group         = group;
        vm.details.user          = groupsFactory.getUserFromGroup(vm.user.username, name);
        vm.details.userIsInGroup = vm.details.user != null;
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

