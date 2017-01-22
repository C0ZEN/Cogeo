(function (angular) {
  'use strict';

  angular
    .module('climbTasticApp')
    .filter('startFrom', startFrom);

  function startFrom() {
    return startFromFilter;

    /**
     * Used to add a filter when you have a pagination
     * @returns {Function}
     */
    function startFromFilter(input, start) {
      if (input == null) return null;
      else {
        start = +start;
        return input.slice(start);
      }
    }
  }

})(window.angular);



