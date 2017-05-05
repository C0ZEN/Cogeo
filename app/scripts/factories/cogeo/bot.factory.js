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
                picture: 'images/bot/Spamobot.png',
                role   : 'other_bot_spamobot_role'
            },
            {
                id     : 'friendybot',
                name   : 'Friendybot',
                color  : 'green',
                picture: 'images/bot/Friendybot.png',
                role   : 'other_bot_friendybot_role'
            }
        ];

        // Public functions
        return {
            getBots      : getBots,
            getBotById   : getBotById,
            getBotByName : getBotByName,
            getBotFriends: getBotFriends
        };

        // Return the bots
        function getBots() {
            return bots;
        }

        // Find a bot by id
        function getBotById(botId) {
            for (var i = 0, length = bots.length; i < length; i++) {
                if (bots[i].id == botId) {
                    return bots[i];
                }
            }
            return null;
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

        function getBotFriends() {
            return [
                {
                    blocked  : 0,
                    date     : 0,
                    givenName: "",
                    removed  : 0,
                    surname  : "",
                    username : "Friendybot",
                    alias    : ""
                },
                {
                    blocked  : 0,
                    date     : 0,
                    givenName: "",
                    removed  : 0,
                    surname  : "",
                    username : "Spamobot",
                    alias    : ""
                }
            ]
        }
    }

})(window.angular);