(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .controller('ErrorCtrl', ErrorCtrl);

    ErrorCtrl.$inject = [];

    function ErrorCtrl() {
        var vm = this;

        // Common data
        vm.data = {};

        // Methods
        vm.methods = {};
    }

})(window.angular);

