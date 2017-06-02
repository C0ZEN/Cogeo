# Tâches Grunt

Grunt est un JavaScript Task Runner, un outil vous permettant de créer des tâches automatisées en JavaScript.  
Il est tout bonnement indispensable pour ce projet.

## Contexte

Globalement, nous utilisons beaucoup de tâches Grunt pour divers usages.  
Ci-dessous une liste de cas d'utilisations.

#### Configuration de la librairie Cozen

Les fichiers de configuration de la librairie Cozen sont à la base des fichiers JSON.

Afin de les rendres utilisables par les provider, une tâche Grunt s'occupe injecté ces données directement dans les fichiers JavaScript appropriés.

#### LESS vers CSS

Pour la réalisation des thèmes de la librairie Cozen, nous utilisons du LESS.  
Cogeo utilise également du LESS.

L'utilisation de mixins est un élément essentiel pour optimiser et maintenir le code ainsi que simplifier la création des thèmes.

LESS est un langage précompilé, ce qui implique une phase de compilation vers CSS.

Des tâches Grunt sont donc utilisées pour réaliser cette transformation.

#### Optimisation des images

Les images utilisées par l'application ne sont pas optimisées.

Une tâche Grunt s'occupe de minifier les images sans réduire leur qualité (compression).

#### Concaténation des langues

Les fichiers de traduction sont séparés par contexte logique et par langue.

Une tâche Grunt s'occupe de les concaténer afin que le provider d'Angular translate puisse les utiliser correctement.

## Développement

Lorsque nous développement le Front, nous devons obligatoirement utiliser une tâche Grunt.

#### JSON

Toutes les traductions sont issues de fichiers JSON.  
Ces fichiers ne peuvent être lu en localhost sans intervention d'un serveur.

Par conséquent, pour gagner du confort de développement, nous utilisons une tâche qui démarre un **serveur node** en local.

#### Serveur node

Le serveur node va donc occuper un port et va permettre de récupérer ces fichiers JSON.  

#### Grunt serve

En mode développement, il faudra donc exécuter la tâche `grunt serve`.

Cette tâche aura plusieurs fonctions:

- Démarre le **serveur node**
- Démarre un watcher (regarde les modifications sur les fichiers, éxécute des tâches appropriées, relance le browser)
- Injecte les bower_dependencies dans l'index.html
- Injecte les fichiers de production dans l'index.html
- Compile les langues
- Compile le CSS

## Production

Nous avons vu comment utiliser Grunt pour nous aider à développer.  
Voyons maintenant comment s'en servir pour générer notre version de production.

#### Grunt release

La tâche `grunt release` s'occupe de créer un dossier release.  
Ce dossier va contenir tous les fichiers nécessaires au bon fonctionnement de Cogeo.  
Ce dossier est bien sur destiné uniquement à la production.

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

<a href="{{ site.baseUrl }}front-end/npm/" class="btn btn-green">Chapitre suivant: Npm</a>
