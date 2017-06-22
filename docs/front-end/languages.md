# Langages

Nous voulions intégré un système de traduction.

Ce n'était pas demandé, c'était un défit technique et de l'autoformation.

Le système que nous avons retenu utilise des traductions issues de **fichiers JSON**.

C'est via le module **angular-translate** que nous pouvons traduire nos applications.

#### Angular translate

Module très complet qui offre de multiples configurations et de façon de traduire l'application (traduction par module, par JSON, par router, ...) via des directives, des filtres, etc...

L'un des gros avantage est également le fait de pouvoir remplacer des token dans nos clés de traduction.

**Note:** nous utilisons la version la moins sanitizée du module afin de pouvoir passer de l'HTML.

#### Fichiers JSON

L'intérêt d'avoir un système clé/valeur est bien entendu de pouvoir séparé les traductions du Front.

Nous passons des clés à l'HTML, et la valeur de cette clé va changée en fonction de la langue.

Ces fichiers sont de plus stockés dans un dossier *languages* pour centralisé les données.

Nous pouvons créer autant de fichiers JSON que l'on souhaite pour une langue donnée.  

Si l'on veut ajouter ou modifier une clé, il très facile de s'y repéré et d'y accéder.

**Note:** les langues sont de plus versionnalisées au même titre que Cogeo.

#### Languages

L'application est disponible en deux langues:

- Français
- Anglais

#### Gestion des langues

La **gestion des langues** est vaiment très simplifée.

Nous avons une structure de type *languages/[lang]/[fileName.json]*.

Le jour ou l'on souhaite ajouter une nouvelle langue, il faudra modifier quelques lignes de configuration dans la librairie Cozen et dans Cogeo.

Rien de bien difficile.

**Note:** les traductions entre Cogeo et la librairie Cozen sont indépendantes.

<a href="{{ site.baseUrl }}front-end/cozen/" class="btn btn-green">Chapitre suivant: Librairie Cozen</a>
