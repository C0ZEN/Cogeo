(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('googleGraphChannelMembers', googleGraphChannelMembers);

    googleGraphChannelMembers.$inject = [
        '$filter',
        'colors',
        'channelsFactory'
    ];

    function googleGraphChannelMembers($filter, colors, channelsFactory) {

        // Options
        var _options = {
            height      : 130,
            width       : 130,
            legend      : {
                position: 'none'
            },
            chartArea   : {
                top   : 15,
                bottom: 15,
                left  : 15,
                right : 15,
                width : 100,
                height: 100
            },
            tooltip     : {
                showColorCode: false
            },
            pieHole     : 0.7,
            pieSliceText: 'none',
            colors      : [
                colors.getColors().purple,
                colors.getColors().green
            ]
        };

        // Channels data
        var _channels = {};

        return {
            getChart               : getChart,
            getData                : getData,
            createCustomHTMLContent: createCustomHTMLContent
        };

        // Return the object which must be binding to the directive draw-chart
        function getChart(groupName, channelId) {
            _channels.admin     = channelsFactory.getChannelAdminQuantity(groupName, channelId);
            _channels.noneAdmin = channelsFactory.getChannelNoneAdminQuantity(groupName, channelId);
            _channels.total     = _channels.admin + _channels.noneAdmin;
            return {
                id         : 'google-graph-channel-members',
                data       : getData,
                options    : _options,
                type       : 'PieChart',
                animationIn: 'fadeIn'
            };
        }

        // Return the formatted data for google graph
        function getData() {
            var structure = [
                [
                    $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.TYPE'),
                    'Pourcentage',
                    ({
                        type: 'string',
                        role: 'tooltip',
                        p   : {'html': true}
                    })
                ]
            ];

            var data = [
                {
                    name    : $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.ADMIN'),
                    quantity: _channels.admin,
                    color   : colors.getColors().purple,
                    pct     : Math.round(_channels.admin * 100 / _channels.total) + '%',
                    text    : $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.ADMIN_TP')
                },
                {
                    name    : $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.NONE_ADMIN'),
                    quantity: _channels.noneAdmin,
                    color   : colors.getColors().green,
                    pct     : Math.round(_channels.noneAdmin * 100 / _channels.total) + '%',
                    text    : $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.MEMBER_TP')
                }
            ];

            data.forEach(function (item) {
                structure.push([
                    item.name,
                    item.quantity,
                    createCustomHTMLContent(item)
                ]);
            });

            return google.visualization.arrayToDataTable(structure);
        }

        // Create the tooltip
        function createCustomHTMLContent(item) {
            return '' +
                '<div class="tooltip-square" style="background-color:' + item.color + ';"></div>' +
                '<p class="tooltip-text">' + item.quantity
                + ' '
                + (item.quantity > 1 ? $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.MEMBER_TP') : $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.MEMBER_TP_ALONE'))
                + ' ' + item.name.toLowerCase() +
                '<small class="help-text"> (' + item.pct + ')</small>' +
                '</p>';
        }
    }

})(window.angular);