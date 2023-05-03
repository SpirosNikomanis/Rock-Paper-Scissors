export let Game = {
  startGame: function (e, currentPlayer, currentEnemy, lives) {
    this.getPlayerChoice(e, currentPlayer, currentEnemy, lives);
    this.gameOver(currentPlayer, currentEnemy, lives);
  },

  getPlayerChoice: function (e, currentPlayer, currentEnemy, lives) {
    let computerChoice = this.getComputerChoice();
    this.displayChoices(e.target.id, computerChoice);
    this.playRound(
      e.target.id,
      computerChoice,
      currentPlayer,
      currentEnemy,
      lives
    );
  },

  getComputerChoice: function () {
    let randomChoice = Math.floor(Math.random() * 3);
    switch (randomChoice) {
      case 0:
        return "Rock";
      case 1:
        return "Paper";
      case 2:
        return "Scissors";
    }
  },

  displayChoices: function (playerChoice, computerChoice) {
    const playerPick = document.querySelector(".playerChoice");
    playerPick.src = `../assets/img/${playerChoice}.webp`;

    const computerPick = document.querySelector(".computerChoice");
    computerPick.src = `../assets/img/${computerChoice}.webp`;

    document.querySelector(".playerChoice-display").style.opacity = 1;
    document.querySelector(".computerChoice-display").style.opacity = 1;
  },

  playRound: function (player, computer, currentPlayer, currentEnemy, lives) {
    lives.displayRound();

    if (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Paper" && computer === "Rock") ||
      (player === "Scissors" && computer === "Paper")
    ) {
      lives.removeLife("com");
      currentPlayer.updateScore();
      this.displayOutcome("Win");
    } else if (player === computer) {
      this.displayOutcome("Tie");
    } else {
      lives.removeLife("player");
      currentEnemy.updateScore();
      this.displayOutcome("Loss");
    }

    console.log(currentPlayer.score, currentEnemy.score);
  },

  displayOutcome: function (outcome) {
    const outcomeDisplay = document.querySelector(".outcome-display");

    if (outcome === "Win") {
      outcomeDisplay.textContent = `You Win!`;
    } else if (outcome === "Loss") {
      outcomeDisplay.textContent = `You Lose!`;
    } else {
      outcomeDisplay.textContent = `It's a Tie!`;
    }
  },

  gameOver: function (currentPlayer, currentEnemy, lives) {
    if (currentPlayer.score === 5 || currentEnemy.score === 5) {
      const announcement = document.querySelector(".announcement-text");

      const gameScreen = document.querySelector(".game-section");
      const gameOverScreen = document.querySelector(".gameOver-section");

      document.querySelectorAll(".selection-button").forEach((button) => {
        button.disabled = true;
      });

      lives.switchScreens(gameScreen, gameOverScreen);

      if (currentPlayer.score === 5) {
        announcement.textContent = `${currentPlayer.username} Wins!`;
      } else {
        announcement.textContent = `${currentEnemy.username} Wins!`;
      }

      setTimeout(() => {
        this.countDown(currentPlayer, currentEnemy, lives);
      }, 1500);
    }
  },

  countDown: function (currentPlayer, currentEnemy, lives) {
    let timeleft = 10;

    document.getElementById("countdownTimer").innerText = timeleft;

    let downloadTimer = setInterval(function () {
      const introScreen = document.querySelector(".intro-section");
      const gameOverScreen = document.querySelector(".gameOver-section");

      if (timeleft <= 0) {
        lives.switchScreens(gameOverScreen, introScreen);
        clearInterval(downloadTimer);
        Game.resetGame(currentPlayer, currentEnemy, lives);
      } else {
        document.getElementById("countdownTimer").innerText = timeleft;
      }

      timeleft -= 1;
    }, 1000);
  },

  resetGame: function (currentPlayer, currentEnemy, lives) {
    currentPlayer.resetChoice();
    currentPlayer.resetScore();
    currentEnemy.resetChoice();
    currentEnemy.resetScore();
    lives.removeAllLives();
    lives.resetRound();
    lives.resetAvatarBox();

    document.querySelector(".playerChoice-display").style.opacity = 0;
    document.querySelector(".computerChoice-display").style.opacity = 0;
    document.querySelector(".outcome-display").textContent = "Make your choice";

    document.querySelectorAll(".selection-button").forEach((button) => {
      button.disabled = false;
    });
  },
};
