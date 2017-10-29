var characters = [    // this is an object that stores each character's name, stats, and picture
                      //this object is the souce from which jquery will dynamically create
                      //the elements of the game.
	{ name: "Yoda", HP: 120, AP: 8, CAP: 8, image:"./assets/images/yoda.png"},
	{ name: "Darth Vader", HP: 140, AP: 10, CAP: 10, image:"./assets/images/darth.png"},
	{ name: "Mace Windu", HP: 110, AP: 13, CAP: 13, image:"./assets/images/mace.png"},
	{ name: "Emperor", HP: 130, AP: 5, CAP: 5, image:"./assets/images/emperor.png"}
 ];
var yourCharacter;  //global variable assigned to the character you choose to play with
var defender;      //global variable assigned to the first defender you select
var defender1;     //global variable assigned to the second defender you select
var count = 0; // tracks how many rounds you've won
var enemiesAvailable;


//this function accepts two values: fighter and index then populates fighter with the
//data from the object above the index argument allows us to accept an iterator in
//that spot so we can use this function in a loop to recursively populate multiple
//elements.
function setFighterAttributes (fighter, index) {

	fighter.data("charname", characters[index].name);
	fighter.data("charHP", characters[index].HP);
	fighter.data("charAP", characters[index].AP);
	fighter.data("charCAP", characters[index].CAP);
}

//=================================================================================================================
//this function will dynamically populate the empty div #yourCharactersListId with the four character
//choices.  We will call it to render the initial game board
function loadCharacters(){

	$("#yourCharactersListId").text("Available Characters:");


		//iterates throuth the characters[] array, and dynamically creates a div for each character
    //using the setFighterAttributes function above
		for(var i = 0; i < characters.length; i++) {
			var charactersDiv = $("<div>").addClass("col-md-3 characters player");
			setFighterAttributes(charactersDiv, i);

		//once our newly created div is created and populated, this renders it to the DOM
    //inside the previously empty  #yourCharactersListId
			$("#yourCharactersListId").append(charactersDiv);
			charactersDiv.append("<p>" + characters[i].name + "</p>");
	    charactersDiv.css("background-image", "url(" + characters[i].image + ")");
	    charactersDiv.append("<p>HP: " + characters[i].HP + "</p>");
			}
		}
//==================================================================================================================
//this ensures proper page loading
$(document).ready(function() {


//here we call the function above, this will be the first time any dynamic content
//is actually rendered to the DOM
	loadCharacters();



	//this listening for any click on something with a class of .player (which all of our character
//divs have as a result of line 35 above)
	$(".player").on("click", function() {
		$("#yourCharacterId").text("Your Character:");
		for(var i = 0; i < characters.length; i++) {
			//if the player name corresponding with the item that is clicked on matches any name from the characters
      //object on lines 4-7, then a new variable called player 1 is created, it is assigned to a div
      //that div is has 3 classes added to it.
      //The global variable 'yourCharacter' is populated with the matching values from the characters object
  			if($(this).data("charname") === characters[i].name){
				var player1 = $("<div>").addClass("col-md-3 characters player");
				yourCharacter = characters[i];
				setFighterAttributes(player1, i);



				//still inside the conditional, this block of code appends everthing that happened in 63-66
        //into the previously empty div with the id #yourCharacterId
				$("#yourCharacterId").append(player1);
				player1.append("<p>" + characters[i].name + "</p>");
				player1.css("background-image", "url(" + characters[i].image + ")");
				var player1HP_p = $("<p>").addClass("yourPlayerHP").html("<p>HP: " + characters[i].HP + "</p>");
	       		player1.append(player1HP_p);
			}
		}
		//this stops the on-click event
		$(".player").off();
		// hides the image of player1
		$(this).hide();
		$(".message").text("Who shall be your first victim?");
    //This is a really cool method that selects a subset of a given element based on index number.
		//You can set both a start point and an optional end point.
		//In this case the start point is [i]th item in the characters [] array.
		//Using console.log, I can see that i is undefined before it is created on line 57, it then iterates
		//through the values 0-4 in the for loop (based on the length of the characters [] array at the time).
		//Because the walue of i at this point is 4, this line sets the value of the variable enemiesAvailable to //the full character [] array.
    enemiesAvailable = characters.slice(characters[i]);

		//===============================================================================================

		function pickDefender(){
			//ATTACHING ON-CLICK EVENTS TO "yourDefenderId" DIV....
			$(".player").on("click", function(){

				$(yourDefenderId).text("Your Adversary:");


				for(var i = 0; i < enemiesAvailable.length; i++) {

					if($(this).data("charname") === characters[i].name){
			  			//ASSINGING A NEW DIV FOR IT..
						defender1 = $("<div>").addClass("col-md-3 characters defender");
						defender = characters[i];
						setFighterAttributes(defender1, i);

						//APPENDING THE CHOSEN PLAYER TO THE "yourCharcterId" DIV....
						$("#yourDefenderId").append(defender1);
						defender1.append("<p>" + characters[i].name + "</p>");
						defender1.css("background-image", "url(" + characters[i].image + ")");
						var defender1HP_p = $("<p>").addClass("yourDefenderHP").html("<p> HP: " + characters[i].HP +"</p");
				    defender1.append(defender1HP_p);
					}
				}

				//THIS WILL STOP THE ONCLICK EVENT
				$(".player").off();
				// HIDING THE CHOSEN CHARACTER FROM THE yourDefenderId....AND THEN GIVING A NEW MESSAGE..
				$(this).hide();
				$(".message").text("Start attacking by clicking the BUTTON");
				enemiesAvailable = characters.slice(characters[i]);
			});
		}

		pickDefender();

		//DYNAMICALLY CREATING THE ATTACK BUTTON......
		var attack = $("<button>").addClass("btn-danger").html("Attack ").appendTo("#clickHere");

		//ATTACK BUTTON ONCLICK EVENT HANDLER..
		$("#clickHere").on("click", function() {

			// sounds.attack.sound.play();
			startAttack();
			if (count === 2) {

				$(".btn-danger").prop('disabled', true);
		 		$(".message").html("Congratulations!!! You WON the game!");
        // nds.win.sound.play();

			 } else if (yourCharacter["HP"] <= 0){
					$(".btn-danger").prop('disabled', true);
					$(".message").text("You have been defeated, play again?");
					// sounds.lose.sound.play();

				} else if (defender["HP"] <= 0){

					$(".btn-danger").prop('disabled', true);
					$(".message").text("You won this round. Please select your next Defender");
					count++;
					// sounds.win.sound.play();
					defender1.hide();

					pickDefender();
					$(".btn-danger").prop('disabled', false);
					startAttack();
				}
		});

		function startAttack() {

			yourCharacter["HP"] -= defender["AP"];
			$(".yourPlayerHP").text("HP: " + yourCharacter["HP"]);

			defender["HP"] -= yourCharacter["AP"];
			$(".yourDefenderHP").text("HP: " + defender["HP"]);
			yourCharacter["AP"] += yourCharacter["CAP"];
		}
	});
});
