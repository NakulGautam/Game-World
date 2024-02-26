'use strict';

let player1 = prompt("Enter the name player 1")
let player2 = prompt("Enter the name player 2")

document.getElementById(`name--0`).textContent = player1
document.getElementById(`name--1`).textContent = player2


const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new")
const currentscore0El = document.getElementById("current--0")
const currentscore1El = document.getElementById("current--1")
const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")



const diceE1 = document.querySelector(".dice")
document.getElementById(`score--0`).textContent = 0
document.getElementById(`score--1`).textContent = 0
let currentScore = 0
let scoreBoard = [0,0]
let activePlayer=0;

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0
        currentScore = 0
        activePlayer = activePlayer===0 ? 1 : 0
        player0El.classList.toggle("player--active")
        player1El.classList.toggle("player--active")
}
//Rolling Btn
btnRoll.addEventListener("click", function (){
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    diceE1.src = `dice-${diceNum}.png`
    // changing the current
    if(diceNum !== 1){
        // currentScore = currentScore + diceNum
        currentScore += diceNum
        console.log(currentScore)
        document.getElementById(`current--${activePlayer}`).textContent = currentScore
    }else{
        switchPlayer()
    }
})

btnHold.addEventListener("click",function(){
    scoreBoard[activePlayer]+= currentScore
    //  scoreBoard[1]= scoreBoard[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scoreBoard[activePlayer]
    if(scoreBoard[activePlayer] >=60){
        document.querySelector(`#name--${activePlayer}`).innerHTML = "Winner Winner Chicken Dinner!"
        document.querySelector(`.player--${activePlayer}`).classList.toggle("player--winner")
    }else{
        switchPlayer()
    }
})


btnNew.addEventListener("click",function(){

    currentscore0El.textContent = 0
    currentscore1El.textContent = 0
    document.getElementById(`score--0`).textContent = 0
    document.getElementById(`score--1`).textContent = 0

})


