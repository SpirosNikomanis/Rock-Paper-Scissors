import Mode from './Mode.js';
import { addGlobalListener, Select, SelectAll } from './utilities.js';

const textElement = Select('textarea');
const keyboardButtons = SelectAll('.btn');
const usernameScreen = Select('.username-section');

let textareaChars;

export const Keyboard = {
  addListeners() {
    addGlobalListener(usernameScreen, 'click', '.arrow', (e) => Mode.toggle(e));
    addGlobalListener(usernameScreen, 'click', '.btn', this.addChar);
    addGlobalListener(usernameScreen, 'click', '.delete', this.deleteChar);
    addGlobalListener(usernameScreen, 'click', '.caps', this.toggleCaps);
  },

  addChar(e) {
    textElement.value += e.target.innerText;
    textareaChars = textElement.value.split('');
  },

  deleteChar() {
    if (!textElement.value) return;
    textareaChars.pop();
    textElement.value = textareaChars.join('');
  },

  toggleCaps() {
    keyboardButtons.forEach((btn) => btn.classList.toggle('lower'));
  },

  reset() {
    textElement.value = ''; // Reset the textarea value to an empty string
    textareaChars = []; // Reset the textareaChars array
  },
};

export function setUsername() {
  return textElement.value !== '' ? textElement.value : 'Player01';
}
