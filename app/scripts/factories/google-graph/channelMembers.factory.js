(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('googleGraphChannelMembers', googleGraphChannelMembers);

    googleGraphChannelMembers.$inject = [
        '$filter',
        'colors'
    ];

    function googleGraphChannelMembers($filter, colors) {

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

        return {
            getChart               : getChart,
            getData                : getData,
            createCustomHTMLContent: createCustomHTMLContent
        };

        // Return the object which must be binding to the directive draw-chart
        function getChart() {
            return {
                id     : 'google-graph-channel-members',
                data   : getData,
                options: _options,
                type   : 'PieChart'
            };
        }

        // Return the formatted data for google graph
        function getData() {
            var structure = [
                [
                    $filter('translate')('graph_google_channels_members_type'),
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
                    name    : $filter('translate')('graph_google_channels_members_admin'),
                    quantity: 10,
                    color   : colors.getColors().purple,
                    pct     : '33%',
                    text    : $filter('translate')('graph_google_channels_members_admin_tp')
                },
                {
                    name    : $filter('translate')('graph_google_channels_members_member'),
                    quantity: 20,
                    color   : colors.getColors().green,
                    pct     : '66%',
                    text    : $filter('translate')('graph_google_channels_members_member_tp')
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
                '<div class="level" style="background-color:' + item.color + ';">' +
                '</div>' +
                '<p>' +
                item.quantity + $filter('translate')('graph_google_channels_members_member_tp') +
                '<br>' +
                item.name.toLowerCase() +
                '<br>' +
                '<small>Soit ' + item.pct + '</small>' +
                '</p>';
        }
    }

})(window.angular);