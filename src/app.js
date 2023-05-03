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

//////////////////////////EVENT LISTENERS//////////////////////////

introSection.addEventListener('keyup', function (e) {
  if (e.keyCode == 13) {
    chars = [];
    textareaTextContent.value = chars.join('');
    UIupdate.switchScreens(introSection, userNameSection);
  }
});

//display buttons in textarea
keyboardButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    textareaTextContent.value += btn.innerText;
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
    UIupdate.vsSlideToggle();
  }, 100);
});

versusText.addEventListener('animationend', () => {
  const gameScreen = document.querySelector('.game-section');

  setTimeout(() => {
    UIupdate.switchScreens(versusSection, gameScreen);
  }, 2500);
});

document.querySelector('.game-section').addEventListener(
  'animationend',
  () => {
    UIupdate.vsSlideToggle();
  },
  { once: true }
);

document.querySelectorAll('.selection-button').forEach((button) => {
  button.addEventListener('click', (e) => {
    Game.startGame(e, currentPlayer, currentEnemy, UIupdate);
  });
});
