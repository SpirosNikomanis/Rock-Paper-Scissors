import {
  loadGameOverScreen,
  loadIntroScreen,
  loadUsernameScreen,
  reloadIntroScreen,
} from './Screen.js';
import { Lifebar } from './Player.js';
import { Select, SelectAll, randomIndexItem } from './utilities.js';

const modeDisplayElement = SelectAll('.mode-option');
const playerChoicePrintElement = Select('.playerChoice');
const enemyChoicePrintElement = Select('.computerChoice');
let resultDisplayElement = Select('div.outcome-display');
const GameButtons = SelectAll('.selection-button');

const PlayerLifebar = new Lifebar(Select('.player-lifebar'));
const EnemyLifebar = new Lifebar(Select('.opponent-lifebar'));

export let Mode = {
  _Options: ['Normal', 'Ranked'],
  _Option: 0,
  selection: 'Normal',

  get Selection() {
    return (this.selection =
      this._Options[this._Option % this._Options.length]);
  },

  update() {
    modeDisplayElement[0].textContent = this.Selection;
    console.log(this.Selection);
  },

  toggle(e) {
    if (e.target.id == 'right-arrow') {
      this._Option++;
      this.update();
    } else {
      this._option > 0
        ? this._Option--
        : (this._Option = this._Options.length - 1);
      this.update();
    }
  },
};

export let Game = {
  Settings: {
    mode: Mode.Selection,
    playerName: 'Player01',
    enemyName: 'Enemy',
    playerAvatar: '',
    enemyAvatar: '',

    setPlayerLives() {
      PlayerLifebar.reset();
      return this;
    },

    setEnemyLives() {
      this.mode != 'Ranked' ? EnemyLifebar.reset() : false;
      return this;
    },
  },

  Round: {
    Choices: ['Rock', 'Paper', 'Scissors'],
    roundNumber: 0,
    roundWinner: '',

    getChoices(e) {
      this.playerChoice = e.target.id;
      this.enemyChoice = randomIndexItem(this.Choices);

      this.updateCounter().printChoices().play();
      Game.GameOver();
    },

    printChoices() {
      playerChoicePrintElement.src = `../assets/img/${this.playerChoice}.webp`;
      enemyChoicePrintElement.src = `../assets/img/${this.enemyChoice}.webp`;

      playerChoicePrintElement.style.opacity = 1;
      enemyChoicePrintElement.style.opacity = 1;

      return this;
    },

    play() {
      if (this.playerChoice == this.enemyChoice) {
        this.roundWinner = 'tie';
        this.updateWinner();
        return this;
      }
      if (
        (this.playerChoice == 'Rock' && this.enemyChoice == 'Scissors') ||
        (this.playerChoice == 'Paper' && this.enemyChoice == 'Rock') ||
        (this.playerChoice == 'Scissors' && this.enemyChoice == 'Paper')
      ) {
        EnemyLifebar.remove();
        this.roundWinner = `${Game.Settings.playerName}`;
        this.updateWinner();
        return this;
      }
      PlayerLifebar.remove();
      this.roundWinner = `${Game.Settings.enemyName}`;
      this.updateWinner();
      return this;
    },

    updateWinner() {
      Game.isOver()
        ? (resultDisplayElement.textContent = 'Game Over')
        : this.roundWinner == 'tie'
        ? (resultDisplayElement.textContent = `It's a tie!`)
        : (resultDisplayElement.textContent = `${this.roundWinner} Wins!`);
    },

    updateCounter() {
      const roundDisplayElement = Select('.round-number');

      this.roundNumber++;

      roundDisplayElement.textContent = `Round ${this.roundNumber}`;

      return this;
    },
  },

  isOver() {
    return (this.Settings.mode == 'Ranked' &&
      PlayerLifebar.lives.length == 0) ||
      (this.Settings.mode == 'Normal' &&
        (PlayerLifebar.lives.length == 0 || EnemyLifebar.lives.length == 0))
      ? true
      : false;
  },

  GameOver() {
    if (this.isOver()) {
      disableGameButtons();
      this.getWinner().setWinner();
      loadGameOverScreen();
      setTimeout(() => {
        setInterval(startCountdown, 1000);
      }, 2000);
    }
  },

  getWinner() {
    let playerScore = PlayerLifebar.lives.length;
    let enemyScore = EnemyLifebar.lives.length;

    this.Settings.mode == 'Normal'
      ? playerScore > enemyScore
        ? (this.GameWinner = `${Game.Settings.playerName}`)
        : (this.GameWinner = `${Game.Settings.enemyName}`)
      : (this.playerWins = Game.Round.roundNumber);

    return this;
  },

  setWinner() {
    const gameWinnerDisplayElement = Select('.announcement-text');
    gameWinnerDisplayElement.textContent = `${this.GameWinner} Wins`;
  },

  reset() {},
};

function disableGameButtons() {
  GameButtons.forEach((btn) => (btn.disabled = true));
}

let timeleft = 10;

function startCountdown() {
  const countdownTimer = Select('#countdownTimer');
  countdownTimer.innerText = timeleft;
  if (timeleft > 0) {
    countdownTimer.innerText = timeleft;
    return timeleft--;
  }
  clearInterval(startCountdown);
  timeleft = null;
}

// document
//   .querySelector('.gameOver-section')
//   .addEventListener('keydown', function (e) {
//     if (e.key === 'Enter') stopCountdown(); //REPLACE WITH RELOAD GAME SECTION
//   });

function stopCountdown() {
  clearInterval(startCountdown);
  timeleft = null;
}

(function initGame() {
  Game.Settings.setPlayerLives().setEnemyLives();
  Game.Round.updateCounter();

  GameButtons.forEach((btn) =>
    btn.addEventListener('click', (e) => Game.Round.getChoices(e))
  );
})();
