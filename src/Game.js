import {
  loadGameOverScreen,
  reloadGameScreen,
  reloadIntroScreen,
} from './Screen.js';
import { Lifebar, setGameAvatars } from './Player.js';
import { Enemy, Player01 } from './Player.js';
import { Select, SelectAll, randomIndexItem } from './utilities.js';
import { resetApp } from './app.js';

const modeDisplayElement = SelectAll('.mode-option');
const roundDisplayElement = Select('.round-number');
const playerChoicePrintElement = Select('.playerChoice');
const enemyChoicePrintElement = Select('.computerChoice');
const resultDisplayElement = Select('div.outcome-display');
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
  // //TODO MAKE PRIVATE PLAYER SCORE

  Settings: {
    mode: 'Normal',
    playerNameDisplay: Select('.playerUserName-display'),
    enemyNameDisplay: Select('.comUserName-display'),
    playerAvatarDisplay: Select('.playerGame-avatar'),
    enemyAvatarDisplay: Select('.computerGame-avatar'),

    setPlayerLives() {
      PlayerLifebar.reset();
      return this;
    },

    setEnemyLives() {
      if (this.mode === 'Ranked') {
        return (EnemyLifebar.lives.length = 0);
      }
      EnemyLifebar.reset();
      return this;
    },
  },

  initGame() {
    this.Settings.mode = Mode.Selection;
    this.Settings.setPlayerLives().setEnemyLives();
    this.setPlayerWins();
    this.Settings.playerNameDisplay.textContent = Player01.username;
    this.Settings.playerAvatarDisplay.src = Player01.avatar.fullDisplayImgSrc;
    this.Settings.enemyAvatarDisplay.src = Enemy.avatar.fullDisplayImgSrc;
    this.Settings.enemyNameDisplay.textContent = Enemy.Avatar.id;
    this.Round.updateRound();
  },

  setPlayerWins() {
    return (this.PlayerWins = 0);
  },

  Round: {
    Choices: ['Rock', 'Paper', 'Scissors'],
    playerChoice: '',
    enemyChoice: '',
    roundWinner: '',
    roundNumber: 1,

    getChoices(e) {
      this.updateRound();
      this.playerChoice = e.target.id;
      this.enemyChoice = randomIndexItem(this.Choices);
      this.printChoices('visible').playRound();
      this.roundNumber++;
    },

    updateRound() {
      roundDisplayElement.textContent = `Round ${this.roundNumber}`;
      return this;
    },

    printChoices(shown) {
      playerChoicePrintElement.src = `../assets/img/${this.playerChoice}.webp`;
      enemyChoicePrintElement.src = `../assets/img/${this.enemyChoice}.webp`;

      playerChoicePrintElement.style.visibility = `${shown}`;
      enemyChoicePrintElement.style.visibility = `${shown}`;

      return this;
    },

    resetChoices() {
      this.printChoices('hidden');

      return this;
    },

    playRound() {
      if (this.playerChoice == this.enemyChoice) {
        this.roundWinner = 'tie';
        this.updateRoundWinner();
        console.log(Game.PlayerWins);

        return this;
      }
      if (
        (this.playerChoice == 'Rock' && this.enemyChoice == 'Scissors') ||
        (this.playerChoice == 'Paper' && this.enemyChoice == 'Rock') ||
        (this.playerChoice == 'Scissors' && this.enemyChoice == 'Paper')
      ) {
        EnemyLifebar.remove();
        this.roundWinner = `${Player01.username}`;
        this.updateRoundWinner();
        console.log(Game.PlayerWins);

        return this;
      }
      PlayerLifebar.remove();
      this.roundWinner = `${Enemy.username}`;
      this.updateRoundWinner();
      console.log(Game.PlayerWins);

      return this;
    },

    updateRoundWinner() {
      if (Game.isOver()) return Game.GameOver();
      this.roundWinner == 'tie'
        ? (resultDisplayElement.textContent = `It's a tie!`)
        : (resultDisplayElement.textContent = `${this.roundWinner} Wins!`);

      if (
        Game.Settings.mode == 'Ranked' &&
        this.roundWinner == `${Player01.username}`
      )
        Game.PlayerWins++;
    },

    resetRound() {
      this.roundWinner = '';
      this.roundNumber = 1;
      resultDisplayElement.textContent = 'Make your Choice';
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
    resultDisplayElement.textContent = 'Game Over';
    disableGameButtons('disable');
    this.getWinner().setWinner();
    loadGameOverScreen();
    setTimeout(() => {
      startCountdown();
    }, 2000);
  },

  getWinner() {
    let playerScore = PlayerLifebar.lives.length;
    let enemyScore = EnemyLifebar.lives.length;

    this.Settings.mode == 'Normal'
      ? playerScore > enemyScore
        ? (this.GameWinner = `${Player01.username}`)
        : (this.GameWinner = `${Enemy.username}`)
      : (this.GameWinner = `${Player01.username} ${Game.PlayerWins}`);

    return this;
  },

  setWinner() {
    const gameWinnerDisplayElement = Select('.announcement-text');
    gameWinnerDisplayElement.textContent = `${this.GameWinner} Wins`;
  },

  reset() {
    this.Round.resetRound().resetChoices();
    disableGameButtons();
    setGameAvatars();
  },
};

GameButtons.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    Game.Round.getChoices(e);
  })
);

function disableGameButtons(value) {
  GameButtons.forEach((btn) => {
    if (value == 'disable') return (btn.disabled = true);
    return (btn.disabled = false);
  });
}

let timeleft = 10;

function startCountdown() {
  const GameOverScreen = Select('.gameOver-section');
  const countdownTimer = Select('#countdownTimer');
  countdownTimer.innerText = timeleft;

  GameOverScreen.addEventListener('keydown', () => {
    clearInterval(countdown);
    Game.reset();
    Game.initGame();
    reloadGameScreen();
    timeleft = 10;
  });

  let countdown = setInterval(() => {
    if (timeleft > 0) {
      countdownTimer.innerText = timeleft;
      return timeleft--;
    }
    clearInterval(countdown);
    Game.reset();
    resetApp();
    reloadIntroScreen();
    timeleft = 10;
  }, 1000);
}
