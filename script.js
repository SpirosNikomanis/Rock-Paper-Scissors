//Rock-Paper-Scissors

//Declare variables for Rock,Paper,Scissors
const Rock = "rock";
const Paper = "paper";
const Scissors = "scissors";

//Declare variables for Selections
const computerSelection = getComputerChoice();
const playerSelection = getPlayerChoice();

//create variables for storing wins
let playerWins = 0;
let computerWins = 0;

//Create function getComputerSelection to :
//get random number from 0-2
//check random number and match it to variable

function getComputerChoice() {
  randomChoice = Math.floor(Math.random() * 3);

  if (randomChoice == 0) {
    return Rock;
  } else if (randomChoice == 1) {
    return Paper;
  } else {
    return Scissors;
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
  } else {
    return;
  }
}

//create playRound
//get players choice
//get computers choice
//if not tie
//check winning conditions
//rock beats scissors
//paper beats rock
//scissors beat paper
//else loss
//console log a winning/loss message to player
//store wins for player and computer to variables

function playRound(playerSelection, computerSelection) {
  if (playerSelection !== null && playerSelection !== undefined) {
    if (playerSelection !== computerSelection) {
      if (playerSelection === "rock" && computerSelection === "scissors") {
        console.log(`You win!${playerSelection} wins ${computerSelection}`);
        return playerWins++;
      } else if (playerSelection === "paper" && computerSelection === "rock") {
        console.log(`You win!${playerSelection} wins ${computerSelection}`);
        return playerWins++;
      } else if (
        playerSelection === "scissors" &&
        computerSelection === "paper"
      ) {
        console.log(`You win!${playerSelection} wins ${computerSelection}`);
        return playerWins++;
      } else {
        console.log(`You lost!${computerSelection} wins ${playerSelection}`);
        return computerWins++;
      }
    } else {
      console.log(`It's a tie!${playerSelection} ties to ${computerSelection}`);
    }
  } else {
    alert(`Please type : rock, paper, scissors`);
    return;
  }
}

playRound(playerSelection, computerSelection);
console.log(playerWins, computerWins);
