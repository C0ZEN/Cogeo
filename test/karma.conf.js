// Karma configuration
// Generated on 2017-01-05

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/angular/angular.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
      'bower_components/moment/min/moment-with-locales.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/jquery-mousewheel/jquery.mousewheel.js',
      'bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js',
      'bower_components/ng-scrollbars/src/scrollbars.js',
      'bower_components/angular-uuid-service/angular-uuid-service.js',
      'bower_components/angular-elastic/elastic.js',
      'bower_components/scrollreveal/dist/scrollreveal.js',
      'bower_components/angular-scroll/angular-scroll.js',
      'bower_components/angularjs-slider/dist/rzslider.min.js',
      'bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',
      'bower_components/wavesurfer.js/dist/wavesurfer.min.js',
      'bower_components/angularAudioRecorder/dist/angular-audio-recorder.min.js',
      'bower_components/videogular/videogular.js',
      'bower_components/videogular-controls/vg-controls.js',
      'bower_components/videogular-buffering/vg-buffering.js',
      'bower_components/videogular-overlay-play/vg-overlay-play.js',
      'bower_components/videogular-poster/vg-poster.js',
      'bower_components/videogular-ima-ads/vg-ima-ads.js',
      'bower_components/waypoints/waypoints.js',
      'bower_components/SHA-1/sha1.js',
      'bower_components/angulartics/src/angulartics.js',
      'bower_components/angulartics/src/angulartics-adobe.js',
      'bower_components/angulartics/src/angulartics-chartbeat.js',
      'bower_components/angulartics/src/angulartics-cnzz.js',
      'bower_components/angulartics/src/angulartics-flurry.js',
      'bower_components/angulartics/src/angulartics-ga-cordova.js',
      'bower_components/angulartics/src/angulartics-ga.js',
      'bower_components/angulartics/src/angulartics-gtm.js',
      'bower_components/angulartics/src/angulartics-kissmetrics.js',
      'bower_components/angulartics/src/angulartics-mixpanel.js',
      'bower_components/angulartics/src/angulartics-piwik.js',
      'bower_components/angulartics/src/angulartics-scroll.js',
      'bower_components/angulartics/src/angulartics-segmentio.js',
      'bower_components/angulartics/src/angulartics-splunk.js',
      'bower_components/angulartics/src/angulartics-woopra.js',
      'bower_components/angulartics/src/angulartics-marketo.js',
      'bower_components/angulartics/src/angulartics-intercom.js',
      'bower_components/videogular-angulartics/vg-analytics.js',
      'bower_components/clipboard/dist/clipboard.js',
      'bower_components/ngclipboard/dist/ngclipboard.js',
      'bower_components/messageformat/messageformat.js',
      'bower_components/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angularjs-social-login/angularjs-social-login.js',
      'bower_components/angular-ui-router-anim-in-out/anim-in-out.js',
      'bower_components/angular-loading-bar/build/loading-bar.min.js',
      'bower_components/angular-ellipsis/src/angular-ellipsis.js',
      'bower_components/re-tree/re-tree.js',
      'bower_components/ng-device-detector/ng-device-detector.js',
      'bower_components/ng-file-upload/ng-file-upload.js',
      'bower_components/console.style/console.style.js',
      'bower_components/chance/chance.js',
      'bower_components/cozen-lib/release/clean/main.js',
      'bower_components/cozen-lib/release/clean/template.cache.js',
      'bower_components/cozen-lib/release/clean/directives.js',
      'bower_components/underscore/underscore.js',
      'bower_components/ng-if-bootstrap/src/index.js',
      'bower_components/showdown/src/showdown.js',
      'bower_components/angular-markdown-directive/markdown.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
