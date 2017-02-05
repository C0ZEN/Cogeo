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
      request: request
    };

    function request(method, url, params, callback) {
      var deferred = $q.defer();
      var request  = {
        methods: method,
        url    : CONFIG.internal.API + url,
        data   : {
          data   : params,
          session: {}
        },
        headers: {}
      };
      if (CONFIG.debug) Methods.httpRequestLog(request);
      $http(request)
        .then(function (response) {
          if (Methods.isFunction(callback)) callback();
          return response;
        })
        .catch(function (response) {
          goTo.view('app.error', {response: response});
        });
      return deferred.promise;
    }
  }

}(window.angular));
