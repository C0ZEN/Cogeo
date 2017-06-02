# Authentification

Cette section explique nos choix sur le système d'authentification ainsi que les règles de sécurité appliquées au Front.  
Nous expliquerons également notre système de connexion automatique.

## Prérequis

Avant de faire quoi que ce soit, il faut bien évidemment s'inscrire.  
Aller vers *app/fr/register*.

## Connexion interne

Aller vers *app/fr/login*.  
Pour se connecter à Cogeo, il suffit de saisir un nom d'utilisateur ainsi qu'un mot de passe.  

__Note:__ le nom d'utilisateur est unique.  
__Note:__ le mot de passe est caché par des étoiles.

Comme pour tous les autres formulaires de Cogeo, le bouton __submit__ est désactivé tant que le formulaire est incorrecte.  
Ce système se base sur les expressions régulières, sur les champs requis et sur les limites min/max du nombre de caractères liés aux inputs.

### Vérifications

Après envoi du formulaire, une première vérification est effectuée pour s'assurer que le **username** existe en base.  
> Si le **username** n'existe pas, une erreur est levée.

Si le **username** existe, une vérication de la correspondance avec le mot de passe est utilisée.  
> Si le **username** et le mot de passe ne correspondent pas, une erreur est levée.

### Après connexion

Si la connexion s'est bien effectuée, une redirection vers *app/fr/account/details* est effectuée.

Puisqu'il s'agit d'une connexion manuelle, une requête de log d'accès est envoyée.  
Cette requête permet d'alimenter les *accessLogs*.  

Les *accessLogs* sont des informations sur l'utilisateur (IP, position, OS, navigateur, version et langue de Cogeo).  
Ces informations permettent à l'utilisateur de savoir ou et quand il s'est connecté pour la dernière fois.

## Connexion automatique
