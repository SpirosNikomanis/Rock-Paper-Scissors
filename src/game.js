export let Game = {
  checkMode: () => {
    const gameModesDisplay = document.getElementsByClassName('mode-options');

    let mode;

    if (gameModesDisplay[0].textContent === 'Normal') mode = 'Normal';
    if (gameModesDisplay[0].textContent === 'Ranked') mode = 'Ranked';

    return mode;
  },

  setCurrentMode: (UIupdate) => {
    let currentMode = Game.checkMode();
    UIupdate.displayLives(currentMode);
  },

  playRound: function (e, currentPlayer, currentEnemy, UIupdate) {
    this.getPlayerChoice(e, currentPlayer, currentEnemy, UIupdate);
    this.checkGameOver(currentPlayer, currentEnemy, UIupdate, this.checkMode());
  },

  getPlayerChoice: function (e, currentPlayer, currentEnemy, UIupdate) {
    let computerChoice = this.getComputerChoice();

    this.displayChoices(e.target.id, computerChoice);

    this.gameRound(
      e.target.id,
      computerChoice,
      currentPlayer,
      currentEnemy,
      UIupdate
    );
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

  displayChoices: function (playerChoice, computerChoice) {
    const playerPick = document.querySelector('.playerChoice');
    playerPick.src = `../assets/img/${playerChoice}.webp`;

    const computerPick = document.querySelector('.computerChoice');
    computerPick.src = `../assets/img/${computerChoice}.webp`;

    document.querySelector('.playerChoice-display').style.opacity = 1;
    document.querySelector('.computerChoice-display').style.opacity = 1;
  },

  gameRound: function (
    player,
    computer,
    currentPlayer,
    currentEnemy,
    UIupdate
  ) {
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
  },

  displayOutcome: function (outcome) {
    const outcomeDisplay = document.querySelector('.outcome-display');

    if (outcome === 'Win') {
      outcomeDisplay.textContent = `You Win!`;
    } else if (outcome === 'Loss') {
      outcomeDisplay.textContent = `You Lose!`;
    } else {
      outcomeDisplay.textContent = `It's a Tie!`;
    }
  },

  gameOverConditions: (currentMode, currentPlayer, currentEnemy) => {
    if (
      (currentMode === 'Normal' &&
        (currentPlayer.score === 5 || currentEnemy.score === 5)) ||
      (currentMode === 'Ranked' && currentEnemy.score === 5)
    ) {
      return 'GameOver';
    }
  },

  checkGameOver: function (currentPlayer, currentEnemy, UIupdate, currentMode) {
    if (
      this.gameOverConditions(currentMode, currentPlayer, currentEnemy) ===
      'GameOver'
    ) {
      this.gameOver(currentPlayer, currentEnemy, UIupdate, currentMode);
    }
  },

  gameOver: function (currentPlayer, currentEnemy, UIupdate, currentMode) {
    const gameScreen = document.querySelector('.game-section');
    const gameOverScreen = document.querySelector('.gameOver-section');

    if (currentMode === 'Normal') {
      UIupdate.winnerNormalMode(currentPlayer, currentEnemy);
    }
    if (currentMode === 'Ranked') {
      UIupdate.winnerRankedMode(currentPlayer, currentEnemy);
    }

    document.querySelectorAll('.selection-button').forEach((button) => {
      button.disabled = true;
    });

    setTimeout(() => {
      this.countDown(currentPlayer, currentEnemy, UIupdate);
    }, 1500);

    UIupdate.switchScreens(gameScreen, gameOverScreen);
  },

  countDown: function (currentPlayer, currentEnemy, UIupdate) {
    let timeleft = 10;

    document.getElementById('countdownTimer').innerText = timeleft;

    let downloadTimer = setInterval(function () {
      const introScreen = document.querySelector('.intro-section');
      const gameOverScreen = document.querySelector('.gameOver-section');

      if (timeleft <= 0) {
        UIupdate.switchScreens(gameOverScreen, introScreen);
        clearInterval(downloadTimer);
        Game.resetGame(currentPlayer, currentEnemy, UIupdate);
      } else {
        document.getElementById('countdownTimer').innerText = timeleft;
      }

      timeleft -= 1;
    }, 1000);
  },

  resetGame: function (currentPlayer, currentEnemy, UIupdate) {
    const outcomeDisplay = document.querySelector('.outcome-display');
    const gameButtons = document.querySelectorAll('.selection-button');
    const startButton = document.querySelector('.start-button');

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
};
