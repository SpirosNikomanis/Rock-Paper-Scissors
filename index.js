//Rock-Paper-Scissors

const buttonSelected = document.querySelectorAll("button");
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
//pass choices as parameters to playRound function

function getChoices(e) {
  let playerSelection = e.target.parentNode.id;
  let computerSelection = getComputerChoice();
  playerChoiceDisplay.firstElementChild.setAttribute(
    "src",
    `./assets/${playerSelection}-player.png`
  );
  computerChoiceDisplay.firstElementChild.setAttribute(
    "src",
    `./assets/${computerSelection}-com.png`
  );
  playRound(playerSelection, computerSelection);
}

//Checks win conditions per each round given the choices made.

function playRound(player, computer) {
  if (player === computer) outputDisplay.textContent = `It's a tie!`;
  if (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Paper" && computer === "Rock") ||
    (player === "Scissors" && computer === "Paper")
  ) {
    ++playerWins;
    outputDisplay.textContent = "You Win!";
    playerScoreDisplay.textContent = `Player : ${playerWins}`;
  } else {
    ++computerWins;
    outputDisplay.textContent = "You Lose!";
    computerScoreDisplay.textContent = `Computer : ${computerWins}`;
  }
}

//Checks if game is over and announce Winner!

function game() {
  if (playerWins === 5 || computerWins === 5) {
    buttonSelected.forEach((button) => (button.disabled = true));
    playerWins > computerWins
      ? console.log("winnerPlayer")
      : console.log("winnerPC");
  }
}

//Button Listeners

buttonSelected.forEach((button) => {
  button.addEventListener("click", getChoices);
});
buttonSelected.forEach((button) => {
  button.addEventListener("click", game);
});
