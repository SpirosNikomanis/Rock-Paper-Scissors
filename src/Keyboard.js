import { Game, Mode } from "./Game.js";
import { loadAvatarScreen } from "./Screen.js";
import { addGlobalListener, Select, SelectAll } from "./utilities.js";

const textareaElement = Select("textarea");
const keyboardButtons = SelectAll(".btn");

const usernameScreen = Select(".username-section");

let textareaChars;

// // // TODO CREATE KEYBOARD CONTAINER AND REPLACE PARENT
export let Keyboard = {
  addListeners() {
    addGlobalListener(usernameScreen, "click", ".arrow", (e) => Mode.toggle(e));
    addGlobalListener(usernameScreen, "click", ".btn", this.addChar);
    addGlobalListener(usernameScreen, "click", ".delete", this.deleteChar);
    addGlobalListener(usernameScreen, "click", ".caps", this.toggleCaps);
    addGlobalListener(usernameScreen, "click", ".submit", () => {
      Game.Settings.playerName = setUsername();
      loadAvatarScreen();
    }); //TODO ADD functions
  },

  addChar(e) {
    textareaElement.value += e.target.innerText;
    textareaChars = textareaElement.value.split("");
  },

  deleteChar() {
    if (!textareaElement.value) return;

    textareaChars.pop();
    textareaElement.value = textareaChars.join("");
  },

  toggleCaps() {
    keyboardButtons.forEach((btn) => btn.classList.toggle("lower"));
  },
};

function setUsername() {
  if (textareaElement.value !== "") return textareaElement.value;
  return "Player01";
}
