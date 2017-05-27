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
            createPeer        : createPeer,
            createPeerBot     : createPeerBot,
            createPeerChannels: createPeerChannels,
            connectFriends    : connectFriends,
            connectChannels   : connectChannels,
            connectionSend    : connectionSend,
            destroyPeer       : destroyPeer,
            searchConnection  : searchConnection
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

        function createPeerChannels(groupId, channels) {
            channels.forEach(function (channel) {
                new Peer(groupId + '-' + channel._id, {
                    key  : '9o3h3bvbimivbo6r',
                    debug: 0
                });
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

                // Check if connection exist
                var connected = false;
                for (var user in peer.connections) {

                    // The connection exist
                    if (user == friend.username) {

                        // Check if at least one of the connection is still open
                        peer.connections[user].forEach(function (connection) {
                            if (connection.open) {
                                cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'The connection with', friend.username, 'is stilled opened');
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

                    // Listen open and other events
                    connection.on('open', function () {
                        cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'The connection with', friend.username, 'is now open');

                        // When a new message is posted
                        connection.on('data', function (data) {
                            cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'New data received with', connection.peer, 'connection');
                        });
                    });
                }
            });
        }

        function connectChannels(groupId, channels) {
            cozenEnhancedLogs.info.functionCalled('cogeoWebRtc', 'connectChannels');

            // For each channel
            channels.forEach(function (channel) {

                // Check if connection exist
                var connected = false;
                for (var user in peer.connections) {

                    // The connection exist
                    if (user == groupId + '-' + channel._id) {

                        // Check if at least one of the connection is still open
                        peer.connections[user].forEach(function (connection) {
                            if (connection.open) {
                                cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'The connection with channel', channel.name, 'is stilled opened');
                                connected = true;
                            }
                        });
                        break;
                    }
                }

                // The connection doesn't exist
                if (!connected) {

                    // Create the connection
                    var connection = peer.connect(groupId + '-' + channel._id);

                    // Listen open and other events
                    connection.on('open', function () {
                        cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'The connection with channel', channel.name, 'is now open');

                        // When a new message is posted
                        connection.on('data', function (data) {
                            cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'New data received with channel', connection.peer, 'connection');
                        });
                    });
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