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
      'tmh.dynamicLocale'
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
      .popupFooter(false);

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
    CONFIG.internal = {};
  }

  run.$inject = [
    '$rootScope',
    '$state',
    'goTo',
    'cozenPopupFactory'
  ];

  function run($rootScope, $state, goTo, cozenPopupFactory) {

    // Public global data
    $rootScope.data = {
      innerHeight: window.innerHeight
    };

    // Public global services
    $rootScope.$state = $state;
    $rootScope.goTo   = goTo;

    // Public global functions
    $rootScope.methods = {
      showPopup: showPopup
    };

    function showPopup($event, name) {

      // Required to avoid an show and hide behavior
      $event.stopPropagation();

      // Show the popup
      cozenPopupFactory.show({
        name: name
      });
    }
  }

})(window.angular, window);
