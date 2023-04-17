/////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // INTRO SECTION // // // // // // // // // // // // //
////////////////////////////////////////////////////////////////////////////////////

const introScreen = document.querySelector(".intro__screen");
const userNameScreen = document.querySelector(".username__screen");
const avatarScreen = document.querySelector(".avatar__screen");
const vsScreen = document.querySelector(".versus-screen");
const homeButton = document.querySelector(".home");
const resetButton = document.querySelector(".reset-icon");
const startButton = document.querySelector(".start-game-button");

startButton.addEventListener("click", () => {
  introScreen.classList.add("fadeOut");
  introScreen.addEventListener(
    "animationend",
    function endanimation() {
      userNameScreen.classList.replace("hidden", "fadeIn");
      introScreen.classList.replace("fadeOut", "hidden");
    },
    { once: true }
  );
});
/////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // KEYBOARD SECTION // // // // // // // // // // // //
////////////////////////////////////////////////////////////////////////////////////

const keyboardButtons = document.querySelectorAll(".btn");
const textarea = document.querySelector("textarea");
const deleteButton = document.querySelector(".delete");
const capsButton = document.querySelector(".caps");
const submitButton = document.querySelector(".submit__btn");
let userNameDisplay = document.querySelector(".userName");

let chars = [];
let userName = "Player 1";

keyboardButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    textarea.value += btn.innerText; //display buttons in textarea
    chars = textarea.value.split("");
  });
});

deleteButton.addEventListener("click", () => {
  chars.pop();
  textarea.value = chars.join("");
});

capsButton.addEventListener("click", () => {
  keyboardButtons.forEach((btn) => {
    btn.classList.toggle("lower");
  });
});
submitButton.addEventListener("click", () => {
  textarea.value = chars.join("");
  userName = chars.join("");
  userNameDisplay.textContent = userName;

  userNameScreen.classList.replace("fadeIn", "fadeOut");

  userNameScreen.addEventListener(
    "animationend",
    function endanimation() {
      avatarScreen.classList.replace("hidden", "fadeIn");
      userNameScreen.classList.replace("fadeOut", "hidden");
    },
    { once: true }
  );
});

/////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // AVATAR SECTION // // // // // // // // // // // //
////////////////////////////////////////////////////////////////////////////////////
const avatarSelectionBox = document.querySelectorAll(".avatar__img");
const avatarFullDisplayBox = document.querySelector(".full-image");
const startGameButton = document.querySelector(".start__game__container");
const vsLeftSide = document.querySelector(".left-half");
const vsRightSide = document.querySelector(".right-half");
const vsMiddleText = document.querySelector(".versus__text");
const vsPlayerAvatar = document.querySelector(".versus-img-player");
const vsComAvatar = document.querySelector(".versus-img-com");
const gameScreen = document.querySelector(".game__screen");

avatarSelectionBox.forEach((box) => {
  box.addEventListener("click", () => {
    avatarFullDisplayBox.setAttribute("src", `./assets/${box.id}.png`);
    startGameButton.style.opacity = 1;
  });
});

startGameButton.addEventListener("click", () => {
  avatarScreen.classList.add("fadeOut");
  avatarScreen.addEventListener(
    "animationend",
    function endanimation() {
      avatarScreen.classList.remove("fadeIn");
      vsScreen.classList.replace("hidden", "fadeIn");
      avatarScreen.classList.replace("fadeOut", "hidden");
    },
    { once: true }
  );

  /////////////////////////////////////////////////////////////////////////////////////
  // // // // // // // // // // // VERSUS SECTION // // // // // // // // // // // //
  ////////////////////////////////////////////////////////////////////////////////////

  vsScreen.addEventListener(
    "animationend",
    function endanimation() {
      vsLeftSide.classList.add("slide-right");
      vsRightSide.classList.add("slide-left");
      vsMiddleText.classList.add("slide-middle");
    },
    { once: true }
  );

  setTimeout(() => {
    gameScreen.classList.replace("hidden", "fadeIn");
    vsScreen.classList.replace("fadeIn", "hidden");
    vsLeftSide.classList.remove("slide-right");
    vsRightSide.classList.remove("slide-left");
    vsMiddleText.classList.remove("slide-middle");
  }, 11000);
});
/////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // GAME SECTION // // // // // // // // // // // //
////////////////////////////////////////////////////////////////////////////////////

