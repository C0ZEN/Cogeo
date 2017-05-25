(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .factory('googleGraphGroupMembers', googleGraphGroupMembers);

    googleGraphGroupMembers.$inject = [
        '$filter',
        'colors',
        'groupsFactory',
        'CONFIG'
    ];

    function googleGraphGroupMembers($filter, colors, groupsFactory, CONFIG) {

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
                colors.getColors().purple,
                colors.getColors().green
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
            _groups.admin     = groupsFactory.getAdminMembersQuantity(groupName);
            _groups.noneAdmin = groupsFactory.getNoneAdminMembersQuantity(groupName);
            _groups.total     = _groups.admin + _groups.noneAdmin;
            return {
                id         : 'google-graph-group-members',
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
                    $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.TYPE'),
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
                    name         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.ADMIN'),
                    quantity     : _groups.admin,
                    color        : colors.getColors().purple,
                    pct          : Math.round(_groups.admin * 100 / _groups.total) + '%',
                    text         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.MEMBER_ADMIN'),
                    textPluralize: $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.MEMBER_ADMIN_PLURALIZE')
                },
                {
                    name         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.NONE_ADMIN'),
                    quantity     : _groups.noneAdmin,
                    color        : colors.getColors().green,
                    pct          : Math.round(_groups.noneAdmin * 100 / _groups.total) + '%',
                    text         : $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.MEMBER_NOT_ADMIN'),
                    textPluralize: $filter('translate')('GRAPH.GOOGLE.CHANNELS_MEMBERS.MEMBER_NOT_ADMIN_PLURALIZE')
                }
            ];
        }
    }

})(window.angular);