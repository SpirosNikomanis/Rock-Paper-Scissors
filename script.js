//Rock-Paper-Scissors

//Declare variables for Rock,Paper,Scissors
const Rock = "rock";
const Paper = "paper";
const Scissors = "scissors";

//create variables for storing wins
let playerWins = 0;
let computerWins = 0;

// declare variables for choices
let playerSelection;
let computerSelection;

//Create function getComputerSelection to :
//get random number from 0-2
//check random number and match it to variable

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

//create function getPlayerChoice to:
//get input from user
//validate selection and spellchecking

function getPlayerChoice() {
  choiceInput = window.prompt("Pick : (Rock,Paper,Scissors)");
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

//create playRound
//get players choice
//get computers choice
//if not null or undefined
//if not tie
//check winning conditions
//else loss
//else tie
//console log a winning/loss message to player
//store wins for player and computer to variables

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

//create game
//loop 5 times
//get playerchoice
//get computerchoice
//get single round
//result

function game() {
  for (let i = 0; i < 5; i++) {
    let result = playRound(playerSelection, computerSelection);
    console.log(`turn ${i}`);
    console.log(playerWins, computerWins);
  }
  console.log(playerWins, computerWins);
}

game();
