# Les channels

Ce chapitre concerne toutes les vues et leurs contenus pour la section des *channels*.

## Channels [Global]

Contient toutes les données relatives aux channels et à leurs gestions.

## Description

Un channel fait toujours partie d'un groupe.

Il permet de communiquer au sein de celui-ci.

Un channel contient:

- Des membres (liste des membres du channel)
- Des historiques (voir les événements liés aux channels)

Les membres peuvent être de type:

- Créateur (tous les droits)
- Administrateur (droits d'expulser, de bannir, de débannir, de promouvoir et de rétrogradé les membres)
- Membre (aucun droit en particulier)

**Note:** les administrateurs n'ont aucun droit sur le créateur.  
**Note:** les droits du groupe ont un impact sur les droits des membres du channel.

Le channel peut-être privé ou public.

Les membres Cogeo qui veulent rejoindre un channel privé ne pourront pas sans invitation d'un membre.

Les channels peuvent être définit par défaut (au moins un obligatoire).

Les membres qui rejoignent le groupe rejoindront automatiquement tous les channels par défaut de ce groupe.

## Nouveau channel

**Chemin:** `app/fr/groups/[groupName]/channels/new`

#### Description

Permet la création d'un nouveau channel.

L'utilisateur pourra alors saisir:

- Un nom (requis)
- Une description
- Une image
- Définir en privé (ne peut pas être par défaut dans ce cas)
- Définir en defaut (ne peut pas être privé dans ce cas)

**Note:** le nom de channel par défaut est limité à 5.

**Liens:**

- Création du channel

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/channelNew.png"
     alt="Capture d'écran de la création d'un channel"
     title="Création d'un channel">

## Tous les channels

**Chemin:** `app/fr/groups/[groupName]/channels/all`

Il est important de noter que les onglets suivants ne sont pas accessibles si l'utilisateur n'a pas choisi de channel.

Il faut donc sélectionner un channel dans la liste des channels pour pouvoir avoir accès à plus d'onglets.

#### Description

Contient la liste de tous les channels.

**Filtres:**

Cette vue contient plusieurs options pour filtrer l'affichage en cours.

Un champ de recherche, une pagination et des filtres sur le nombre par page, les channels de l'utilisateur courant, les channels de l'utilisateur courant lorsqu'il est admin, seulement les channels privés, seulement les channels par défaut, une vue condensée et l'ordre.

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/channelsAll.png"
     alt="Capture d'écran des channels"
     title="Channels">
     
## Détails d'un channel

**Chemin:** `app/fr/groups/details/[channelName]`

#### Description

Contient tous les informations à propos du channel.

**Données visibles:**

- Nom
- Image
- Description
- Créateur
- Date de création
- Date de dernière modification
- Channel par défaut
- Channel privé

Contient également une partie statistiques:

- Membres admins/non admins
- Membres actifs/expulsés/bannis
     
**Liens:**

- Modifier ce channel (si admin)
- Rejoindre ce channel (si le channel n'est pas privé)
- Quitter ce channel (si plus d'un membre est actif)

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/channelsDetails.png"
     alt="Capture d'écran des détails du channel"
     title="Détails du channel">
     
## Modifier un channel

**Chemin:** `app/fr/groups/[groupName]/channels/edit/[channelName]`

#### Description

Contient tous les données modifiables pour ce channel.

**Données modifiables:**

- Nom
- Description
- Image du channel
- Channel privé
- Channel par défaut
- Channel favori (utilisaeur courant)
- Supprimer le channel (popup de sécurité)

**Note:** un channel favori permet à l'utilisateur courant d'y accéder plus facilement dans la partie chat.
     
**Liens:**

- Sauvegarder et voir les détails

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/channelsEdit.png"
     alt="Capture d'écran de la modification du channel"
     title="Modification du channel">
     
## Membres du channel

**Chemin:** `app/fr/groups/[groupName]/channels/members/[channelName]`

#### Description

Contient la liste de tous les membres du channel.

Permet également aux admins de gérer les membres.

**Note:** les membres expulsés et bannis sont également présent.

**Actions possibless:**

- Promouvoir (au rang d'administrateur)
- Rétrograder (au rang de membre - uniquement si créateur du groupe)
- Expulser (motif et durée exigé)
- Bannir (motif exigé)
- Débannir
     
**Filtres**

Cette vue contient plusieurs options pour filtrer l'affichage en cours.

Un champ de recherche, une pagination et des filtres sur le type de membre, le nombre par page et l'ordre.

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/channelsMembers.png"
     alt="Capture d'écran des membres du channel"
     title="Membres du channel">
     
## Invitations du channel

**Chemin:** `app/fr/groups/[groupName]/channels/invitations/[channelName]`

#### Description

Contient la liste des invitations du channel.

Permet de voir qui envoie des invitations et si les invitations ont été acceptées, refusées ou sont toujours en attente.
     
**Filtres**

Cette vue contient plusieurs options pour filtrer l'affichage en cours.

Un champ de recherche, une pagination et des filtres sur le type d'invitation, le nombre par page et l'ordre.

**Liens:**

- Inviter des membres

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/channelsInvitations.png"
     alt="Capture d'écran des invitations du channel"
     title="Invitations du channel">
     
## Recruter des membres pour le channel

**Chemin:** `app/fr/groups/[groupName]/channels/recruit/[channelName]`

#### Description

Permet d'inviter des membres Cogeo à rejoindre le channel.

**Note:** seul les membres pas encore inviter, pas encore membre et pas bannis sont disponibles.
**Note:** si l'utilisateur ne fait pas encore partie du groupe, il le rejoindra automatiquement ainsi que ses channels par défaut.

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/channelsRecruit.png"
     alt="Capture d'écran du recrutement des membres d'un channel"
     title="Recruiter des membres pour le channel">
     
## Historique du channel

**Chemin:** `app/fr/groups/[groupName]/channels/log/[channelName]`

#### Description

Permet de consulter l'historique des événements du channel.

L'historique contient toutes les données liées à la manipulation des données et des membres du channel.

**Filtres**

Cette vue contient plusieurs options pour filtrer l'affichage en cours.

Un champ de recherche, une pagination et des filtres sur le type d'historique, le nombre par page et l'ordre.

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/channelsLogs.png"
     alt="Capture d'écran dde l'historique du channel"
     title="Historique du channel"> 
     
     
<a href="{{ site.baseUrl }}front-end/chat/" class="btn btn-green">Chapitre suivant: Chat</a>
