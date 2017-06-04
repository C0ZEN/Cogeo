# Technologies et outils

Dans ce chapitre, nous verrons rapidement toutes les technologies et outils dont nous nous servons pour réaliser notre librairie Cozen ainsi que notre application Cogeo.

## Technologies et langages

#### JavaScript

Nous avons choisis de faire nos applications en JavaScript.  
Plus précisément à l'aide du Framework **AngularJS**.

C'est une évidence pour nous de choisir des langages modernes qui facilitent la vie des développeurs tout en proposant de faire toujours mieux, toujours plus et en moins de temps.

#### AngularJS

Nous avions le choix entre Angular1, Angular2, ReactJS, Vue.js, Ember.js, MeteorJS...  
Mais le choix s'est porté à la fois sur une question d'habitudes et sur la **MEAN stack**.

Nous avons donc opté pour Angular.  
Ceci étant dit, il restait  à choisir la version (1 ou 2).

Avec la charge de travail et le nombre de dépendances pour ce projet, nous avons optés pour la version qui en possède le plus, c'est à dire la version 1 (1.6.4, version finale et stable).

Cette version apporte exactement les mêmes composants que la 2 (components).  
La seule différence majeure est TypeScript avec sa POO.

Autrement dit, la différence se faisait sur le confort de développement.

#### MEAN stack

La stack est l'ensemble des technologies pour réaliser des applications dans un environnement complet.  
Ici, on parle de MongoDB, Express, **AngularJS** et Node.JS.

Si ce terme existe, c'est pour une bonne raison.  
Réaliser des applications avec une stack est donc fortement recommandé.

Nous avons donc choisis la **MEAN stack** avec en plus comme middleware Mongoose.

#### Front

Nous utiliseons HTML5 pour réaliser le corps des pages.

LESS pour le design (CSS pré-compilé).

**Note:** LESS sera expliqué plus en détails à plusieurs reprises dans cette documentation.

#### Scaffolding

Le **Scaffolding** est la manière de concevoir l'architecture et l'arborescence des applications.

Bien entendu, pour q'une application soit modulable, son architecture doit être impeccable.  
Nous avons fait confiance à **Yeoman** pour traité ce sujet.

#### Yeoman

**Yeoman** c'est l'outil web de **scaffolding** pour des applications web modernes.  
Il aide à la création de projet en respectant les bonnes pratiques.

Nous avons utiliser le generator angular pour réaliser la structure de base de nos projets.  
Bien évidemment, nous avons nos préférences sur certains points et nous avons adapter la structure de base à nos exigences.

Ce generator utilise **Grunt** pour gérer les tâches.

#### Grunt

**Grunt** est simplement un JavaScript Task Runner, un outil vous permettant de créer des tâches automatisées en JavaScript.

Grâce à lui, on va pouvoir améliorer le confort de développement et faire des mises en productions beaucoup plus fiables et simples.

**Note:** un [chapitre](https://c0zen.github.io/Cogeo/front-end/grunt/) complet lui est dédié.

## Packages

Nous venons de cité **Grunt**.  
Celui si fonctionne via des modules node gérer par **npm**.

#### Npm

**Npm** est un gestionnaire de paquets node.

Il va permettre d'installer et de maintenir très facilement des modules node, qui seront utiliser par **Grunt** dans nos projets.

#### Bower 

Bower est l'équivalent de **npm** mais pour les paquets web.

On utilise dans Cogeo plus de 50 dépendances **bower**.  
Que ce soit pour installer **Angular** ou tout autre type de dépendance, nous passons par **bower**.

C'est beaucoup plus facile à maintenant et la gestion est d'autant plus automatisée via les tâches **Grunt**.

## Outils



<a href="{{ site.baseUrl }}front-end/technologies/" class="btn btn-green">Chapitre suivant: Technologies et outils</a>
