(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .config(config);

    config.$inject = [
        '$stateProvider'
    ];

    function config($stateProvider) {

        // Channels routes
        $stateProvider
            .state('app.channels', {
                abstract    : true,
                url         : '/groups/:groupName/channels',
                templateUrl : 'views/channels/channels.html',
                controller  : 'ChannelsCtrl',
                controllerAs: 'vm'
            })
            .state('app.channels.all', {
                url        : '/all',
                templateUrl: 'views/channels/channels.all.html',
                data       : {
                    pageTitle: 'channels_all'
                }
            })
            .state('app.channels.details', {
                url        : '/details/:channelName',
                templateUrl: 'views/channels/channels.details.html',
                data       : {
                    pageTitle: 'channels_details'
                }
            })
            .state('app.channels.edit', {
                url        : '/edit/:channelName',
                templateUrl: 'views/channels/channels.edit.html',
                data       : {
                    pageTitle: 'channels_edit'
                }
            })
            .state('app.channels.members', {
                url        : '/members/:channelName',
                templateUrl: 'views/channels/channels.members.html',
                data       : {
                    pageTitle: 'channels_members'
                }
            })
            .state('app.channels.invitations', {
                url        : '/invitations/:channelName',
                templateUrl: 'views/channels/channels.invitations.html',
                data       : {
                    pageTitle: 'channels_invitations'
                }
            })
            .state('app.channels.logs', {
                url        : '/logs/:channelName',
                templateUrl: 'views/channels/channels.logs.html',
                data       : {
                    pageTitle: 'channels_logs'
                }
            })
            .state('app.channels.new', {
                url        : '/new/:channelName',
                templateUrl: 'views/channels/channels.new.html',
                data       : {
                    pageTitle: 'channels_new'
                }
            })
            .state('app.channels.recruit', {
                url        : '/recruit/:channelName',
                templateUrl: 'views/channels/channels.recruit.html',
                data       : {
                    pageTitle: 'channels_recruit'
                }
            });
    }

})(window.angular);
