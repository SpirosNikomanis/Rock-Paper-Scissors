import Player from './player.js';
import Enemy from './Enemy.js';
import { Game } from './game.js';

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
const leftHalf = document.querySelector('.left-half');
const rightHalf = document.querySelector('.right-half');
const versusText = document.querySelector('.versus-text');
const vsPlayerAvatar = document.querySelector('.versus-player');
const vsCompAvatar = document.querySelector('.versus-com');
const gameScreen = document.querySelector('.game-section');
// const roundPlayed = document.querySelector('.round-number');
// const playerLifeBar = document.querySelector('.player-lifebar');
// const comLifeBar = document.querySelector('.computer-lifebar');
const arrow = document.getElementsByClassName('arrow');
const gameMode = document.getElementsByClassName('mode-options');

let chars = [];
let userName = 'Player 1';
let computerName = 'Computer';
let modeOptions = ['Normal', 'Ranked', 'Unlimited'];
let selected = 0;
let playerWins = 0;
let computerWins = 0;
let roundNumber = 0;
let currentPlayer = new Player(userName, playerWins);
let currentEnemy = new Enemy(computerName, computerWins);
console.log(currentPlayer);
console.log(currentEnemy);
//////////////////////////FUNCTIONS//////////////////////////

document.addEventListener('DOMContentLoaded', function () {
  introSection.classList.add('fadeIn');
});

function switchScreens(screenOut, screenIn) {
  screenOut.classList.replace('fadeIn', 'fadeOut');
  screenOut.addEventListener(
    'animationend',
    () => {
      screenIn.classList.replace('hidden', 'fadeIn');
      screenOut.classList.replace('fadeOut', 'hidden');
    },
    { once: true }
  );
}

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
//       switchScreens(gameOverSection, introSection);
//     } else {
//       document.getElementById('countdownTimer').innerText = timeleft;
//     }
//     timeleft -= 1;
//   }, 1000);
// }

// function createPlayerLives() {
//   for (let i = 0; i < 5; i++) {
//     let newLife = document.createElement('DIV');
//     let lifeimg = document.createElement('IMG');
//     newLife.className = `life`;
//     lifeimg.className = 'small-img';
//     lifeimg.src = '../assets/img/Heart.webp';
//     playerLifeBar.append(newLife);
//     newLife.append(lifeimg);
//   }
// }

// function createComLives() {
//   for (let i = 0; i < 5; i++) {
//     let newLife = document.createElement('DIV');
//     let lifeimg = document.createElement('IMG');
//     newLife.className = `life`;
//     lifeimg.className = 'small-img';
//     lifeimg.src = '../assets/img/Heart.webp';
//     comLifeBar.append(newLife);
//     newLife.append(lifeimg);
//   }
// }

// function removeAllLives() {
//   while (playerLifeBar.hasChildNodes()) {
//     playerLifeBar.removeChild(playerLifeBar.firstChild);
//   }
//   while (comLifeBar.hasChildNodes()) {
//     comLifeBar.removeChild(comLifeBar.firstChild);
//   }
// }

// function removeLife(loser) {
//   if (loser === 'player') {
//     if (!playerLifeBar.hasChildNodes()) {
//       return;
//     } else {
//       playerLifeBar.removeChild(playerLifeBar.lastElementChild);
//     }
//   }
//   if (loser === 'com') {
//     if (!comLifeBar.hasChildNodes()) {
//       return;
//     } else {
//       comLifeBar.removeChild(comLifeBar.lastElementChild);
//     }
//   }
// }

function resetAvatarBox() {
  if (document.querySelector('.option-img.active')) {
    document.querySelector('.option-img.active').style.filter =
      'grayscale(0.84)';
    document.querySelector('.option-img.active').classList.remove('active');
  }
}

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
//   currentPlayer.resetChoice();
//   currentEnemy.resetChoice();
//   currentEnemy.resetScore();
//   currentPlayer.resetScore();
//   startButton.style.opacity = 0;

//   removeAllLives();
//   resetAvatarBox();

//   gameButtons.forEach((button) => {
//     button.disabled = false;
//   });
// }
//////////////////////////EVENT LISTENERS//////////////////////////

introSection.addEventListener('keyup', function (e) {
  console.log(e.keyCode);
  if (e.keyCode == 13) {
    chars = [];
    textareaTextContent.value = chars.join('');
    switchScreens(introSection, userNameSection);
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
  switchScreens(userNameSection, avatarSection);
});

avatarOptions.forEach((box) => {
  box.addEventListener('click', (e) => {
    currentPlayer.choice(e.target.id);
    currentEnemy.randomChoice();
    resetAvatarBox();
    box.classList.add('active');
    box.style.filter = 'grayscale(0)';
    startButton.style.opacity = 1;
  });
});

startButton.addEventListener('click', () => {
  switchScreens(avatarSection, versusSection);
});

versusSection.addEventListener('animationstart', () => {
  leftHalf.classList.add('slide-right');
  rightHalf.classList.add('slide-left');
  versusText.classList.add('slide-middle');
  vsPlayerAvatar.classList.add('reveal-avatar');
  vsCompAvatar.classList.add('reveal-avatar');
});

versusText.addEventListener('animationend', () => {
  setTimeout(() => {
    switchScreens(versusSection, gameScreen);
  }, 2500);
});

gameScreen.addEventListener('animationend', () => {
  leftHalf.classList.remove('slide-right');
  rightHalf.classList.remove('slide-left');
  versusText.classList.remove('slide-middle');
  vsPlayerAvatar.classList.remove('reveal-avatar');
  vsCompAvatar.classList.remove('reveal-avatar');
});

document.querySelectorAll('.selection-button').forEach((button) => {
  button.addEventListener('click', (e) => {
    Game.startGame(e, currentPlayer, currentEnemy);
    Game.gameOver(currentPlayer, currentEnemy);
  });
});

// switchScreens(gameScreen, gameOverSection);

//   setTimeout(() => {
// countDown();
//   }, 1500);
