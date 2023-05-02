export let Game = {
  startGame: function (e, currentPlayer, currentEnemy) {
    this.getPlayerChoice(e, currentPlayer, currentEnemy);
  },

  getPlayerChoice: function (e, currentPlayer, currentEnemy) {
    let computerChoice = this.getComputerChoice();
    this.displayChoices(e.target.id, computerChoice);
    this.playRound(e.target.id, computerChoice, currentPlayer, currentEnemy);
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
    document.querySelector(
      '.playerChoice'
    ).src = `../assets/img/${playerChoice}.webp`;
    document.querySelector('.playerChoice-display').style.opacity = 1;

    document.querySelector(
      '.computerChoice'
    ).src = `../assets/img/${computerChoice}.webp`;
    document.querySelector('.computerChoice-display').style.opacity = 1;
  },

  playRound: function (player, computer, currentPlayer, currentEnemy) {
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      currentPlayer.updateScore();
      this.displayOutcome('Win');
    } else if (player === computer) {
      this.displayOutcome('Tie');
    } else {
      currentEnemy.updateScore();
      this.displayOutcome('Loss');
    }
    console.log(currentPlayer.score, currentEnemy.score);
  },

  displayOutcome: function (outcome) {
    if (outcome === 'Win') {
      document.querySelector('.outcome-display').textContent = `You Win!`;
    } else if (outcome === 'Loss') {
      document.querySelector('.outcome-display').textContent = `You Lose!`;
    } else {
      document.querySelector('.outcome-display').textContent = `It's a Tie!`;
    }
  },

  gameOver: function (currentPlayer, currentEnemy) {
    if (currentPlayer.score === 5 || currentEnemy.score === 5) {
      const announcement = document.querySelector('.announcement-text');

      document.querySelectorAll('.selection-button').forEach((button) => {
        button.disabled = true;
      });

      if (currentPlayer.score === 5) {
        announcement.textContent = `${currentPlayer.username} Wins!`;
      } else {
        announcement.textContent = `${currentEnemy.username} Wins!`;
      }
    }
  },
};