const playerSelectionDisplay = document.querySelector("#player-choice");
const comSelectionDisplay = document.querySelector("#com-choice");
const opponentNameDisplay = document.querySelector(".opponentName");
const outcomeDisplay = document.querySelector(".outcome__display");
const selectionButtons = document.querySelectorAll(".selection-button");
const playerLivesBar = document.querySelector(".player-life-bar");
const comLivesBar = document.querySelector(".computer-life-bar");
const lives = document.querySelectorAll(".life");
const gameOverScreen = document.querySelector(".gameOver-screen");

let playerWins = 0;
let computerWins = 0;
let playerSelection = "";
let computerSelection = "";

gameScreen.addEventListener(
  "animationend",
  function endanimation() {
    lives.forEach((life) => {
      let lifeimg = document.createElement("IMG");
      lifeimg.setAttribute("src", "./assets/Heart.png");
      lifeimg.className = "player-life-img";
      life.appendChild(lifeimg);
    });
  },
  { once: true }
);

function getComputerChoice() {
  randomChoice = Math.floor(Math.random() * 3);
  switch (randomChoice) {
    case 0:
      return "Rock";
    case 1:
      return "Paper";
    case 2:
      return "Scissors";
    default:
      break;
  }
}

function getBothChoices(e) {
  playerSelection = e.target.id;
  computerSelection = getComputerChoice();

  displayChoices(playerSelection, computerSelection);
  playRound(playerSelection, computerSelection);
}

function displayChoices(playerPick, computerPick) {
  playerSelectionDisplay.firstElementChild.setAttribute(
    "src",
    `./assets/${playerPick}.png`
  );

  comSelectionDisplay.firstElementChild.setAttribute(
    "src",
    `./assets/${computerPick}.png`
  );
}

function displayOutcome(outcome) {
  if (outcome === "Win") {
    outcomeDisplay.textContent = `You Win!`;
    comLivesBar.removeChild(comLivesBar.lastElementChild);
  } else if (outcome === "Loss") {
    outcomeDisplay.textContent = `You Lose!`;
    playerLivesBar.removeChild(playerLivesBar.lastElementChild);
  } else {
    outcomeDisplay.textContent = `It's a Tie!`;
  }
}

function playRound(player, computer) {
  if (
    (player === "Rock" && computer === "Scissors") ||
    (player === "Paper" && computer === "Rock") ||
    (player === "Scissors" && computer === "Paper")
  ) {
    ++playerWins;
    displayOutcome("Win");
  } else if (player === computer) {
    displayOutcome("Tie");
  } else {
    ++computerWins;
    displayOutcome("Loss");
  }
}

function resetLifeBars() {
  while (playerLivesBar.firstElementChild) {
    playerLivesBar.removeChild(playerLivesBar.firstElementChild);

    while (comLivesBar.firstElementChild) {
      comLivesBar.removeChild(comLivesBar.firstElementChild);
    }
  }
}

function gameOver() {
  if (playerWins === 5 || computerWins === 5) {
    selectionButtons.forEach((button) => {
      button.disabled = true;
    });
    gameScreen.classList.replace("fadeIn", "fadeOut");
    gameOverScreen.classList.replace("hidden", "fadeIn");
    gameScreen.addEventListener(
      "animationend",
      function endanimation() {
        resetLifeBars();
      },
      { once: true }
    );
  } else {
    return;
  }
}

selectionButtons.forEach((button) => {
  button.addEventListener("click", getBothChoices);
});
selectionButtons.forEach((button) => {
  button.addEventListener("click", gameOver);
});

/////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // GAME OVER SECTION // // // // // // // // // // // //
////////////////////////////////////////////////////////////////////////////////////

const gameWinnerDisplay = document.querySelector(".game-winner");
let currentTime = timeLeft.textContent;
let timerId;

// function announceMatchWinner() {
//   if (playerWins === 5) {
//     gameWinnerDisplay.textContent = `${userNameDisplay.textContent} Wins!`;
//     timerId = setInterval(countDown, 1000);
//   } else if (computerWins === 5) {
//     gameWinnerDisplay.textContent = "Computer Wins";
//     timerId = setInterval(countDown, 1000);
//   }
// }

// function countDown() {
//   timeLeft.textContent = currentTime;
//   currentTime--;
//   if (currentTime !== 0) {
//     return;
//   } else {
//     clearInterval(timerId);
//     // resetLifeBar;
//     console.log("end");
//     gameOverScreen.classList.replace("fadeIn", "fadeOut");
//     introScreen.classList.remove("hidden");
//   }
// }

// function restart() {
//   gameOverScreen.classList.replace('fadeOut', 'hidden');
//   playerWins = 0;
//   computerWins = 0;
//   timeLeft.textContent = 5;
// }
