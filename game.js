var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;
var fail = false;
var gameOver = false;

//start the game
$(document).keypress(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
});

//click answered pattern
$(".btn").click(function(){
    if (gameOver) {
        return;
    }

    var id = $(this).attr("id");
    userClickedPattern.push(id);

    //playsound
    playSound(id);
    animatePress(id);

    //checkanswer
    checkAnswers(userClickedPattern.length-1);
})

//check game pattern to match answered pattern

function checkAnswers(i) {
    console.log ("Checking");

    if (gamePattern[i] === userClickedPattern[i]) {

        console.log ("success");
        
        if (userClickedPattern.length === gamePattern.length) { 

            setTimeout(function() {
                nextSequence();
            },1000);

        }

    } else {
        if (!gameOver) {
            
            wrongSound();

            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            },200);

            $("h1").text("Game Over, Press any key to restart");

            gameOver = true;

            startOver();

            console.log("gameOver");
        
        }
    }
}

//increase the level + game pattern
function nextSequence(){

    userClickedPattern = [];

    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor((Math.random())*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //animation
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    //playsound
    playSound(randomChosenColour);

    gameOver = false;
}

//play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function wrongSound(){
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
}

//visual
function animatePress(currentColour) {
    var $this = $("#" + currentColour);
    $this.addClass("pressed")
    setTimeout(function(){
        $this.removeClass("pressed");
    }, 100);
}

function startOver(){

    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
    fail = false;

}