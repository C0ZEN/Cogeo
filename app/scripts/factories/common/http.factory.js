(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('httpRequest', httpRequest);

    httpRequest.$inject = [
        '$http',
        'CONFIG',
        '$q',
        'cozenEnhancedLogs',
        '$animate',
        '$timeout',
        'cozenFloatingFeedFactory',
        '$filter'
    ];

    function httpRequest($http, CONFIG, $q, cozenEnhancedLogs, $animate, $timeout, cozenFloatingFeedFactory, $filter) {

        return {
            requestGet   : requestGet,
            requestPost  : requestPost,
            requestPut   : requestPut,
            shakeElement : shakeElement,
            displayError : displayError,
            customRequest: customRequest
        };

        function requestGet(url, callbackSuccess, callbackError) {
            var deferred = $q.defer();
            cozenEnhancedLogs.info.httpRequest({
                methods: 'GET',
                url    : CONFIG.internal.API + url,
                data   : {
                    session: null,
                    data   : null
                }
            });
            $http.get(CONFIG.internal.API + url)
                .then(function (response) {
                    deferred.resolve(response);
                    if (Methods.isFunction(callbackSuccess)) {
                        callbackSuccess(response);
                    }
                })
                .catch(function (response) {
                    deferred.reject(response, 200);
                    if (Methods.isFunction(callbackError)) {
                        callbackError(response);
                    }
                    displayError(response);
                })
            ;
            return deferred.promise;
        }

        function requestPost(url, params, callbackSuccess, callbackError) {
            var deferred = $q.defer();
            cozenEnhancedLogs.info.httpRequest({
                methods: 'POST',
                url    : CONFIG.internal.API + url,
                data   : {
                    session: {},
                    data   : params
                }
            });
            $http.post(CONFIG.internal.API + url, {
                data   : params,
                session: {}
            }).then(function (response) {
                deferred.resolve(response);
                if (Methods.isFunction(callbackSuccess)) {
                    callbackSuccess(response);
                }
            }).catch(function (response) {
                deferred.reject(response, 200);
                if (Methods.isFunction(callbackError)) {
                    callbackError(response);
                }
                displayError(response);
            });
            return deferred.promise;
        }

        function requestPut(url, params, callbackSuccess, callbackError) {
            var deferred = $q.defer();
            cozenEnhancedLogs.info.httpRequest({
                methods: 'PUT',
                url    : CONFIG.internal.API + url,
                data   : {
                    session: {},
                    data   : params
                }
            });
            $http.put(CONFIG.internal.API + url, {
                data   : params,
                session: {}
            }).then(function (response) {
                deferred.resolve(response);
                if (Methods.isFunction(callbackSuccess)) {
                    callbackSuccess(response);
                }
            }).catch(function (response) {
                deferred.reject(response, 200);
                if (Methods.isFunction(callbackError)) {
                    callbackError(response);
                }
                displayError(response);
            });
            return deferred.promise;
        }

        // Shake the button on error
        function shakeElement(element) {
            $timeout(function () {
                $animate.addClass(element, 'animated shake').then(function () {
                    $animate.removeClass(element, 'animated shake');
                });
            }, 1);
        }

        function displayError(response) {
            var type = '', username = '', email = '', groupName = '';

            // Look at the error and set the type and custom data
            switch (response.data.error) {
                case 1:
                case 2:
                case 105:
                case 300:
                case 301:
                case 302:
                    type = 'error';
                    break;
                case 3:
                case 103:
                    type     = 'error';
                    username = response.data.data.username;
                    break;
                case 104:
                    type  = 'error';
                    email = response.data.data.email;
                    break;
                case 200:
                default:
                    type = 'error';
            }

            // Send an alert
            cozenFloatingFeedFactory.addAlert({
                label: $filter('translate')('errors_' + response.data.error, {
                    date     : $filter('date')(response.data.date, 'HH:mm'),
                    username : username,
                    email    : email,
                    groupName: groupName
                }),
                type : type
            });
        }

        function customRequest(method, url, params, callbackSuccess, callbackError) {
            var deferred = $q.defer();
            cozenEnhancedLogs.info.httpRequest({
                methods: method,
                url    : url,
                data   : {
                    session: {},
                    data   : params
                }
            });
            $http({
                methods: method,
                url    : url,
                data   : params,
                session: {}
            }).then(function (response) {
                deferred.resolve(response);
                if (Methods.isFunction(callbackSuccess)) {
                    callbackSuccess();
                }
            }).catch(function (response) {
                deferred.reject(response, 200);
                if (Methods.isFunction(callbackError)) {
                    callbackError();
                }
                displayError(response);
            });
            return deferred.promise;
        }
    }

}(window.angular));
