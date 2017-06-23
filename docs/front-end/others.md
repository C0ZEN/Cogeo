# Autres

Ce chapitre concerne toutes les autres informations et vues qui n'ont pas étaient expliqués jusqu'à présent.

## Popups

#### Description

Il existe plus de 38 **popups** différentes dans Cogeo.

Elles sont très utiles pour modifier ou afficher rapidement des informations ou effectuer des actions.

Certaines sont d'ailleurs totalement génériques et vont servir à plusieurs vues.

#### Popups avec filtres

Les **popups** liées aux filtres ont un système de sauvegarde automatique des données à leur fermeture.

En effet, nous voulions garder un maximum de rapidité lorsque l'utilisateur modifie les filtres d'une vue.

Par conséquent, dès que la popup se ferme, une requête s'exécute afin de sauvegarder les paramètres de l'utlisateur.

L'avantage est bien entendu la rapidité et d'être plus user-friendly.

**Note:** les paramètres des filtres sont donc sauvegarder dans les paramètres de l'utilisateur. Les modifications sur les filtres apportées par l'utilisateur persisteront entre ses multiples connexions.

#### Notifications

Nous avons optés pour un système de **notification** interne (même si le cahier des charges indique des notifications système).

Ce n'est pas le choix de la facilité, bien au contraire.

C'est beaucoup de travail et nous sommes vraiment satisfaits du résultat.

Ce choix montre une fois de plus notre volontée à faire de Cogeo une application 100% personnalisée avec un contrôle total des fonctionnalités et du design.

De plus, les **notifications** peuvent être régulées en fonction des paramètres de l'utilisateur pour cacher certains types de notifications (sauf les notifications d'erreur).

<a href="{{ site.baseUrl }}front-end/bower/" class="btn btn-green">Chapitre suivant: Bower</a>
