# Le chat

Ce chapitre concerne toutes les vues et leurs contenus pour la section du *chat*.

## Chat [Global]

Contient toutes les données relatives aux chat et à sa gestion.

## Description

Le chat est composé en deux parties, les channels et les amis.

Certains événements sont en temps-réel grâce à l'utilisation de Peer.js.

**Chemin:** `app/fr/chat/[groupName]/[channelName]`  
**Chemin:** `app/fr/chat/[username]`

Les channels sont dans un contexte vert alors que les amis sont dans un contexte violet.

Cette vue est un ensemble de morceaux de vues.

En fonction des utilisateurs, certains morceaux seront donc cachés ou affichés.

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/chatChannel.png"
     alt="Capture d'écran d'un chat de channel"
     title="Chat channel"> 
         
<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/chatFriend.png"
     alt="Capture d'écran d'un chat entre ami"
     title="Chat ami"> 

## Liste des groupes

#### Description

Si l'utilisateur fait partie d'au moins un groupe, une colonne à gauche sera visible avec la liste des groupes pour lesquels il est membre.

Un seul groupe peut être actif à la fois.

Le groupe actif affichera alors les **channels** associés.

**Note:** s'il est banni ou expulsé du groupe, le groupe ne sera pas visible ni accessible.

## Colonne primaire

#### Description

A droite de la liste des groupes, une autre colonne est présente.

#### En-tête

Cette colonne contient tout d'abord un en-tête avec le nom du groupe actif.

Cet en-tête contient également le username de l'utlisateur courant ainsi que son **statut**.

#### Statut

L'utilisateur courant peut cliquer sur la pastille de statut pour changer son statut.

Les utilisateurs qui sont connectés à cet utilisateur vont alors recevoir une mise à jour du statut (temps réel) via Peer.js.

Liste des statuts:

- En ligne
- Absent
- Occupé
- Déconnecté

**Note:** par défaut, les utilisateurs sont toujours déconnecté s'ils ne lancent pas l'application. Une fois l'application lancée, le statut passe automatiquement en ligne.

#### Mise à jour des statuts

Les statuts sont toujours actualisés pour les utilisateur connectés puisqu'à chaque mise à jour du statut de l'utilisateur courant, les autres utilisateurs connectés sont informés de ce changement.

Lors d'une connexion, l'utilisateur va alors récupéré tous les statuts des utilisateurs connectés.

De cette façon, les statuts sont toujours légitimes.

#### Liste des channels

Une liste des channels associés au groupe actif est présente (si un groupe actif existe).

Seuls les channels dont l'utilisateur est membre et n'est pas expulsé ou banni sont visibles.

#### Tris des channels

Les channels peuvent être triés en deux catégorties, les favoris et les normaux.

Les channels favoris vont permettre d'y avoir un accès plus rapide.

Il suffit simplement de cliquer sur l'étoile à droite du nom du channel pour le modifier.

#### Liste des amis

Ensuite vient la liste des amis.

Encore une fois, seul les amis actifs sont visibles (pas les supprimés).

Ils sont séparés en deux listes, les bloqués et non bloqués.

#### Recherche

Un champ de recherche est disponible afin de chercher un channel ou un ami en particulier.

#### Vue

Il est possible de cacher cette colonne afin de gagner de la place pour le chat.

Un bouton est disponible en haut à droite de la colonne, dans l'en-tête.

Un bouton est également disponible dans la roue d'action du contexte.

## Contexte

#### Description

En fonction du contexte actif (channel ou ami), le contenu de l'en-tête au dessus des messages varie.

Dans le cas d'un channel, nous pourrons voir:

- Son nom
- Sa description
- Ses membres
- Si favori
- Etiquettes de l'utilisateur courant (membre, admin, créateur, etc...)

Dans le cas d'un ami:

- Son nom
- Son statut
- Faire un appel vidéo
- Faire un appel audio

Dans les deux cas, une roue d'action est également disponible pour permettre d'accéder à des éléments et des vues plus rapidement.

