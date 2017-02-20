(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('httpRequest', httpRequest);

    httpRequest.$inject = [
        '$http',
        'CONFIG',
        '$q',
        'goTo',
        '$animate',
        '$timeout',
        'cozenFloatingFeedFactory',
        '$filter'
    ];

    function httpRequest($http, CONFIG, $q, goTo, $animate, $timeout, cozenFloatingFeedFactory, $filter) {

        return {
            requestGet  : requestGet,
            requestPost : requestPost,
            requestPut  : requestPut,
            shakeElement: shakeElement,
            displayError: displayError
        };

        function requestGet(url, callbackSuccess, callbackError) {
            var deferred = $q.defer();
            if (CONFIG.debug) {
                Methods.httpRequestLog({
                    methods: 'GET',
                    url    : CONFIG.internal.API + url,
                    data   : {
                        session: null,
                        data   : null
                    }
                });
            }
            $http.get(CONFIG.internal.API + url)
                .then(function (response) {
                    deferred.resolve(response);
                    if (Methods.isFunction(callbackSuccess)) {
                        callbackSuccess();
                    }
                })
                .catch(function (response) {
                    deferred.reject(response, 200);
                    if (Methods.isFunction(callbackError)) {
                        callbackError();
                    }
                    displayError(response);
                })
            ;
            return deferred.promise;
        }

        function requestPost(url, params, callbackSuccess, callbackError) {
            var deferred = $q.defer();
            if (CONFIG.debug) {
                Methods.httpRequestLog({
                    methods: 'POST',
                    url    : CONFIG.internal.API + url,
                    data   : {
                        session: {},
                        data   : params
                    }
                });
            }
            $http.post(CONFIG.internal.API + url, {
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

        function requestPut(url, params, callbackSuccess, callbackError) {
            var deferred = $q.defer();
            if (CONFIG.debug) {
                Methods.httpRequestLog({
                    methods: 'PUT',
                    url    : CONFIG.internal.API + url,
                    data   : {
                        session: {},
                        data   : params
                    }
                });
            }
            $http.put(CONFIG.internal.API + url, {
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

        function shakeElement(element) {
            $timeout(function () {
                $animate.addClass(element, 'animated shake').then(function () {
                    $animate.removeClass(element, 'animated shake');
                });
            }, 1);
        }

        function displayError(response) {
            var type = '';
            switch (response.data.data) {
                case 200:
                    type = 'error';
                    break;
                default:
                    type = 'error';
            }
            cozenFloatingFeedFactory.addAlert({
                label: $filter('translate')('errors_' + response.data.data, {
                    date: $filter('date')(response.data.date, 'HH:mm')
                }),
                type : type
            });
        }
    }

}(window.angular));
