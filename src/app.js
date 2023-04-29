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
const roundPlayed = document.querySelector('.round-number');
const gameButtons = document.querySelectorAll('.selection-button');
const playerChoiceDisplay = document.querySelector('.playerChoice-display');
const computerChoiceDisplay = document.querySelector('.computerChoice-display');
const outcomeDisplay = document.querySelector('.outcome-display');
const gameOverSection = document.querySelector('.gameOver-section');
const winnerText = document.querySelector('.announcement-text');
const playerLifeBar = document.querySelector('.player-lifebar');
const comLifeBar = document.querySelector('.computer-lifebar');
const lives = document.querySelectorAll('.life');
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

function randomOpponent() {
  let randomChoice = Math.floor(Math.random() * 4);
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
function randomAvatar() {
  let randomChoice = Math.floor(Math.random() * 10);
  switch (randomChoice) {
    case 0:
      return 'boy-1';
    case 1:
      return 'boy-2';
    case 2:
      return 'boy-3';
    case 3:
      return 'boy-4';
    case 4:
      return 'boy-5';
    case 5:
      return 'girl-1';
    case 6:
      return 'girl-2';
    case 7:
      return 'girl-3';
    case 8:
      return 'girl-4';
    case 9:
      return 'girl-5';
    default:
      break;
  }
}

function updateInfo(avatarChosen) {
  let oppName = randomOpponent();
  ``;

  if (avatarChosen === 'random') {
    let randomPlayer = randomAvatar();
    avatarFullDisplayBox.setAttribute(
      'src',
      `../assets/img/${randomPlayer}.webp`
    );
    vsPlayerImg.setAttribute('src', `../assets/img/${randomPlayer}.webp`);
    playerGameImg.setAttribute('src', `../assets/img/${randomPlayer}.webp`);
  } else {
    avatarFullDisplayBox.setAttribute(
      'src',
      `../assets/img/${avatarChosen}.webp`
    );
    vsPlayerImg.setAttribute('src', `../assets/img/${avatarChosen}.webp`);
    playerGameImg.setAttribute('src', `../assets/img/${avatarChosen}.webp`);
  }

  vsCompImg.setAttribute('src', `../assets/img/${oppName}.webp`);
  computerGameImg.setAttribute('src', `../assets/img/${oppName}.webp`);
  playerName.textContent = userName;
  comName.textContent = oppName;
  computerName = oppName;
}

function getComputerChoice() {
  let randomChoice = Math.floor(Math.random() * 3);
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
  console.log(textareaTextContent.value);
  displayChoices(playerChoice, computerChoice);
  playRound(playerChoice, computerChoice);
  displayRound();
}

function displayChoices(playerPick, computerPick) {
  playerChoiceDisplay.style.opacity = 1;
  playerChoiceDisplay.firstElementChild.setAttribute(
    'src',
    `../assets/img/${playerPick}.webp`
  );

  computerChoiceDisplay.style.opacity = 1;
  computerChoiceDisplay.firstElementChild.setAttribute(
    'src',
    `../assets/img/${computerPick}.webp`
  );
}

function normalMode() {
  createPlayerLives();
  createComLives();
  gameButtons.forEach((button) => {
    button.addEventListener('click', () => {
      gameOver();
    });
  });
}

// function rankedMode() {
//   createPlayerLives();
//   gameButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//       gameOver();
//     });
//   });
// }

// function checkGameMode() {
//   if (gameMode[0].textContent === "Normal") {
//     normalMode();
//   }
//   if (gameMode[0].textContent === "Ranked") {
//     rankedMode();
//   }
// }

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

function displayRound() {
  ++roundNumber;
  console.log(roundNumber);
  roundPlayed.textContent = `Round ${roundNumber}`;
}

function countDown() {
  let timeleft = 10;
  let downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      resetGame();
      switchScreens(gameOverSection, introSection);
    } else {
      document.getElementById('countdownTimer').innerText = timeleft;
    }
    timeleft -= 1;
  }, 1000);
}

