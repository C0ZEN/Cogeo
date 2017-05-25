(function (angular) {
    'use strict';

    /**
     * @ngdoc overview
     * @name cogeoApp
     * @description
     * # cogeoApp
     *
     * Main module of the application.
     */
    angular
        .module('cogeoApp', [
            'ngAnimate',
            'ngAria',
            'ngCookies',
            'ngMessages',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ui.router',
            'pascalprecht.translate',
            'ui.bootstrap',
            'ui.bootstrap.tooltip',
            'ngScrollbars',
            'uuid',
            'monospaced.elastic',
            'duScroll',
            'rzModule',
            'tmh.dynamicLocale',
            'angularAudioRecorder',
            'com.2fdevs.videogular',
            'com.2fdevs.videogular.plugins.controls',
            'com.2fdevs.videogular.plugins.overlayplay',
            'com.2fdevs.videogular.plugins.poster',
            'com.2fdevs.videogular.plugins.imaads',
            'com.2fdevs.videogular.plugins.buffering',
            'ngclipboard',
            'LocalStorageModule',
            // 'socialLogin',
            'anim-in-out',
            'angular-loading-bar',
            'dibari.angular-ellipsis',
            'ng.deviceDetector',
            'ng-if-bootstrap-grid',
            'ngEmbed',
            'ngAudio',
            'hc.marked',
            'cozenLib',

            'cogeoApp.actionBar'
        ]);

})(window.angular);
