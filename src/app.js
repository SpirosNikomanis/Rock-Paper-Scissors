import { loadIntroScreen, loadUsernameScreen } from './Screen.js';
import { Keyboard, textareaElement } from './Keyboard.js';
import { removeHighlight, resetAvatarPreview } from './Player.js';

document.addEventListener('DOMContentLoaded', initiateApp);

function initiateApp() {
  loadIntroScreen();
  loadUsernameScreen();
  Keyboard.addListeners();
}

export function resetApp() {
  textareaElement.value = '';
  removeHighlight();
  resetAvatarPreview();
}
