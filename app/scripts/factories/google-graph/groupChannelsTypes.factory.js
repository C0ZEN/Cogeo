(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .factory('googleGraphGroupChannelsTypes', googleGraphGroupChannelsTypes);

    googleGraphGroupChannelsTypes.$inject = [
        '$filter',
        'colors',
        'groupsFactory',
        'CONFIG'
    ];

    function googleGraphGroupChannelsTypes($filter, colors, groupsFactory, CONFIG) {

        // Options
        var _options = {
            height      : CONFIG.internal.googleGraph.pieChart.height,
            width       : CONFIG.internal.googleGraph.pieChart.width,
            legend      : {
                position: 'none'
            },
            chartArea   : {
                top   : CONFIG.internal.googleGraph.pieChart.top,
                bottom: CONFIG.internal.googleGraph.pieChart.bottom,
                left  : CONFIG.internal.googleGraph.pieChart.left,
                right : CONFIG.internal.googleGraph.pieChart.right,
                width : CONFIG.internal.googleGraph.pieChart.width - CONFIG.internal.googleGraph.pieChart.right - CONFIG.internal.googleGraph.pieChart.left,
                height: CONFIG.internal.googleGraph.pieChart.height - CONFIG.internal.googleGraph.pieChart.top - CONFIG.internal.googleGraph.pieChart.bottom
            },
            tooltip     : {
                showColorCode: false
            }
            ,
            pieHole     : CONFIG.internal.googleGraph.pieChart.pieHole,
            pieSliceText: 'none',
            colors      : [
                colors.getColors().blue,
                colors.getColors().green,
                colors.getColors().yellow
            ]
        };

        // Channels data
        var _groups = {};

        return {
            getChart               : getChart,
            getGoogleData          : getGoogleData,
            getData                : getData,
            createCustomHTMLContent: createCustomHTMLContent
        };

        // Return the object which must be binding to the directive draw-chart
        function getChart(groupName) {
            _groups.channelDefault = groupsFactory.getDefaultChannelsQuantity(groupName);
            _groups.channelPublic  = groupsFactory.getPublicChannelsQuantity(groupName);
            _groups.channelDefault = groupsFactory.getPrivateChannelsQuantity(groupName);
            _groups.total          = _groups.channelDefault + _groups.channelPublic + _groups.channelDefault;
            return {
                id         : 'google-graph-group-channels-types',
                data       : getGoogleData,
                options    : _options,
                type       : 'PieChart',
                animationIn: 'fadeIn'
            };
        }

        // Return the formatted data for google graph
        function getGoogleData() {
            var structure = [
                [
                    $filter('translate')('GRAPH.GOOGLE.GROUPS_CHANNELS_TYPES.TYPE'),
                    'Pourcentage',
                    ({
                        type: 'string',
                        role: 'tooltip',
                        p   : {'html': true}
                    })
                ]
            ];

            getData().forEach(function (item) {
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
                '<p class="tooltip-text">' + item.quantity +
                ' ' +
                $filter('translate')((item.quantity > 1 ? item.textPluralize : item.text)) +
                '<small class="help-text"> (' + item.pct + ')</small>' +
                '</p>';
        }

        // Return an array of data
        function getData() {
            return [
                {
                    name         : $filter('translate')('GRAPH.GOOGLE.GROUPS_CHANNELS_TYPES.DEFAULT'),
                    quantity     : _groups.channelDefault,
                    color        : colors.getColors().blue,
                    pct          : Math.round(_groups.channelDefault * 100 / _groups.total) + '%',
                    text         : $filter('translate')('GRAPH.GOOGLE.GROUPS_CHANNELS_TYPES.CHANNEL_DEFAULT'),
                    textPluralize: $filter('translate')('GRAPH.GOOGLE.GROUPS_CHANNELS_TYPES.CHANNEL_DEFAULT_PLURALIZE')
                },
                {
                    name         : $filter('translate')('GRAPH.GOOGLE.GROUPS_CHANNELS_TYPES.PUBLIC'),
                    quantity     : _groups.channelPublic,
                    color        : colors.getColors().green,
                    pct          : Math.round(_groups.channelPublic * 100 / _groups.total) + '%',
                    text         : $filter('translate')('GRAPH.GOOGLE.GROUPS_CHANNELS_TYPES.CHANNEL_PUBLIC'),
                    textPluralize: $filter('translate')('GRAPH.GOOGLE.GROUPS_CHANNELS_TYPES.CHANNEL_PUBLIC_PLURALIZE')
                },
                {
                    name         : $filter('translate')('GRAPH.GOOGLE.GROUPS_CHANNELS_TYPES.PRIVATE'),
                    quantity     : _groups.channelDefault,
                    color        : colors.getColors().yellow,
                    pct          : Math.round(_groups.channelDefault * 100 / _groups.total) + '%',
                    text         : $filter('translate')('GRAPH.GOOGLE.GROUPS_CHANNELS_TYPES.CHANNEL_PRIVATE'),
                    textPluralize: $filter('translate')('GRAPH.GOOGLE.GROUPS_CHANNELS_TYPES.CHANNEL_PRIVATE_PLURALIZE')
                }
            ];
        }
    }

})(window.angular);