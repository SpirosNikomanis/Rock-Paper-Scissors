const introSection = document.querySelector('.intro-section');
const userNameSection = document.querySelector('.username-section');
const avatarSection = document.querySelector('.avatar-section');
const startButton = document.querySelector('.start-button');
const versusSection = document.querySelector('.versus-section');
const keyboardButtons = document.querySelectorAll('.btn');
const textarea = document.querySelector('textarea');
const deleteButton = document.querySelector('.delete');
const capsButton = document.querySelector('.caps');
const submitButton = document.querySelector('.submit');
let userNameDisplay = document.querySelector('#textarea');
const avatarOptions = document.querySelectorAll('.option-img');
const avatarFullDisplayBox = document.querySelector('#full-avatar');
const leftHalf = document.querySelector('.left-half');
const rightHalf = document.querySelector('.right-half');
const versusText = document.querySelector('.versus-text');
const vsPlayerAvatar = document.querySelector('.versus-player');
const vsCompAvatar = document.querySelector('.versus-com');
const gameScreen = document.querySelector('.game-section');

let chars = [];
let userName = 'Player 1';

function switchScreens(screenOut, screenIn) {
  screenOut.classList.replace('fadeIn', 'fadeOut');
  screenOut.addEventListener('animationend', () => {
    screenIn.classList.replace('hidden', 'fadeIn');
    screenOut.classList.replace('fadeOut', 'hidden');
  });
}

//////////////////////////EVENTLISTENERS//////////////////////////

introSection.addEventListener('keyup', function (e) {
  console.log(e.keyCode);
  if (e.keyCode == 13) {
    switchScreens(introSection, userNameSection);
  }
});

keyboardButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    textarea.value += btn.innerText; //display buttons in textarea
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
  textarea.value = chars.join('');
  userName = chars.join('');
  userNameDisplay.textContent = userName;
  switchScreens(userNameSection, avatarSection);
});

avatarOptions.forEach((box) => {
  box.addEventListener('click', () => {
    if (document.querySelector('.option-img.active')) {
      document.querySelector('.option-img.active').style.filter =
        'grayscale(0.84)';
      document.querySelector('.option-img.active').classList.remove('active');
    }
    box.classList.add('active');
    box.style.filter = 'grayscale(0)';
    avatarFullDisplayBox.setAttribute('src', `./assets/${box.id}.webp`);
    startButton.style.opacity = 1;
  });
});

startButton.addEventListener('click', () => {
  switchScreens(avatarSection, versusSection);
});

versusSection.addEventListener('animationstart', () => {
  leftHalf.classList.add('slide-right');
  rightHalf.classList.add('slide-left');
  versusText.classList.add('slide-middle');
  vsPlayerAvatar.classList.add('reveal-avatar');
  vsCompAvatar.classList.add('reveal-avatar');
});

versusText.addEventListener('animationend', () => {
  setTimeout(() => {
    switchScreens(versusSection, gameScreen);
  }, 2500);
});
