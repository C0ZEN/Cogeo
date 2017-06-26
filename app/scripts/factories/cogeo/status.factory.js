(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .factory('statusFactory', statusFactory);

    statusFactory.$inject = [
        'cogeoStatus',
        '$rootScope'
    ];

    function statusFactory(cogeoStatus, $rootScope) {
        var currentUserStatus;

        return {
            subscribe               : subscribe,
            getCurrentUserStatus    : getCurrentUserStatus,
            setCurrentUserStatus    : setCurrentUserStatus,
            setCurrentUserStatusById: setCurrentUserStatusById,
            getAllStatus            : getAllStatus
        };

        // Subscribe to the notify on this factory for the status
        function subscribe(scope, callback) {
            var handler = $rootScope.$on('statusFactoryChanged', callback);
            scope.$on('$destroy', handler);
        }

        // Notify the send message when subscribe is on
        function _notify() {
            $rootScope.$emit('statusFactoryChanged');
        }

        function getCurrentUserStatus() {
            return currentUserStatus;
        }

        function setCurrentUserStatus(statusIndex) {
            currentUserStatus = cogeoStatus.status[statusIndex];
            _notify();
        }

        function setCurrentUserStatusById(statusId) {
            cogeoStatus.status.forEach(function (status) {
                if (status.id == statusId) {
                    currentUserStatus = status;
                    _notify();
                }
            });
        }

        function getAllStatus() {
            return cogeoStatus.status;
        }
    }

})(window.angular);