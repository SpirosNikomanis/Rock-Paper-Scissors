const introSection = document.querySelector('.intro-section');
const userNameSection = document.querySelector('.username-section');
const avatarSection = document.querySelector('.avatar-section');
const startButton = document.querySelector('.start-button');
const versusSection = document.querySelector('.versus-section');
const keyboardButtons = document.querySelectorAll('.btn');
const textarea = document.querySelector('textarea');
const deleteButton = document.querySelector('.delete');
const capsButton = document.querySelector('.caps');
const submitButton = document.querySelector('.submit');
let userNameDisplay = document.querySelector('#textarea');
const avatarOptions = document.querySelectorAll('.option-img');
const avatarFullDisplayBox = document.querySelector('#full-avatar');
const leftHalf = document.querySelector('.left-half');
const rightHalf = document.querySelector('.right-half');
const versusText = document.querySelector('.versus-text');
const vsPlayerAvatar = document.querySelector('.versus-player');
const vsCompAvatar = document.querySelector('.versus-com');
const vsPlayerImg = document.querySelector('.versus-player-img');
const vsCompImg = document.querySelector('.versus-com-img');
const gameScreen = document.querySelector('.game-section');
const playerGameImg = document.querySelector('.playerGame-avatar');
const computerGameImg = document.querySelector('.computerGame-avatar');
const playerName = document.querySelector('.playerUserName-display');
const comName = document.querySelector('.comUserName-display');
const gameButtons = document.querySelectorAll('.selection-button');
const playerChoiceDisplay = document.querySelector('.playerChoice-display');
const computerChoiceDisplay = document.querySelector('.computerChoice-display');
const outcomeDisplay = document.querySelector('.outcome-display');
const gameOverSection = document.querySelector('.gameOver-section');
const winnerText = document.querySelector('.announcement-text');
const playerLifeBar = document.querySelector('.player-lifebar');
const comLifeBar = document.querySelector('.computer-lifebar');
const lives = document.querySelectorAll('.life');

let chars = [];
let userName = 'Player 1';
let computerName = 'Computer';
let playerWins = 0;
let computerWins = 0;

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

function randomOpponent() {
  randomChoice = Math.floor(Math.random() * 4);
  switch (randomChoice) {
    case 0:
      return 'Dracula';
    case 1:
      return 'Frankenstein';
    case 2:
      return 'Robot';
    case 3:
      return 'Witch';
    default:
      break;
  }
}

function updateInfo(avatarChosen) {
  let oppName = randomOpponent();
  avatarFullDisplayBox.setAttribute('src', `./assets/img/${avatarChosen}.webp`);
  vsPlayerImg.setAttribute('src', `./assets/img/${avatarChosen}.webp`);
  vsCompImg.setAttribute('src', `./assets/img/${oppName}.png`);
  playerGameImg.setAttribute('src', `./assets/img/${avatarChosen}.webp`);
  computerGameImg.setAttribute('src', `./assets/img/${oppName}.png`);
  playerName.textContent = userName;
  comName.textContent = oppName;
  computerName = oppName;
}

function getComputerChoice() {
  randomChoice = Math.floor(Math.random() * 3);
  switch (randomChoice) {
    case 0:
      return 'Rock';
    case 1:
      return 'Paper';
    case 2:
      return 'Scissors';
    default:
      break;
  }
}

function getChoices(e) {
  let playerChoice = e.target.id;
  let computerChoice = getComputerChoice();
  displayChoices(playerChoice, computerChoice);
  playRound(playerChoice, computerChoice);
}

function displayChoices(playerPick, computerPick) {
  playerChoiceDisplay.firstElementChild.setAttribute(
    'src',
    `./assets/img/${playerPick}.png`
  );

  computerChoiceDisplay.firstElementChild.setAttribute(
    'src',
    `./assets/img/${computerPick}.png`
  );
}

function playRound(player, computer) {
  if (
    (player === 'Rock' && computer === 'Scissors') ||
    (player === 'Paper' && computer === 'Rock') ||
    (player === 'Scissors' && computer === 'Paper')
  ) {
    ++playerWins;
    displayOutcome('Win');
  } else if (player === computer) {
    displayOutcome('Tie');
  } else {
    ++computerWins;
    displayOutcome('Loss');
  }
}

function displayOutcome(outcome) {
  if (outcome === 'Win') {
    outcomeDisplay.textContent = `You Win!`;
    removeLife('com');
  } else if (outcome === 'Loss') {
    outcomeDisplay.textContent = `You Lose!`;
    removeLife('player');
  } else {
    outcomeDisplay.textContent = `It's a Tie!`;
  }
}

