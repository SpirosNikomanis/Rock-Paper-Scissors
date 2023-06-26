import { loadIntroScreen, loadUsernameScreen } from "./Screen.js";
import { Keyboard } from "./Keyboard.js";

document.addEventListener("DOMContentLoaded", initiateApp);

function initiateApp() {
  loadIntroScreen();
  loadUsernameScreen();
  Keyboard.addListeners();
}
