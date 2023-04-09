/////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // INTRO SECTION // // // // // // // // // // // // //
////////////////////////////////////////////////////////////////////////////////////

const introScreen = document.querySelector('.intro__screen');
const userNameScreen = document.querySelector('.username__screen');
const avatarScreen = document.querySelector('.avatar__screen');
const vsScreen = document.querySelector('.versus-screen');

window.addEventListener('keydown', function enterPressed(e) {
  console.log(e.key);
  if (e.key !== 'Enter') {
    return;
  } else {
    introScreen.classList.add('fadeOut');
    userNameScreen.classList.remove('hidden');
    userNameScreen.classList.add('fadeIn');

    introScreen.addEventListener('animationend', () => {
      introScreen.classList.add('hidden');
      window.removeEventListener('keydown', enterPressed);
    });
  }
});

/////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // KEYBOARD SECTION // // // // // // // // // // // //
////////////////////////////////////////////////////////////////////////////////////

const keyboardButtons = document.querySelectorAll('.btn');
const textarea = document.querySelector('textarea');
const deleteButton = document.querySelector('.delete');
const capsButton = document.querySelector('.caps');
const submitButton = document.querySelector('.submit__btn');

let chars = [];
let userName = '';

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
  userNameScreen.classList.add('fadeOut');

  setTimeout(() => {
    avatarScreen.classList.remove('hidden');
    avatarScreen.classList.add('fadeIn');
  }, 1);
  userNameScreen.addEventListener('animationend', () => {
    userNameScreen.classList.add('hidden');
  });
});

/////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // AVATAR SECTION // // // // // // // // // // // //
////////////////////////////////////////////////////////////////////////////////////
const avatarSelectionBox = document.querySelectorAll('.avatar__img');
const avatarFullDisplayBox = document.querySelector('.full-image');
const startGameButton = document.querySelector('.start__game__container');
const vsLeftSide = document.querySelector('.left-half');
const vsRightSide = document.querySelector('.right-half');
const vsMiddleText = document.querySelector('.versus__text');
const vsPlayerAvatar = document.querySelector('.versus-img-player');
const vsComAvatar = document.querySelector('.versus-img-com');
const gameScreen = document.querySelector('.game__screen');

avatarSelectionBox.forEach((box) => {
  box.addEventListener('click', () => {
    console.log(avatarFullDisplayBox.getAttribute('src'));
    avatarFullDisplayBox.setAttribute('src', `./assets/${box.id}.png`);
    startGameButton.style.opacity = 1;
  });
});

startGameButton.addEventListener('click', () => {
  avatarScreen.classList.add('fadeOut');
  vsScreen.classList.remove('hidden');
  avatarScreen.addEventListener('animationend', () => {
    avatarScreen.classList.add('hidden');
    vsScreen.classList.add('fadeIn');
    vsLeftSide.classList.add('slide-right');
    vsRightSide.classList.add('slide-left');
    vsMiddleText.classList.add('slide-middle');
  });
});

/////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // VERSUS SECTION // // // // // // // // // // // //
////////////////////////////////////////////////////////////////////////////////////

vsMiddleText.addEventListener('animationend', () => {
  vsPlayerAvatar.classList.add('show-avatar');
  vsComAvatar.classList.add('show-avatar');
});

vsComAvatar.addEventListener('animationend', () => {
  vsLeftSide.classList.replace('slide-right', 'slide-right-reversed');
  vsRightSide.classList.replace('slide-left', 'slide-left-reversed');
  vsMiddleText.classList.replace('slide-middle', 'slide-middle-reversed');
  gameScreen.classList.remove('hidden');
  vsMiddleText.addEventListener('animationend', () => {
    vsScreen.classList.add('fadeOut');
    gameScreen.classList.add('fadeIn');
    vsScreen.addEventListener('animationend', () => {
      vsScreen.classList.remove('fadeIn');
      vsScreen.classList.add('hidden');
      vsLeftSide.classList.remove('slide-right-reversed');
      vsRightSide.classList.remove('slide-left-reversed');
      vsMiddleText.classList.remove('slide-middle-reversed');
      vsPlayerAvatar.classList.remove('show-avatar');
      vsComAvatar.classList.remove('show-avatar');
    });
  });
});
