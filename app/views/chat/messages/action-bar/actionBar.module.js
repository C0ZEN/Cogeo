(function (angular) {
    'use strict';

    angular
        .module('4pjtApp.actionBar', [
            '4pjtApp.actionBar.answer',
            '4pjtApp.actionBar.chat',
            '4pjtApp.actionBar.copy',
            '4pjtApp.actionBar.download',
            '4pjtApp.actionBar.accordion',
            '4pjtApp.actionBar.zoom',
            '4pjtApp.actionBar.remove',
            '4pjtApp.actionBar.play',
            '4pjtApp.actionBar.pause',
            '4pjtApp.actionBar.stop',
            '4pjtApp.actionBar.volume',
            '4pjtApp.actionBar.edit'
        ]);

})(window.angular);