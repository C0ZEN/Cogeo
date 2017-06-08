# Les comptes

Ce chapitre concerne toutes les vues et leurs contenus pour la section *mon compte*.

## Compte [Global]

Contient toutes les données et vues relatives à l'utilisateur courant.

De la gestion du profil à la gestion des paramètres, l'utilisateur a accès à toutes ses informations et peut les modifier.

## Profil

`app/fr/account/profile`

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

## Profil - Edition du profil

`app/fr/account/profile/edit`

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

## Profil - Edition du mot de passe

`app/fr/account/profile/edit/password`

#### Description

Permet à l'utilisateur courant de modifier son mot de passe.

**Données à saisir:**

- Mot de passe actuel
- Nouveau mot de passe
- Confirmation du nouveau mot de passe

**Liens:**

- Sauvegarder et voir le profil

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

## Notifications - Edition des notifications

`app/fr/account/notifications/edit`

#### Description

Permet à l'utilisateur courant d'activé ou de désactivé ses notifications au cas par cas.

**Liens:** 

- Voir les notifications

## Paramètres

`app/fr/account/settings`

#### Description

Contient la liste de tous les paramètres liés à l'utilisateur courant.

**Types de paramètres:**

- Réseau
- Microphone
- Enceintes
- Autres paramètres

**Liens:** 

- Modifier les paramètres

## Paramètres

`app/fr/account/settings/edit`

#### Description

Permet à l'utilisateur courant de modifier ses paramètres.

**Paramètres éditables:**

- Réseau (ports)
- Microphone (volume)
- Enceintes (volume)
- Autres paramètres (chemin d'enregisteement et langue de Cogeo)

**Liens:** 

- Voir les paramètres
