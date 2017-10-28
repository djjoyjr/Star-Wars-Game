$(document).ready(function() {

var counter = 0;
var wins = 0;
var losses = 0;
var crystalRandomValues = new Array(4);
var targetNumber = Math.floor(Math.random() * 120) + 19;
$("#number-to-guess").text(targetNumber);
for (var i = 0; i < crystalRandomValues.length; i++) {
  crystalRandomValues[i] = Math.floor(Math.random() * 12)+1;
}
for (var i = 0; i < crystalRandomValues.length; i++) {

  var jediPic = $("<img>");
  jediPic.addClass("jedi-pic");
  jediPic.attr("src", "./assets/images/jedi" + (i+1) + ".png");
  $("#your-character").append(jediPic);
}

$(".gem-pic").on("click", function() {
  var crystalValue = ($(this).attr("data-crystalvalue"));
  crystalValue = parseInt(crystalValue);
  counter += crystalValue;
    if (counter === targetNumber) {
    alert("You win!");
    wins ++;
    reset();
  }
  else if (counter >= targetNumber) {
    alert("You lose!!");
    losses ++;
    reset();
  }
  $("#scoreDiv").html("<span>Your current score is:  </span>" + counter);
  $("#wins").html("<span>Wins:  </span>" + wins);
  $("#losses").html("<span>Losses:  </span>" + losses);
});
function reset() {
    counter = 0;
    targetNumber = Math.floor(Math.random() * 120) + 19;
    $("#number-to-guess").text(targetNumber);
    for (var i = 0; i < crystalRandomValues.length; i++) {
      crystalRandomValues[i] = Math.floor(Math.random() * 12)+1;
    }
  }




});
