# Bot API

Ce chapitre contient les détails concernant le développement de notre **Intelligence Artificielle** à la base de nos Bots.
Nous aurons 2 bots, à savoir **Spamobot**, un informateur pas toujours sympathique, et **Friendybot**, assistant exemplaire et employé du mois depuis son embauche.

# Javascript Regexp

Notre stratégie a été de développer un analyseur de langage à base de **Regexp** compilées dynamiquement au runtime.
Ainsi chaque contenu textuel est parsé et nous pouvons agir stratégiquement dessus.
Cela nous permet entre autres de :

- Mentionner des noms d'utilisateurs. En effet les noms sont alors transformés en liens vers leurs profils.

- Permettre l'éxecution de commandes telles que **bannir**, **signaler**, **supprimer**, etc propres à l'administrateur du groupe. A noter qu'un message d'**aide** a même été développé.

- Converser avec un bot comme avec un assistant humain et pouvoir l'interroger à des sujets divers.

- Détecter du contenu offensant selon une liste de mots spécifiés.

## Remarque

Les dictionnaires de réponses ont été développés de façon minimaliste à des fins de présentation. Il suffit ensuite de les enrichir pour étendre les capacités de réponse du bot.

## Perspectives

L'Intelligence Artificielle étant un pôle de compétences au sein de Cogéo nous sommes à votre écoute pour tout développement spécifique.

<a href="{{ site.baseUrl }}back-end/developer-guide/" class="btn btn-green">Chapitre suivant: Guide à l'usage du développeur</a>
