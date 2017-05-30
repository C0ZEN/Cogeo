(function (angular) {
    'use strict';

    angular
        .module('cogeoApp.actionBar', [
            'cogeoApp.actionBar.answer',
            'cogeoApp.actionBar.chat',
            'cogeoApp.actionBar.copy',
            'cogeoApp.actionBar.download',
            'cogeoApp.actionBar.accordion',
            'cogeoApp.actionBar.zoom',
            'cogeoApp.actionBar.remove',
            'cogeoApp.actionBar.play',
            'cogeoApp.actionBar.pause',
            'cogeoApp.actionBar.stop',
            'cogeoApp.actionBar.volume',
            'cogeoApp.actionBar.edit'
        ]);

})(window.angular);