# Chat audio/video

Cette partie décrit nos choix technologiques en matière d'échanges de streams Audio/Vidéo.

# WebRTC

Depuis que **Google** a rendu open-source les technologies **WebTRC** et qu'il s'est engagé pour sa standardisation au sein de tous les navigateurs, ce protocole est devenu la référence en termes de *communication en temps réel*. Cette technologie est tellement complète que nous n'aurons plus l'utilité d'utiliser **SocketIO**, l'échange de données en temps réel y étant déjà géré.

# Peer JS

Si l'implémentation de **WebRTC** *from scracth* grâce aux API **getUserMedia**, **RTCPeerConnection**, et **RTCDataChannel** et relativement simple, s'agissant de protocoles de communication les procédures sont assez *carrées* et de nombreuses bibliothèques existent afin de simplifier la mise en place du code client.
Nous avons choisi **PeerJS** car il simplifie la manipulation des peers et des streams audio/video. De plus, il répond à la problématique des serveurs **TURN** et **STUN** qui auraiient été nécessaires à la phase de *signaling* préalable à la communication client-client.

<a href="{{ site.baseUrl }}back-end/bot-api/" class="btn btn-green">Chapitre suivant: Bot API</a>
