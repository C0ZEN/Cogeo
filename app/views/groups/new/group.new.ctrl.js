(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .controller('GroupNewCtrl', GroupNewCtrl);

    GroupNewCtrl.$inject = [
        '$document',
        '$state',
        'CONFIG',
        'goTo',
        '$animate'
    ];

    function GroupNewCtrl($document, $state, CONFIG, goTo, $animate) {
        var vm = this;

        // Common data
        vm.data    = {};
        vm.new     = {};
        vm.CONFIG  = CONFIG;
        vm.isReady = false;

        // Methods
        vm.methods = {
            onReady       : onReady,
            checkGroupName: checkGroupName
        };

        // var child = document.getElementById('#new-group-step-1-container');
        // console.log(child);
        // $animate.addClass(child, 'animated fadeInLeft').then(function () {
        //     $animate.removeClass(child, 'animated fadeInLeft');
        // });

        function onReady() {
            vm.isReady = true;
        }

        function checkGroupName() {
            vm.loading = true;
            vm.loading = false;
            goTo.view('app.groupNew.secondStep');
        }
    }

})(window.angular);

