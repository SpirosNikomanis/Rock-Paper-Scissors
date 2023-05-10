import { eventsManager } from './eventListenersManager.js';
import Opponent from './newOpponent.js';
import Player from './newPlayer.js';
import { UIManager } from './UIManager.js';

function runApp() {
  const introScreen = document.querySelector('.intro-section');
  const usernameScreen = document.querySelector('.username-section');
  const textarea = document.querySelector('textarea');

  let currentPlayer = new Player('Player 1', 0);
  let currentOpp = new Opponent();

  UIManager.addIntroScreenFadeIn(introScreen);
  eventsManager.isEnterPressed(introScreen, usernameScreen);
  eventsManager.addKeyboardBtnsListener(textarea);
}

runApp();
