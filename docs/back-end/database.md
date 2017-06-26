# Bases de données

Cette partie expose nos choix technologiques en termes de persistance et manipulation des données.

# Mongo DB

Vous l'aurez compris, nous avons choisi la **MEAN stack** comme environnement technologique de prédilection, en effet, nos données seront stockées au format JSON grâce à **Mongo**. Nos données au sein de l'application étant toujours très contextualisées un format **NoSQL** de type object nous paraissait plus approprié que des tables respectant le principe d'atomicité du format SQL.

# Mongoose

Nous utiliserons ici **Mongoose** comme surcouche logicielle à **Mongo** car ce dernier offre davantage de consitance et permet de définir, valider, requêter, etc nos données de façon simple et maintenable en Javascript directement au sein de notre code métier.

<a href="{{ site.baseUrl }}back-end/web-rtc/" class="btn btn-green">Chapitre suivant: WebRTC</a>
