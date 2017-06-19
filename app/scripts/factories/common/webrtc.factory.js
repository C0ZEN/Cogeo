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
        '$rootScope',
        'cozenFloatingFeedFactory'
    ];

    function cogeoWebRtc(CONFIG, $window, cozenEnhancedLogs, directMessagesFactory, $rootScope, cozenFloatingFeedFactory) {

        // Private data
        var peer;
        var peerId;
        var mediaConnection;
        var mediaStream;

        // Listener called when the user wish to start a call with a friend
        $rootScope.$on('cogeoWebRtc:callFriend', function ($event, $eventData) {

            // Try to get the media stream
            getMediaStream(function () {

                // Make a call
                mediaConnection = peer.call($eventData.friend, mediaStream);
                cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'Called ask for friend', $eventData.friend);
            });
        });

        // Listener called when the user accept the call
        $rootScope.$on('cogeoWebRtc:answerCall', function ($event, $eventData) {
            mediaConnection.answer(mediaStream);
            cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'Call answered');
        });

        return {
            createPeer      : createPeer,
            createPeerBot   : createPeerBot,
            connectFriends  : connectFriends,
            connectionSend  : connectionSend,
            destroyPeer     : destroyPeer,
            searchConnection: searchConnection,
            getMediaStream  : getMediaStream,
            listenData      : listenData
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
                listenData(newConnection);
            });

            // Listen for video calls
            peer.on('call', function (newMediaConnection) {
                mediaConnection = newMediaConnection;
                cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'You received a call');

                // Open the popup to accept or refuse the call
                getMediaStream(function () {
                    $rootScope.methods.showPopup(null, 'onCall', {
                        mediaConnection: mediaConnection,
                        mediaStream    : mediaStream,
                        username       : mediaConnection.peer,
                        type           : 'purple'
                    });
                });

                // When the call is answer, the stream is triggered
                mediaConnection.on('stream', function (stream) {
                    cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'The stream is live');
                    $('#stream').prop('src', URL.createObjectURL(stream));
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

                        if (!Methods.isNullOrEmpty(newConnection)) {
                            listenData(newConnection);
                        }
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

        function getMediaStream(successCallback) {

            // If the media stream wasn't set
            if (Methods.isNullOrEmpty(mediaStream)) {
                navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true
                }).then(function (newMediaStream) {
                    mediaStream = newMediaStream;
                    cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'We can start a media stream');
                    successCallback();
                }).catch(function () {
                    cozenEnhancedLogs.error.customMessage('cogeoWebRtc', 'We can not start a media stream');
                    cozenFloatingFeedFactory.addAlert({
                        type : 'error',
                        label: 'alerts_error_get_mediaStream'
                    });
                });
            }

            // If we already have a media stream
            else {
                successCallback();
            }
        }

        function listenData(newConnection) {
            if (!Methods.isNullOrEmpty(newConnection)) {

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
    }

})(window.angular);