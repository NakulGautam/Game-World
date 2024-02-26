"use strict";


let player = prompt("Enter the player name :")
console.log(player);
let secretNumber = Math.trunc(Math.random() * 20) + 1; // random number between 1 and
// document.querySelector(".number").textContent = secretNumber;
let score = 20;
let highScore = 0;


document.querySelector(".player").textContent = player 

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  // console.log(guess)

  if (!guess) {
    document.querySelector(".message").textContent = "⛔No Number";
  } else if (secretNumber === guess) {
    document.querySelector(".number").textContent = secretNumber;
    // document.querySelector(".message").textContent = "🎉 You are Correct";
    displayMessage("🎉 You are Correct");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".highscore").textContent = score;
  } else if (secretNumber < guess) {
    if (score > 0) {
      //   document.querySelector(".message").textContent = "Too High";
      displayMessage("Too High");
      score--;
      document.querySelector(".score").textContent = score;

      if(score> highScore){
        highScore = score
           document.querySelector(".highScore").textContent = highScore;
      }
    } else {
      //   document.querySelector(".message").textContent = "💥 Game Over";
      displayMessage("💥 Game Over");
    }
  } else if (secretNumber > guess) {
    if (score > 0) {
    //   document.querySelector(".message").textContent = "Too Low";
    displayMessage("Too Low");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
    //   document.querySelector(".message").textContent = "💥 Game Over";
      displayMessage("💥 Game Over");
      document.querySelector("body").style.backgroundColor = "#ff0000";


    }
  }
});


document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  document.querySelector("body").style.backgroundColor = "#222";
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".number").textContent ="?";
//   document.querySelector(".number").textContent = secretNumber;
//   document.querySelector(".message").textContent = "Start guessing...";
  displayMessage("Start guessing...");
  document.querySelector(".guess").value = "";
  document.querySelector(".score").textContent = score;

});




