# Authentification

Cette section explique nos choix sur le système d'authentification ainsi que les règles de sécurité appliquées au Front.

Nous expliquerons également notre système de connexion automatique.

## Prérequis

Avant de faire quoi que ce soit, il faut bien évidemment s'inscrire.

## Inscription

**Chemin:** `app/fr/register`.

#### Description

L'utilisateur doit remplir six champs pour envoyé le formulaire:

- Nom
- Prénom
- Email
- Username
- Mot de passe
- Vérification du mot de passe

Comme pour tous les autres formulaires de Cogeo, le bouton *submit* est désactivé tant que le formulaire est incorrecte.

Ce système se base sur les expressions régulières, sur les champs requis et sur les limites min/max du nombre de caractères liés aux inputs.

**Note:** le bouton *submit* sera désactivé si les deux mots de passe ne sont pas identiques.

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/register.png"
     alt="Capture d'écran de l'inscription"
     title="Inscription">

#### Vérifications

Une première vérification est effectuée sur le username.  
> Si le username existe déjà, une erreur est levée.

Une seconde vérification est effectuée sur l'email.  
> Si l'email existe déjà, une erreur est levée.

#### Après inscription

Si la connexion s'est bien effectuée, une redirection vers `app/fr/account/details` est effectuée.

Puisqu'il s'agit d'une première inscription manuelle, une requête vers l'**historique des connexions** est envoyée.  

**Note:** cette requête alimente les *accessLogs*.  

## Connexion

**Chemin:** `app/fr/login`.

#### Description

Pour se connecter à Cogeo, il suffit de saisir un nom d'utilisateur ainsi qu'un mot de passe.  

**Note:** le nom d'utilisateur est unique.  
**Note:** le mot de passe est caché par des étoiles.

#### Vérifications

Une première vérification est effectuée pour s'assurer que le username existe en base.  
> Si le username n'existe pas, une erreur est levée.

Si le username existe, une vérication de la correspondance username/mot de passe est effectuée.
> Si le username et le mot de passe ne correspondent pas, une erreur est levée.

#### Après connexion

Si la connexion s'est bien effectuée, une redirection vers `app/fr/account/details` est effectuée.

Puisqu'il s'agit d'une connexion manuelle, une requête vers l'**historique des connexions** est envoyée.  

**Note:** cette requête alimente les *accessLogs*.  

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/login.png"
     alt="Capture d'écran de la connexion"
     title="Connexion">

#### Historique des connexions

L'**historique des connexions** est un journal des connexions effectuées.

Ces informations permettent à l'utilisateur de savoir ou et quand il s'est connecté.

Chaque connexion sauvegarde des informations sur l'utilisateur:

- IP
- Position
- OS
- Navigateur
- Version de Cogeo
- Langage courant
- Date de connexion

## Connexion automatique

Un système de connexion automatique a été mise en place.

En effet, lorsqu'un utilisateur ouvre l'application, une requête de connexion est envoyée au serveur.

Les informations envoyées au serveur dépendent du contenu en **local storage**.

#### Local storage

Lorsque qu'un utilisateur s'inscrit ou se connecte, son username et son **token de login** sont enregistrer en local.

Ces informations sont stockées dans le **local storage** pour une durée illimitée.

Cela permet de persister les données même lors de la fermeture du navigateur ou de l'ordinateur.

**Note:** si le **local storage** est vide, l'utilisateur sera considéré comme déconnecté dès l'ouverture de Cogeo.

#### Token de login

Le token de login est une clé **uuid** auto-générée par le serveur.

Elle permet d'identifier une connexion entre un utilisateur et le serveur à un moment donné.

Cette clé est vérifiée à chaque requête.

Cela permet dans un premier temps de s'assuré qu'il n'y est pas de session multiples pour un utilisateur donnée.   

Si la clé de l'utilisateur qui émet les requêtes est différente de celle qui est stockée sur le serveur, le serveur retourne une erreur.  
Cette erreur se traduit par une déconnexion automatique de l'utilisateur.

**Note:** cette clé est écrasée à chaque connexion.

## Déconnexion

#### Description

Lors d'une déconnexion, toutes les données de l'application seront supprimées:

- Les données contenus dans les factories
- Les données contenus dans le local storage
- La configuration de l'application sera réinitialisée avec les valeurs par défaut
- Les connexions aux peers seront fermées

L'utilisateur sera alors redirigé vers `app/fr/home`.

**Note:** les déconnexions s'effectuent à l'aide d'une popup.

<img class="atom-vertical-line"
     src="https://res.cloudinary.com/cozen/image/upload/v1496917978/cogeoDoc/logout.png"
     alt="Capture d'écran de la déconnexion"
     title="Déconnexion">

<a href="{{ site.baseUrl }}front-end/account/" class="btn btn-green">Chapitre suivant: Compte</a>
