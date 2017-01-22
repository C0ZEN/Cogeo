(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .directive('logoLayer', logoLayer);

  logoLayer.$inject = [
    'VG_STATES'
  ];

  function logoLayer(VG_STATES) {
    return {
      bindToController: true,
      controller      : ControllerName,
      controllerAs    : 'vm',
      link            : link,
      restrict        : 'E',
      scope           : {},
      require: "^videogular"
    };

    function link(scope, element, attrs) {

    }
  }

  ControllerName.$inject = ['dependency'];

  /* @ngInject */
  function ControllerName(dependency) {

  }

})(window.angular);

