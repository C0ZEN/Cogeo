(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('accessLog', accessLog);

    accessLog.$inject = [
        'CONFIG',
        'httpRequest',
        '$q',
        'deviceDetector',
        '$filter'
    ];

    function accessLog(CONFIG, httpRequest, $q, deviceDetector, $filter) {
        return {
            getAccessLog: getAccessLog
        };

        // Return a deferred with fresh access log object
        // Always a resolve deferred (may content less or more data)
        // Note: ipinfo return this: {country, hostname, ip, loc, org, postal, region}
        function getAccessLog() {
            var accessLog = {
                appLanguage   : CONFIG.currentLanguage,
                browserName   : $filter('capitalize')(deviceDetector.browser, true, true),
                browserVersion: $filter('capitalize')(deviceDetector.browser_version, true, true),
                osName        : $filter('capitalize')(deviceDetector.os, true, true),
                osVersion     : $filter('capitalize')(deviceDetector.os_version, true, true)
            };
            var deferred  = $q.defer();
            httpRequest.customRequest('GET', 'http://ipinfo.io')
                .then(function (response) {
                    accessLog = angular.merge({}, response.data, accessLog);
                    sendLog(accessLog);
                    deferred.resolve(accessLog);
                })
                .catch(function (response) {
                    accessLog = angular.merge({}, {
                        ip      : null,
                        hostname: null,
                        city    : null,
                        region  : null,
                        country : null,
                        loc     : null,
                        org     : null,
                        postal  : null
                    }, accessLog);
                    sendLog(accessLog);
                    deferred.resolve(accessLog);
                })
            ;
            return deferred.promise;

            // Just a log
            function sendLog(accessLog) {
                if (CONFIG.debug) {
                    Methods.infoObjectLog('accessLog', 'getAccessLog digging result', accessLog);
                }
            }
        }
    }

})(window.angular);