import { UIManager } from './UIManager.js';

let chars = [];

const usernameScreen = document.querySelector('.username-section');
const avatarScreen = document.querySelector('.avatar-section');
const versusScreen = document.querySelector('.versus-section');
const gameScreen = document.querySelector('.game-section');

export let eventsManager = {
  isEnterPressed(screenToBeHidden, screenToBeShown) {
    screenToBeHidden.addEventListener('keyup', (e) => {
      if (e.keyCode == 13) {
        this.switchScreensListener(screenToBeHidden, screenToBeShown);
      }
    });
  },

  switchScreensListener(screenToBeHidden, screenToBeShown) {
    UIManager.fadeOutScreen(screenToBeHidden);
    screenToBeHidden.addEventListener('animationend', () => {
      UIManager.fadeInScreen(screenToBeShown);
      UIManager.hideScreen(screenToBeHidden);
    });
  },

  addKeyboardBtnsListener(textarea) {
    const keyboardButtons = document.querySelectorAll('.btn');
    const deleteButton = document.querySelector('.delete');
    const capsButton = document.querySelector('.caps');
    const submitButton = document.querySelector('.submit');

    keyboardButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        textarea.value += btn.innerText;
        chars = textarea.value.split('');
      });
    });

    deleteButton.addEventListener('click', () => {
      chars.pop();
      textarea.value = chars.join('');
    });

    capsButton.addEventListener('click', () => {
      keyboardButtons.forEach((btn) => {
        btn.classList.toggle('lower');
      });
    });

    submitButton.addEventListener('click', () => {
      this.switchScreensListener(usernameScreen, avatarScreen);
      currentPlayer.username = chars.join('');
      console.log(currentPlayer.username);
      this.toggleBoxHighlight();
    });
  },

  toggleBoxHighlight() {
    const avatarOptions = document.querySelectorAll('.option-img');

    avatarOptions.forEach((avatar) => {
      avatar.addEventListener('click', (e) => {
        UIManager.toggleHighlight();
        e.target.classList.add('active');
        e.target.style.filter = 'grayscale(0)';
      });
    });
  },

  addStartButtonListener() {
    const startButton = document.querySelector('.start-button');

    startButton.addEventListener('click', () => {
      UIManager.switchScreens(avatarScreen, versusScreen);
      setTimeout(() => {
        UIManager.vsSlideToggle();
      }, 500);
    });
  },

  addVersusTextListener() {
    const versusText = document.querySelector('.versus-text');
    versusText.addEventListener('animationend', () => {
      setTimeout(() => {
        UIManager.switchScreens(versusScreen, gameScreen);
      }, 2500);
    });
  },

  addGameButtonsListener() {
    const gameButtons = document.querySelectorAll('.selection-button');

    gameButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        console.log(e);
      });
    });
  },
};
