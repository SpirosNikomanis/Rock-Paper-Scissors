//Rock-Paper-Scissors

const playerSelection = document.querySelectorAll("button");
const playerChoiceDisplay = document.querySelector(".player-selection");
const computerChoiceDisplay = document.querySelector(".computer-selection");
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
  let player_Selection = e.target.parentNode.id;
  let computer_Selection = getComputerChoice();
  playerChoiceDisplay.firstElementChild.setAttribute(
    "src",
    `./assets/${player_Selection}-player.png`
  );
  computerChoiceDisplay.firstElementChild.setAttribute(
    "src",
    `./assets/${computer_Selection}-com.png`
  );
  playRound(player_Selection, computer_Selection);
}

//Checks win conditions per each round given the choices made.

function playRound(player, computer) {
  if (player !== computer) {
    if (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissors" && computer === "Paper")
    ) {
      console.log(`You win!${player} wins ${computer}`);
      playerWins++;
    } else {
      console.log(`You lost!${player} loses to ${computer}`);
      computerWins++;
    }
  } else {
    console.log("tie");
  }
}

//Checks if game is over and announce Winner!

function game(e) {
  if (playerWins === 5 || computerWins === 5) {
    this.disabled = true;
    playerWins > computerWins
      ? console.log("winnerPlayer")
      : console.log("winnerPC");
  }
}

playerSelection.forEach((button) => {
  button.addEventListener("click", getChoices);
});
playerSelection.forEach((button) => {
  button.addEventListener("click", game);
});
