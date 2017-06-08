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

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/groupsDetails.png"
     alt="Capture d'écran des détails du groupe"
     title="Détails du groupe">
     
<a href="{{ site.baseUrl }}front-end/groups/" class="btn btn-green">Chapitre suivant: Groupes</a>
