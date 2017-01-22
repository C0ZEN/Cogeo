(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .controller('PopupCtrl', PopupCtrl);

  PopupCtrl.$inject = [
    'cozenPopupFactory',
    'CONFIG',
    '$scope',
    '$rootScope'
  ];

  function PopupCtrl(cozenPopupFactory, CONFIG, $scope, $rootScope) {
    var popup = this;

    // Common data
    popup.CONFIG = CONFIG;

    // forgottenPassword
    popup.forgottenPassword = {};

    // testMicrophone
    popup.testMicrophone = {};

    // testSpeaker
    popup.testSpeaker = {
      video: angular.merge({}, CONFIG.internal.video, {
        sources: [
          {src: "images/video/nyan-cat/nyan-cat.mp4", type: "video/mp4"},
          {src: "images/video/nyan-cat/nyan-cat.webm", type: "video/webm"},
          {src: "images/video/nyan-cat/nyan-cat.ogg", type: "video/ogg"}
        ],
        plugins: {
          poster: "images/video/nyan-cat/nyan-cat.png"
        }
      })
    };

    // logsFilter
    popup.logsFilter = {};

    // Methods
    popup.methods = {
      closePopup       : closePopup,
      logout           : logout,
      forgottenPassword: forgottenPassword,
      onPlayerReady    : onPlayerReady
    };

    function closePopup(name) {
      cozenPopupFactory.hide({
        name: name
      });
    }

    function logout() {

    }

    function forgottenPassword() {

    }

    function onPlayerReady(API) {
      popup.testSpeaker.video.API = API;

      // Watch for the volume change and broadcast to inform others of the change
      $scope.$watch('popup.testSpeaker.video.API.volume', function (newVolume) {
        $rootScope.$broadcast('newVolumeSetFromTest', {
          newVolume: newVolume * 100
        })
      });
    }
  }

})(window.angular);

