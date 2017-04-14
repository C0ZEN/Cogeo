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
        '$filter',
        'cozenEnhancedLogs'
    ];

    function accessLog(CONFIG, httpRequest, $q, deviceDetector, $filter, cozenEnhancedLogs) {
        return {
            getAccessLog: getAccessLog
        };

        // Return a deferred with fresh access log object
        // Always a resolve deferred (may content less or more data)
        // Note: ipinfo return this: {country, hostname, ip, loc, org, postal, region}
        function getAccessLog() {
            var accessLog = {
                appLanguage   : CONFIG.currentLanguage,
                appVersion    : CONFIG.internal.appVersion,
                browserName   : $filter('cozenCapitalize')(deviceDetector.browser, true, true),
                browserVersion: $filter('cozenCapitalize')(deviceDetector.browser_version, true, true),
                osName        : $filter('cozenCapitalize')(deviceDetector.os, true, true),
                osVersion     : $filter('cozenCapitalize')(deviceDetector.os_version, true, true)
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
                cozenEnhancedLogs.info.explodeObject('accessLog', 'getAccessLog digging result', accessLog);
            }
        }
    }

})(window.angular);