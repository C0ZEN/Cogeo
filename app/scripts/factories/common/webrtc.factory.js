(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .factory('cogeoWebRtc', cogeoWebRtc);

    cogeoWebRtc.$inject = [
        'CONFIG',
        '$window',
        'cozenEnhancedLogs',
        'directMessagesFactory',
        '$rootScope'
    ];

    function cogeoWebRtc(CONFIG, $window, cozenEnhancedLogs, directMessagesFactory, $rootScope) {

        // Private data
        var peer;
        var peerId;

        return {
            createPeer      : createPeer,
            createPeerBot   : createPeerBot,
            connectFriends  : connectFriends,
            connectionSend  : connectionSend,
            destroyPeer     : destroyPeer,
            searchConnection: searchConnection
        };

        function createPeer(username) {
            peerId = username;
            createPeerBot(username + '-Friendybot');
            createPeerBot(username + '-Spamobot');

            // Create the peer
            peer = new Peer(username, {
                key  : CONFIG.internal.peer.key,
                debug: CONFIG.internal.peer.debug
            });

            // Listen for the creation
            peer.on('open', function (id) {
                cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'Peer connection is now open');
            });

            // When other users connect to you
            peer.on('connection', function (newConnection) {
                cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'User', newConnection.peer, 'as established a connection with you');
            });

            // Listen for close window or refresh
            $window.onbeforeunload = function () {
                destroyPeer();
            };
            return peer;
        }

        function createPeerBot(username) {
            new Peer(username, {
                key  : CONFIG.internal.peer.key,
                debug: 0
            });
        }

        function connectFriends(friends) {
            cozenEnhancedLogs.info.functionCalled('cogeoWebRtc', 'connectFriends');

            // For each friend
            friends.forEach(function (friend) {

                // Handle bots
                if (friend.username == 'Friendybot') {
                    friend.peerUsername = peerId + '-Friendybot';
                }
                else if (friend.username == 'Spamobot') {
                    friend.peerUsername = peerId + '-Spamobot';
                }
                else if (friend.username != peerId) {

                    // Default username if empty
                    if (Methods.isNullOrEmpty(friend.peerUsername)) {
                        friend.peerUsername = friend.username;
                    }

                    // Check if connection exist
                    var connected = false;
                    for (var user in peer.connections) {

                        // The connection exist
                        if (user == friend.peerUsername) {

                            // Check if at least one of the connection is still open
                            peer.connections[user].forEach(function (connection) {
                                if (connection.open) {
                                    cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'The connection with', friend.peerUsername, 'is still opened');
                                    connected = true;
                                }
                            });
                            break;
                        }
                    }

                    // The connection doesn't exist
                    if (!connected) {

                        // Create the connection
                        var newConnection = peer.connect(friend.peerUsername);
                        cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'The connection with', friend.peerUsername, 'has been requested');

                        // Wait for the open state of the connection
                        newConnection.on('open', function () {

                            // Listen for new messages
                            newConnection.on('data', function (data) {
                                cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'New message received from', newConnection.peer, 'connection');

                                // Update the right factory
                                if (data.tag == 'friend') {
                                    directMessagesFactory.addMessage(data.messageId, data.message);
                                }
                                else {
                                    $rootScope.$broadcast('groupsFactory:newMessage', {
                                        groupName  : data.groupName,
                                        channelName: data.channelName,
                                        newMessage : data.message
                                    });
                                }
                            });
                        });
                    }
                }
            });
        }

        function connectionSend(newMessage) {
            cozenEnhancedLogs.info.functionCalled('cogeoWebRtc', 'connectionSend');
            var connection = searchConnection(newMessage.message.targetedUsername);
            if (!Methods.isNullOrEmpty(connection)) {
                connection.send(newMessage);
                cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'New message sent');
            }
        }


        function destroyPeer() {
            cozenEnhancedLogs.info.functionCalled('cogeoWebRtc', 'destroyPeer');
            peer.destroy();
        }

        function searchConnection(username) {

            // Check if connection exist
            var searchedConnection = null;
            for (var user in peer.connections) {

                // The connection exist
                if (user == username) {

                    // Check if at least one of the connection is still open
                    peer.connections[user].forEach(function (connection) {
                        if (connection.open) {
                            searchedConnection = connection;
                        }
                    });
                }
            }
            return searchedConnection;
        }
    }

})(window.angular);