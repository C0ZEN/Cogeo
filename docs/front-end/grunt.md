# Tâches Grunt

Grunt est un JavaScript Task Runner, un outil vous permettant de créer des tâches automatisées en JavaScript.  
Il est tout bonnement indispensable pour ce projet.

## Contexte

Nous avions besoin d'un outil pour aider à la fois dans notre développement mais également dans la gestion du projet.  
Alors que ce soit pour Cogeo ou pour la librairie Cozen, nous avons exploiter au maximum les tâches Grunt pour nous rendre la vie beaucoup plus facile et agréable.

Voyons maintenant de plus prêt ce à quoi va nous servir Grunt.

#### Configuration de la librairie Cozen

Les fichiers de configuration de la librairie Cozen sont à la base des fichiers JSON.

Afin de les rendres utilisables par les provider, une tâche Grunt s'occupe d'injecté ces données directement dans les fichiers JavaScript appropriés.

#### LESS vers CSS

Pour la réalisation des thèmes de la librairie Cozen, nous utilisons du LESS, au même titre que Cogeo d'ailleurs.

L'utilisation de mixins est un élément essentiel pour optimiser et maintenir le code ainsi que simplifier la création des thèmes.

LESS est un langage précompilé, ce qui implique une phase de compilation vers du CSS.

Des tâches Grunt sont donc utilisées pour réaliser cette transformation.

Au passage, le CSS sera amélioré afin d'ajouter les préfixes vendeurs.
Ces préfixes vendeurs sont indispensable à la réalisation d'applications web compatibles sur tous les navigateurs.

#### Optimisation des images

Les images utilisées par l'application ne sont pas optimisées.  
Elles sont volumineuses.

Etant donné que les images sont les plus gros facteurs de chargement lors d'une application, il est tout à fait pertinent d'optimiser au maximum ces images pour réduire le temps de chargement.

Par conséquent, une tâche Grunt s'occupe de minifier les images.  
Elles seront donc compréssées mais sans perdre de leur qualité (60%-90% d'octets en moins).

#### Concaténation des langues

Les fichiers de traduction sont séparés par contexte logique et par langue.

Une tâche Grunt s'occupe de les concaténer afin que le provider d'Angular translate puisse les utiliser correctement.

## Développement

Lorsque nous développement le Front, nous devons obligatoirement utiliser une tâche Grunt.  
Cela va faciliter les test de l'application et faire un pré-rendu de la version **release**.

#### JSON

Toutes les traductions sont issues de fichiers JSON.  
Ces fichiers ne peuvent être lu en localhost sans intervention d'un serveur.  
Cela vient de la nouvelle politique prise par les navigateurs pour se conformé au CORS.

Alors pour évité de devoir poussé le code sur un serveur avant de pouvoir testé nos changements, nous avons cherché une solution qui permettrait de rester en localhost pour gagné du temps et du confort.

Cette solution est une tâche Grunt qui démarre un **serveur node** en local.

#### Serveur node

Le serveur node va donc occuper un port et va permettre de récupérer ces fichiers JSON.  
Il répond parfaitement à nos besoins et est parfaitement adapté et bien sûr ultra rapide (les fichiers sont en local).

#### Grunt serve

En mode développement, il faudra donc exécuter la tâche `grunt serve`.

Cette tâche aura plusieurs fonctions:

- Injecte les bower_dependencies dans l'index.html
- Injecte les fichiers de production dans l'index.html
- Compile les langues
- Compile le CSS
- Démarre le **serveur node**
- Démarre un watcher
   - Regarde les changements sur les types de fichiers
   - Lorsque le focus est pris sur l'application en localhost
   - Exécute les tâches associées aux types de fichiers (ex: **LESS vers CSS**, **concaténation des langues**, ...)
   - Relance le navigateur une fois les tâches exécutées

## Production

Nous avons vu comment utiliser Grunt pour nous aider à développer.  
Voyons maintenant comment s'en servir pour générer notre version de production.

#### Grunt release

La tâche `grunt release` s'occupe de créer un dossier release.  
Ce dossier va contenir tous les fichiers nécessaires au bon fonctionnement de Cogeo dans sa version de production.  
Ce dossier est bien sur destiné uniquement à la production et ne doit pas être utiliser lors du développement.

Voyons maintenant en détails les étapes de cette tâche:

- Clean les dossiers (supprime les fichiers temporaires et le dossier release)
- Concaténation des langages puis ajout au dossier release
- Exportation et concaténation du LESS vers CSS
- Optimisation et minification du CSS et ajout de préfixes puis ajout au dossier release
- Transforme tous les templates HTML en JS puis minification
- Concaténation et minification de tous les fichiers JS en un seul fichier dans le dossier release
- Copie de toutes les autres ressources dans le dossier release
- Modification et export de l'index.html vers le dossier release
- Modifie le CSS pour rétablir les bons chemins des images
- Minifie toutes les images vers le dossier release

Il ne manque plus que la copie des bower_components et nous somme tout bon !

<a href="{{ site.baseUrl }}front-end/npm/" class="btn btn-green">Chapitre suivant: Scripts npm</a>
