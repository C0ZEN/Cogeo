(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
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
        'CozenLazyLoadProvider',
        '$compileProvider',
        'markedProvider',
        'CozenFloatingFeedProvider'
    ];

    // Global configuration
    function config($locationProvider, $translateProvider, CONFIG, CozenThemesProvider, CozenConfigProvider,
                    tmhDynamicLocaleProvider, $httpProvider, $qProvider, cfpLoadingBarProvider, CozenLazyLoadProvider,
                    $compileProvider, markedProvider, CozenFloatingFeedProvider) {

        // Override the CONFIG for the Atom theme
        CozenThemesProvider.setActiveTheme('atom');
        CozenConfigProvider
            .scrollsBar(false)
            .debug(false)
            .dev(false)
            .logsEnabled(false)
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
            .btnToggleStartRight(false);
        CozenLazyLoadProvider
            .log(false)
            .positionTop('70px')
            .positionLeft('10px');
        CozenFloatingFeedProvider
            .width(520)
            .timeoutTime(14000);

        // Configure the location provider
        $locationProvider
            .html5Mode({
                enabled    : false,
                requireBase: false
            })
            .hashPrefix('!');

        // Configure the translate provider
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters'); // escape
        $translateProvider.useStaticFilesLoader({
                prefix: 'languages/',
                suffix: '.json'
            }
        );
        $translateProvider.preferredLanguage(CONFIG.currentLanguage);

        // Configure the locale for moment
        moment.locale(CONFIG.currentLanguage);

        // Configure the locale for angular default services
        tmhDynamicLocaleProvider
            .localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js')
            .defaultLocale(CONFIG.currentLanguage);

        // Setup for CORS issues and JSON http requests
        // $httpProvider.defaults.useXDomain = true;
        // $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"]       = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);

        // Avoid an error in the console when a deferred is rejected
        $qProvider.errorOnUnhandledRejections(false);

        // Social client and secret (Google/Facebook)
        // socialProvider.setGoogleKey("AIzaSyANiSj4N--3txST9re2QhbPuiifbx2HNQU");
        // socialProvider.setFbKey({
        //     appId     : "576889762516850",
        //     apiVersion: "v2.8"
        // });

        // Custom configuration of the markdown parser
        markedProvider.setOptions({
            gfm        : true,
            tables     : true,
            breaks     : true,
            smartypants: true,
            sanitize   : false
        });

        // Cogeo Config
        CONFIG.internal = {
            API        : 'https://qwirk.herokuapp.com/',
            video      : {
                theme  : "bower_components/videogular-themes-default/videogular.css",
                plugins: {
                    controls: {
                        autoHide    : true,
                        autoHideTime: 4000
                    }
                }
            },
            appVersion : '1.0.2',
            googleGraph: {
                pieChart: {
                    pieHole: 0.7,
                    height : 120,
                    width  : 120,
                    top    : 15,
                    right  : 15,
                    bottom : 15,
                    left   : 15
                }
            }
        };

        // Configure the loading bar
        cfpLoadingBarProvider.includeSpinner = false;
    }

})(window.angular, window);