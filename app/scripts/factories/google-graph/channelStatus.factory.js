(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('googleGraphChannelStatus', googleGraphChannelStatus);

    googleGraphChannelStatus.$inject = [
        '$filter',
        'colors',
        'channelsFactory'
    ];

    function googleGraphChannelStatus($filter, colors, channelsFactory) {

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
                colors.getColors().green,
                colors.getColors().yellow,
                colors.getColors().red
            ]
        };

        // Channels data
        var _channels = {};

        return {
            getChart               : getChart,
            getGoogleData          : getGoogleData,
            getData                : getData,
            createCustomHTMLContent: createCustomHTMLContent
        };

        // Return the object which must be binding to the directive draw-chart
        function getChart(groupName, channelId) {
            _channels.active = channelsFactory.getActiveMembers(groupName, channelId).length;
            _channels.kicked = channelsFactory.getChannelKickedQuantity(groupName, channelId);
            _channels.banned = channelsFactory.getChannelBannedQuantity(groupName, channelId);
            _channels.total  = _channels.active + _channels.kicked + _channels.banned;
            return {
                id         : 'google-graph-channel-status',
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
                    $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.TYPE'),
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
                    name         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.ACTIVE'),
                    quantity     : _channels.active,
                    color        : colors.getColors().green,
                    pct          : Math.round(_channels.active * 100 / _channels.total) + '%',
                    text         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.MEMBER_ACTIVE'),
                    textPluralize: $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.MEMBER_ACTIVE_PLURALIZE')
                },
                {
                    name         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.KICKED'),
                    quantity     : _channels.kicked,
                    color        : colors.getColors().yellow,
                    pct          : Math.round(_channels.kicked * 100 / _channels.total) + '%',
                    text         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.MEMBER_KICKED'),
                    textPluralize: $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.MEMBER_KICKED_PLURALIZE')
                },
                {
                    name         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.BANNED'),
                    quantity     : _channels.banned,
                    color        : colors.getColors().red,
                    pct          : Math.round(_channels.banned * 100 / _channels.total) + '%',
                    text         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.MEMBER_BANNED'),
                    textPluralize: $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.MEMBER_BANNED_PLURALIZE')
                }
            ];
        }
    }

})(window.angular);