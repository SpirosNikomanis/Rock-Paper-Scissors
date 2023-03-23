//Rock-Paper-Scissors

const buttonSelected = document.querySelectorAll(".button");
const playerChoiceDisplay = document.querySelector(".player-selection");
const computerChoiceDisplay = document.querySelector(".computer-selection");
const outputDisplay = document.querySelector(".output-display");
const playerScoreDisplay = document.querySelector(".player-score");
const computerScoreDisplay = document.querySelector(".computer-score");

let playerWins = 0;
let computerWins = 0;

function getComputerChoice() {
  randomChoice = Math.floor(Math.random() * 3);

  switch (randomChoice) {
    case 0:
      return "Rock";
    case 1:
      return "Paper";
    case 2:
      return "Scissors";
    default:
      break;
  }
}

//Get player-computer choices!
//Display choices
//pass choices as parameters to round,display functions!

function getChoices(e) {
  let playerSelection = e.target.id;
  let computerSelection = getComputerChoice();
  displayChoices(playerSelection, computerSelection);
  playRound(playerSelection, computerSelection);
}

//Display Choices,hide Choices after x time!

function displayChoices(playerSelection, computerSelection) {
  playerChoiceDisplay.firstElementChild.setAttribute(
    "src",
    `./assets/${playerSelection}-player.png`
  );
  computerChoiceDisplay.firstElementChild.setAttribute(
    "src",
    `./assets/${computerSelection}-com.png`
  );
}

//Checks output conditions per each round given the choices made.

function playRound(player, computer) {
  if (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Paper" && computer === "Rock") ||
    (player === "Scissors" && computer === "Paper")
  ) {
    ++playerWins;
    displayScores();
    displayOutput("Win");
  } else if (player === computer) {
    displayScores();
    displayOutput("Tie");
  } else {
    ++computerWins;
    displayScores();
    displayOutput("Loss");
  }
}

function displayScores() {
  playerScoreDisplay.textContent = `Player : ${playerWins}`;
  computerScoreDisplay.textContent = `Computer : ${computerWins}`;
}

function displayOutput(output) {
  if (output === "Win") {
    outputDisplay.textContent = `You Win!`;
  } else if (output === "Loss") {
    outputDisplay.textContent = `You Lose!`;
  } else {
    outputDisplay.textContent = `It's a Tie!`;
  }
}

//Checks if game is over and announce Winner!
function game() {
  if (playerWins === 5 || computerWins === 5) {
    buttonSelected.forEach((button) =>
      button.removeEventListener("click", getChoices)
    );
    buttonSelected.forEach((button) =>
      button.removeEventListener("click", game)
    );
    playerWins > computerWins
      ? console.log("winnerPlayer")
      : console.log("winnerPC");
  }
}

buttonSelected.forEach((button) => {
  button.addEventListener("click", getChoices);
});
buttonSelected.forEach((button) => {
  button.addEventListener("click", game);
});
