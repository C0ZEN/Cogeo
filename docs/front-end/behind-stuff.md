# Autres informations

Ce chapitre concerne toutes les autres informations qui peuvent être cachées mais qui restent importantes.

## Sécurité des formulaires

#### Description

Chaque formulaire est est sécurisé contre l'envoi de mauvaises données.

#### Inputs

Les inputs (input, textarea, bouton d'upload, ...) sont tous sécurisés par des expréssions régulières.

De plus, nous ajoutons toujours des limites au nombre de caractères (min et max) ainsi que des champs requis quand cela est nécéssaire.

#### Submit

Le bouton de submit (de validation des formulaires) est lui aussi toujours sécurisé.

Il est désactivé tant que tous les champs du formulaire ne sont pas valides.

#### UI

Cela permet également d'ajouter de l'interaction avec les utilisateurs.

C'est très visuel (rouge si erreur, vert si succès) et l'utulisateur peut toujours savoir très facilement quel champ est incorrect.

De plus, certains champs ont des tooltip pour aider à mieux comprendre leur utilité.

## Upload

#### Description

Toutes les images et autres formes de médias uploadé dans Cogeo sont envoyés sur un compte dédié **Cloudinary**.

#### Cloudinary

Cloudinary est une API d'upload de documents et de médias, peu honéreux et très performant.

Ils ont un système de data-mining qui permet d'obtenir beaucoup d'informations sur les documents uploadés.

**Note:** ces informations sont d'ailleurs très utiles dans le chat.

De plus, cette API permet de forger des requêtes avec des paramètres afin de transformer les médias pour les améliorer, les modifier ou encore tout simplement optimisé les requêtes HTTP pour gagner du temps.

Autrement dit, ils ont fait du très bon travail et nous avons décidé d'utilisé cette API à la place d'un CDN interne.

Ceci étant dit, cela n'empêche pas que nous pouvons à tout moment envoyé les médias sur notre CDN si vous le souhaitez.

L'idée est de continuer à exploiter leur data-mining, ensuite, une fois le blob reçu, nous pouvons l'ajouter n'importe ou !

<a href="{{ site.baseUrl }}front-end/bower/" class="btn btn-green">Chapitre suivant: Bower</a>
