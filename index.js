const introSection = document.querySelector('.intro-section');
const userNameSection = document.querySelector('.username-section');
const submitButton = document.querySelector('.submit');
const avatarSection = document.querySelector('.avatar-section');
const startButton = document.querySelector('.start-button');
const versusSection = document.querySelector('.versus-section');

function switchScreens(screenOut, screenIn) {
  screenOut.classList.replace('fadeIn', 'fadeOut');
  screenOut.addEventListener('animationend', () => {
    screenIn.classList.replace('hidden', 'fadeIn');
    screenOut.classList.replace('fadeOut', 'hidden');
  });
}

introSection.addEventListener('keyup', function (e) {
  console.log(e.keyCode);
  if (e.keyCode == 13) {
    switchScreens(introSection, userNameSection);
  }
});

submitButton.addEventListener('click', () => {
  switchScreens(userNameSection, avatarSection);
});

startButton.addEventListener('click', () => {
  switchScreens(avatarSection, versusSection);
});
