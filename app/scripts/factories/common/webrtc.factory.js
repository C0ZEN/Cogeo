(function (angular, window) {
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
        'cozenFloatingFeedFactory',
        'statusFactory'
    ];

    function cogeoWebRtc(CONFIG, $window, cozenEnhancedLogs, directMessagesFactory, $rootScope, cozenFloatingFeedFactory,
                         statusFactory) {

        // Private data
        var peer;
        var peerId;
        var mediaConnection;
        var mediaStream;

        // Subscribe to current user status change
        $rootScope.$on('statusFactoryChanged', function ($event) {
            sendUpdateStatusMessage(statusFactory.getCurrentUserStatus().index);
        });

        // Listener called when the user wish to start a call with a friend
        $rootScope.$on('cogeoWebRtc:callFriend', function ($event, $eventData) {
            $rootScope.$broadcast('cogeoWebRtc:setActiveFriendStream');

            // Try to get the media stream
            getMediaStream(true, true, function () {
                makeCall($eventData);
            });
        });

        // Listener called when the user wish to start a call audio with a friend
        $rootScope.$on('cogeoWebRtc:callFriendAudio', function ($event, $eventData) {
            $rootScope.$broadcast('cogeoWebRtc:setActiveFriendStream');

            // Try to get the media stream
            getMediaStream(true, false, function () {
                makeCall($eventData);
            });
        });

        // Listener called when the user wish to stop the call for a friend
        $rootScope.$on('cogeoWebRtc:stopCallFriend', function ($event, $eventData) {
            var connection = searchConnection($eventData.friend);
            if (!Methods.isNullOrEmpty(connection)) {
                connection.send({
                    tag     : 'stopCallFriend',
                    username: $eventData.friend
                });
                cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'Called stop for friend', $eventData.friend);
            }
        });

        // Listener called when the user accept the call
        $rootScope.$on('cogeoWebRtc:answerCall', function ($event, $eventData) {

            // Send a message to tell the other user to show his own stream
            var connection = searchConnection($eventData.username);
            if (Methods.isNullOrEmpty(mediaStream)) {
                getMediaStream(true, true, function () {
                    answer();
                })
            }
            else {
                answer();
            }

            function answer() {
                if (!Methods.isNullOrEmpty(connection)) {
                    var streamArray = [];
                    streamArray.push($eventData.mediaStream);
                    var streamBlob = new Blob(streamArray);
                    var newMessage = {
                        tag     : 'showFriendStream',
                        username: $eventData.username,
                        stream  : streamBlob
                    };
                    connection.send(newMessage);
                    cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'Called accepted for friend', $eventData.username);
                    cozenEnhancedLogs.explodeObject(newMessage, true);
                }

                // Start the media stream
                $rootScope.$broadcast('cogeoWebRtc:setActiveFriendStream', {
                    username: $eventData.username
                });
                mediaConnection.answer(mediaStream);
                cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'Call answered');
            }
        });

        // Listener called whe the user refuse the call
        $rootScope.$on('cogeoWebRtc:refuseCall', function ($event, $eventData) {
            var connection = searchConnection($eventData.username);
            if (!Methods.isNullOrEmpty(connection)) {
                connection.send({
                    tag     : 'refuseCallFriend',
                    username: $eventData.username
                });
                cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'Called refused for friend', $eventData.username);
            }
        });

        return {
            createPeer               : createPeer,
            createPeerBot            : createPeerBot,
            connectFriends           : connectFriends,
            connectionSend           : connectionSend,
            destroyPeer              : destroyPeer,
            searchConnection         : searchConnection,
            getMediaStream           : getMediaStream,
            listenData               : listenData,
            showStreamFriends        : showStreamFriends,
            makeCall                 : makeCall,
            sendUpdateStatusMessage  : sendUpdateStatusMessage,
            sendUpdateStatusMessageTo: sendUpdateStatusMessageTo,
            closeCall                : closeCall
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
                listenData(newConnection, function () {
                    sendUpdateStatusMessageTo(newConnection.peer, statusFactory.getCurrentUserStatus().index);
                });
            });

            // Listen for video calls
            peer.on('call', function (newMediaConnection) {
                cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'You received a call');
                mediaConnection = newMediaConnection;

                // Open the popup to accept or refuse the call
                getMediaStream(true, true, function () {
                    $rootScope.methods.showPopup(null, 'onCall', {
                        mediaConnection: mediaConnection,
                        mediaStream    : mediaStream,
                        username       : mediaConnection.peer,
                        type           : 'purple'
                    });
                    Methods.safeApply($rootScope);
                });

                // When the call is answer, the stream is triggered
                mediaConnection.on('stream', function (stream) {
                    showStreamFriends(stream);
                    cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'The stream is live');
                });

                // On close
                mediaConnection.on('close', function () {
                    cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'The stream is close');
                    cozenFloatingFeedFactory.addAlert({
                        type : 'info',
                        label: 'alerts_error_chat_mediaConnection_close'
                    });
                    $rootScope.$broadcast('cogeoWebRtc:closeCall');
                });

                // On error
                mediaConnection.on('error', function () {
                    cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'The stream encounter an error');
                    cozenFloatingFeedFactory.addAlert({
                        type : 'error',
                        label: 'alerts_error_chat_mediaConnection_error'
                    });
                    $rootScope.$broadcast('cogeoWebRtc:closeCall');
                });
            });

            // Listen for close window or refresh
            $window.onbeforeunload = function () {
                statusFactory.setCurrentUserStatus(3);
                sendUpdateStatusMessage(3);
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
                            listenData(newConnection, function () {
                                sendUpdateStatusMessageTo(friend.peerUsername, statusFactory.getCurrentUserStatus().index);
                            });
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
            else {
                cozenEnhancedLogs.error.customMessage('cogeoWebRtc', 'connectionSend failed');
            }
        }

        function destroyPeer() {
            cozenEnhancedLogs.info.functionCalled('cogeoWebRtc', 'destroyPeer');
            if (!Methods.isNullOrEmpty(peer)) {
                cozenEnhancedLogs.info.functionCalled('cogeoWebRtc', 'Go offline and destroy peer');
                sendUpdateStatusMessage(3, function () {
                    peer.disconnect();
                    peer.destroy();
                });
            }
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

        function getMediaStream(audio, video, successCallback) {
            cozenEnhancedLogs.info.functionCalled('cogeoWebRtc', 'getMediaStream');

            // If the media stream wasn't set
            if (Methods.isNullOrEmpty(mediaStream)) {
                var userMediaSettings = {
                    audio: Methods.isBoolean(audio) ? audio : true,
                    video: Methods.isBoolean(video) ? video : true
                };
                cozenEnhancedLogs.explodeObject(userMediaSettings, true);
                navigator.mediaDevices.getUserMedia(userMediaSettings).then(function (newMediaStream) {
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

        function listenData(newConnection, callback) {
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

                        // Stop the call
                        else if (data.tag == 'stopCallFriend') {

                            // Close the popup
                            $rootScope.methods.closePopup(null, 'onCall');

                            // Alert the user
                            cozenFloatingFeedFactory.addAlert({
                                type       : 'blue',
                                label      : 'alerts_info_call_stop',
                                labelValues: {
                                    username: data.username
                                }
                            });
                        }

                        // The call was refused
                        else if (data.tag == 'refuseCallFriend') {

                            // Alert the user
                            cozenFloatingFeedFactory.addAlert({
                                type : 'blue',
                                label: 'alerts_info_call_refused'
                            });
                            $rootScope.$broadcast('cogeoWebRtc:refusedCall');
                        }

                        // Display the view with the media
                        else if (data.tag == 'showFriendStream') {
                            cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'Show friend stream');
                            cozenEnhancedLogs.explodeObject(data, true);
                        }

                        // Update the status for the user
                        else if (data.tag == 'newStatus') {
                            cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'New status');
                            $rootScope.$broadcast('cogeoWebRtc:newStatus', {
                                statusIndex: data.statusIndex,
                                username   : data.username
                            });
                        }

                        else {
                            $rootScope.$broadcast('groupsFactory:newMessage', {
                                groupName  : data.groupName,
                                channelName: data.channelName,
                                newMessage : data.message
                            });
                        }
                    });

                    if (Methods.isFunction(callback)) {
                        callback();
                    }
                });
            }
        }

        function showStreamFriends(stream) {
            $rootScope.$broadcast('cogeoWebRtc:streamStarted', {
                mediaStream: mediaStream,
                stream     : stream
            });
            $('#user-stream').prop('src', (window.URL || window.webkitURL).createObjectURL(mediaStream));
            $('#friend-stream').prop('src', (window.URL || window.webkitURL).createObjectURL(stream));
            $rootScope.$broadcast('safeApplyChat');
        }

        function makeCall($eventData) {
            mediaConnection = peer.call($eventData.friend, mediaStream);
            cozenEnhancedLogs.info.customMessageEnhanced('cogeoWebRtc', 'Called ask for friend', $eventData.friend);

            // When the call is answer, the stream is triggered
            mediaConnection.on('stream', function (stream) {
                showStreamFriends(stream);
                cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'The stream is live');
            });

            // On close
            mediaConnection.on('close', function () {
                cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'The stream is close');
                cozenFloatingFeedFactory.addAlert({
                    type : 'info',
                    label: 'alerts_error_chat_mediaConnection_close'
                });
                $rootScope.$broadcast('cogeoWebRtc:closeCall');
            });

            // On error
            mediaConnection.on('error', function () {
                cozenEnhancedLogs.info.customMessage('cogeoWebRtc', 'The stream encounter an error');
                cozenFloatingFeedFactory.addAlert({
                    type : 'error',
                    label: 'alerts_error_chat_mediaConnection_error'
                });
                $rootScope.$broadcast('cogeoWebRtc:closeCall');
            });
        }

        function sendUpdateStatusMessage(statusIndex, callback) {
            if (!Methods.isNullOrEmpty(peer)) {
                for (var user in peer.connections) {
                    peer.connections[user].forEach(function (userConnection) {
                        if (userConnection.open) {
                            userConnection.send({
                                tag        : 'newStatus',
                                statusIndex: statusIndex, // Online
                                username   : peerId       // Current user username
                            });
                        }
                    });
                }
                if (Methods.isFunction(callback)) {
                    callback();
                }
            }
        }

        function sendUpdateStatusMessageTo(username, statusIndex) {
            var connection = searchConnection(username);
            if (!Methods.isNullOrEmpty(connection)) {
                connection.send({
                    tag        : 'newStatus',
                    statusIndex: statusIndex, // Online
                    username   : peerId       // Current user username
                });
            }
        }

        function closeCall() {
            mediaConnection.close();
            $rootScope.$broadcast('cogeoWebRtc:closeCall');
        }
    }

})(window.angular, window);