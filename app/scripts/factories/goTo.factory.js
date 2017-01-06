(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .factory('goTo', goTo);

  goTo.$inject = [
    '$state',
    'CONFIG'
  ];

  function goTo($state, CONFIG) {
    return {
      view: view
    };

    function view(view, param) {

      // Log
      if (CONFIG.debug) Methods.directiveCallbackLog('goTo', 'view');

      // Add the :lang as param (for app param)
      param = angular.merge({}, param, {
        lang: CONFIG.currentLanguage
      });

      // Change the state
      $state.go(view, param);
    }
  }

})(window.angular);

