(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .factory('directMessagesFactory', directMessagesFactory);

    directMessagesFactory.$inject = [
        'httpRequest',
        '$rootScope',
        'cozenEnhancedLogs'
    ];

    function directMessagesFactory(httpRequest, $rootScope, cozenEnhancedLogs) {
        var messages = [];

        // Public functions
        return {
            subscribe    : subscribe,
            getMessages  : getMessages,
            updateMessage: updateMessage,
            addMessage   : addMessage,
            httpRequest  : {
                getMessages  : httpRequestGetMessages,
                addMessage   : httpRequestAddMessage,
                editMessage  : httpRequestEditMessage,
                removeMessage: httpRequestRemoveMessage
            }
        };

        function subscribe(scope, callback) {
            var handler = $rootScope.$on('directMessagesFactoryMessagesChanged', callback);
            scope.$on('$destroy', handler);
        }

        function _notify() {
            $rootScope.$emit('directMessagesFactoryMessagesChanged');
        }

        function getMessages(username1, username2, autoFetchFromDatabase) {
            var myMessages = {
                messages: []
            };
            if (Methods.isNullOrEmptyStrict(autoFetchFromDatabase)) {
                autoFetchFromDatabase = true;
            }
            for (var i = 0, length = messages.length; i < length; i++) {
                if ((messages[i].username1 == username1 && messages[i].username2 == username2)
                    || (messages[i].username1 == username2 && messages[i].username2 == username1)) {
                    myMessages = messages[i];
                }
            }

            // Get messages from database
            if (autoFetchFromDatabase) {
                httpRequestGetMessages({
                    username1: username1,
                    username2: username2
                }, function (response) {
                    updateMessage(response.data.data);
                });
            }

            return myMessages;
        }

        function updateMessage(newMessage) {
            for (var i = 0, length = messages.length; i < length; i++) {
                if (messages[i]._id == newMessage._id) {
                    messages[i].messages = newMessage.messages;
                    break;
                }
            }
            messages.push(newMessage);
            _notify();
        }

        function addMessage(messageId, newMessage) {
            for (var i = 0, length = messages.length; i < length; i++) {
                if (messages[i]._id == messageId) {
                    messages[i].messages.push(newMessage);
                    break;
                }
            }
            _notify();
        }

        /// HTTP REQUEST ///

        function httpRequestGetMessages(data, callbackSuccess, callbackError) {
            httpRequest.requestPost('direct-messages/get', data, callbackSuccess, callbackError)
                .then(function (response) {

                })
            ;
        }

        function httpRequestAddMessage(messageId, data, callbackSuccess, callbackError) {
            httpRequest.requestPost('direct-messages/' + messageId + '/add', data, callbackSuccess, callbackError)
                .then(function (response) {
                    addMessage(messageId, response.data.data);
                    cozenEnhancedLogs.explodeObject(response.data.data, true);

                    // The bot answered this message
                    if (!Methods.isNullOrEmpty(response.data.newBotMessage)) {
                        cozenEnhancedLogs.info.customMessage('directMessagesFactory', 'New bot message');
                        addMessage(messageId, response.data.newBotMessage);
                        cozenEnhancedLogs.explodeObject(response.data.newBotMessage, true);
                    }
                })
            ;
        }

        function httpRequestEditMessage(messageId, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('direct-messages/' + messageId + '/edit', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateMessage(response.data.data);
                })
            ;
        }

        function httpRequestRemoveMessage(messageId, data, callbackSuccess, callbackError) {
            httpRequest.requestPut('direct-messages/' + messageId + '/remove', data, callbackSuccess, callbackError)
                .then(function (response) {
                    updateMessage(response.data.data);
                })
            ;
        }
    }

})(window.angular);

