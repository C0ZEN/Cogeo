(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .filter('logsEvents', logsEvents);

  function logsEvents() {
    return logsEventsFilter;

    function logsEventsFilter(items, events) {
      if (!Methods.isNullOrEmpty(items)) {
        var newItems = [];
        items.forEach(function (item) {
          events.forEach(function (event) {
            if (item.event == event.id) {
              if (event.selected) newItems.push(item);
            }
          });
        });
        return newItems;
      } else return items;
    }
  }

})(window.angular);



