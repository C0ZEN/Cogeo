(function (angular) {
	'use strict';

	angular
		.module('4pjtApp')
		.filter('myGroups', myGroups);

	myGroups.$inject = [
		'groupsFactory'
	];

	function myGroups(groupsFactory) {
		return myGroupsFilter;

		function myGroupsFilter(groups, userName, isActivated, onlyAdminGroups) {

			// Only if we want to search for user's groups
			if (isActivated) {
				var newGroups = [], user;
				groups.forEach(function (group) {
					user = groupsFactory.getUserFromGroup(userName, group.name);

					// Users' groups found here
					if (user != null) {

						// Admin group
						if (onlyAdminGroups) {
							if (user.admin) {
								newGroups.push(group);
							}
						}
						else {
							newGroups.push(group);
						}
					}
				});
				return newGroups;
			}
			else {
				return groups;
			}
		}
	}

})(window.angular);



