(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('AccountCtrl', AccountCtrl);

  AccountCtrl.$inject = [
    'CONFIG',
    '$scope',
    'goTo',
    '$rootScope',
    '$filter'
  ];

  function AccountCtrl(CONFIG, $scope, goTo, $rootScope, $filter) {
    var vm = this;

    // Common data
    vm.CONFIG  = CONFIG;
    vm.loading = false;

    // User data
    vm.user                      = {
      givenName : 'Testelin',
      surname   : 'Geoffrey',
      email     : 'geoffrey.testelin@gmail.com',
      username  : 'C0ZEN',
      superAdmin: true,
      private   : {
        profile: true
      },
      type      : 'user',
      date      : {
        register  : 1484561615,
        lastUpdate: 1484561615
      },
      picture   : {
        "$ngfName"    : "3.jpg",
        "$ngfOrigSize": 146126,
        "upload"      : {},
        "result"      : {
          "public_id"        : "ygfsbbfylq91lq753jyo",
          "version"          : 1485115972,
          "signature"        : "439e54b4a9837f4a9f74a9ae219a625762cdcadd",
          "width"            : 600,
          "height"           : 600,
          "format"           : "jpg",
          "resource_type"    : "image",
          "created_at"       : "2017-01-22T20:12:52Z",
          "tags"             : [
            "cozen"
          ],
          "bytes"            : 71142,
          "type"             : "upload",
          "etag"             : "441a0154c495381deb37b1a57f487a33",
          "url"              : "http://res.cloudinary.com/cozen/image/upload/v1485115972/ygfsbbfylq91lq753jyo.jpg",
          "secure_url"       : "https://res.cloudinary.com/cozen/image/upload/v1485115972/ygfsbbfylq91lq753jyo.jpg",
          "context"          : {
            "custom": {
              "photo": "3.jpg"
            }
          },
          "original_filename": "3"
        }
      }
    };
    vm.userCopy                  = angular.copy(vm.user);
    vm.userCopy.passwordMismatch = false;

    // Settings
    vm.settings = {
      ports       : {
        first : 28,
        second: 32
      },
      downloadPath: 'c:/users/C0ZEN/documents',
      micro       : {
        volume: 65
      },
      speaker     : {
        volume: 72
      }
    };

    // Notifications
    vm.notifications = {
      groups       : {
        creation    : true,
        edit        : true,
        newMember   : true,
        kickedMember: false,
        bannedMember: false
      },
      channels     : {
        creation        : true,
        edit            : true,
        newMember       : true,
        kickedMember    : false,
        bannedMember    : false,
        newMessage      : true,
        newMessageTagged: true
      },
      directMessage: {
        newMessage: true
      },
      other        : {
        newFriend: true
      }
    };

    // Logs
    vm.logs = [
      {
        date  : 1484561615,
        type  : "newGroupCreated",
        event : 'group',
        values: {
          name: "Un groupe de test"
        }
      },
      {
        date  : 1484561616,
        type  : "newGroupJoined",
        event : 'group',
        values: {
          name: "Un groupe de test"
        }
      },
      {
        date  : 1484561816,
        type  : "newGroupJoined",
        event : 'group',
        values: {
          name: "Supinfo"
        }
      },
      {
        date  : 1484561916,
        type  : "newChannelCreated",
        event : 'channel',
        values: {
          name: "Bar"
        }
      },
      {
        date  : 1484561917,
        type  : "newChannelJoined",
        event : 'channel',
        values: {
          name: "Bar"
        }
      },
      {
        date  : 1484561997,
        type  : "channelEdited",
        event : 'channel',
        values: {
          name: "Bar"
        }
      },
      {
        date  : 1484562017,
        type  : "channelLeft",
        event : 'channel',
        values: {
          name: "Bar"
        }
      },
      {
        date  : 1484562117,
        type  : "groupLeft",
        event : 'group',
        values: {
          name: "Supinfo"
        }
      },
      {
        date  : 1484563117,
        type  : "groupEdited",
        event : 'group',
        values: {
          name: "Un groupe de test"
        }
      },
      {
        date  : 1484564117,
        type  : "groupInvitationSentOne",
        event : 'group',
        values: {
          name: "Un groupe de test",
          user: "170862@supinfo.com"
        }
      },
      {
        date  : 1484564117,
        type  : "groupInvitationSentMany",
        event : 'group',
        values: {
          name    : "Un groupe de test",
          quantity: 8
        }
      },
      {
        date  : 1484564117,
        type  : "channelInvitationSentOne",
        event : 'channel',
        values: {
          name: "Lol",
          user: "170862@supinfo.com"
        }
      },
      {
        date  : 1484564117,
        type  : "channelInvitationSentMany",
        event : 'channel',
        values: {
          name    : "Lol",
          quantity: 4
        }
      },
      {
        date  : 1484564118,
        type  : "socialInvitationSent",
        event : 'social',
        values: {
          userId  : 1,
          userName: "@Marco"
        }
      },
      {
        date  : 1484564120,
        type  : "socialUserBlocked",
        event : 'social',
        values: {
          userId  : 1,
          userName: "@Marco"
        }
      },
      {
        date  : 1484564121,
        type  : "socialUserRemoved",
        event : 'social',
        values: {
          userId  : 1,
          userName: "@Marco"
        }
      },
      {
        date  : 1484564122,
        type  : "socialUserUnblocked",
        event : 'social',
        values: {
          userId  : 1,
          userName: "@Marco"
        }
      },
      {
        date  : 1484564123,
        type  : "socialInvitationAccepted",
        event : 'social',
        values: {
          userId  : 1,
          userName: "@Marco"
        }
      },
      {
        date  : 1484564124,
        type  : "socialUserRenamed",
        event : 'social',
        values: {
          userId   : 1,
          userName : "@Marco",
          userAlias: "PGM"
        }
      },
      {
        date  : 1484564125,
        type  : "socialUserAliasRemoved",
        event : 'social',
        values: {
          userId  : 1,
          userName: "@Marco"
        }
      },
      {
        date  : 1484564126,
        type  : "groupPermissionsGranted",
        event : 'group',
        values: {
          userId  : 1,
          userName: "@Marco",
          name    : "Les junkies"
        }
      },
      {
        date  : 1484564126,
        type  : "groupPermissionsRevoked",
        event : 'group',
        values: {
          userId  : 1,
          userName: "@Marco",
          name    : "Les junkies"
        }
      },
      {
        date  : 1484564126,
        type  : "groupUserKicked",
        event : 'group',
        values: {
          userId  : 1,
          userName: "@Marco",
          name    : "Les junkies"
        }
      },
      {
        date  : 1484564126,
        type  : "groupUserBanned",
        event : 'group',
        values: {
          userId  : 1,
          userName: "@Marco",
          name    : "Les junkies"
        }
      },
      {
        date  : 1484564126,
        type  : "groupUserUnbanned",
        event : 'group',
        values: {
          userId  : 1,
          userName: "@Marco",
          name    : "Les junkies"
        }
      },
      {
        date  : 1484564127,
        type  : "channelPermissionsGranted",
        event : 'channel',
        values: {
          userId  : 1,
          userName: "@Marco",
          name    : "Les junkies"
        }
      },
      {
        date  : 1484564127,
        type  : "channelPermissionsRevoked",
        event : 'channel',
        values: {
          userId  : 1,
          userName: "@Marco",
          name    : "Les junkies"
        }
      },
      {
        date  : 1484564127,
        type  : "channelUserKicked",
        event : 'channel',
        values: {
          userId  : 1,
          userName: "@Marco",
          name    : "Les junkies"
        }
      },
      {
        date  : 1484564127,
        type  : "channelUserBanned",
        event : 'channel',
        values: {
          userId  : 1,
          userName: "@Marco",
          name    : "Les junkies"
        }
      },
      {
        date  : 1484564127,
        type  : "channelUserUnbanned",
        event : 'channel',
        values: {
          userId  : 1,
          userName: "@Marco",
          name    : "Les junkies"
        }
      }
    ];
    vm.log  = {
      limit  : 9,
      all    : false,
      orderBy: true,
      events : [
        {
          id      : 'group',
          name    : 'account_event_group',
          icon    : 'fa icons8-google-groups',
          color   : 'blue',
          selected: true
        },
        {
          id      : 'channel',
          name    : 'account_event_channel',
          icon    : 'fa icons8-channel-mosaic',
          color   : 'green',
          selected: true
        },
        {
          id      : 'social',
          name    : 'account_event_social',
          icon    : 'fa icons8-user-groups',
          color   : 'purple',
          selected: true
        }
      ]
    };

    // Logs with js $filter stuff (if in html, then search field is not filtering deeper)
    vm.logs.forEach(function (log) {
      log.text          = $filter('translate')('account_log_' + log.type, log.values);
      log.formattedDate = $filter('date')(log.date * 1000, 'EEEE dd MMMM yyyy à HH:mm');
    });

    // Methods
    vm.methods = {
      updatePills           : updatePills,
      save                  : save,
      onPasswordChange      : onPasswordChange,
      onCheckPasswordChange : onCheckPasswordChange,
      onNewVolumeSetFromTest: onNewVolumeSetFromTest,
      getAllLogs            : getAllLogs,
      getLogSrc             : getLogSrc
    };

    // To add selected design to the proper pill
    vm.methods.updatePills();
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams, options) {
      vm.methods.updatePills();
    });

    $rootScope.$on('newVolumeSetFromTest', vm.methods.onNewVolumeSetFromTest);

    function updatePills() {
      vm.nav = {
        profile      : goTo.isOneOfThoseViews('app.account.profile', 'app.account.profileEdit', 'app.account.profileEditPassword'),
        notifications: goTo.isOneOfThoseViews('app.account.notifications', 'app.account.notificationsEdit'),
        settings     : goTo.isOneOfThoseViews('app.account.settings', 'app.account.settingsEdit'),
        log          : goTo.isOneOfThoseViews('app.account.log')
      };
    }

    function save(form) {
      vm.loading = true;
      switch (form) {
        case 'settings':
          vm.loading = false;
          goTo.view('app.account.settings');
          break;
        case 'profile':
          vm.loading = false;
          goTo.view('app.account.profile');
          break;
        case 'profile-password':
          vm.loading = false;
          goTo.view('app.account.profile');
          break;
        case 'notifications':
          vm.loading = false;
          goTo.view('app.account.notifications');
          break;
      }
    }

    function onPasswordChange(newModel) {
      vm.userCopy.passwordMismatch = newModel != vm.userCopy.checkPassword;
    }

    function onCheckPasswordChange(newModel) {
      vm.userCopy.passwordMismatch = vm.userCopy.newPassword != newModel;
    }

    function onNewVolumeSetFromTest(event, eventData) {
      vm.settings.speaker.volume = eventData.newVolume;
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

