/**
 * @description
 * Transform the text as lowercase and then add uppercase
 * Note: You should use yourText.trim() before calling the filter to avoid unexpected behavior
 *
 */
(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .filter('capitalize', capitalize);

    capitalize.$inject = [
        'PublicMethods'
    ];

    function capitalize(PublicMethods) {
        return capitalizeFilter;

        /**
         * @param {string}  text                  > The text you want to convert
         * @param {boolean} all           = false > Check for the whole text
         * @param {boolean} firstCharOnly = false > Capitalize only the first letter
         */
        function capitalizeFilter(text, all, firstCharOnly) {
            var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
            if (!PublicMethods.isNullOrEmpty(text)) {
                if (firstCharOnly) {
                    text = text.toLowerCase();
                    text = text.charAt(0).toUpperCase() + text.slice(1);
                }
                else {
                    text.replace(reg, function (txt) {
                        text = txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                    });
                }
                return text;
            }
            else {
                return '';
            }
        }
    }

})(window.angular);