#### Messages

Dans certains cas, une vue partiel avec des messages peut-être visible.

Par exemple:

- Lorsque l'utilisateur sélectionné est bloqué (contexte ami)
- Lorsqu'il n'y a pas encore de message dans la conversation

## Appels audio et vidéo

#### Description

Lors d'une conversation dans le contexte ami, deux boutons sont visibles.

Un pour faire un appel vidéo, l'autre pour un appel audio.

Lorsque l'utilisateur courant clic sur un bouton d'appel, les boutons sont désactivés.

Un bouton est alors visible et permet d'arrêter l'appel.

#### Réception d'appel

L'utilisateur qui reçoit l'appel voit une popup s'ouvrir.

Il peut alors accepter ou décliner l'appel.

S'il décline, l'autre utilisateur sera alors averti.

S'il accepte, alors une nouvelle vue partielle s'affiche avec le stream des deux utilisateur (pour chacun des utilisateur, cette vue s'affiche).

#### Appel

Durant l'appel, nous pourrons voir à gauche le stream de l'utilisateur connecté et à droite celui de l'ami appelé.

Si la vidéo n'est pas disponible, l'image de profil remplacera alors le stream.

Des boutons d'actions permettent de modifier le volume, de muter les stream et de terminé l'appel.

Au survol des stream, l'utilisateur peut couper son micro ou couper le son du stream de l'ami appelé.

## Chat

#### Description

En bas de la vue, un champ et un bouton d'upload sont disponibles.

Ils vont permettrent aux utilisateurs de communiquer entre eux.

#### Message simple

Le champ permet l'envoi de message 'simple', de type texte.

Cela peut-être un message tout à faire simple comme plus complexe avec des features.

**Note:** appuiyer sur `Enter` pour envoyer un message.

L'utilisateur peut écrire des messages sur plusieurs lignes avec appuiyant sur `Maj + Enter`.

L'HTML5, le Markdown et les emoticons peuvent être également ajouter.

#### HTML5

Toutes les balises HTML5 peuvent être ajouter.

#### Markdown

Tous les types de Markdown ne sont pas reconnus, mais la majeure partie d'entre eux oui.

Par exemple, le gras, l'italique, le rayé, les titres, le code, etc...

#### Emoticons

Nous n'avons pas de liste d'emoticons pour le moment, mais plus de 700 emoticons sont disponibles (en anglais) avec une structure type `:emoticon:`.

#### Upload

Le bouton d'upload utilise les MIME types pour limiter le type d'éléments à uploadé.

La limite en taille est de 50MB.

La fonctionnalité de Drag & Drop est disponible.

#### Messages

Les messages ont tous un tronc commun:

- Le nom de l'utilisateur
- L'image de profil
- La date

Ensuite, le reste varie selon le type de message.

Voici la liste des documents uploadables et avec preview:

- Images (sauf GIF)
- Excel
- Word
- PowerPoint
- PDF
- MP3
- Videos

Chaque de ces élements peut être télécharger.

De plus, l'image possède une fonctionnalité de preview en plein écran.

#### BOT

Deux amis sont toujours disponibles, Spamobot et Friendybot.

Ils fonctionnent exactement de la même façons que les amis.

Vous pouvez leur demander de faire des actions en particulières comme par exemple:

- Dans un channel:
   - Bannir
   - Expulser
   - Débannir
- Dans une conversation privée:
   - Bloquer
   - Débloquer
   - Supprimer
- Une aide

Le plus simple est de saisir la commande suivante:

`@Spamobot /help`

Pour avoir plus d'informations sur ce que l'on peut faire.

Vous pouvez aussi parler à Friendybot (Spamobot ne vous répondra pas, c'est un rebel !).

Pour le moment, seul quelques messages tel que `bonjour`, `salut`, etc... vont le faire répondre.
     
<a href="{{ site.baseUrl }}front-end/others/" class="btn btn-green">Chapitre suivant: Autres vues</a>
