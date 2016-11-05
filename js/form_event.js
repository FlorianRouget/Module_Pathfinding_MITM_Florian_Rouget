
/**
 *	Fonction de test de placement : vérifie qu'un objet n'est pas superposé à un autre
 */
function anyOverlapping(challenger, target){
	for (var i = 0; i < target.length; i++) {
		if(((challenger.right() >= target[i].getX()) && (challenger.bottom() >= target[i].getY()) && (challenger.getX()  <= target[i].getX()) && (challenger.getY()  <= target[i].getY())) || ((challenger.getX()  <= target[i].right()) && (challenger.bottom() >= target[i].getY()) && (challenger.right() >= target[i].right()) && (challenger.getY()  <= target[i].getY())) || ((challenger.getX()  <= target[i].right()) && (challenger.getY()  <= target[i].bottom()) && (challenger.right() >= target[i].right()) && (challenger.bottom() >= target[i].bottom())) || ((challenger.right() >= target[i].getX()) && (challenger.getY()  <= target[i].bottom()) && (challenger.getX()  <= target[i].getX()) && (challenger.bottom() >= target[i].bottom()))){
			return true;
		}else if(((challenger.getX() <= target[i].right()) && (challenger.right() >= target[i].right()) && (challenger.getY()  >= target[i].getY()) && (challenger.bottom()  <= target[i].bottom())) || ((challenger.getX() <= target[i].getX()) && (challenger.right() >= target[i].getX()) && (challenger.getY()  >= target[i].getY()) && (challenger.bottom()  <= target[i].bottom())) || ((challenger.getX() >= target[i].getX()) && (challenger.getX() <= target[i].right()) && (challenger.getY()  <= target[i].getY()) && (challenger.bottom()  >= target[i].getY())) || ((challenger.getX() >= target[i].getX()) && (challenger.getX() <= target[i].right()) && (challenger.getY()  <= target[i].bottom()) && (challenger.bottom()  >= target[i].bottom()))){
			return true;
		}else if((challenger.getX() >= target[i].getX()) && (challenger.getY() >= target[i].getY()) && (challenger.right()  <= target[i].right()) && (challenger.bottom()  <= target[i].bottom())){
			return true;
		}
	}
	return false;
}

/**
 *	Fonction de test de placement : vérifie qu'une Door est bien placée contre une Room
 */
function doorWellPlaced(challenger, target){

	for (var i = 0; i < rooms.length; i++) {
		if(
		((challenger.getAngle() == "verticale") && (challenger.right() == target[i].getX()) && (challenger.getY() >= target[i].getY()) && (challenger.bottom() <= target[i].bottom())) ||
		((challenger.getAngle() == "verticale") && (challenger.getX() == target[i].right()) && (challenger.getY() >= target[i].getY()) && (challenger.bottom() <= target[i].bottom())) ||
		((challenger.getAngle() == "horizontale") && (challenger.bottom() == target[i].getY()) && (challenger.getX() >= target[i].getX()) && (challenger.right() <= target[i].right())) ||
		((challenger.getAngle() == "horizontale") && (challenger.getY() == target[i].bottom()) && (challenger.getX() >= target[i].getX()) && (challenger.right() <= target[i].right()))
		){
			return true;
		}
	}
	return false;
}

/**
 * Fonction de test de placement, vérifie que le point d'arrivé ou de départ est
 * bien placé dans une Room
 */
function nodeWellPlaced(target,xx,yy){

	for (var i = 0; i < rooms.length; i++) {
		if((xx >= rooms[i].getX()) && (yy >= rooms[i].getY()) && (xx+16  <= rooms[i].right()) && (yy+16  <= rooms[i].bottom())){
			if((xx != target.p_x) || (yy != target.p_y)){
				return true;
			}
		}
	}
	return false;
}

/**
 *	Fonction de test de placement, vérifie qu'un objet est bien à l'intérieur du Canvas
 */
function isOnScreen(target){
	return ((target.getX() >= 0) && 
			(target.getY() >= 0) && 
			(target.getX() < 512) && 
			(target.getY() < 512));
}

