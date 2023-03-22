//Rock-Paper-Scissors

const Rock = "rock";
const Paper = "paper";
const Scissors = "scissors";

let playerWins = 0;
let computerWins = 0;

let playerSelection;
let computerSelection;

function getComputerChoice() {
  randomChoice = Math.floor(Math.random() * 3);

  switch (randomChoice) {
    case 0:
      return Rock;
      break;
    case 1:
      return Paper;
    case 2:
      return Scissors;

    default:
      break;
  }
}

//get input from user
//validate selection and spellchecking

function getPlayerChoice() {
  let choiceInput = window.prompt("Pick : (Rock,Paper,Scissors)");
  if (choiceInput !== null && choiceInput !== undefined) {
    if (
      choiceInput.toLowerCase() === "rock" ||
      choiceInput.toLowerCase() === "paper" ||
      choiceInput.toLowerCase() === "scissors"
    ) {
      return choiceInput.toLowerCase();
    } else {
      return;
    }
    console.log("Please pick rock paper or scissors");
  }
}

function playRound(playerSelection, computerSelection) {
  playerSelection = getPlayerChoice();
  computerSelection = getComputerChoice();
  if (playerSelection !== null && playerSelection !== undefined) {
    if (playerSelection !== computerSelection) {
      if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
      ) {
        console.log(`You win!${playerSelection} wins ${computerSelection}`);
        playerWins++;
      } else {
        console.log(`You lost!${computerSelection} wins ${playerSelection}`);
        computerWins++;
      }
    } else {
      console.log(`It's a tie!${playerSelection} ties to ${computerSelection}`);
      return;
    }
  } else {
    console.log(`Please type : rock, paper, scissors`);
    return;
  }
}
// playRound(playerSelection, computerSelection);

function game() {
  for (let i = 0; i < 5; i++) {
    let result = playRound(playerSelection, computerSelection);
    console.log(`turn ${i}`);
    console.log(playerWins, computerWins);
  }
  if (playerWins > computerWins && playerWins != computerWins) {
    console.log(`You win ${playerWins} : ${computerWins}`);
  } else {
    console.log(`You Lose ${computerWins} : ${playerWins}`);
  }
}
game();
