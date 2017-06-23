# Les comptes

Ce chapitre concerne toutes les vues et leurs contenus pour la section *mon compte*.

## Compte [Global]

Contient toutes les données et vues relatives à l'utilisateur courant.

De la gestion du profil à la gestion des paramètres, l'utilisateur a accès à toutes ses informations et peut les modifier.

## Profil

**Chemin:** `app/fr/account/profile`

#### Description

Contient toutes les informations du profil de l'utilisateur courant.

**Données visibles:**

- Nom
- Prénom
- Username
- Email
- Image de profil
- Description
- Groupes
- Date d'inscription

**Liens:** 

- Modifier le profil

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/accountProfile.png"
     alt="Capture d'écran du Profil"
     title="Profil">

## Profil - Edition du profil

**Chemin:** `app/fr/account/profile/edit`

#### Description

Contient toutes les informations du profil de l'utilisateur courant qui sont éditables par celui-ci.

**Données éditables:**

- Nom
- Prénom
- Email
- Image de profil
- Description

**Liens:**

- Voir le profil
- Changer de mot de passe

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/accountProfileEdit.png"
     alt="Capture d'écran de l'édition du profil"
     title="Edition du profil">

## Profil - Edition du mot de passe

**Chemin:** `app/fr/account/profile/edit/password`

#### Description

Permet à l'utilisateur courant de modifier son mot de passe.

**Données à saisir:**

- Mot de passe actuel
- Nouveau mot de passe
- Confirmation du nouveau mot de passe

**Liens:**

- Sauvegarder et voir le profil

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/accountProfileEditPassword.png"
     alt="Capture d'écran de l'édition du mot de passe"
     title="Edition du mot de passe">

## Notifications

`app/fr/account/notifications`

#### Description

Contient la liste de tous les paramètres liés aux notifications pour l'utilisateur courant.

**Types de notifications:**

- Notifications des groupes
- Notifications des channels
- Notifications sociales
- Autres notifications
- Notifications internes Cogeo

**Liens:** 

- Modifier les notifications

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/accountNotifications.png"
     alt="Capture d'écran des notifications"
     title="Notifications">

## Notifications - Edition des notifications

**Chemin:** `app/fr/account/notifications/edit`

#### Description

Permet à l'utilisateur courant d'activé ou de désactivé ses notifications au cas par cas.

**Liens:** 

- Voir les notifications

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/accountNotificationsEdit.png"
     alt="Capture d'écran de l'édition des notifications"
     title="Edition des Notifications">

## Paramètres

**Chemin:** `app/fr/account/settings`

#### Description

Contient la liste de tous les paramètres liés à l'utilisateur courant.

**Types de paramètres:**

- Réseau
- Microphone
- Enceintes
- Autres paramètres

**Liens:** 

- Modifier les paramètres

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/accountSettings.png"
     alt="Capture d'écran des paramètres"
     title="Paramètres">

## Paramètres

**Chemin:** `app/fr/account/settings/edit`

#### Description

Permet à l'utilisateur courant de modifier ses paramètres.

**Paramètres éditables:**

- Réseau (ports)
- Microphone (volume)
- Enceintes (volume)
- Autres paramètres (chemin d'enregisteement et langue de Cogeo)

**Note:** une popup permet de régler le microphone et une autre popup permet de testé le volume des enceintes.
**Note:** le chemin d'enregistrement ne devrait jamais être forcé par une application web selon les bonnes pratiques de sécurité. Par conséquent, il ne sert à rien pour le moment.

**Liens:** 

- Voir les paramètres

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/accountSettingsEdit.png"
     alt="Capture d'écran de l'édition des paramètres"
     title="Edition des paramètres">

## Historique

**Chemin:** `app/fr/account/log`

#### Description

Contient une liste d'événements liés aux interactions de l'utilisateur courant.  

Ces événements sont générés automatiquement par l'API en fonction des routes appellées.

#### Filtres

Cette vue contient plusieurs options pour filtrer l'affichage en cours.

Un champ de recherche, une pagination et des filtres sur la cagétorie, le nombre par page et l'ordre.

**Liens:** 

- Afficher l'historique complet (affiche tous les messages)

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/accountLog.png"
     alt="Capture d'écran de l'historique"
     title="Historique">

## Connexions

**Chemin:** `app/fr/account/logins`

#### Description

Contient une liste d'historique de connexions de l'utilisateur courant.

Ces événements sont générés automatiquement par le Front-End lorsque l'utilisateur se connecte via la page de connexion (username et mot de passe).

#### Filtres

Cette vue contient plusieurs options pour filtrer l'affichage en cours.

Un champ de recherche, une pagination et des filtres sur le nombre par page et l'ordre.

**Données visibles:**

- IP
- Hostname
- Localisation (pays, région, département et ville)
- Système (Type et version)
- Navigateur (Nom et version)
- Cogeo (version et langue)
- Date de connexion

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/accountLogins.png"
     alt="Capture d'écran de l'historique des connexions"
     title="Connexions">
     
<a href="{{ site.baseUrl }}front-end/social/" class="btn btn-green">Chapitre suivant: Social</a>
