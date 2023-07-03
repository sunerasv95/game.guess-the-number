"use strict";

//1. generate random number between 1-20,
//   store it in the browser storage,
//   this number is the hidden number that user need to guess
//2. restore attempts and score values

const game = {
  score: 0,
  maxScore: 20,
  generateHiddenNum: function () {
    this.hiddenNumber = Math.round(Math.random() * (20 - 1) + 1);
    console.log("hidden number ", this.hiddenNumber);
    return this.hiddenNumber;
  },
};

document.addEventListener("DOMContentLoaded", () => {
  game.generateHiddenNum();
  const { score } = game;

  document.querySelector(".dtl-score span").textContent = score;
});

//retrieve the entered number
const guess = document.querySelector("input");

let updateScore, hint;

document.querySelector(".guess-btn").addEventListener("click", (e) => {
  const answer = Number(guess.value);

  if (game.score >= game.maxScore) {
    hint = "You reached maximum score of the game";
    guess.disabled = true;
  }

  //error message prompt, when input is empty
  if (!answer) {
    alert("Please enter a number!");
    return;
  }

  //error message prompt, when input is not in a range (1-20)
  if (!(answer > 0 && answer <= 20)) {
    alert("Please enter a number between in the range (1-20)");
    return;
  }

  //check the answer
  const correct = validateAnswer(answer);

  //update the score, when the answer is incorrect..
  //reduce score value by one

  //when the answer is correct.. add one to the  the score
  if (!correct) {
    updateScore = reduceScore();

    //give a hint

    if (answer > game.hiddenNumber) {
      hint = "Wrong! Guess low number...";
    } else if (answer < game.hiddenNumber) {
      hint = "Wrong! Guess high number...";
    } else {
      hint = "Enter number and guess!";
    }
  } else {
    updateScore = addScore();
    game.generateHiddenNum();
    guess.value = "";
    hint = "Good job! Try another guess...";
  }

  document.querySelector(".dtl-hint").textContent = hint;
  document.querySelector(".dtl-score span").textContent = updateScore;
});

const validateAnswer = (answer) => {
  if (game.hiddenNumber === answer) return true;
  return false;
};

const addScore = () => {
  if (game["score"] < 20) game["score"] += 1;
  return game.score;
};

const reduceScore = () => {
  if (game["score"] > 0) game["score"] -= 1;
  return game.score;
};
