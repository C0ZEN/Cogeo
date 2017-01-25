(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .filter('groupsInvitationsTypes', groupsInvitationsTypes);

  function groupsInvitationsTypes() {
    return groupsInvitationsTypesFilter;

    function groupsInvitationsTypesFilter(items, events) {
      var newItems = [];
      items.forEach(function (item) {
        events.forEach(function (event) {
          if (item.status.response == event.id) {
            if (event.selected) newItems.push(item);
          }
        });
      });
      return newItems;
    }
  }

})(window.angular);