/**
 *	Destruction d'un objet sur lequel on clique
 */
function destroyObject(target){
	for (var i = 0; i < rooms.length; i++) {
		if((target[1] >= rooms[i].getX()) && (target[2] >= rooms[i].getY()) && (target[1]  <= rooms[i].right()) && (target[2]  <= rooms[i].bottom())){
			rooms.splice(i, 1);
		}
	}
	
	for (var i = 0; i < doors.length; i++) {
		if((target[1] >= doors[i].getX()) && (target[2] >= doors[i].getY()) && (target[1] <= doors[i].right()) && (target[2]  <= doors[i].bottom())){
			doors.splice(i, 1);
		}
	}
}

 
/**
 *	En cas de changement de type d'input
 */
function changeInputShown(){
	var myCode = InputTypeEnum.properties[document.getElementById("input_type").value].name; 
	document.getElementById("indic_input").innerHTML = "Type d'input : " + myCode;
}
/**
 * Evénement appelé lorsque la valeur de la slidebar "width" est changée.
 */
function changeWidth(){
	var myCode = document.getElementById("width").value * 16;
	document.getElementById("indic_width").innerHTML = "Largeur : " + myCode + "px";
}
/**
 * Evénement appelé lorsque la valeur de la slidebar "height" est changée.
 */
function changeHeight(){
	var myCode = document.getElementById("height").value * 16;
	document.getElementById("indic_height").innerHTML = "Hauteur : " + myCode + "px";
}


/**
 *	Gestion de la position de la souris sur le canvas
 */ 
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: Math.round((evt.clientX-rect.left)/(rect.right-rect.left)*canvas.width),
		y: Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height)
	};
}

/**
 *	Lorsque la souris survole le canvas
 */
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
canvas.addEventListener('mousemove', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	context.clearRect(0, 0, canvas.width, canvas.height); //on clean le canvas
	drawAll(); //on redéssine tout ce qu'il y a à redéssiner
	
	//on utilise un switch pour dessiner un curseur de la taille de l'objet qu'on peut placers
	switch (document.getElementById("input_type").value){
		case '1':
			drawCursor(Math.floor(mousePos.x/16)*16, Math.floor(mousePos.y/16)*16, (document.getElementById("width").value)*16, (document.getElementById("height").value)*16);
		break;
		case '2':
			var angle = document.getElementsByName('door_angle');
			if (angle[0].checked){
				drawCursor(Math.floor(mousePos.x/16)*16, Math.floor(mousePos.y/16)*16,32,16);
			}else{
				drawCursor(Math.floor(mousePos.x/16)*16, Math.floor(mousePos.y/16)*16,16,32);
			}
		break;
		case '3':
			drawCursor(Math.floor(mousePos.x/16)*16, Math.floor(mousePos.y/16)*16,16,16);
		break;
		case '4':
			drawCursor(Math.floor(mousePos.x/16)*16, Math.floor(mousePos.y/16)*16,16,16);
		break;
		case '5':
			drawCursor(Math.floor(mousePos.x/16)*16, Math.floor(mousePos.y/16)*16,16,16);
		break;
		default: document.getElementById("debugg").innerHTML = "erreur d'input";
	}
	
}, false);


/**
 *	En cas de clic sur le canvas
 */
