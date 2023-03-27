//Rock-Paper-Scissors

const buttonSelected = document.querySelectorAll(".button-container button");
const playerChoiceDisplay = document.querySelector(".playerSelection");
const computerChoiceDisplay = document.querySelector(".computerSelection");
const outputDisplay = document.querySelector(".output");
const playerScoreDisplay = document.querySelector(".player-score");
const computerScoreDisplay = document.querySelector(".computer-score");
const endGame = document.querySelector(".endGame-display");
const timeLeft = document.querySelector("#timeLeft");

let playerWins = 0;
let computerWins = 0;
let currentTime = timeLeft.textContent;

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

function getChoices(e) {
  let playerSelection = e.target.id;
  let computerSelection = getComputerChoice();

  displayChoices(playerSelection, computerSelection);
  playRound(playerSelection, computerSelection);
}

function displayChoices(playerSelection, computerSelection) {
  playerChoiceDisplay.firstElementChild.classList.remove("hidden");
  playerChoiceDisplay.firstElementChild.setAttribute(
    "src",
    `../assets/${playerSelection}-player.png`
  );
  computerChoiceDisplay.firstElementChild.classList.remove("hidden");
  computerChoiceDisplay.firstElementChild.setAttribute(
    "src",
    `../assets/${computerSelection}-com.png`
  );
}

function displayScores() {
  playerScoreDisplay.textContent = `Player : ${playerWins}`;
  computerScoreDisplay.textContent = `Computer : ${computerWins}`;
}

function displayOutput(output) {
  outputDisplay.classList.remove("hidden");
  if (output === "Win") {
    outputDisplay.textContent = `You Win!`;
  } else if (output === "Loss") {
    outputDisplay.textContent = `You Lose!`;
  } else {
    outputDisplay.textContent = `It's a Tie!`;
  }
}

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

function gameOver() {
  if (playerWins === 5 || computerWins === 5) {
    buttonSelected.forEach((button) => {
      button.removeEventListener("click", getChoices);
      button.removeEventListener("click", gameOver);
    });

    // function countDown() {
    //   currentTime--;
    //   timeLeft.textContent = currentTime;
    //   if (currentTime === 0) {
    //     clearInterval(timerId);
    //     window.location.href = "../index.html";
    //   }
    // }
    endGame.classList.remove("hidden");
    // let timerId = setInterval(countDown, 1000);
  }
}

buttonSelected.forEach((button) => {
  button.addEventListener("click", getChoices);
  button.addEventListener("click", gameOver);
});
