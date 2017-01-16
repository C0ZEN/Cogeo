(function (angular) {
  'use strict';

  angular
    .module('4pjtApp')
    .config(config);

  config.$inject = [
    'CONFIG'
  ];

  // Account configuration
  function config(CONFIG) {
    CONFIG.internal.account = {
      settings: {
        ports       : {
          first : {
            min     : 1,
            max     : 65535,
            required: true,
            name    : 'first',
            length  : 5
          },
          second: {
            min     : 1,
            max     : 65535,
            required: true,
            name    : 'second',
            length  : 5
          }
        },
        downloadPath: {
          length  : 120,
          required: true,
          name    : 'downloadPath'
        },
        micro       : {
          volume: {
            floor       : 0,
            ceil        : 100,
            step        : 1,
            showTicks   : true,
            ticksArray  : Utils.createArrayFromRange(0, 5, 100),
            ticksTooltip: function (value) {
              return value + '%';
            },
            translate   : function (value, sliderId, label) {
              return value + '%';
            }
          }
        },
        speaker     : {
          volume: {
            floor       : 0,
            ceil        : 100,
            step        : 1,
            showTicks   : true,
            ticksArray  : Utils.createArrayFromRange(0, 5, 100),
            ticksTooltip: function (value) {
              return value + '%';
            },
            translate   : function (value, sliderId, label) {
              return value + '%';
            }
          }
        }
      }
    }
  }

})(window.angular);
