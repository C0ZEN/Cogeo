(function (angular) {
	'use strict';

	angular
		.module('4pjtApp')
		.filter('groupsMembersStatus', groupsMembersStatus);

	function groupsMembersStatus() {
		return groupsMembersStatusFilter;

		function groupsMembersStatusFilter(items, status) {
			var newItems = [], toPush;
			if (items != null) {
				items.forEach(function (item) {
					toPush = true;

					// Kicked cases
					if (!status[0].selected) {
						if (item.kicked != null) {
							if (item.kicked.active) {
								toPush = false;
							}
						}
					}

					// Banned cases
					if (!status[1].selected && toPush) {
						if (item.banned != null) {
							if (item.banned.active) {
								toPush = false;
							}
						}
					}

					// Admin cases
					if (!status[2].selected && toPush) {
						if (item.admin) {
							toPush = false;
						}
					}

					if (toPush) {
						newItems.push(item);
					}
				});
			}
			return newItems;
		}
	}

})(window.angular);



