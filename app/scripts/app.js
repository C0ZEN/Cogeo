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
      'cozenLib'
    ])
    .config(config)
    .run(run);

  config.$inject = [
    '$locationProvider',
    '$translateProvider',
    'CONFIG',
    'ThemesProvider',
    'ConfigProvider'
  ];

  // Global configuration
  function config($locationProvider, $translateProvider, CONFIG, ThemesProvider, ConfigProvider) {

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
      .currentLanguage('fr');

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
  }

  run.$inject = [
    '$rootScope',
    '$state',
    'goTo'
  ];

  function run($rootScope, $state, goTo) {
    $rootScope.$state      = $state;
    $rootScope.innerHeight = window.innerHeight;
    $rootScope.goTo        = goTo;
  }

})(window.angular, window);
