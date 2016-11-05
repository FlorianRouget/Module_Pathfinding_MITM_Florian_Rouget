/**
 * Définition de la classe Room.
 *
 * Paramètres :
 * 		- t_x      : position en x.
 *		- t_y      : position en y.
 *		- t_width  : largeur de l'objet.
 *		- t_height : hauteur de l'objet.
 *
 * Méthodes :
 *		- Mutateurs
 *		- right       : retourne la position du bord droit de l'objet.
 *		- bottom      : retourne la position du bord bas de l'objet.
 *
 */
function Room(x,y,w,h) {
	this.t_x = x;
	this.t_y = y;
	this.t_width = w;
	this.t_height = h;
	
	this.getX = function(){ return this.t_x; }
	this.getY = function(){ return this.t_y; }
	this.setX = function(value){ this.t_x = value; }
	this.setY = function(value){ this.t_y = value; }
	this.setPosition = function(x, y){ 
		this.t_x = x;
		this.t_y = y;
	}
	
	this.getWidth = function(){ return this.t_width; }
	this.getHeight = function(){ return this.t_height; }
	this.setWidth = function(value){ this.t_width = value; }
	this.setHeight = function(value){ this.t_height = value; }
	this.setSize = function(w, h){ 
		this.t_width = w;
		this.t_height = h;
	}
	this.right   = function(){ return (this.t_x + this.t_width); }
	this.bottom  = function(){ return (this.t_y + this.t_height); }
	
}

/**
 * Définition de la classe Door, héritant de la classe Room
 *
 * Paramètres :
 * 		- t_angle      : angle de la Door.
 *
 * Méthodes :
 *		- Mutateurs
 *
 */
function Door(x,y,w,h,a){
	Room.call(this, x, y, w, h);
	this.t_angle = a;
	
	this.setAngle = function(value){ this.angle = value; }
	this.getAngle = function(){ return this.t_angle; }

}
Door.prototype = Object.create(Room.prototype);
Door.prototype.constructor = Door;


/**
 * Définition de la classe Tile, héritant de la classe Room
 *
 * Paramètres :
 * 		- t_g      : la distance séparant cette tile et la tile de départ.
 *		- t_h      : la distance séparant cette tile et la tile d'arrivé.
 *		- t_f      : somme de t_h et t_g.
 *		- t_parent : la tile précédente, pour savoir à chaque fois d'où l'on vient.
 *
 * Méthodes :
 *		- Mutateurs
 *		- tilesAround : Recupère les quatre cellules qui entourent la cellule actuelle.
 *
 */
function Tile(x,y,w,h,p){
	Room.call(this, x, y, w, h);
	
	/**
	 * t_g la distance séparant cette tile et la tile de départ.
	 * Il s'agit peu ou proue de la distance parcourue depuis la tile de départ.
	 * Il s'agit d'une valeur qui s'incrémente au fur et à mesure de la recherche de path
	 */
	this.t_g = 0;
	
	/**
	 * t_h la distance séparant cette tile et la tile d'arrivé.
	 * Il s'agit d'une distance "à vol d'oiseau", qui ne prend pas en compte les obstacles.
	 * On calcule l'heuristique de la manière suivante:
	 * t_h = 10*(abs(A.x - C.x) + abs(A.y - C.y))
	 * "C" étant la tile courante et "A" la tile d'arrivée.
	 */
	this.t_h = 0;
	
	/**
	 * somme de t_h et t_g.
	 */
	this.t_f = 0;
	
	/**
	 * la tile précédente, pour savoir à chaque fois d'où l'on vient.
	 */
	this.t_parent = p;
	
	this.setG = function(){
		this.t_g = 0;
		if(this.t_parent != null){
			this.t_g = this.t_parent.getG() + 1;
		}
	}
	this.setH = function(){
		this.t_h = 10*(Math.abs(pathEnd.p_x - this.t_x) + Math.abs(pathEnd.p_y - this.t_y));
	}
	this.setF = function(){ this.t_f = this.t_g + this.t_h; }
	this.setParent = function(element){
		this.t_parent = element;
	}
	
	
	this.getG = function(){ return this.t_g; }
	this.getH = function(){ return this.t_h; }
	this.getF = function(){ return this.t_f; }
	this.getParent = function(){ return this.t_parent; }
	
	/**
	 * Recupère les quatre cellules qui entourent la cellule actuelle
	 */
	this.tilesAround = function(){
		var tilesList = new Array();

		tilesList.push(	//le tile à gauche de CurrentTile
			new Tile(
				this.t_x - 16,
				this.t_y,
				16,
				16,
				null
		));

		tilesList.push(	//le tile à droite de CurrentTile
			new Tile(
				this.t_x + 16,
				this.t_y,
				16,
				16,
				null
		));
		
		tilesList.push(	//le tile en haut de CurrentTile
			new Tile(
				this.t_x,
				this.t_y - 16,
				16,
				16,
				null
		));
		
		tilesList.push(	//le tile en bas de CurrentTile
			new Tile(
				this.t_x,
				this.t_y + 16,
				16,
				16,
				null
		));

		return tilesList;
	}
}