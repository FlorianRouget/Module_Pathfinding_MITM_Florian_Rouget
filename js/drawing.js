
/**
 *	initialisation des textes du formulaire de contrôle
 */
function initText(){
	var myCode = InputTypeEnum.properties[document.getElementById("input_type").value].name; 
	document.getElementById("indic_input").innerHTML = "Type d'input : " + myCode;
	myCode = document.getElementById("width").value * 16;
	document.getElementById("indic_width").innerHTML = "Largeur : " + myCode + "px";
	myCode = document.getElementById("height").value * 16;
	document.getElementById("indic_height").innerHTML = "Hauteur : " + myCode + "px";
}

/**
 *	Fonction pour dessiner un rectangle, utilisé pour les Room et les Door
 */
function draw(x,y,w,h,c){
	var canvas = document.getElementById("myCanvas");
	if (canvas.getContext) {
	  var ctx = canvas.getContext("2d");
	  ctx.fillStyle = c;
	  ctx.fillRect(x,y,w,h);
	}
}

/**
 *	Fonction pour dessiner un cercle, utilisé pour les points de début et d'arrivé
 */
function drawCircle(x,y,r,c){
	var can = document.getElementById("myCanvas");
	if (canvas.getContext) {
		var ctx = can.getContext("2d");
		ctx.beginPath();
		ctx.arc(x,y,r,0,2*Math.PI);
		ctx.fillStyle = c;
		ctx.fill();
		ctx.stroke();
	}
}

/**
 *	Fonction pour tout redéssiner (Rooms, Doors, pathStart, pathEnd, Path) 
 *  => rafraichissement du canvas
 */
function drawAll(){
	if(rooms.length > 0){
		for (var i = 0; i < rooms.length; i++) {
			draw(rooms[i].getX(),
			rooms[i].getY(),
			rooms[i].getWidth(),
			rooms[i].getHeight(),
			'#11B0B0');
		}
	}
	if(doors.length > 0){
		for (var i = 0; i < doors.length; i++) {
			draw(doors[i].getX(),
			doors[i].getY(),
			doors[i].getWidth(),
			doors[i].getHeight(),
			'#000000');
		}
	}
	if(pathStart.exist){
		drawCircle(pathStart.p_x+8,pathStart.p_y+8,8,"#00BB00");
	}
	if(pathEnd.exist){
		drawCircle(pathEnd.p_x+8,pathEnd.p_y+8,8,"#BB0000");
	}
	
	for (var i = 0; i < finalPath.length; i++) {
		drawTile(finalPath[i].getX(),finalPath[i].getY(),16,16);
	}
	
}

/**
 *	Fonction pour dessiner un rectangle vide, un curseur qui suit la souris
 */
function drawCursor(x,y,w,h){
	var canvas = document.getElementById("myCanvas");
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.strokeStyle = "red";
		ctx.lineWidth = 1;
		ctx.strokeRect(x,y,w,h);
	}
}

/**
 *	Fonction pour dessiner chaque Tile du pathfinding
 */
function drawTile(x,y,w,h){
	var canvas = document.getElementById("myCanvas");
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.strokeStyle = "#555555";
		ctx.lineWidth = 1;
		ctx.strokeRect(x,y,w,h);
	}
}

/**
 *	Fonction pour tout effacer => remettre le canvas à zéro
 */
function clearAll(){
	var canvas = document.getElementById("myCanvas");
	if (canvas.getContext) {
	  var ctx = canvas.getContext("2d");
	  ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	rooms.splice(0, rooms.length);
	doors.splice(0, doors.length);
	tileToCheck.splice(0, tileToCheck.length);
	checkedTile.splice(0, checkedTile.length);
	finalPath.splice(0, finalPath.length);
	pathStart.exist = false;
	pathEnd.exist = false;
}