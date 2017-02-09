/**
 * Generated header by Cozen for 4pjt project
 * Generated file group.new.router on WebStorm
 *
 * Created by: Geoffrey "C0ZEN" Testelin
 * Date: 09/02/2017
 * Time: 13:45
 * Version: 1.0.0
 */
(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {

        // New group route
        $stateProvider
            .state('app.groupNew', {
                abstract    : true,
                url         : '/groups/new',
                controller  : 'GroupNewCtrl',
                controllerAs: 'vm',
                template    : '<ui-view/>'
            })
            .state('app.groupNew.firstStep', {
                url         : '/groups/new/name',
                templateUrl : 'views/groups/new/group.new.html',
                controller  : 'GroupNewCtrl',
                controllerAs: 'vm',
                data        : {
                    pageTitle: 'group_new'
                }
            });
    }

})(window.angular);
