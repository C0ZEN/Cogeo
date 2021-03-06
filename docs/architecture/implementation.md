# Implémentation

Voici l'essentiel de nos implémentations au sein de l'architecture et des environnements.

Tout d'abord le choix de pfSense comme routeur et firewall afin de bien sécuriser l'accès à notre site depuis le web. pfSense étant reconnu comme un très grand routeur bien sécurisé.

<img class="atom-vertical-line"
     src="http://res.cloudinary.com/paolovador/image/upload/v1498531220/pfsense-logo_zhflry.png"
     alt="pfSense"
     title="pfSense">

Ensuite nous avons utilisé des environnements de travail sous Windows Server 2016. Le choix de se système d'exploitation s'est fait tout simplement par 3 critères:

 - le premier est tout simplement basé sur le quadrant magique de Gartner comparant les différents OS sur la sécurité et fiabilité.
 - le deuxième est basé sur notre expérience sur différents environnement de production.
 - enfin le dernier se base sur les compétences acquises au sein de notre entreprise sur l'ensemble des technologies Microsoft.

<img class="atom-vertical-line"
     src="http://res.cloudinary.com/paolovador/image/upload/v1498531220/windows-server-2016_q7cko4.png"
     alt="Windows Server 2016"
     title="Windows Server 2016">

Concernant les serveurs web. Afin de délivrer l'ensemble du front de notre application (dans le cas d'un accès sur le web bien évidemment) nous avons simplement utilisé le serveur web IIS 10 intégré avec Windows Server 2016, serveur web bien adapté à la taille de notre application.

<img class="atom-vertical-line"
     src="http://res.cloudinary.com/paolovador/image/upload/v1498531220/microsoft-logo_h8ozou.png"
     alt="IIS"
     title="IIS">

Afin de fournir la possibilité aux applications desktop et version web de Cogeo de pouvoir communiquer entre elles et intéragir avec l'ensemble des utilisateurs, nous avons mis en place une api tournant sous NodeJS.

<img class="atom-vertical-line"
     src="http://res.cloudinary.com/paolovador/image/upload/v1498531635/Picture2_pnhmze.png"
     alt="NodeJS"
     title="NodeJS">

Concernant la base de donnée sous Mongo, elle tournera sur un serveur MongoDB dans notre web serveur.

<img class="atom-vertical-line"
     src="http://res.cloudinary.com/paolovador/image/upload/v1498531634/Picture1_zmz04p.png"
     alt="MongoDB"
     title="MongoDB">

Voilà. Il faut savoir que pour faciliter le failover cluster et le network load balancing cluster de nos serveurs web, à ce afin d'également réduire les coûts d'infrastructures, chaque node de nos cluster sera un web serveur regroupant: IIS, NodeJS, MongoDB, le tout tournant sur un Windows Server 2016.

Et enfin, concernant les accès iSCSI entre les serveurs pour le stockage de données, nous avons utilisé une solution reconnue sur le marché Windows Server. Il s'aggit du logiciel Virtual SAN de la société StarWind. Il permet entre autre de pouvoir faciliter la gestion de drives iSCSI et autre drive partagés.

<img class="atom-vertical-line"
     src="http://res.cloudinary.com/paolovador/image/upload/v1498531220/StarWind_logo_Small-01_sft1cd.png"
     alt="StarWind"
     title="StarWind">

