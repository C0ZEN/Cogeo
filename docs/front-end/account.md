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
- Nouveau mot de passe (x2)

**Liens:**

- Sauvegarder et voir le profil
