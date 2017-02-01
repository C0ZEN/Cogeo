/**
 * @ngdoc directive
 * @name user-action
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean} kicked         = true > Display the kicked action
 * @param {boolean} banned         = true > Display the banned action
 * @param {boolean} unbanned       = true > Display the unbanned action
 * @param {boolean} revoked        = true > Display the revoked action
 * @param {boolean} granted        = true > Display the granted action
 * @param {boolean} isLabelVisible = true > Display the label
 *
 */
(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .directive('userAction', userAction);

  userAction.$inject = [];

  function userAction() {
    return {
      link       : link,
      restrict   : 'E',
      scope      : {
        kicked        : '=?',
        banned        : '=?',
        unbanned      : '=?',
        revoked       : '=?',
        granted       : '=?',
        isLabelVisible: '=?'
      },
      replace    : false,
      transclude : false,
      templateUrl: 'scripts/directives/userAction/userAction.template.html'
    };

    function link(scope, element, attrs) {
      var methods = {
        init          : init,
        getMainClass  : getMainClass,
        hasError      : hasError,
        destroy       : destroy,
        onLabelClicked: onLabelClicked,
        showActions   : showActions,
        hideActions   : hideActions,
        toggleActions : toggleActions
      };

      var data = {
        directive: 'userAction'
      };

      methods.init();

      function init() {

        // Public functions
        scope._methods = {
          getMainClass  : getMainClass,
          onLabelClicked: onLabelClicked
        };

        // Checking required stuff
        if (methods.hasError()) return;

        // Default values (scope)
        if (angular.isUndefined(attrs.kicked)) scope.kicked = true;
        if (angular.isUndefined(attrs.banned)) scope.banned = true;
        if (angular.isUndefined(attrs.unbanned)) scope.unbanned = true;
        if (angular.isUndefined(attrs.revoked)) scope.revoked = true;
        if (angular.isUndefined(attrs.granted)) scope.granted = true;
        if (angular.isUndefined(attrs.isLabelVisible)) scope.isLabelVisible = true;

        // Default values (attributes)
        scope.isActionsVisible = true;

        // Watcher
        scope.$watch('isLabelVisible', function (newValue) {
          if (!newValue) methods.hideActions();
        });
      }

      function getMainClass() {
        var classList = [];
        return classList;
      }

      function hasError() {
        return false;
      }

      function destroy() {
        element.off('$destroy', methods.destroy);
      }

      function onLabelClicked($event) {
        $event.stopPropagation();
        methods.toggleActions();
      }

      function showActions() {
        scope.isActionsVisible = true;
      }

      function hideActions() {
        scope.isActionsVisible = false;
      }

      function toggleActions() {
        scope.isActionsVisible = !scope.isActionsVisible;
      }
    }
  }

})(window.angular);

