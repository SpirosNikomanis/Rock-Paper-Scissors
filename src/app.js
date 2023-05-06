import Player from './player.js';
import Enemy from './enemy.js';
import { Game } from './game.js';
import { UIupdate } from './updateUI.js';

const introScreen = document.querySelector('.intro-section');
const userNameScreen = document.querySelector('.username-section');
const avatarScreen = document.querySelector('.avatar-section');
const versusScreen = document.querySelector('.versus-section');
const gameScreen = document.querySelector('.game-section');

const startButton = document.querySelector('.start-button');
const deleteButton = document.querySelector('.delete');
const capsButton = document.querySelector('.caps');
const submitButton = document.querySelector('.submit');
const keyboardButtons = document.querySelectorAll('.btn');

const textareaDisplay = document.querySelector('textarea');
const avatarOptions = document.querySelectorAll('.option-img');
const versusText = document.querySelector('.versus-text');
const arrow = document.getElementsByClassName('arrow');

let computerName = 'Computer';
let userName = () => {
  if (textareaDisplay.value == '') {
    return 'Player 1';
  } else {
    return chars.join('');
  }
};

let chars = [];

let modeOptions = ['Normal', 'Ranked'];
let modeOptionSelected = 0;

let playerWins = 0;
let computerWins = 0;

let currentPlayer = new Player(userName, playerWins);
let currentEnemy = new Enemy(computerName, computerWins);

console.log(currentPlayer);

//////////////////////////FUNCTIONS//////////////////////////

document.addEventListener('DOMContentLoaded', function () {
  introScreen.classList.add('fadeIn');
  UIupdate.displayMode(modeOptions, modeOptionSelected);
});

arrow[0].onclick = function () {
  if (modeOptionSelected > 0) {
    modeOptionSelected--;
  } else {
    modeOptionSelected = modeOptions.length - 1;
  }
  UIupdate.displayMode(modeOptions, modeOptionSelected);
};

arrow[1].onclick = function () {
  modeOptionSelected++;
  UIupdate.displayMode(modeOptions, modeOptionSelected);
};

//////////////////////////EVENT LISTENERS//////////////////////////

introScreen.addEventListener('keyup', function (e) {
  if (e.keyCode == 13) {
    chars = [];
    textareaDisplay.value = chars.join('');
    UIupdate.switchScreens(introScreen, userNameScreen);
  }
});

//display buttons in textarea
keyboardButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    textareaDisplay.value += btn.innerText;
    chars = textareaDisplay.value.split('');
  });
});

deleteButton.addEventListener('click', () => {
  chars.pop();
  textareaDisplay.value = chars.join('');
});

capsButton.addEventListener('click', () => {
  keyboardButtons.forEach((btn) => {
    btn.classList.toggle('lower');
  });
});

submitButton.addEventListener('click', () => {
  currentPlayer.username = userName();
  currentPlayer.usernameDisplay(currentPlayer.username);

  Game.setCurrentMode(UIupdate);

  UIupdate.switchScreens(userNameScreen, avatarScreen);
});

avatarOptions.forEach((box) => {
  box.addEventListener('click', (e) => {
    UIupdate.resetAvatarBox();

    box.classList.add('active');
    box.style.filter = 'grayscale(0)';

    startButton.style.opacity = 1;

    currentPlayer.choice(e.target.id);
    currentEnemy.randomChoice();
  });
});

startButton.addEventListener('click', () => {
  UIupdate.switchScreens(avatarScreen, versusScreen);
  setTimeout(() => {
    UIupdate.vsSlideToggle();
  }, 500);
});

versusText.addEventListener('animationend', () => {
  setTimeout(() => {
    UIupdate.switchScreens(versusScreen, gameScreen);
  }, 2500);
});

document.querySelectorAll('.selection-button').forEach((button) => {
  button.addEventListener('click', (e) => {
    Game.playRound(e, currentPlayer, currentEnemy, UIupdate);
  });
});
