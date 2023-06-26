import { Select, addGlobalListener, isEnterPressed } from './utilities.js';

const introScreen = Select('.intro-section');
const usernameScreen = Select('.username-section');
const avatarScreen = Select('.avatar-section');
const vsScreen = Select('.versus-section');
const gameScreen = Select('.game-section');
const gameOverScreen = Select('.gameOver-section');

let Screen = {
  fadeIn(screenToBeShown) {
    screenToBeShown.classList.replace('hidden', 'fadeIn');
  },

  fadeOut(screenToBeHidden) {
    screenToBeHidden.classList.replace('fadeIn', 'fadeOut');
  },

  hide(screenToBeHidden) {
    screenToBeHidden.classList.replace('fadeOut', 'hidden');
  },

  switch(screenToBeHidden, screenToBeShown) {
    Screen.fadeOut(screenToBeHidden);
    Screen.fadeIn(screenToBeShown);
    setTimeout(() => Screen.hide(screenToBeHidden), 1500);
  },
};

export function loadIntroScreen() {
  Screen.fadeOut(gameOverScreen);
  Screen.fadeIn(introScreen);
  setTimeout(() => Screen.hide(gameOverScreen), 1500);
}

export function reloadIntroScreen() {
  Screen.switch(gameOverScreen, introScreen);
}

export function loadUsernameScreen() {
  addGlobalListener(introScreen, 'keydown', '.intro-section', (e) => {
    if (isEnterPressed(e)) Screen.switch(introScreen, usernameScreen);
  });
}

export function loadAvatarScreen() {
  Screen.switch(usernameScreen, avatarScreen);
}

export function VsAnimation() {
  Screen.switch(avatarScreen, vsScreen);
  toggleSlidersAnimation(`1000`);
  toggleSlidersAnimation(`9000`);

  setTimeout(() => Screen.switch(vsScreen, gameScreen), 7000);
}

export function loadGameOverScreen() {
  setTimeout(() => {
    Screen.switch(gameScreen, gameOverScreen);
  }, 1500);
}

function toggleSliders() {
  Select('.left-half').classList.toggle('slide-right');
  Select('.right-half').classList.toggle('slide-left');
  Select('.versus-text').classList.toggle('slide-middle');
  Select('.versus-player').classList.toggle('reveal-avatar');
  Select('.versus-com').classList.toggle('reveal-avatar');
}

function toggleSlidersAnimation(time) {
  setTimeout(() => toggleSliders(), time);
}
