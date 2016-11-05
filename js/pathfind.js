
//fonction vérifiant si une tile correspond à une position praticable pour le pathfinding
function tileValide(challenger, target){
	for (var i = 0; i < target.length; i++) {
		if((challenger.getX() >= target[i].getX()) && (challenger.getY() >= target[i].getY()) && (challenger.getX()+16  <= target[i].right()) && (challenger.getY()+16  <= target[i].bottom())){
				return true;
		}
	}
	return false;
}

// Fonction déterminant si un élément a déjà été vérifié, s'il est dans checkedTile
function isAlreadyChecked(element){
	if(checkedTile.length > 0){
		for(var i = 0; i < checkedTile.length; i++){
			if(checkedTile[i].getX() == element.getX() && checkedTile[i].getY() == element.getY()){
				return true;
			}
		}
	}
	return false;
}

// Fonction déterminant si un élément reste encore à vérifier, s'il est dans tileToCheck
function isNotYetChecked(element){
	if(tileToCheck.length > 0){
		for(var i = 0; i < tileToCheck.length; i++){
			if(tileToCheck[i].getX() == element.getX() && tileToCheck[i].getY() == element.getY()) {
				return true;
			}
		}
	}
	return false;
}

//le pathfinding !
function findYourWay(){
	//on réinitialise les tableaux, pour être sûr.
	tileToCheck.splice(0, tileToCheck.length);
	checkedTile.splice(0, checkedTile.length);
	finalPath.splice(0, finalPath.length);
	
	// On commence par vérifier si nos deux points sont placés.
	if(pathEnd.exist && pathStart.exist){

		/**
		 * Pour trouver le chemin du point de départ au point d'arrivée, 
		 * nous nous baserons sur l'algorithme A*
		 */

		// On récupère le canvas.
		var canvas = document.getElementById('myCanvas');;	

		// Liste de tiles à contrôler avant de les transférer à tileToCheck.
		var checkingTile = [];

		// Variable déterminant si le chemin a été trouvé (initialement à false)
		var pathFound = false;

		// La variable lowerIndex contiendra l'index de la Tile ayant l'indice "F" le plus bas.
		var lowerIndex = 0;

		// currentTile correspond à la Tile en cours de vérification.
		var currentTile;

		// Tile de départ.
		var beginTile = new Tile(pathStart.p_x, pathStart.p_y, 16, 16, null);

		// Tile d'arrivée.
		var endTile = new Tile(pathEnd.p_x, pathEnd.p_y, 16, 16, null);

		// On calcule les G, H et F de la Tile de départ
		beginTile.setG();
		beginTile.setH();
		beginTile.setF();

		// On ajoute la Tile de départ à tileToCheck
		tileToCheck.push(beginTile);

		// Tant qu'il y a des éléments dans tileToCheck à vérifier,
		while(tileToCheck.length > 0){
		
			//D'abord, on récupère la Tile avec la valeur F la plus basse dans tileToCheck
			// On initialise le lower index à 0.
			lowerIndex = 0;
			// Pour chaque tile de tileToCheck, on vérifie la valeur de F. Si elle est plus petite que les F précédents, on sauvegarde sa position dans "lowerIndex".
			for(var i = 0; i < tileToCheck.length; i++)
				if(tileToCheck[i].getF() < tileToCheck[lowerIndex].getF()){
					lowerIndex = i;
				}
			// Une fois trouvée, on place la tile dans la variable currentTile.
			currentTile = tileToCheck[lowerIndex];

			//On retire la Tile courante de tileToCheck
			tileToCheck.splice(lowerIndex, 1);

			//On ajoute cette même Tile à checkedTile
			checkedTile.push(currentTile);

			// Si la Tile courante est égale à la node d'arrivée
			if(currentTile.getX() == endTile.getX() && currentTile.getY() == endTile.getY()){
				// On passe la variable "pathFound" à true et on quitte la boucle.
				pathFound = true;
				break;
			}else{
				// On récupère les Tiles adjascente à la currentTile et on la stock dans checkingTile
				checkingTile = currentTile.tilesAround();

				// Pour chacune des Tiles trouvées nous allons effectuer une série de vérifications.
				for(var i = 0; i < checkingTile.length; i++){
					// Si la tile est présente dans l'écran.
					if(isOnScreen(checkingTile[i])){
						// Si elle ne fait pas parti de checkedTile...
						if(!isAlreadyChecked(checkingTile[i])){
							// On verifie si la Tile se trouve sur une Room ou une Door
							if(tileValide(checkingTile[i],rooms) || tileValide(checkingTile[i],doors)){
								// Si la Tile n'est pas dans tileToCheck
								if(!isNotYetChecked(checkingTile[i])){
									/* On définit la Tile courante comme parent 
									de la Tile validé plus haut.*/
									checkingTile[i].setParent(currentTile);
									// On calcule G, H, et F
									checkingTile[i].setG();
									checkingTile[i].setH();
									checkingTile[i].setF();
									// On fini par l'ajouter à tileToCheck.
									tileToCheck.push(checkingTile[i]);
								}
							}
						}
					}
				}
			}
		}

		/* Maintenant, on vérifie si la dernière Tile valide qu'on a
		trouvé correspond au point d'arrivée*/
		if(pathFound){
			/* On renverse checkedTile pour que la dernière Tile trouvée 
			(correspondant au point d'arrivée) se retrouve en index 0*/
			checkedTile.reverse();
			// On récupère la première Tile de la liste dans "Step"
			var Step = checkedTile[0];
			// On l'ajoute dans le chemin à parcourir "finalPath"
			finalPath.push(Step);
			// Tant que la Tile possède une Tile parent, on parcourt le tableau 
			while(Step.getParent() != null){
				// On garde en mémoire le parent et on l'ajoute au chemin
				Step = Step.getParent();
				finalPath.push(Step);
			}
			//Ensuite, on redéssine tout, pour avoir la signalisation du chemin trouvé.
			drawAll();

		//Si on n'arrive pas à trouver le point d'arrivée
		}else{
			// On averti le joueur que le processus a échoué
			document.getElementById("debugg").innerHTML = "Impossible de trouver le chemin !";
		}

	// Si les points d'arrivée et de départ ne sont pas en place...
	}else{
		document.getElementById("debugg").innerHTML = "Veuillez placer les points de départ et d'arrivée";
	}
	
}