import { VsAnimation, loadAvatarScreen, loadIntroScreen } from './Screen.js';
import {
  Computer,
  Player01,
  setComputerName,
  setPlayerName,
} from './Player.js';
import { Avatar, setAvatars } from './Avatar.js';
import { Keyboard, setUsername } from './Keyboard.js';
import { Select } from './utilities.js';
import { createGame, updateGameButtonsDisabledState } from './Game.js';
import Mode from './Mode.js';
import { ComLifebar, PlayerLifebar } from './Lifebar.js';
const submitBtn = Select('.submit');
const startButton = Select('.start-button');

const App = {
  init() {
    loadIntroScreen();
    Keyboard.addListeners();
    Mode.reset();
  },

  reset() {
    this.resetKeyboard();
    this.resetMode();
    this.resetAvatar();
    this.resetLifeBars();
    this.resetPlayerData();
  },

  resetKeyboard() {
    Keyboard.reset();
  },

  resetAvatar() {
    Avatar.resetAvatarSelection();
  },

  resetLifeBars() {
    PlayerLifebar.reset();
    ComLifebar.reset();
  },

  resetMode() {
    Mode.reset();
  },

  resetPlayerData() {
    Player01.reset();
    Computer.reset();
  },
};

document.addEventListener('DOMContentLoaded', App.init);

submitBtn.addEventListener('click', () => {
  Mode.update();
  setPlayerName(Player01, setUsername());
  loadAvatarScreen();
});

startButton.addEventListener('click', () => {
  setAvatars(Player01, Computer);
  setComputerName(Computer);
  createGame();
  VsAnimation();

  updateGameButtonsDisabledState(false);
});
