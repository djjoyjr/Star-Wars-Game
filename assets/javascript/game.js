var yourCharacter;
var defender;
var defender1;
var count = 0; // KEEPS TRACK OF WINS EACH ROUND..

function setFighterAttributes (fighter, index) {

	fighter.data("charname", characters[index].name);
	fighter.data("charHP", characters[index].HP);
	fighter.data("charAP", characters[index].AP);
	fighter.data("charCAP", characters[index].CAP);
}

var characters = [
  { name: "Yoda", HP: 120, AP: 8, CAP: 8, image:"./assets/images/yoda.png"},
  { name: "Darth Vader", HP: 140, AP: 10, CAP: 10, image:"./assets/images/darth.png"},
  { name: "Mace Windu", HP: 110, AP: 13, CAP: 13, image:"./assets/images/mace.png"},
  { name: "Emperor", HP: 130, AP: 5, CAP: 5, image:"./assets/images/emperor.png"}
 ];

$(document).ready(function() {

  function loadCharacters(){
  //A LOOP THAT ITERATES THROUGH THE CHARACTERS ARRAY...AND DYNAMICALLY CREATING DIVS FOR ALL PLAYERS..
    for(var i = 0; i < characters.length; i++) {
      var charactersDiv = $("<div>").addClass("characters player");
      setFighterAttributes(charactersDiv, i);
    //APPENDING THE NEW DIV TO THE TOP ROW "yourCharactersList"....
      $("#yourCharactersListId").append(charactersDiv);
        charactersDiv.append("<p>" + characters[i].name + "</p>");
            charactersDiv.css("background-image", "url(" + characters[i].image + ")");
            charactersDiv.append("<p>" + characters[i].HP + "</p>");
    }
  }
  loadCharacters();

  $("#yourCharactersListId").on("click", function() {
    for (var i = 0; i < characters.length; i++) {
      if($(this).data("charname") === characters[i].name){
        var player1 = $("<div>").addClass("col-md-3 characters player");
        yourCharacter = characters[i];
        setFighterAttributes (player1, i);

        $("#yourCharacterId").append(player1);
        player1.append("<p>" + characters[i].name + "</p>");
        player1.css("background-image", "url(" + characters[i].image + ")");
        var player1HP_p = $("<p>").addClass("yourPlayerHP").html(characters[i].HP);
        player1.append(player1HP_p);
        }
    }
  })
})
