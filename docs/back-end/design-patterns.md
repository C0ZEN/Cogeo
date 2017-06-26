# Design Patterns

Ce chapitre présente sur le plan développement logiciel les différents *Design Patterns* que nous avons utilisés.
Expliquer ces différents patrons n'étant pas le bur de cette documentation nous nous contenterons de lister de façon non exhaustive nos cas d'utilisation.

## Singleton

Au sein de notre application **Node**, à chaque fois que nous utilisons *module.export* puis *require* pour exporter/importer des fichiers.

## Observer

Lorsque **SocketIO** ou **PeerJS** crée un système d'émissions/abonnements d'évenements à travers des EventEmitter et les méthodes *call*, *on* et *emit*.

## Dependency Injection

Lorsqu'à travers **Mongoose** nous créons une instance de notre base de donnée mongo via sa référence.

## Middleware

Lorsque nous utilisons la fonction *app.use()* d'**Express** afin d'intercepter les requêtes et réponses.

## Stream & buffer

Lorsque nous manipulons des flots de bits pour les partages de données audio/video notamment grâce à **WebRTC**.

## Strategy

Pour l'implémentation de notre analyseur de langage lié à nos bots. Au runtime, le contenu textuel va déclencher tel ou tel algorithme en fonction de la **Regexp** validée.

### Remarque

En plus des différents patrons de conception listés ci-dessus nous nous sommes efforcés de toujours respecter les bonnes pratiques de programmation afin d'avoir un code performant et surtout maintenable.

<a href="{{ site.baseUrl }}front-end/node-server.md/" class="btn btn-green">Chapitre suivant: Serveur HTTP</a>
