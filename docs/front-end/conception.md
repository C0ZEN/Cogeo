# Conception

Nous allons vous expliquer dans ce chapitre nos choix et nos exigences sur ce projet.

## Inspirations applicatives

Quoi de plus logique que de s'inspiré des meilleurs ?  
On ne fonce pas tête baissée !

Nous avons étudié la concurrence et voici notre compte-rendu.

#### Slack

**Slack** est un très bon example, c'est moderne, jolie, facile à utiliser et très complet.  

Cette simplicité est expliquée par le fait qu'une action désirée par un utilisateur est faisable par divers moyens.  
Autrement dit, ils offrent des raccourcis et beaucoup de contenu afin de satisfaire tout le monde.

C'est bien, mais on s'éloigne de plus en plus des fonctionnalités primaires, c'est à dire celle du chat.

Plusieurs facteurs positifs sont donc à retenir:

- UX
- UI
- Fonctionnalités du chat
- Back-Office complet

#### Discord

**Discord**, c'est une copie conforme de **Slack** avec (pour l'instant) moins de fonctionnalités.

Deux facteurs positifs sont à retenir:

- Design plus épuré et encore plus moderne
- Concentration sur le chat 

#### Conclusion

Après avoir étudié ce qui nous as plus dans **Slack** et **Discord**, nous avons décidé de faire une application avec un Back-Office complet mais uniforme ainsi qu'un chat axé sur des fonctionnalités primaires.

Bien entendu, un très bon UI/UX est requis dans un contexte très **user-friendly**.

## La maîtrise en facteur clé

Une application aussi complète que Cogeo requiert une maîtrise des composants du web.

Cela implique du travail supplémentaire pour faire en sorte de ne jamais se mettre d'obstacle lors de la conception et réalisation des features.

On ne voulait surtout pas se dire "on ne peut pas faire çà".

Alors pour y parvenir, on a tout simplement récréer notre propres composants !

#### Librairie Cozen

On en viens à la **librairie Cozen**.  
Cette librairie est le résultat de notre travail en ammont à Cogeo.

Une librairie qui permet de récrer à notre sauce tous les composants du web et tout les éléments génériques nécéssaire au bon fonctionnement de nos applications.  
C'est le cerveau/coeur de notre projet, une base en béton armée.

**Note:** un [chapitre](https://c0zen.github.io/Cogeo/front-end/cozen/) lui est dédiée.

## Un design à la pointe

Après avoir vu **Slack** et **Discord**, nous étions sous le charme bien évidemment.  
L'UI est sublime et l'UX qui va de pair est top !

Alors comment faire aussi bien ?  
Comment faire mieux ?

Nous avons des notions de design et de conception, mais nous ne sommes ni graphistes, ni concepteurs.  
Alors à notre habitude, nous nous reposons sur le savoir des autres, sur des experts.

#### Dribbble

**Dribbble** c'est LA communauté des graphistes.  

Alors on a cherché et on s'est inspiré.  
Finalement, on est tombé sur ce qu'il nous fallait.  
Une maquette UI pour un Framework.

Grâce au travail de [Mason Lee](https://dribbble.com/masonlee) sur [AdRoll UI Framework](https://dribbble.com/shots/2833155-AdRoll-UI-Framework), nous avons pu avoir une base solide pour notre design.

Bien entendu, nous ne faisons pas dans le copier-coller.  
Nous avons garder les bases, les couleurs, la police, les composants.

**Note:** le thème **Atom** pour notre librairie Cozen est le résultat de ce mockup.  
**Note:** un [chapitre](https://c0zen.github.io/Cogeo/front-end/design/) est dédiée au design.

## User-friendly

Nous aimons être proche des utilisateurs.  
C'est pourquoi être **user-friendly** était un élément important dans notre conception.

Nous n'aimons pas l'emploi du "vous", nous préférons tutoyer.

#### Humour

Nous aimons également ajouter une pointe d'humour, ce qui n'est pas aisé dans ce genre d'application.

Cependant, nous avons pu faire quelque chose d'assez intéressant avec les Bot. A découvrir !

<a href="{{ site.baseUrl }}front-end/technologies/" class="btn btn-green">Chapitre suivant: Technologies et outils</a>
