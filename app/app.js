(function (angular) {
  'use strict';

  /**
   * @ngdoc overview
   * @name 4pjtApp
   * @description
   * # 4pjtApp
   *
   * Main module of the application.
   */
  angular
    .module('4pjtApp', [
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
      'cozenLib',
      'rzModule',
      'tmh.dynamicLocale',
      'angularAudioRecorder',
      'com.2fdevs.videogular',
      'com.2fdevs.videogular.plugins.controls',
      'com.2fdevs.videogular.plugins.overlayplay',
      'com.2fdevs.videogular.plugins.poster',
      'com.2fdevs.videogular.plugins.imaads',
      'com.2fdevs.videogular.plugins.buffering',
      'ngclipboard'
    ])
    .config(config)
    .run(run);

  config.$inject = [
    '$locationProvider',
    '$translateProvider',
    'CONFIG',
    'ThemesProvider',
    'ConfigProvider',
    'tmhDynamicLocaleProvider'
  ];

  // Global configuration
  function config($locationProvider, $translateProvider, CONFIG, ThemesProvider, ConfigProvider, tmhDynamicLocaleProvider) {

    // Override the CONFIG for the Atom theme
    ThemesProvider.setActiveTheme('atom');
    ConfigProvider
      .scrollsBar(false)
      .debug(true)
      .dropdownAutoCloseOthers(true)
      .inputDisplayModelLength(true)
      .textareaDisplayModelLength(true)
      .dropdownDisplayModelLength(true)
      .requiredType('icon')
      .alertIconLeftDefault('fa fa-info-circle')
      .currentLanguage(CONFIG.currentLanguage)
      .popupAnimationInAnimation('zoomIn')
      .popupAnimationOutAnimation('zoomOut')
      .popupFooter(false)
      .btnToggleStartRight(false);

    // Configure the location provider
    $locationProvider.html5Mode({
      enabled    : false,
      requireBase: false
    });

    // Configure the translate provider
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
    $translateProvider.useStaticFilesLoader({
        prefix: '/languages/concat/',
        suffix: '.concat.json'
      }
    );
    $translateProvider.preferredLanguage(CONFIG.currentLanguage);

    // Configure the locale for moment
    moment.locale(CONFIG.currentLanguage);

    // Configure the locale for angular default services
    tmhDynamicLocaleProvider
      .localeLocationPattern('/bower_components/angular-i18n/angular-locale_{{locale}}.js')
      .defaultLocale(CONFIG.currentLanguage);

    // 4pjt Config
    CONFIG.internal = {
      video: {
        theme  : "bower_components/videogular-themes-default/videogular.css",
        plugins: {
          controls: {
            autoHide    : true,
            autoHideTime: 4000
          }
        }
      }
    };
  }

  run.$inject = [
    '$rootScope',
    '$state',
    'goTo',
    'cozenPopupFactory',
    'userFactory'
  ];

  function run($rootScope, $state, goTo, cozenPopupFactory, userFactory) {

    // Public global data
    $rootScope.data = {
      innerHeight: window.innerHeight,
      user       : userFactory.getUser()
    };

    // Public global services
    $rootScope.$state = $state;
    $rootScope.goTo   = goTo;

    // Public global functions
    $rootScope.methods = {
      showPopup: showPopup
    };

    function showPopup($event, name, data) {

      // Required to avoid an show and hide behavior
      $event.stopPropagation();

      // Show the popup
      cozenPopupFactory.show({
        name: name,
        data: data
      });
    }
  }

})(window.angular, window);
