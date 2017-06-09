# Les groupes

Ce chapitre concerne toutes les vues et leurs contenus pour la section *des groupes*.

## Groupes [Global]

Contient toutes les données relatives aux groupes et à leurs gestions.

## Tous les groupes

**Chemin:** `app/fr/groups/all`

#### Description

Contient la liste de tous les groupes.

**Filtres:**

Cette vue contient plusieurs options pour filtrer l'affichage en cours.

Un champ de recherche, une pagination et des filtres sur le nombre par page, les groupes de l'utilisateur courant, les groupes de l'utilisateur courant lorsqu'il est admin, une vue condensée et l'ordre.

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/groupsAll.png"
     alt="Capture d'écran des groupes"
     title="Groupes">
     
## Détails d'un groupe

**Chemin:** `app/fr/groups/details/[groupName]`

#### Description

Contient tous les informations à propos du groupe.

**Données visibles:**

- Nom
- Image
- Description
- Créateur
- Date de création
- Date de dernière modification

Contient également une partie statistiques:

- Membres admins/non admins
- Membres actifs/expuslés/bannis
- Channels défauts/publics/privés
     
**Liens:**

- Modifier ce groupe (si admin)
- Rejoindre ce groupe (tout le monde)
- Quitter ce groupe (si plus d'un membre est actif)

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/groupsDetails.png"
     alt="Capture d'écran des détails du groupe"
     title="Détails du groupe">
     
## Modifier un groupe

**Chemin:** `app/fr/groups/edit/[groupName]`

#### Description

Contient tous les données modifiables pour ce groupe.

**Données modifiables:**

- Nom
- Description
- Image du groupe
     
**Liens:**

- Sauvegarder et voir les détails

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/groupsEdit.png"
     alt="Capture d'écran de la modification du groupe"
     title="Modification du groupe">
     
## Membres du groupe

**Chemin:** `app/fr/groups/members/[groupName]`

#### Description

Contient la liste de tous les membres du groupe.

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
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/groupsMembers.png"
     alt="Capture d'écran des membres du groupe"
     title="Membres du groupe">
     
## Invitations du groupe

**Chemin:** `app/fr/groups/invitations/[groupName]`

#### Description

Contient la liste des invitations du groupe.

Permet de voir qui envoie des invitations et si les invitations ont été acceptées, refusées ou sont toujours en attente.
     
**Filtres**

Cette vue contient plusieurs options pour filtrer l'affichage en cours.

Un champ de recherche, une pagination et des filtres sur le type d'invitation, le nombre par page et l'ordre.

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/groupsInvitations.png"
     alt="Capture d'écran des invitations du groupe"
     title="Invitations du groupe">
     
## Recruter des membres pour le groupe

**Chemin:** `app/fr/groups/recruit/[groupName]`

#### Description

Permet d'inviter des membres Cogeo à rejoindre le groupe.

Il est possible d'inviter les membres de trois manières:

- En partagant un lien d'invitation
- En invitant des membres Cogeo
- En invitant des utilisateur par mail (envoi de mail non implémenté)

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/groupsRecruit.png"
     alt="Capture d'écran du recrutement des membres d'un groupe"
     title="Recruiter des membres pour le groupe">
     
## Historique du groupe

**Chemin:** `app/fr/groups/log/[groupName]`

#### Description

Permet de consulter l'historique des événements du groupe.

L'historique contient toutes les données liées à la manipulation des données, des membres et des channels du groupe.

**Filtres**

Cette vue contient plusieurs options pour filtrer l'affichage en cours.

Un champ de recherche, une pagination et des filtres sur le type d'historique, le nombre par page et l'ordre.

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/groupsLogs.png"
     alt="Capture d'écran dde l'historique du groupe"
     title="Historique du groupe"> 
     
     
<a href="{{ site.baseUrl }}front-end/groups/" class="btn btn-green">Chapitre suivant: Groupes</a>
