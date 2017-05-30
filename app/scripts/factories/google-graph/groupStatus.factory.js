(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .factory('googleGraphGroupStatus', googleGraphGroupStatus);

    googleGraphGroupStatus.$inject = [
        '$filter',
        'colors',
        'groupsFactory',
        'CONFIG'
    ];

    function googleGraphGroupStatus($filter, colors, groupsFactory, CONFIG) {

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
                colors.getColors().green,
                colors.getColors().yellow,
                colors.getColors().red
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
            _groups.active = groupsFactory.getActiveUsers(groupName).length;
            _groups.kicked = groupsFactory.getKickedMembersQuantity(groupName);
            _groups.banned = groupsFactory.getBannedMembersQuantity(groupName);
            _groups.total  = _groups.active + _groups.kicked + _groups.banned;
            return {
                id         : 'google-graph-group-status',
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
                    quantity     : _groups.active,
                    color        : colors.getColors().green,
                    pct          : Math.round(_groups.active * 100 / _groups.total) + '%',
                    text         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.MEMBER_ACTIVE'),
                    textPluralize: $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.MEMBER_ACTIVE_PLURALIZE')
                },
                {
                    name         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.KICKED'),
                    quantity     : _groups.kicked,
                    color        : colors.getColors().yellow,
                    pct          : Math.round(_groups.kicked * 100 / _groups.total) + '%',
                    text         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.MEMBER_KICKED'),
                    textPluralize: $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.MEMBER_KICKED_PLURALIZE')
                },
                {
                    name         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.BANNED'),
                    quantity     : _groups.banned,
                    color        : colors.getColors().red,
                    pct          : Math.round(_groups.banned * 100 / _groups.total) + '%',
                    text         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.MEMBER_BANNED'),
                    textPluralize: $filter('translate')('GRAPH.GOOGLE.CHANNELS_STATUS.MEMBER_BANNED_PLURALIZE')
                }
            ];
        }
    }

})(window.angular);