
Module de Pathfinding avec éditeur de map simplifié

Cette application a été pensée pour fonctionner sur un navigateur web sans nécessiter de 
serveur. Toutes les fonctionnalités de ce module sont disponibles en local. 
Cette application a été testée sur les dernières versions de Chrome, Firefox et Edge. 
Cette application n'a pas été pensée pour fonctionner sur mobile. 

-------------------------------------------------------------------------------------------

Lorsque vous téléchargez le dossier du projet, veillez à ce que la tous ces éléments soient 
présents et ordonnés selon cette hiérarchie de dossier :

Racine du projet
  |
  -- js (contient tout les fichiers de script)
  |	  |
  |	  -- classe.js (contient toutes les classes utilisées dans le projet)
  |	  |
  |	  -- drawing.js (contient toutes les fonctions de dessin sur le canvas)
  |	  |
  |	  -- form_event.js (contient tout les événements liés aux objets et les actions qui y sont appliquées)
  |	  |
  |	  -- pathfind.js (contient les fonctions directement liées au pathfinding)
  |	  |
  |	  -- var.js (déclaration de toute les variables globales)
  |
  -- Pathfinding.html (page principale du module)
  |
  -- pathstyle.css (fiche de style)

-------------------------------------------------------------------------------------------

Choix de technologie :
L'application a été développée en HTML/Javascript pour assurer une certaine autonomie au module.
L'objectif est de proposer un module executable depuis n'importe quel poste de travail, sans nécessiter
de connexion internet. De plus, l'outil Canvas et les fonctions DOM sont plutôt adaptée à cet usage.