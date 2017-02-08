(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('httpRequest', httpRequest);

    httpRequest.$inject = [
        '$http',
        'CONFIG',
        '$q',
        'goTo'
    ];

    function httpRequest($http, CONFIG, $q, goTo) {

        return {
            requestGet : requestGet,
            requestPost: requestPost,
            requestPut : requestPut,
            customError: customError
        };

        function requestGet(url, callbackSuccess, callbackError) {
            var deferred = $q.defer();
            if (CONFIG.debug) Methods.httpRequestLog({
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
                    console.log('success');
                    if (Methods.isFunction(callbackSuccess)) callbackSuccess();
                })
                .catch(function (response) {
                    deferred.reject(response, 200);
                    console.log('error');
                    if (Methods.isFunction(callbackError)) callbackError();
                    customError(response.error);
                })
            ;
            return deferred.promise;
        }

        function requestPost(url, params, callbackSuccess, callbackError) {
            var deferred = $q.defer();
            if (CONFIG.debug) Methods.httpRequestLog({
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
                if (Methods.isFunction(callbackSuccess)) callbackSuccess();
            }).catch(function (response) {
                deferred.reject(response, 200);
                if (Methods.isFunction(callbackError)) callbackError();
                customError(response.error);
            });
            return deferred.promise;
        }

        function requestPut(url, params, callbackSuccess, callbackError) {
            var deferred = $q.defer();
            if (CONFIG.debug) Methods.httpRequestLog({
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
                if (Methods.isFunction(callbackSuccess)) callbackSuccess();
            }).catch(function (response) {
                deferred.reject(response, 200);
                if (Methods.isFunction(callbackError)) callbackError();
                customError(response.error);
            });
            return deferred.promise;
        }

        function customError(error) {
            switch (error) {
                case '1':
                case '100':
                case '101':
                case '102':
                // goTo.view('app.error', {response: response});
            }
        }
    }

}(window.angular));