function gameOver() {
  if (playerWins === 5 || computerWins === 5) {
    gameButtons.forEach((button) => {
      button.disabled = true;
    });
    setTimeout(() => {
      if (playerWins === 5) {
        winnerText.textContent = `${userName} Wins!`;
      } else {
        winnerText.textContent = `${computerName} Wins!`;
      }
      countDown(10, 'countdownTimer');
    }, 1500);
    switchScreens(gameScreen, gameOverSection);
  }
}

function countDown(seconds, elem) {
  const element = document.getElementById(elem);
  element.textContent = seconds;
  seconds--;
  let timer = setTimeout('countDown(' + seconds + ',"' + elem + '")', 1000);
  if (seconds < 1) {
    clearTimeout(timer);
    resetGame();
    switchScreens(gameOverSection, introSection);
  }
}

function createLives() {
  for (let i = 0; i < 5; i++) {
    let newLife = document.createElement('DIV');
    let lifeimg = document.createElement('IMG');
    newLife.className = `life`;
    lifeimg.className = 'small-img';
    lifeimg.setAttribute('src', './assets/img/Heart.png');
    playerLifeBar.append(newLife);
    newLife.append(lifeimg);
  }
  for (let i = 0; i < 5; i++) {
    let newLife = document.createElement('DIV');
    let lifeimg = document.createElement('IMG');
    newLife.className = `life`;
    lifeimg.className = 'small-img';
    lifeimg.setAttribute('src', './assets/img/Heart.png');
    comLifeBar.append(newLife);
    newLife.append(lifeimg);
  }
}

function removeAllLives() {
  while (playerLifeBar.hasChildNodes()) {
    playerLifeBar.removeChild(playerLifeBar.firstChild);
  }
  while (comLifeBar.hasChildNodes()) {
    comLifeBar.removeChild(comLifeBar.firstChild);
  }
}

function removeLife(loser) {
  if (loser === 'player') {
    playerLifeBar.removeChild(playerLifeBar.lastElementChild);
  }
  if (loser === 'com') {
    comLifeBar.removeChild(comLifeBar.lastElementChild);
  }
}

function resetGame() {
  chars = [];
  textarea.value = chars.join('');
  playerWins = 0;
  computerWins = 0;
  if (document.querySelector('.option-img.active')) {
    document.querySelector('.option-img.active').style.filter =
      'grayscale(0.84)';
    document.querySelector('.option-img.active').classList.remove('active');
    avatarFullDisplayBox.setAttribute('src', `?`);
    startButton.style.opacity = 0;
  }
  playerChoiceDisplay.firstElementChild.setAttribute('src', `?`);

  computerChoiceDisplay.firstElementChild.setAttribute('src', `?`);

  removeAllLives();

  gameButtons.forEach((button) => {
    button.disabled = false;
  });
}
//////////////////////////EVENT LISTENERS//////////////////////////

introSection.addEventListener('keyup', function (e) {
  console.log(e.keyCode);
  if (e.keyCode == 13) {
    chars = [];
    textarea.value = chars.join('');
    switchScreens(introSection, userNameSection);
  }
});

keyboardButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    textarea.value += btn.innerText; //display buttons in textarea
    chars = textarea.value.split('');
  });
});

deleteButton.addEventListener('click', () => {
  chars.pop();
  textarea.value = chars.join('');
});

capsButton.addEventListener('click', () => {
  keyboardButtons.forEach((btn) => {
    btn.classList.toggle('lower');
  });
});
submitButton.addEventListener('click', () => {
  textarea.value = chars.join('');
  userName = chars.join('');
  userNameDisplay.textContent = userName;
  console.log(userName);

  switchScreens(userNameSection, avatarSection);
});

avatarOptions.forEach((box) => {
  box.addEventListener('click', () => {
    if (document.querySelector('.option-img.active')) {
      document.querySelector('.option-img.active').style.filter =
        'grayscale(0.84)';
      document.querySelector('.option-img.active').classList.remove('active');
    }
    box.classList.add('active');
    box.style.filter = 'grayscale(0)';
    updateInfo(box.id);
    startButton.style.opacity = 1;
  });
});

startButton.addEventListener('click', () => {
  createLives();
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

gameButtons.forEach((button) => {
  button.addEventListener('click', getChoices);
});

gameButtons.forEach((button) => {
  button.addEventListener('click', gameOver);
});
