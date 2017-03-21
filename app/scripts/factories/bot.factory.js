(function (angular) {
    'use strict';

    angular
        .module('4pjtApp')
        .factory('botFactory', botFactory);

    botFactory.$inject = [];

    function botFactory() {

        var bots = [
            {
                id     : 'spamobot',
                name   : 'Spamobot',
                color  : 'purple',
                picture: 'images/bot/Spamobot.png'
            },
            {
                id     : 'friendybot',
                name   : 'Friendybot',
                color  : 'green',
                picture: 'images/bot/Friendybot.png'
            }
        ];

        // Public functions
        return {
            getBots     : getBots,
            getBotByName: getBotByName
        };

        // Return the bots
        function getBots() {
            return bots;
        }

        // Find a bot by name
        function getBotByName(botName) {
            for (var i = 0, length = bots.length; i < length; i++) {
                if (bots[i].name == botName) {
                    return bots[i];
                }
            }
            return null;
        }
    }

})(window.angular);