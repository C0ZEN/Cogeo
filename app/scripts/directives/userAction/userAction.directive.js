/**
 * @ngdoc directive
 * @name user-action
 * @restrict E
 * @replace false
 * @transclude false
 * @description
 *
 * [Scope params]
 * @param {boolean} userActionKicked    = true > Display the kicked action
 * @param {boolean} userActionBanned    = true > Display the banned action
 * @param {boolean} userActionUnbanned  = true > Display the unbanned action
 * @param {boolean} userActionRevoked   = true > Display the revoked action
 * @param {boolean} userActionGranted   = true > Display the granted action
 * @param {boolean} userActionIsVisible = true > Show/hide the actions
 * @param {object}  userActionGrantedData      > Data required by the popup
 * @param {object}  userActionRevokedData      > Data required by the popup
 * @param {object}  userActionKickedData       > Data required by the popup
 * @param {object}  userActionBannedData       > Data required by the popup
 * @param {object}  userActionUnbannedData     > Data required by the popup
 *
 */
(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .directive('userAction', userAction);

  userAction.$inject = [
    '$rootScope'
  ];

  function userAction($rootScope) {
    return {
      link       : link,
      restrict   : 'E',
      scope      : {
        userActionKicked      : '=?',
        userActionBanned      : '=?',
        userActionUnbanned    : '=?',
        userActionRevoked     : '=?',
        userActionGranted     : '=?',
        userActionIsVisible   : '=?',
        userActionGrantedData : '=?',
        userActionRevokedData : '=?',
        userActionKickedData  : '=?',
        userActionBannedData  : '=?',
        userActionUnbannedData: '=?'
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
        toggleActions : toggleActions,
        onClick       : onClick
      };

      var data = {
        directive: 'userAction'
      };

      methods.init();

      function init() {

        // Public functions
        scope._methods = {
          getMainClass  : getMainClass,
          onLabelClicked: onLabelClicked,
          onClick       : onClick
        };

        // Checking required stuff
        if (methods.hasError()) return;

        // Default values (scope)
        if (angular.isUndefined(attrs.userActionKicked)) scope.userActionKicked = true;
        if (angular.isUndefined(attrs.userActionBanned)) scope.userActionBanned = true;
        if (angular.isUndefined(attrs.userActionUnbanned)) scope.userActionUnbanned = true;
        if (angular.isUndefined(attrs.userActionRevoked)) scope.userActionRevoked = true;
        if (angular.isUndefined(attrs.userActionGranted)) scope.userActionGranted = true;

        // Default values (attributes)
        scope.userActionIsVisible = true;

        // Watcher
        scope.$watch('userActionIsVisible', function (newValue) {
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
        scope.userActionIsVisible = true;
      }

      function hideActions() {
        scope.userActionIsVisible = false;
      }

      function toggleActions() {
        scope.userActionIsVisible = !scope.userActionIsVisible;
      }

      function onClick($event, type) {
        switch (type) {
          case 'granted':
            $rootScope.methods.showPopup($event, 'userActionGranted', scope.userActionGrantedData);
            break;
          case 'revoked':
            $rootScope.methods.showPopup($event, 'userActionRevoked', scope.userActionRevokedData);
            break;
          case 'kicked':
            $rootScope.methods.showPopup($event, 'userActionKicked', scope.userActionKickedData);
            break;
          case 'banned':
            $rootScope.methods.showPopup($event, 'userActionBanned', scope.userActionBannedData);
            break;
          case 'unbanned':
            $rootScope.methods.showPopup($event, 'userActionUnbanned', scope.userActionUnbannedData);
            break;
        }
      }
    }
  }

})(window.angular);

