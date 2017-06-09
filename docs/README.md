# Cogeo

Une application très simple mais complète comme **Slack** et **Discord**.  
Tu peux gérer les groupes, les channels et les utilisateurs.

Le design est fait maison à 100%.  
La majeure partie des composants sont personnalisés (input, textarea, dropdown...).  
Nous avons un contrôle complet du comportement et du design via la librairie [Cozen](https://bitbucket.org/C0ZEN/cozen).

## A propos de Cogeo

Tu veux en savoir plus à propos de l'application Cogeo ?  
Alors cette partie est faite pour toi.

**Langages et Frameworks :**

- Front-End: AngularJS, HTML5, LESS, Electron, Grunt, Yeoman
- Back-End : NodeJS, Express, MongoDB, Mongoose, Heroku

**Librairie Cozen :**

Dans un premier temps, nous avons créé la librairie [Cozen](https://bitbucket.org/C0ZEN/cozen) pour (re)créer un grand nombre de composants web.

Cette librairie gère les traductions et la gestion des thèmes.  
De plus, elle nous donne un grand nombre de services génériques, des filtres et méthodes le tout pour améliorer la modularité de nos applications.

**Traductions disponibles :**

- English [en]
- Français [fr]

**Thèmes disponibles :**

- Atom

## Pour commencer

Avant tout, exécute la commande `npm install` pour installer les **node_modules** et les **bower_components**.

Utilise `grunt serve` pour démarrer l'application en mode développement.  
Cette tâche est utilisée pour démarrer un serveur node local, relancer le navigateur automatiquement quand les fichiers changent et évite également les erreurs CORS lors de l'utilisation des fichiers JSON (de traduction).

Utilise `grunt release` pour créer une version minifiée de Cogeo.  
Cette tâche est utilisée pour générer un dossier destiné à la production.

**Note:** il faut copier/coller le dossier **bower_components** à la racine de ce dossier.

Utilise `npm start` quand le dossier release est prêt pour démarrer une application lourd en live avec **Electron**.  
Ce script est utilisé pour faire une preview de ce que **Electron** nous donnera par la suite.

Utilise `npm package-[version]` pour créer les versions packagées de Cogeo avec **Electron**.

Voici la liste complète des versions de `npm package` :

- `package-all` pour créer tous les packages disponibles
- `package-win` pour créer le package Windows
- `package-lin` pour créer le package Linux

## Fait avec

* [Yeoman](http://yeoman.io/) - L'outil de scaffolding pour les applications web modernes
* [Angular](https://angular.io/) - Superheroic JavaScript MVW Framework
* [cozen](https://bitbucket.org/C0ZEN/cozen) - Librairie externe

## Documentation

Tu peux jeter un oeil à la documentation [documentation](https://c0zen.github.io/Cogeo/) générée par GitHub Pages.

Ces documentations ne sont là que pour expliquer nos choix et comment cela fonctionne, ce n'est donc pas une documentation technique.

## Contribuer

Prend du temps pour lire nos guidelines avant de rédiger la [documentation](CONTRIBUTING.md).

## Versions

Les versions sont gérées par nous même.

Tu peux jeter un oeil aux [tags pour ce repo](https://github.com/C0ZEN/Cogeo/tags).

## Auteurs

* **Geoffrey Testelin** - Développeur Front-End - [C0ZEN](https://github.com/C0ZEN)
* **Benoit Compere** - Développeur Back-End - [BenoitCompere](https://github.com/BenoitCompere)
* **Paul Verbeke** - Architecte - [paolovador](https://github.com/paolovador)

## License

Ce projet est sous la license de MIT - regarde [LICENSE.md](LICENSE.md) pour plus de détails.

## Remerciements

* [AdRoll UI Framework](https://dribbble.com/shots/2833155-AdRoll-UI-Framework) inspiré par [Mason Lee](https://dribbble.com/masonlee) 
