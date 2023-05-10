import Player from './player.js';
import Enemy from './enemy.js';
// import { UIupdates } from './updateUI.js';
import { GameManager } from './gameManager.js';

// const introScreen = document.querySelector('.intro-section');
// const userNameScreen = document.querySelector('.username-section');
// const avatarScreen = document.querySelector('.avatar-section');
// const versusScreen = document.querySelector('.versus-section');
// const gameScreen = document.querySelector('.game-section');

// const startButton = document.querySelector('.start-button');
// const deleteButton = document.querySelector('.delete');
// const capsButton = document.querySelector('.caps');
// const submitButton = document.querySelector('.submit');
// const keyboardButtons = document.querySelectorAll('.btn');

const textareaDisplay = document.querySelector('textarea');
// const avatarOptions = document.querySelectorAll('.option-img');
// const versusText = document.querySelector('.versus-text');
const arrow = document.getElementsByClassName('arrow');

export function setListeners() {
  //initiate Listeners on contentLoaded

  // document.addEventListener('DOMContentLoaded', function () {
  //   introScreen.classList.add('fadeIn');
  //   UIupdates.displayMode(modeOptions, modeOptionSelected);
  // });

  let computerName = 'Computer';

  let userName = () => {
    if (textareaDisplay.value == '') return 'Player 1';
    if (textareaDisplay.value !== '') return chars.join('');
  };

  let chars = [];

  let modeOptions = ['Normal', 'Ranked'];
  let modeOptionSelected = 0;

  let playerWins = 0;
  let computerWins = 0;

  let currentPlayer = new Player(userName(), playerWins);
  let currentEnemy = new Enemy(computerName, computerWins);

  console.log(currentPlayer);

  arrow[0].onclick = function () {
    if (modeOptionSelected > 0) {
      modeOptionSelected--;
    } else {
      modeOptionSelected = modeOptions.length - 1;
    }
    UIupdates.displayMode(modeOptions, modeOptionSelected);
  };

  arrow[1].onclick = function () {
    modeOptionSelected++;
    UIupdates.displayMode(modeOptions, modeOptionSelected);
  };

  //////////////////////////EVENT LISTENERS//////////////////////////

  // introScreen.addEventListener('keyup', function (e) {
  //   if (e.keyCode == 13) {
  //     chars = [];
  //     textareaDisplay.value = chars.join('');
  //     UIupdates.switchScreens(introScreen, userNameScreen);
  //   }
  // });

  //display buttons in textarea
  // keyboardButtons.forEach((btn) => {
  //   btn.addEventListener('click', () => {
  //     textareaDisplay.value += btn.innerText;
  //     chars = textareaDisplay.value.split('');
  //   });
  // });

  // deleteButton.addEventListener('click', () => {
  //   chars.pop();
  //   textareaDisplay.value = chars.join('');
  // });

  // capsButton.addEventListener('click', () => {
  //   keyboardButtons.forEach((btn) => {
  //     btn.classList.toggle('lower');
  //   });
  // });

  // submitButton.addEventListener('click', () => {
  //   currentPlayer.username = userName();

  //   GameManager.setGameOptions(UIupdates, currentPlayer, currentEnemy);
  //   UIupdates.switchScreens(userNameScreen, avatarScreen);
  // });

  // avatarOptions.forEach((box) => {
  //   box.addEventListener('click', (e) => {
  //     UIupdates.resetAvatarBox(box);
  //     GameManager.displayGameOptions(e.target.id);
  //     startButton.style.opacity = 1;
  //   });
  // });

  // startButton.addEventListener('click', () => {
  //   UIupdates.switchScreens(avatarScreen, versusScreen);
  //   setTimeout(() => {
  //     UIupdates.vsSlideToggle();
  //   }, 500);
  // });

  // versusText.addEventListener('animationend', () => {
  //   setTimeout(() => {
  //     UIupdates.switchScreens(versusScreen, gameScreen);
  //   }, 2500);
  // });

  // document.querySelectorAll('.selection-button').forEach((button) => {
  //   button.addEventListener('click', (e) => {
  //     GameManager.playGame(e);
  //   });
  // });
}
