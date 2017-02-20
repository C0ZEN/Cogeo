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
            'socialLogin',
            'anim-in-out',
            'angular-loading-bar',
            'cozenLib'
        ])
        .config(config)
        .run(run);

    config.$inject = [
        '$locationProvider',
        '$translateProvider',
        'CONFIG',
        'ThemesProvider',
        'ConfigProvider',
        'tmhDynamicLocaleProvider',
        '$httpProvider',
        '$qProvider',
        'socialProvider'
    ];

    // Global configuration
    function config($locationProvider, $translateProvider, CONFIG, ThemesProvider, ConfigProvider, tmhDynamicLocaleProvider,
                    $httpProvider, $qProvider, socialProvider) {

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
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters'); // escape
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

        // Setup for CORS issues and JSON http requests
        // $httpProvider.defaults.useXDomain = true;
        // $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"]       = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

        // Avoid an error in the console when a deferred is rejected
        $qProvider.errorOnUnhandledRejections(false);

        // Social client and secret (Google/Facebook)
        socialProvider.setGoogleKey("AIzaSyANiSj4N--3txST9re2QhbPuiifbx2HNQU");
        socialProvider.setFbKey({
            appId     : "576889762516850",
            apiVersion: "v2.8"
        });

        // 4pjt Config
        CONFIG.internal = {
            API  : 'https://qwirk.herokuapp.com/',
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
        'groupsFactory',
        '$filter',
        'channelsFactory'
    ];

    function run($rootScope, $state, goTo, cozenPopupFactory, groupsFactory, $filter, channelsFactory) {

        // Public global data
        $rootScope.data = {
            innerHeight: window.innerHeight
        };

        // Public global services
        $rootScope.$state = $state;
        $rootScope.goTo   = goTo;

        // Public global functions
        $rootScope.methods = {
            showPopup        : showPopup,
            getKickBanFor    : getKickBanFor,
            getGroupPicture  : groupsFactory.getGroupPicture,
            getChannelPicture: channelsFactory.getChannelPicture
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

        function getKickBanFor(forValue) {
            return $filter('translate')('other_kicked_reason_' + forValue);
        }
    }

})(window.angular, window);
