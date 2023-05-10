const displayGameMode = document.querySelectorAll('.mode-options');
const displayPlayerPick = document.querySelector('.playerChoice');
const displayComputerPick = document.querySelector('.computerChoice');
const outcomeDisplay = document.querySelector('.outcome-display');
const gameScreen = document.querySelector('.game-section');
const gameOverScreen = document.querySelector('.gameOver-section');
const gameButtonsDisabled = document.querySelectorAll('.selection-button');
const introScreen = document.querySelector('.intro-section');
const gameButtons = document.querySelectorAll('.selection-button');
const startButton = document.querySelector('.start-button');

let UIupdate;
let currentPlayer;
let currentOpponent;
let currentMode;

export let GameManager = {
  getMode: function () {
    if ((displayGameMode[0].textContent = 'Normal')) currentMode = 'Normal';
    if ((displayGameMode[0].textContent = 'Ranked')) currentMode = 'Ranked';

    return currentMode;
  },

  setGameOptions: function (UIupdates, player, opponent) {
    UIupdate = UIupdates;
    currentPlayer = player;
    currentOpponent = opponent;
    currentMode = this.getMode();
  },

  displayGameOptions: function (id) {
    UIupdate.displayLives(currentMode);
    currentPlayer.usernameDisplay(currentPlayer.username);
    currentPlayer.choice(id);
    currentOpponent.randomChoice();
  },

  getPlayersChoice: function (e) {
    getPlayerChoice = currentPlayer.choice(e.target.id);
  },

  getComputerChoice: function () {
    let randomChoice = Math.floor(Math.random() * 3);
    switch (randomChoice) {
      case 0:
        return 'Rock';
      case 1:
        return 'Paper';
      case 2:
        return 'Scissors';
    }
  },

  displayRoundChoices: function (playerChoice, computerChoice) {
    displayPlayerPick.src = `../assets/img/${playerChoice}.webp`;
    displayComputerPick.src = `../assets/img/${computerChoice}.webp`;
  },

  displayOutcome: function (outcome) {
    if (outcome === 'Win') {
      outcomeDisplay.textContent = `You Win!`;
    } else if (outcome === 'Loss') {
      outcomeDisplay.textContent = `You Lose!`;
    } else {
      outcomeDisplay.textContent = `It's a Tie!`;
    }
  },

  playRound: function (player, computer) {
    UIupdate.displayRound();

    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      UIupdate.removeLife('com');
      currentPlayer.updateScore();
      this.displayOutcome('Win');
    } else if (player === computer) {
      this.displayOutcome('Tie');
    } else {
      UIupdate.removeLife('player');
      currentEnemy.updateScore();
      this.displayOutcome('Loss');
    }
    console.log(currentPlayer.score, currentEnemy.score);
    this.isGameOver();
  },

  isGameOver: () => {
    if (
      (currentMode === 'Normal' &&
        (currentPlayer.score === 5 || currentEnemy.score === 5)) ||
      (currentMode === 'Ranked' && currentEnemy.score === 5)
    ) {
      this.gameOver();
    }
  },

  gameOver: function () {
    if (currentMode === 'Normal') {
      UIupdate.winnerNormalMode(currentPlayer, currentEnemy);
    }
    if (currentMode === 'Ranked') {
      UIupdate.winnerRankedMode(currentPlayer, currentEnemy);
    }

    gameButtonsDisabled.forEach((button) => {
      button.disabled = true;
    });

    setTimeout(() => {
      this.countDown(currentPlayer, currentEnemy, UIupdate);
    }, 1500);

    UIupdate.switchScreens(gameScreen, gameOverScreen);
  },

  countDown: function () {
    let timeleft = 10;

    document.getElementById('countdownTimer').innerText = timeleft;

    let downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        UIupdate.switchScreens(gameOverScreen, introScreen);
        clearInterval(downloadTimer);
        Game.resetGame();
      } else {
        document.getElementById('countdownTimer').innerText = timeleft;
      }

      timeleft -= 1;
    }, 1000);
  },

  resetGame: function () {
    currentPlayer.username = 'Player 1';
    currentEnemy.username = 'Computer';
    currentPlayer.resetChoice();
    currentEnemy.resetChoice();
    currentPlayer.resetScore();
    currentEnemy.resetScore();

    UIupdate.removeAllLives();
    UIupdate.resetRound();
    UIupdate.resetAvatarBox();
    UIupdate.vsSlideToggle();

    startButton.style.opacity = 0;
    outcomeDisplay.textContent = 'Make your choice';
    gameButtons.forEach((button) => {
      button.disabled = false;
    });
  },

  playGame: function (e) {
    let playerChoice = this.getPlayersChoice(e);
    let computerChoice = this.getComputerChoice();

    this.displayRoundChoices(playerChoice, computerChoice);
    this.playRound(playerChoice, computerChoice);
  },
};
