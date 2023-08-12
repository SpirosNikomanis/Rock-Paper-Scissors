import { resetGame } from './Game.js';
import { Select } from './utilities.js';

const usernameScreen = Select('.username-section');
const avatarScreen = Select('.avatar-section');
const vsScreen = Select('.versus-section');
const gameScreen = Select('.game-section');
const gameOverScreen = Select('.gameOver-section');

const Screen = {
  fadeInScreen(screenToBeShown) {
    screenToBeShown.classList.remove('hidden');
    screenToBeShown.classList.remove('fadeOut');
    screenToBeShown.classList.add('fadeIn');
    screenToBeShown.style.pointerEvents = 'all';
  },

  fadeOutScreen(screenToBeHidden) {
    screenToBeHidden.classList.remove('fadeIn');
    screenToBeHidden.classList.add('fadeOut');
    screenToBeHidden.style.pointerEvents = 'none';
    screenToBeHidden.addEventListener('animationend', onAnimationEnd);

    // Create a function to handle animationend event
    function onAnimationEnd() {
      screenToBeHidden.classList.remove('fadeOut');
      screenToBeHidden.classList.add('hidden');
      screenToBeHidden.style.animation = '';
      screenToBeHidden.removeEventListener('animationend', onAnimationEnd);
    }
  },

  fadeOutAndFadeIn(screenToFadeOut, screenToFadeIn) {
    Screen.fadeOutScreen(screenToFadeOut);
    screenToFadeOut.addEventListener('animationend', onAnimationEnd);

    // Create a function to handle the animationend event
    function onAnimationEnd() {
      // Remove the event listener to avoid potential conflicts
      screenToFadeOut.removeEventListener('animationend', onAnimationEnd);
      Screen.fadeInScreen(screenToFadeIn);
    }
  },
};

export function loadIntroScreen() {
  const logoScreen = Select('.Loading_Screen');
  const introScreen = Select('.intro-section');
  introScreen.addEventListener('keydown', function handleIntroKeyPressed() {
    Screen.fadeOutAndFadeIn(introScreen, usernameScreen);
    introScreen.removeEventListener('keydown', handleIntroKeyPressed);
  });
  setTimeout(() => {
    Screen.fadeOutAndFadeIn(logoScreen, introScreen);
  }, 6000);
}

export function reloadIntroScreen() {
  Screen.fadeOutAndFadeIn(gameOverScreen, introScreen);
}

export function loadAvatarScreen() {
  Screen.fadeOutAndFadeIn(usernameScreen, avatarScreen);
}

export function VsAnimation() {
  // Switch from avatarScreen to vsScreen
  Screen.fadeOutAndFadeIn(avatarScreen, vsScreen);
  setTimeout(() => toggleSliders(), 2000);

  // Switch from vsScreen to gameScreen after 8 seconds
  setTimeout(() => {
    Screen.fadeOutAndFadeIn(vsScreen, gameScreen);
    toggleSliders();
  }, 9000);
}

export function loadGameOverScreen() {
  setTimeout(() => {
    Screen.fadeOutAndFadeIn(gameScreen, gameOverScreen);
    setTimeout(() => startCountdown(10), 4000);
  }, 2000);
}

let countdownInterval;

function startCountdown(countdownValue) {
  const countdownDisplay = Select('.countdownTimer');
  countdownDisplay.textContent = countdownValue;

  countdownInterval = setInterval(() => {
    countdownValue--;
    countdownDisplay.textContent = countdownValue;

    if (countdownValue <= 0) {
      clearInterval(countdownInterval);

      Screen.fadeOutAndFadeIn(gameOverScreen, introScreen);

      countdownDisplay.textContent = 10;
    }
  }, 1000);

  // Add event listener for "keydown" to clear the interval on any key press
  gameOverScreen.addEventListener('keydown', handleCountdownKeyPress);
}

function handleCountdownKeyPress() {
  clearInterval(countdownInterval);
  gameOverScreen.removeEventListener('keydown', handleCountdownKeyPress);
  resetGame();

  const countdownDisplay = Select('.countdownTimer');

  countdownDisplay.textContent = '';

  Screen.fadeOutAndFadeIn(gameOverScreen, gameScreen);
}

function toggleSliders() {
  Select('.left-half').classList.toggle('slide-right');
  Select('.right-half').classList.toggle('slide-left');
  Select('.versus-text').classList.toggle('slide-middle');
  Select('.versus-player').classList.toggle('reveal-avatar');
  Select('.versus-com').classList.toggle('reveal-avatar');
}
