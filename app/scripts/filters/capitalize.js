(function (angular) {
  'use strict';

  angular
    .module('climbTasticApp')
    .filter('capitalize', capitalize);

  function capitalize() {
    return capitalizeFilter;

    /**
     * To reformat the text (filter)
     * @returns {Function}
     */
    function capitalizeFilter(input, all) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
  }

})(window.angular);



