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
            .btnToggleStartRight(false);
        CozenLazyLoadProvider
            .log(true)
            .positionTop('70px')
            .positionLeft('10px');
        CozenFloatingFeedProvider
            .width(520)
            .timeoutTime(10000);

        // Configure the location provider
        $locationProvider
            .html5Mode({
                enabled    : true,
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
            API          : 'http://www.cogeo.ovh:3000/',
            video        : {
                theme  : "bower_components/videogular-themes-default/videogular.css",
                plugins: {
                    controls: {
                        autoHide    : true,
                        autoHideTime: 4000
                    }
                }
            },
            appVersion   : '1.0.0',
            googleGraph  : {
                pieChart: {
                    pieHole: 0.7,
                    height : 120,
                    width  : 120,
                    top    : 15,
                    right  : 15,
                    bottom : 15,
                    left   : 15
                }
            },
            peer         : {
                debug: 2,
                key  : '9o3h3bvbimivbo6r'
            },
            documentation: {
                screenshotMark: false
            }
        };

        // Configure the loading bar
        cfpLoadingBarProvider.includeSpinner = false;
    }

})(window.angular, window);
