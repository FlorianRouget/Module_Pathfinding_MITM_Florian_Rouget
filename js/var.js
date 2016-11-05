
// On détermine les listes case ou "tile".
var tileToCheck = []; // Liste de tiles à vérifier.
var checkedTile = []; // Liste de tiles déjà parcourus.
var finalPath = []; // Liste des tiles constituants le chemin final

var rooms = []; //tableau répertoriant toutes les Room créées
var doors = []; //tableau répertoriant toutes les Doors créées
var pathStart = { //variable unique = gestion du point de début du pathfinding
	p_x: 0,
	p_y: 0,
	p_exist: false
};
var pathEnd = { //variable unique = gestion du point de fin du pathfinding
	p_x: 0,
	p_y: 0,
	p_exist: false
};
var Objdata = []; //tableau contenant des valeurs utiles lors de la création d'un objet

//un énum contenant les différends états du slider InputType
var InputTypeEnum = {
  Room: 1,
  Door: 2,
  Begin: 3,
  End: 4,
  Destroy: 5,
  properties: {
    1: {name: "room", value: 1},
    2: {name: "door", value: 2},
    3: {name: "begin", value: 3},
    4: {name: "end", value: 4},
    5: {name: "destroy", value: 5}
  }
};