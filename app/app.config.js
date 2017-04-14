(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .config(config);

    config.$inject = [
        '$locationProvider',
        '$translateProvider',
        'CONFIG',
        'CozenThemesProvider',
        'CozenConfigProvider',
        'tmhDynamicLocaleProvider',
        '$httpProvider',
        '$qProvider',
        'cfpLoadingBarProvider',
        'CozenLazyLoadProvider'
    ];

    // Global configuration
    function config($locationProvider, $translateProvider, CONFIG, CozenThemesProvider, CozenConfigProvider,
                    tmhDynamicLocaleProvider, $httpProvider, $qProvider, cfpLoadingBarProvider, CozenLazyLoadProvider) {

        // Override the CONFIG for the Atom theme
        CozenThemesProvider.setActiveTheme('atom');
        CozenConfigProvider
            .scrollsBar(false)
            .debug(true)
            .dev(true)
            .logsEnabled(true)
            .dropdownAutoCloseOthers(true)
            .inputModelLengthType('focus')
            .textareaModelLengthType('focus')
            .dropdownDisplayModelLength(true)
            .requiredType('icon')
            .alertIconLeftDefault('fa fa-info-circle')
            .currentLanguage(CONFIG.currentLanguage)
            .popupAnimationInAnimation('zoomIn')
            .popupAnimationOutAnimation('zoomOut')
            .popupFooter(false)
            .btnToggleStartRight(false)
            .floatingFeedWidth(520)
            .floatingFeedTimeoutTime(14000);
        CozenLazyLoadProvider
            .log(true)
            .positionTop('70px')
            .positionLeft('10px');

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
        // socialProvider.setGoogleKey("AIzaSyANiSj4N--3txST9re2QhbPuiifbx2HNQU");
        // socialProvider.setFbKey({
        //     appId     : "576889762516850",
        //     apiVersion: "v2.8"
        // });

        // Cogeo Config
        CONFIG.internal = {
            API       : 'https://qwirk.herokuapp.com/',
            video     : {
                theme  : "bower_components/videogular-themes-default/videogular.css",
                plugins: {
                    controls: {
                        autoHide    : true,
                        autoHideTime: 4000
                    }
                }
            },
            appVersion: '1.0.0'
        };

        // Configure the loading bar
        cfpLoadingBarProvider.includeSpinner = false;
    }

})(window.angular, window);
