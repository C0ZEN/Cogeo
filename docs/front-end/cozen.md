# Librairie Cozen

Avant même de débuté le projet Cogeo, nous avons réaliser une librairie complètement indépendante.

Elle apporte énormément de fonctionnalités et produit le template de base pour Cogeo.

Cette librairie nous est utile également sur d'autres projets que Cogeo.

## Nos motivations

#### Un web obsolète

Le web, nativement, c'est tout simplement moche et très restrictif.

La majeure partie des composants sont complètement dépassés:

- Par un **design** digne des années 2000
- Par une **gestion** complexe et peu accessible
- Par une surcharge des browser qui rend la vie encore plus dur

En effet, le **design** date et les composants n'ont tout simplement pas été conçus pour être entièrement **personnalisables**.

L'interaction avec eux, même wrapper dans **Angular** reste bien trop peu complète.

Par conséquent, nous étions tout simplement obligés de recréer une bonne partie des composants par nos propres moyens.  

#### Une main de fer

Tout commence par la maîtrise du code et des événements.

Nous voulions absolument tout contrôler et **Angular** apporte un vrai plus à ce niveau.

La librairie s'adapte à la fois aux gestions view-model ainsi qu'à l'orienté event.

Les composants classiques du web ont ainsi pu être recodés (input, dropdown, popup, pagination, btn...).

#### Un design maîtrisé

C'est bien de contrôler nos composants.

Mais la maîtrise passe aussi par le design.

Ainsi, plutôt que d'utiliser les input HTML classiques, tel que upload, select, toggle, check...

Nous avons misés sur une solution en pure CSS.

Pour ne pas s'arrêter dans cette volontée de modularité, nous avons de suite mise en place des **thèmes**.

#### Une base pour tous

L'intérêt qui se cache également dérrière cette librairie est sa réutilisation.

Nous pouvons réutilisé cette librairie dans n'importe quel projet **Angular**.

Que ce soit pour profité de quelques features comme pour profité pleinement de ses capacités.

## Composants

Voyons un peu plus en détails de nos composants.

#### Composants

Les composants ont tous trois tailles (petit, normal, grand) et ce pour chaque thème.

Voici un listing complet de nos composants:

- `alert` permet de générer des alertes en tout genre
- `btn` réinvite le btn, avec loader et upload possible
- `btn-check` est une version en pure CSS du inupt check
- `btn-lazy-test` est un bouton fixed pour générer encore plus facilement le lazy load (disponible qu'en mode debug)
- `btn-radio` est une version en pure CSS du input radio
- `bgn-toggle` est une version en pure CSS du input toggle
- `dropdown` est une réécriture complète du select en pure CSS avec encore plus d'options (champs de recherches intégrés, injecton d'html...)
- `form` permet d'encapsuler le form angular afin de profité du form validator
- `icons` est une série d'icones légèrement améliorées
- `input` est une version ultra améliorée de l'input
- `list` est un composant pour réaliser des listes de différents types d'éléments
- `pagination` pour gérer efficacement la pagination
- `panel` est un composant pour réaliser des panels de différents types
- `pills` est un menu d'onglets
- `popup` qui gère l'utilisation de plusieurs types de popup
- `textarea` surcharge au même titre que l'input, un textarea
- `tooltip` utile à tous les composants pour réaliser des tooltip
- `view` qui est requis en tant que wrapper de l'application pour activer certains services communs aux composants

#### Services

Voici un listing des services les plus utiles à Cogeo:

- `lazyLoad` permet de générer des données aléatoirement et de remplir des formulaires en un simple clique (lazy...)
- `enhancedLogs` améliore le design et harmonise les log dans la console
- `http` surcharge le servbice de requête http afin d'améliorer la gestion des données retournées et des callback

#### Filtres

Nous en avons peu, mais ils sont tellement utiles pour nos applications !

#### Methods

Partie de l'idée que recodé toujours la même chose dans nos projets c'est mal,  
On a décidé de créer un fourre tout de snippet en tout genre !

Et on peut dire qu'elles nous servent !  

**Note:** en plus, elle sont disponibles même pour des projets sans **Angular** ! ;)

## Configuration

Toute la librairie est configurable de manière générale puisqu'elle utilise des variables globales stockées dans un service Angular.

C'est un peu comme le cerveau de l'application.

Pour éviter des erreurs, plusieurs provider sont disponibles afin de modifier la configuration initiale (avant l'éxécution de l'application).

Les données sont alors analysées pour éviter des erreurs potentielles.

Bien sûr, la configuration reste modifiable à n'importe quel moment, les variables du service étant publiques.

## Langues

La librairie utilise un système de traduction via du JSON.

La gestion des languages se fait directement via une factory issue d'un provider (de la **configuration**).

Actuellement, seul deux languages sont disponibles:

- Français
- Anglais

**Note:** la traduction n'est pas automatique, il faut configurer et passer les fichiers de languages au provider d'Angular translate.

## Thèmes

Tout comme les **langues**, les thèmes sont configurables via la **configuration**.

Les thèmes peuvent donc être modifier très simplement et ce sans rafraîchir la page.

Les thèmes sont générés via des mixins LESS, ce qui les rend parfaitement compatibles.

La maintenance et l'amélioration est d'autant plus simple.

Les composants utilisent les thèmes via leur HTML/CSS par conséquent, c'est très simple et sans conflit.

Trois thèmes sont actuellement disponibles même s'ils ne sont pas tous terminés:

- Atom (le plus abouti, utilisé par Cogeo)
- Tau
- Nolan

## Release

La Cozen librairie est incluse dans Cogeo.

Des tâches **Grunt** sont utilisées.

#### Grunt

La tâche `release` permet de générer un dossier **release** contenant une version minifiée et optimisée de la librairie.

C'est cette version qui est injectée dans Cogeo.

<a href="{{ site.baseUrl }}front-end/authentication/" class="btn btn-green">Chapitre suivant: Authentification</a>
