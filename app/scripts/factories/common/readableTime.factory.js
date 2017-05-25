(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .factory('readableTime', readableTime);

    readableTime.$inject = [
        '$filter'
    ];

    function readableTime($filter) {
        return {
            convertTimestamp: convertTimestamp,
            getMonthsDiff   : getMonthsDiff
        };

        /**
         * Evaluate the timestamp
         * Return a string which represent a verbose value comparing date with now
         * @param  {number}  timestamp                      > The timestamp
         * @param  {string}  prefix    = other_time_thereIs > Prefix the text
         * @param  {boolean} short     = false              > Short version (without less)
         * @return {string}  a verbose equivalent
         */
        function convertTimestamp(timestamp, prefix, short) {
            var text       = '';
            var now        = moment();
            var diff       = now.diff(timestamp, 'minutes');
            var prefixCopy = $filter('translate')(prefix);
            if (short == null) {
                short = false;
            }
            if (prefix == null) {
                prefix = $filter('translate')('other_time_thereIs');
            }
            else if (!short) {
                prefix += $filter('translate')('other_time_less');
            }

            switch (true) {
                case diff < 1:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than_short');
                    }
                    text += $filter('translate')('other_time_hours_1') + ' ' + $filter('translate')('other_time_minute');
                    break;
                case diff < 2:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '2 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 3:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '3 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 4:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '4 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 5:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '5 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 10:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '10 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 15:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '15 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 20:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '20 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 25:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '25 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 30:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '30 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 35:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '35 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 40:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '40 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 45:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '45 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 50:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '50 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 55:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += '55 ' + $filter('translate')('other_time_minutes');
                    break;
                case diff < 60:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than_short');
                    }
                    text += $filter('translate')('other_time_hours_1') + ' ' + $filter('translate')('other_time_hour');
                    break;
                case diff < 120:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_2') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 180:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_3') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 240:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_4') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 300:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_5') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 360:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_6') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 420:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_7') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 480:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_8') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 540:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_9') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 600:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_10') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 660:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_11') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 720:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_12') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 780:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_13') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 840:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_14') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 900:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_15') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 960:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_16') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 1020:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_17') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 1080:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_18') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 1140:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_19') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 1200:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_20') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 1260:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_21') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 1320:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_22') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 1380:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_23') + ' ' + $filter('translate')('other_time_hours');
                    break;
                case diff < 1440:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than_short');
                    }
                    text += $filter('translate')('other_time_1') + ' ' + $filter('translate')('other_time_day');
                    break;
                case diff < 2880:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_2') + ' ' + $filter('translate')('other_time_days');
                    break;
                case diff < 4320:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_3') + ' ' + $filter('translate')('other_time_days');
                    break;
                case diff < 5760:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_4') + ' ' + $filter('translate')('other_time_days');
                    break;
                case diff < 7200:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_5') + ' ' + $filter('translate')('other_time_days');
                    break;
                case diff < 8640:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_1') + ' ' + $filter('translate')('other_time_days');
                    break;
                case diff < 10080:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than_short');
                    }
                    text += $filter('translate')('other_time_hours_1') + ' ' + $filter('translate')('other_time_week');
                    break;
                case diff < 20160:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_2') + ' ' + $filter('translate')('other_time_weeks');
                    break;
                case diff < 30240:
                    text = prefix;
                    if (!short) {
                        text += $filter('translate')('other_time_than');
                    }
                    text += $filter('translate')('other_time_hours_3') + ' ' + $filter('translate')('other_time_weeks');
                    break;
                default:
                    text = '';
            }

            if (text == '') {
                diff = now.diff(timestamp, 'months');
                switch (true) {
                    case diff < 1:
                        text = prefix;
                        if (!short) {
                            text += $filter('translate')('other_time_than_short');
                        }
                        text += $filter('translate')('other_time_1') + ' ' + $filter('translate')('other_time_month');
                        break;
                    case diff < 2:
                        text = prefix;
                        if (!short) {
                            text += $filter('translate')('other_time_than');
                        }
                        text += $filter('translate')('other_time_2') + ' ' + $filter('translate')('other_time_months');
                        break;
                    case diff < 3:
                        text = prefix;
                        if (!short) {
                            text += $filter('translate')('other_time_than');
                        }
                        text += $filter('translate')('other_time_3') + ' ' + $filter('translate')('other_time_months');
                        break;
                    case diff < 4:
                        text = prefix;
                        if (!short) {
                            text += $filter('translate')('other_time_than');
                        }
                        text += $filter('translate')('other_time_4') + ' ' + $filter('translate')('other_time_months');
                        break;
                    case diff < 5:
                        text = prefix;
                        if (!short) {
                            text += $filter('translate')('other_time_than');
                        }
                        text += $filter('translate')('other_time_5') + ' ' + $filter('translate')('other_time_months');
                        break;
                    case diff < 6:
                        text = prefix;
                        if (!short) {
                            text += $filter('translate')('other_time_than');
                        }
                        text += $filter('translate')('other_time_6') + ' ' + $filter('translate')('other_time_months');
                        break;
                    case diff < 7:
                        text = prefix;
                        if (!short) {
                            text += $filter('translate')('other_time_than');
                        }
                        text += $filter('translate')('other_time_7') + ' ' + $filter('translate')('other_time_months');
                        break;
                    case diff < 8:
                        text = prefix;
                        if (!short) {
                            text += $filter('translate')('other_time_than');
                        }
                        text += $filter('translate')('other_time_8') + ' ' + $filter('translate')('other_time_months');
                        break;
                    case diff < 9:
                        text = prefix;
                        if (!short) {
                            text += $filter('translate')('other_time_than');
                        }
                        text += $filter('translate')('other_time_9') + ' ' + $filter('translate')('other_time_months');
                        break;
                    case diff < 10:
                        text = prefix;
                        if (!short) {
                            text += $filter('translate')('other_time_than');
                        }
                        text += $filter('translate')('other_time_10') + ' ' + $filter('translate')('other_time_months');
                        break;
                    case diff < 11:
                        text = prefix;
                        if (!short) {
                            text += $filter('translate')('other_time_than');
                        }
                        text += $filter('translate')('other_time_11') + ' ' + $filter('translate')('other_time_months');
                        break;
                    case diff < 12:
                        text = prefix;
                        if (!short) {
                            text += $filter('translate')('other_time_1');
                        }
                        text += $filter('translate')('other_time_a_year');
                        break;
                    default:
                        if (prefixCopy == null) {
                            prefix = $filter('translate')('other_time_thereIsMore');
                        }
                        else {
                            prefix = prefixCopy + $filter('translate')('other_time_more');
                        }
                        text = prefix + $filter('translate')('other_time_than_short') + $filter('translate')('other_time_a_year');
                }
            }
            return text;
        }

        function getMonthsDiff(timestamp) {
            return moment().diff(timestamp, 'months');
        }
    }

}(window.angular));

