import Player from './player.js';
import Enemy from './enemy.js';
import { Game } from './game.js';
import { UIupdate } from './updateUI.js';

const introSection = document.querySelector('.intro-section');
const userNameSection = document.querySelector('.username-section');
const avatarSection = document.querySelector('.avatar-section');
const startButton = document.querySelector('.start-button');
const versusSection = document.querySelector('.versus-section');
const keyboardButtons = document.querySelectorAll('.btn');
const textareaTextContent = document.querySelector('textarea');
const deleteButton = document.querySelector('.delete');
const capsButton = document.querySelector('.caps');
const submitButton = document.querySelector('.submit');
const avatarOptions = document.querySelectorAll('.option-img');
const versusText = document.querySelector('.versus-text');
const gameScreen = document.querySelector('.game-section');
const arrow = document.getElementsByClassName('arrow');
const gameMode = document.getElementsByClassName('mode-options');

let chars = [];
let userName = 'Player 1';
let computerName = 'Computer';
let modeOptions = ['Normal', 'Ranked', 'Unlimited'];
let selected = 0;
let playerWins = 0;
let computerWins = 0;
let currentPlayer = new Player(userName, playerWins);
let currentEnemy = new Enemy(computerName, computerWins);
console.log(currentPlayer);
console.log(currentEnemy);
//////////////////////////FUNCTIONS//////////////////////////

document.addEventListener('DOMContentLoaded', function () {
  introSection.classList.add('fadeIn');
});

function modeSelection() {
  return (gameMode[0].textContent = modeOptions[selected % modeOptions.length]);
}

modeSelection();

arrow[0].onclick = function () {
  if (selected > 0) {
    selected--;
  } else {
    selected = modeOptions.length - 1;
  }
  modeSelection();
};

arrow[1].onclick = function () {
  selected++;
  modeSelection();
};

// function checkGameMode() {
//   if (gameMode[0].textContent === 'Normal') {
//     normalMode();
//   }
//   if (gameMode[0].textContent === 'Ranked') {
//     rankedMode();
//   }
// }

// function normalMode() {
//   createPlayerLives();
//   createComLives();
//   gameButtons.forEach((button) => {
//     button.addEventListener('click', () => {
//       gameOver();
//     });
//   });
// }

// function rankedMode() {
//   createPlayerLives();
//   gameButtons.forEach((button) => {
//     button.addEventListener('click', () => {
//       gameOver();
//     });
//   });
// }

// function displayRound() {
//   ++roundNumber;
//   roundPlayed.textContent = `Round ${roundNumber}`;
// }

// function countDown() {
//   let timeleft = 10;
//   document.getElementById('countdownTimer').innerText = timeleft;
//   let downloadTimer = setInterval(function () {
//     if (timeleft <= 0) {
//       clearInterval(downloadTimer);
//       resetGame();
//       UIupdate.switchScreens(gameOverSection, introSection);
//     } else {
//       document.getElementById('countdownTimer').innerText = timeleft;
//     }
//     timeleft -= 1;
//   }, 1000);
// }

// function resetGame() {
//   chars = [];
//   userName = 'Player 1';
//   computerName = 'Computer';
//   selected = 0;
//   playerWins = 0;
//   computerWins = 0;
//   roundNumber = 0;

//   textareaTextContent.value = chars.join('');
//   roundPlayed.textContent = `Round ${roundNumber}`;
//   outcomeDisplay.textContent = ``;
//   playerChoiceDisplay.firstElementChild.src = `?`;
//   playerChoiceDisplay.style.opacity = 0;
//   computerChoiceDisplay.firstElementChild.src = `?`;
//   computerChoiceDisplay.style.opacity = 0;
//   startButton.style.opacity = 0;
//   removeAllLives();
//   resetAvatarBox();
// }
//////////////////////////EVENT LISTENERS//////////////////////////

introSection.addEventListener('keyup', function (e) {
  console.log(e.keyCode);
  if (e.keyCode == 13) {
    chars = [];
    textareaTextContent.value = chars.join('');
    UIupdate.switchScreens(introSection, userNameSection);
  }
});

keyboardButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    textareaTextContent.value += btn.innerText; //display buttons in textarea
    chars = textareaTextContent.value.split('');
  });
});

deleteButton.addEventListener('click', () => {
  chars.pop();
  textareaTextContent.value = chars.join('');
});

capsButton.addEventListener('click', () => {
  keyboardButtons.forEach((btn) => {
    btn.classList.toggle('lower');
  });
});

submitButton.addEventListener('click', () => {
  currentPlayer.username = chars.join('');
  currentPlayer.usernameDisplay(currentPlayer.username);
  UIupdate.createPlayerLives();
  UIupdate.createEnemyLives();
  UIupdate.switchScreens(userNameSection, avatarSection);
});

avatarOptions.forEach((box) => {
  box.addEventListener('click', (e) => {
    currentPlayer.choice(e.target.id);
    currentEnemy.randomChoice();
    UIupdate.resetAvatarBox();
    box.classList.add('active');
    box.style.filter = 'grayscale(0)';
    startButton.style.opacity = 1;
  });
});

startButton.addEventListener('click', () => {
  UIupdate.switchScreens(avatarSection, versusSection);
  setTimeout(() => {
    UIupdate.vsToggle();
  }, 100);
});

versusText.addEventListener('animationend', () => {
  setTimeout(() => {
    UIupdate.switchScreens(versusSection, gameScreen);
  }, 2500);
});

gameScreen.addEventListener('animationend', () => {
  UIupdate.vsToggle();
});

document.querySelectorAll('.selection-button').forEach((button) => {
  button.addEventListener('click', (e) => {
    Game.startGame(e, currentPlayer, currentEnemy, UIupdate);
  });
});