canvas.addEventListener('click', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	
	//on utilise le tableau Objdata pour recueillir des valeurs pour un futur placement
	Objdata[0] = document.getElementById("input_type").value; 	//type d'input
	Objdata[1] = Math.floor(mousePos.x/16)*16; 					//position x de la souris
	Objdata[2] = Math.floor(mousePos.y/16)*16;					//position y de la souris
	Objdata[3] = (document.getElementById("width").value)*16;	//valeur du slider width
	Objdata[4] = (document.getElementById("height").value)*16;	//valeur du slider height
	
	//En fonction du type d'input, on va essayer de placer différents objets
	switch (Objdata[0]){
		case '1': 
			//candidat à la création
			var newRoom = new Room(Objdata[1],Objdata[2],Objdata[3],Objdata[4]);
			
			if(rooms.length > 0){
				//si la Room candidate ne survole pas d'autres Room, alors on peut la créer
				if(anyOverlapping(newRoom, rooms) == false){
				rooms.push(newRoom);
				draw(rooms[rooms.length-1].t_x,
					rooms[rooms.length-1].t_y,
					rooms[rooms.length-1].t_width,
					rooms[rooms.length-1].t_height,
					'#B011B0');
				}else{
					document.getElementById("debugg").innerHTML = "On ne place pas une Room sur une autre !";
				} 
			}else{
				rooms.push(newRoom);
				draw(rooms[rooms.length-1].t_x,
					rooms[rooms.length-1].t_y,
					rooms[rooms.length-1].t_width,
					rooms[rooms.length-1].t_height,
					'#B011B0');
			}
			
			//on libère la variable newRoom
			newRoom = {};
		break;
		case '2': 
			var angle = document.getElementsByName('door_angle');
			
			//vérifie si la porte doit être verticale ou horizontale
			if (angle[0].checked){

				//candidat à la création
				var newDoor = new Door(Objdata[1],Objdata[2],32,16,angle[0].value);
				
				//si la Door candidate est bien placée contre une Room
				if(doorWellPlaced(newDoor, rooms)){
					if(doors.length > 0){
						/*si la Room candidate ne survole pas d'autres Room, 
						alors on peut la créer*/
						if(anyOverlapping(newDoor, doors) == false){
							doors.push(newDoor);
							draw(doors[doors.length-1].t_x,
								doors[doors.length-1].t_y,
								doors[doors.length-1].t_width,
								doors[doors.length-1].t_height,
								'#000000');
						}else{
							document.getElementById("debugg").innerHTML = "On ne place pas une porte sur un autre objet !";
						}
					}else{
						doors.push(newDoor);
						draw(doors[doors.length-1].t_x,
							doors[doors.length-1].t_y,
							doors[doors.length-1].t_width,
							doors[doors.length-1].t_height,
							'#000000');
					}
				}
			}else{
				//candidat à la création
				var newDoor = new Door(Objdata[1],Objdata[2],16,32,angle[1].value);
				
				//si la Door candidate est bien placée contre une Room
				if(doorWellPlaced(newDoor, rooms)){
					if(doors.length > 0){
						/*si la Room candidate ne survole pas d'autres Room, 
						alors on peut la créer*/
						if(anyOverlapping(newDoor, doors) == false){
							doors.push(newDoor);
							draw(doors[doors.length-1].t_x,
								doors[doors.length-1].t_y,
								doors[doors.length-1].t_width,
								doors[doors.length-1].t_height,
								'#000000');
						}else{
							document.getElementById("debugg").innerHTML = "On ne place pas une porte sur un autre objet !";
						} 
					}else{
						doors.push(newDoor);
						draw(doors[doors.length-1].t_x,
							doors[doors.length-1].t_y,
							doors[doors.length-1].t_width,
							doors[doors.length-1].t_height,
							'#000000');
					}
				}
			}
			
			//on libère la variable newDoor
			newDoor = {};
		break;
		case '3':
			//vérifie si le point de début du pathfinding est placé dans une Room
			if (nodeWellPlaced(pathEnd,Objdata[1],Objdata[2])){
				pathStart.p_x = Objdata[1];
				pathStart.p_y = Objdata[2];
				pathStart.exist = true;
				context.clearRect(0, 0, canvas.width, canvas.height);
				drawAll();
			}
		break;
		case '4':
			//vérifie si le point d'arrivée du pathfinding est placé dans une Room
			if (nodeWellPlaced(pathStart,Objdata[1],Objdata[2])){
				pathEnd.p_x = Objdata[1];
				pathEnd.p_y = Objdata[2];pathEnd.exist = true;
				context.clearRect(0, 0, canvas.width, canvas.height);
				drawAll();
			}
		break;
		case '5': 
			destroyObject(Objdata); // Alles Zerstören !
			drawAll();
		break;
		default: document.getElementById("debugg").innerHTML = "erreur d'input";
	}
	
}, false);