import { ComLifebar, PlayerLifebar } from './Lifebar.js';
import Mode from './Mode.js';
import { Computer, Player01 } from './Player.js';
import { loadGameOverScreen } from './Screen.js';
import { checkAndUpdateTop10 } from './firebase.js';
import { SelectAll, Select, randomIndexItem } from './utilities.js';

class Game {
  constructor() {
    this.playerWins = 0;
    this.Winner = null;
    this.Round = 0;
  }

  getPlayerWins() {
    return this.playerWins;
  }

  incrementPlayerWins() {
    this.playerWins++;
  }

  isGameOver() {
    return false;
  }

  getWinner() {
    return null;
  }

  incrementRound() {
    this.Round++;
  }
}

class NormalGame extends Game {
  constructor() {
    super();
  }

  isGameOver() {
    return PlayerLifebar.lives.length === 0 || ComLifebar.lives.length === 0;
  }

  setWinner() {
    const playerScore = PlayerLifebar.lives.length;
    const computerScore = ComLifebar.lives.length;

    this.Winner =
      playerScore > computerScore ? Player01.username : Computer.username;

    return `${this.Winner} wins!`;
  }
}

class RankedGame extends Game {
  constructor() {
    super();
  }

  isGameOver() {
    return PlayerLifebar.lives.length === 0;
  }

  setWinner() {
    return `${Player01.username} has ${this.getPlayerWins()} wins`;
  }
}

const Round = {
  Choices: ['Rock', 'Paper', 'Scissors'],
  playerChoice: null,
  ComputerChoice: null,
  roundWinner: null,

  getChoice(e) {
    this.playerChoice = e.target.id;
    this.ComputerChoice = randomIndexItem(this.Choices);

    return this;
  },

  printChoice() {
    const playerChoicePrintElement = Select('.playerChoice');
    const ComputerChoicePrintElement = Select('.computerChoice');

    playerChoicePrintElement.src = `../assets/img/${this.playerChoice}.webp`;
    ComputerChoicePrintElement.src = `../assets/img/${this.ComputerChoice}.webp`;

    return this;
  },

  playRound() {
    if (this.playerChoice === this.ComputerChoice) {
      this.roundWinner = 'tie';

      return this;
    }
    if (
      (this.playerChoice === 'Rock' && this.ComputerChoice === 'Scissors') ||
      (this.playerChoice === 'Paper' && this.ComputerChoice === 'Rock') ||
      (this.playerChoice === 'Scissors' && this.ComputerChoice === 'Paper')
    ) {
      this.roundWinner = `${Player01.username}`;
      ComLifebar.removeLife();

      return this;
    }
    this.roundWinner = `${Computer.username}`;

    PlayerLifebar.removeLife();

    return this;
  },

  updateRoundWinner() {
    const RoundWinnerDisplayElement = Select('.outcome-display');

    if (this.roundWinner !== 'tie') {
      RoundWinnerDisplayElement.textContent = `${Round.roundWinner} wins this round!`;
    } else {
      RoundWinnerDisplayElement.textContent = 'Tie!';
    }
  },
};

let game;

export function createGame() {
  const selectedMode = Mode.get();
  console.log('Selected Mode:', selectedMode);

  if (selectedMode === 'Normal') {
    game = new NormalGame();
    PlayerLifebar.createLives();
    ComLifebar.createLives();
  }

  if (selectedMode === 'Ranked') {
    game = new RankedGame();
    PlayerLifebar.createLives();
  }

  return game;
}

export function resetGame() {
  const displayRound = Select('.round-number');

  PlayerLifebar.reset();
  ComLifebar.reset();

  Round.playerChoice = null;
  Round.ComputerChoice = null;

  game = createGame();

  // Reset round number
  game.Round = 0;

  displayRound.textContent = `Round ${game.Round}`;


  
  // Enable game buttons
  updateGameButtonsDisabledState(false);
}

const GameButtons = SelectAll('.selection-button');

export function updateGameButtonsDisabledState(isGameOver) {
  GameButtons.forEach((btn) => {
    btn.disabled = isGameOver;
  });
}

updateGameButtonsDisabledState(false);

GameButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    gameButtonClicked(e);
  });
});

function gameButtonClicked(e) {
  if (!game.isGameOver()) {
    const displayRound = Select('.round-number');

    game.incrementRound();
    displayRound.textContent = `Round ${game.Round}`;

    Round.getChoice(e).printChoice();
    Round.playRound();

    // Check if the game is an instance of NormalGame or RankedGame
    if (game instanceof NormalGame && game.isGameOver()) {
      const gameWinnerDisplayElement = Select('.announcement-text');
      gameWinnerDisplayElement.textContent = game.setWinner();

      Round.updateRoundWinner();

      updateGameButtonsDisabledState(true);

      loadGameOverScreen();

      // Reset the player and enemy choices after the game ends
      Round.playerChoice = null;
      Round.ComputerChoice = null;
    } else if (game instanceof RankedGame && game.isGameOver()) {
      const gameWinnerDisplayElement = Select('.announcement-text');
      gameWinnerDisplayElement.textContent = game.setWinner();

      Round.updateRoundWinner();

      updateGameButtonsDisabledState(true);

      const newEntry = {
        name: Player01.username,
        score: game.getPlayerWins(),
        avatar: Player01.avatar.id,
      };

      checkAndUpdateTop10(newEntry);

      loadGameOverScreen();

      // Reset the player and enemy choices after the game ends
      Round.playerChoice = null;
      Round.ComputerChoice = null;
    } else {
      Round.updateRoundWinner();

      if (
        game instanceof RankedGame &&
        Round.roundWinner === Player01.username
      ) {
        game.incrementPlayerWins();
      }

      // Log player wins
      console.log(`Player Wins: ${game.getPlayerWins()}`);
    }
  }
}
