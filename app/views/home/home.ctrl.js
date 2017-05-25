(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = [
        '$document'
    ];

    function HomeCtrl($document) {
        var vm = this;

        // Common data
        vm.data = {
            offset  : 60, // Height of the navbar
            duration: 600
        };

        // Methods
        vm.methods = {
            scrollToElement: scrollToElement
        };

        // Let's animate these beauties
        window.sr = ScrollReveal();
        sr.reveal('.sr-icons-services', {
            duration: 600,
            scale   : 0.3,
            distance: '0px'
        }, 200);
        sr.reveal('.sr-icons-devices', {
            duration: 600,
            scale   : 0.3,
            distance: '0px'
        }, 200);
        sr.reveal('.sr-icon', {
            duration: 600,
            scale   : 0.3,
            distance: '0px'
        });
        sr.reveal('.sr-button', {
            duration: 1000,
            delay   : 200
        });


        function scrollToElement(element) {
            var div = angular.element(document.getElementById(element));
            $document.scrollToElement(div, vm.data.offset, vm.data.duration);
        }
    }

})(window.angular);