function gameOver() {
  if (playerWins === 5 || computerWins === 5) {
    gameButtons.forEach((button) => {
      button.disabled = true;
    });
    setTimeout(() => {
      countDown();
      switchScreens(gameScreen, gameOverSection);
    }, 2500);

    if (playerWins === 5) {
      winnerText.textContent = `${userName} Wins!`;
    } else {
      winnerText.textContent = `${computerName} Wins!`;
    }
  }
}

// function rankedModeOver() {
//   if (computerWins === 5) {
//     gameButtons.forEach((button) => {
//       button.disabled = true;
//     });

//     switchScreens(gameScreen, gameOverSection);
//     console.log(textarea.value);
//     scoreDisplay.textContent = `${playerWins}`;
//     winnerText.textContent = `${computerName} Wins!`;
// setTimeout(() => {
//   countDown(10, "countdownTimer");
// }, 2500);
// }
// }

// function normalModeOver() {
//   if (playerWins === 5 || computerWins === 5) {
//     gameButtons.forEach((button) => {
//       button.disabled = true;
//     });

//     switchScreens(gameScreen, gameOverSection);

//     if (playerWins === 5) {
//       winnerText.textContent = `${userName} Wins!`;
//     } else {
//       winnerText.textContent = `${computerName} Wins!`;
//     }
//     setTimeout(() => {
//       countDown(10, "countdownTimer");
//     }, 2500);
//   }
// }

function createPlayerLives() {
  for (let i = 0; i < 5; i++) {
    let newLife = document.createElement('DIV');
    let lifeimg = document.createElement('IMG');
    newLife.className = `life`;
    lifeimg.className = 'small-img';
    lifeimg.setAttribute('src', '../assets/img/Heart.webp');
    playerLifeBar.append(newLife);
    newLife.append(lifeimg);
  }
}

function createComLives() {
  for (let i = 0; i < 5; i++) {
    let newLife = document.createElement('DIV');
    let lifeimg = document.createElement('IMG');
    newLife.className = `life`;
    lifeimg.className = 'small-img';
    lifeimg.setAttribute('src', '../assets/img/Heart.webp');
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
    if (!playerLifeBar.hasChildNodes()) {
      return;
    } else {
      playerLifeBar.removeChild(playerLifeBar.lastElementChild);
    }
  }
  if (loser === 'com') {
    if (!comLifeBar.hasChildNodes()) {
      return;
    } else {
      comLifeBar.removeChild(comLifeBar.lastElementChild);
    }
  }
}

function resetAvatarBox() {
  if (document.querySelector('.option-img.active')) {
    document.querySelector('.option-img.active').style.filter =
      'grayscale(0.84)';
    document.querySelector('.option-img.active').classList.remove('active');
  }
}

function resetGame() {
  chars = [];
  userName = 'Player 1';
  computerName = 'Computer';
  selected = 0;
  playerWins = 0;
  computerWins = 0;
  roundNumber = 0;

  textareaTextContent.value = chars.join('');
  roundPlayed.textContent = `Round ${roundNumber}`;
  outcomeDisplay.textContent = ``;
  playerChoiceDisplay.firstElementChild.setAttribute('src', `?`);
  playerChoiceDisplay.style.opacity = 0;
  computerChoiceDisplay.firstElementChild.setAttribute('src', `?`);
  computerChoiceDisplay.style.opacity = 0;
  avatarFullDisplayBox.setAttribute('src', `../assets/img/random.webp`);
  startButton.style.opacity = 0;

  removeAllLives();
  resetAvatarBox();

  gameButtons.forEach((button) => {
    button.disabled = false;
  });
}
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
  textareaTextContent.value = chars.join('');
  userName = chars.join('');
  textareaTextContent.textContent = userName;
  // checkGameMode();
  switchScreens(userNameSection, avatarSection);
});

avatarOptions.forEach((box) => {
  box.addEventListener('click', () => {
    resetAvatarBox();
    box.classList.add('active');
    box.style.filter = 'grayscale(0)';
    updateInfo(box.id);
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

gameButtons.forEach((button) => {
  button.addEventListener('click', getChoices);
});
gameButtons.forEach((button) => {
  button.addEventListener('click', gameOver);
});
