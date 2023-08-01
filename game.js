var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
 $(document).keypress(function(){
   if(!started){
     $("#level-title").text("Level: " +level);
     nextSequence();
     started = true;
   }

 });
 $(".btn").click(function(){
   var userChosenColor = this.id;
   userClickedPattern.push(userChosenColor);

   playSound(userChosenColor);
   animatePress(userChosenColor);

   checkAnswer(userClickedPattern.length -1);
 });

 function checkAnswer(currentLevel){
   if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
     console.log("succes");
     if(userClickedPattern.length === gamePattern.length){
       setTimeout(function(){
         nextSequence();
       },1000);

     }
   }
   else{
     console.log("failed");
     var loser = new Audio("sounds/wrong.mp3");
     loser.play();
     $("body").addClass("game-over");
     setTimeout(function(){
       $("body").removeClass("game-over");
       $("#level-title").text("Game Over, Press Any Key to Restart");
     },200);
     startOver();
   }


 }

function nextSequence(){
userClickedPattern = [];
  level ++;
  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours [randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);


}

function playSound(name){
  var audioColor = new Audio("sounds/" + name + ".mp3");
  audioColor.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){

    $("#" + currentColor).removeClass("pressed");

  },100);

}

function startOver(){
    level=0;
    gamePattern = [];
    started = false;

  }
