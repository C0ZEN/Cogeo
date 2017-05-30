(function (angular) {
    'use strict';

    angular
        .module('cogeoApp')
        .factory('cogeoWebRtc', cogeoWebRtc);

    cogeoWebRtc.$inject = [
        'CONFIG',
        '$window',
        'cozenEnhancedLogs'
    ];

    function cogeoWebRtc(CONFIG, $window, cozenEnhancedLogs) {

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
                key  : '9o3h3bvbimivbo6r',
                debug: CONFIG.internal.peerDebug
            });

            // Listen for the creation
            peer.on('open', function (id) {
                cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'Peer connection is now open');
            });

            // When other users connect to you
            peer.on('connection', function(connection) {

                // Listen for new message
                connection.on('data', function(data){
                    cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'New message received');
                    console.log(data);
                });
            });

            // Listen for close window or refresh
            $window.onbeforeunload = function () {
                destroyPeer();
            };
            return peer;
        }

        function createPeerBot(username) {
            new Peer(username, {
                key  : '9o3h3bvbimivbo6r',
                debug: 0
            });
        }

        function connectFriends(friends) {
            cozenEnhancedLogs.info.functionCalled('cogeoWebRtc', 'connectFriends');

            // For each friend
            friends.forEach(function (friend) {

                // Handle bots
                if (friend.username == 'Friendybot') {
                    friend.username = peerId + '-Friendybot'
                }
                else if (friend.username == 'Spamobot') {
                    friend.username = peerId + '-Spamobot'
                }
                else if (friend.username != peerId) {

                    // Check if connection exist
                    var connected = false;
                    for (var user in peer.connections) {

                        // The connection exist
                        if (user == friend.username) {

                            // Check if at least one of the connection is still open
                            peer.connections[user].forEach(function (connection) {
                                if (connection.open) {
                                    cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'The connection with', friend.username, 'is still opened');
                                    connected = true;
                                }
                            });
                            break;
                        }
                    }

                    // The connection doesn't exist
                    if (!connected) {

                        // Create the connection
                        var connection = peer.connect(friend.username);
                    }
                }
            });
        }

        function connectionSend(message) {
            cozenEnhancedLogs.info.functionCalled('cogeoWebRtc', 'connectionSend');
            var connection = searchConnection(message.targetedUsername);
            if (!Methods.isNullOrEmpty(connection)) {
                connection.send(message);
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