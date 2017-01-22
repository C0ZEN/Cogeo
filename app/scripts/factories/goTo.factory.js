(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .factory('goTo', goTo);

  goTo.$inject = [
    '$state',
    'CONFIG',
    '$stateParams'
  ];

  function goTo($state, CONFIG, $stateParams) {

    // Public functions
    return {
      view             : view,
      isCurrentView    : isCurrentView,
      hasThisParent    : hasThisParent,
      getCurrentParam  : getCurrentParam,
      isOneOfThoseViews: isOneOfThoseViews
    };

    function view(view, param) {
      if (CONFIG.debug) Methods.directiveCallbackLog('goTo', 'view');

      // Add the :lang as param (for app param)
      param = angular.merge({}, param, {
        lang: CONFIG.currentLanguage
      });
      $state.go(view, param);
    }

    function isCurrentView(view) {
      return $state.is(view);
    }

    function hasThisParent(parent) {
      return Methods.isInList($state.current.name, parent);
    }

    function isOneOfThoseViews(views) {
      var i, length;
      if (typeof views == 'object') {
        for (i = 0, length = views.length; i < length; i++) {
          if (isCurrentView(views[i])) return true;
        }
      } else {
        for (i = 0, length = arguments.length; i < length; i++) {
          if (isCurrentView(arguments[i])) return true;
        }
      }
      return false;
    }

    function getCurrentParam(param, formatted) {
      if (CONFIG.debug) Methods.directiveCallbackLog('goTo', 'getCurrentParam');
      if (formatted) {
        var data    = {};
        data[param] = $stateParams[param];
        return data;
      } else return $stateParams[param];
    }
  }

})(window.angular);

