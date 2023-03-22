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
//return choices
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
}

playerSelection.forEach((button) => {
  button.addEventListener("click", getChoices);
});

// function playRound(getPlayerChoice, getComputerChoice) {
//   if (playerSelection !== null && playerSelection !== undefined) {
//     if (playerSelection !== computerSelection) {
//       if (
//         (playerSelection === "rock" && computerSelection === "scissors") ||
//         (playerSelection === "paper" && computerSelection === "rock") ||
//         (playerSelection === "scissors" && computerSelection === "paper")
//       ) {
//         console.log(`You win!${playerSelection} wins ${computerSelection}`);
//         playerWins++;
//       } else {
//         console.log(`You lost!${computerSelection} wins ${playerSelection}`);
//         computerWins++;
//       }
//     } else {
//       console.log(`It's a tie!${playerSelection} ties to ${computerSelection}`);
//       return;
//     }
//   } else {
//     console.log(`Please type : rock, paper, scissors`);
//     return;
//   }
// }
// // playRound(playerSelection, computerSelection);

// function game() {
//   for (let i = 0; i < 5; i++) {
//     let result = playRound(playerSelection, computerSelection);
//     console.log(`turn ${i}`);
//     console.log(playerWins, computerWins);
//   }
//   if (playerWins > computerWins && playerWins != computerWins) {
//     console.log(`You win ${playerWins} : ${computerWins}`);
//   } else {
//     console.log(`You Lose ${computerWins} : ${playerWins}`);
//   }
// }
// // game();
