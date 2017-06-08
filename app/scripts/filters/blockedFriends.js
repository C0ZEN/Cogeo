(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .filter('blockedFriends', blockedFriends);

    function blockedFriends() {
        return blockedFriendsFilter;

        function blockedFriendsFilter(items, display) {
            var newItems = [];
            items.forEach(function (item) {
                if (item.blocked > 0 && !display) {
                    // Nothing
                }
                else {
                    newItems.push(item);
                }
            });
            return newItems;
        }
    }

})(window.angular);



