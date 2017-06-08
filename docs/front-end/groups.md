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
     alt="Capture d'écran de la modification du groupe"
     title="Modification du groupe">
     
<a href="{{ site.baseUrl }}front-end/groups/" class="btn btn-green">Chapitre suivant: Groupes</a>
