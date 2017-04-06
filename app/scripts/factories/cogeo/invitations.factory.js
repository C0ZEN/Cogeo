(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('invitationsFactory', invitationsFactory);

    invitationsFactory.$inject = [
        'CONFIG',
        'httpRequest',
        '$q',
        'deviceDetector',
        '$filter',
        'cozenEnhancedLogs'
    ];

    function invitationsFactory(CONFIG, httpRequest, $q, deviceDetector, $filter, cozenEnhancedLogs) {
        return {
            getMyInvitations: getMyInvitations
        };

        function getMyInvitations() {
            return [];
        }
    }

})(window.angular);