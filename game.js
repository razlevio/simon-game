// Global variables that holds information about the game
let buttonColours = ["red", "blue", "green", "yellow"];
// The game random generated pattern
let gamePattern = [];
// The user clicked one turn pattern
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

/**
 * Generating the next sequence of the game
 */
function nextSequence() {
  // Incremanting the game level and update the title to show the new level
  level++;
  $("#level-title").text(`Level ${level}`);
  
  // Generating random number to choose random color for the next sequence
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  // Inserting the new random chosen color to the game pattern array
  gamePattern.push(randomChosenColour);

  // Flash animation to the the next sequence so the user will know what is the next color in the sequence
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

/**
 * Playing respective sound for every button
 * @param  {String} name The sound file name to be played
 */
function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

/**
 * Animating the button when user click on one of the buttons
 * @param  {String} currentColour the color of the button that have been clicked
 */
function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

/**
 * Checking the user turn answer, if correct continue to the next random generated sequnece
 * otherwise startover the game
 * @param  {String} currentLevel the current level of the game
 */
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

/**
 * Resetting the game and starting over becuase the user inserted wrong pattern
 */
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}

/**
 * Keydown event listener to wait for any keyboard pressing to initaite the game
 */
$(document).keydown(function () {
  if (!gameStarted) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    gameStarted = true;
  }
});

/**
 * Button click event listener to wait for when user click on the colors buttons
 */
$(".btn").click(function () {
  if (gameStarted) {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    $(`#${userChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});