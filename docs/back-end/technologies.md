# Technologies et outils

Ce chapitre contient nos choix en termes de technologies afin de répondre de manière adéquate aux besoins de l'application.

## Serveur HTTP

L'application étant principalement un chat la première décision que nous avons rapidement enterrinée pour la partie back-end fut d'utiliser **NodeJS**. D'une part pour ses performances et son côté non-bloquant, mais aussi pour ses framework **Express** et **SocketIO** qui nous semblaient tout adaptés pour ce cas d'utilisation.

## Base de données

Concernant le stockage des données, nous nous sommes orientés vers une base *NoSQL* de type *JSON* à savoir **MongoDB**, encore une fois ici pour ses performances et le fait que le type de données liées à une application de type chat y étaient parfaitement adaptées.
A noter que nous utiliserons le logiciel **Mongoose** pour interfacer notre base de données, ce dernier facilitant sa manipulation en donnant notamment davantage de consistance aux méthodes de creation de schéma et validations de données.

## Chat Audio/Vidéo

Pour permettre l'échange de streams audio/video, nous avons logiquement choisi d'utiliser **WebRTC**. Après avoir bien étudier les choix  multiples possibles nous avons choisi la librairie **PeerJS** afin de faciliter et uniformiser l'utilisation de cette technologie pour la majeure partie *client-client*.

## Bots & IA

Afin de créer des chatbots capables de dialoguer avec l'utilisateur et même de réaliser des actions d'administration nous créerons nous-même *from scratch* un analyseur de langage en Javascript utilisant des *Expressions Régulières* ainsi que des dictionnaires.

<a href="{{ site.baseUrl }}back-end/design-patterns/" class="btn btn-green">Chapitre suivant: Design Patterns</a>
