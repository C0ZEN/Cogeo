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
    'usersFactory',
    '$filter'
  ];

  function GroupsCtrl(CONFIG, goTo, $rootScope, $state, groupsFactory, userFactory, usersFactory, $filter) {
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
    vm.members     = angular.copy(vm.user.settings.preferences.groupsMembers);
    vm.log         = angular.copy(vm.user.settings.preferences.groupsLog);

    // Methods
    vm.methods = {
      save            : save,
      getGroupPicture : getGroupPicture,
      onDisplayDetails: onDisplayDetails,
      joinGroup       : joinGroup,
      leaveGroup      : leaveGroup,
      getKickedTime   : Utils.getKickedTime,
      getUserFullName : usersFactory.getUserFullName,
      onShowAll       : onShowAll,
      getAllLogs      : getAllLogs,
      getLogSrc       : getLogSrc
    };

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
        vm.groupInvitations      = angular.copy(group.invitations);
        vm.groupMembers          = usersFactory.addUsersFullNames(group.users);
        vm.logs                  = angular.copy(group.logs);
        if (!Methods.isNullOrEmpty(vm.logs)) {
          vm.logs.forEach(function (log) {
            log.text          = $filter('translate')('groups_log_' + log.type, log.values);
            log.formattedDate = $filter('date')(log.date * 1000, 'EEEE dd MMMM yyyy à HH:mm');
          });
        }
      } else {
        // @todo error handling
      }
    }

    function joinGroup(groupName) {

    }

    function leaveGroup(groupName) {

    }

    function onShowAll() {

      // It will hide the edit btn
      vm.details.userIsAdmin = false;
    }

    function getAllLogs() {
      vm.log.all = true;
    }

    function getLogSrc(type) {
      switch (type) {
        case 'newGroupCreated':
        case 'newGroupJoined':
        case 'newChannelCreated':
        case 'newChannelJoined':
          return 'icons8-plus';
        case 'groupLeft':
        case 'channelLeft':
          return 'icons8-logout-rounded';
        case 'groupEdited':
        case 'channelEdited':
        case 'socialUserRenamed':
        case 'socialUserAliasRemoved':
          return 'icons8-edit';
        case 'groupInvitationSentOne':
        case 'groupInvitationSentMany':
        case 'channelInvitationSentOne':
        case 'channelInvitationSentMany':
        case 'socialInvitationSent':
          return 'icons8-message-filled';
        case 'groupPermissionsGranted':
        case 'channelPermissionsGranted':
          return 'icons8-unlock';
        case 'groupPermissionsRevoked':
        case 'channelPermissionsRevoked':
          return 'icons8-lock';
        case 'groupUserKicked':
        case 'groupUserBanned':
        case 'channelUserKicked':
        case 'channelUserBanned':
        case 'socialUserBlocked':
        case 'socialUserRemoved':
          return 'icons8-no-chat';
        case 'groupUserUnbanned':
        case 'channelUserUnbanned':
        case 'socialUserUnblocked':
        case 'socialInvitationAccepted':
          return 'icons8-chat';
      }
    }
  }

})(window.angular);

