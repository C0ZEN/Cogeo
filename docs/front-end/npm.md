# Scripts npm

Après avoir obtenu le dossier release produit par la tâche `grunt release` du chapitre précédent, nous pouvons exécuter des scripts npm pour aller encore plus loins dans les versions de production.

## Electron

**Electron** permet de créer des applications multi-platformes pour le bureau à partir de Javascript, HTML et CSS.  
Nous utilisons **Electron** pour permettre à nos utilisateurs d'avoir une version bureau de Cogeo.

Ce qui veut dire qu'à la fin de ce chapitre, vous pourrez utiliser Cogeo à la fois sur le Web et sur votre ordinateur.

#### Preview

Un premier script permet de testé en live la version qui sera livrée par **Electron**.  
Cela permet de gagner du temps sur les test.

La commande `npm start` permet d'éxécuter ce script.  

**Note:** si le dossier release n'est pas complet, le résultat produit sera complètement inutilisable.

Ce script va donc automatiquement transformer la version release en version de bureau.  
La version de bureau va automatiquement s'ouvrir.

**Note:** la version produite est liée au système qui exécute le script (windows x64 pour ma part).

#### Production

Après avoir testé que la version **preview** fonctionne correctement, vous pouvez passer à la prochaine et dernière étape qui consiste à réaliser les versions de production pour toutes les plateformes.

La commande `npm run package-all` s'occupe de générer un dossier qui contiendra toutes les versions de production.

Ce script utilise **electon-packager** pour réaliser les multiples versions.

**Note:** le dossier de sortie s'intitule *release-app* et lui même contiendra des sous-dossiers nommés en fonction des version *cogeo-app-[platform]-[arch]*

#### Electron packager

C'est cette dépendance qui s'occupe de générer les versions.  
Actuellement, le script en génère trois (Windows 32/64bits et Linux 32bits).

Il est tout à fait possible de modifier le script pour obtenir encore plus de versions.  
**Electron packager** nous aide, mais nous sommes en charge de la configuration du script.
