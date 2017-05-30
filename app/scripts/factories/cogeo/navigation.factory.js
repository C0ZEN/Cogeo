(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .factory('navigationFactory', navigationFactory);

    navigationFactory.$inject = [
        'userFactory',
        'goTo',
        '$timeout'
    ];

    function navigationFactory(userFactory, goTo, $timeout) {

        // Public functions
        return {
            isAllowed: isAllowed
        };

        // Check if the user is allow to see the page (connected)
        // If not, redirect to appropriate view
        function isAllowed() {
            var isConnected = userFactory.isConnected();
            if (!isConnected) {
                $timeout(function () {
                    goTo.view('app.error.disconnected');
                });
            }
        }
    }

})(window.angular);