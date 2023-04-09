/////////////////////////////////////////////////////////////////////////////////////
// // // // // // // // // // // INTRO SECTION // // // // // // // // // // // // //
////////////////////////////////////////////////////////////////////////////////////

const introScreen = document.querySelector('.intro__screen');
const userNameScreen = document.querySelector('.username__screen');
const avatarScreen = document.querySelector('.avatar__screen');

window.addEventListener('keydown', function enterPressed(e) {
  console.log(e.key);
  if (e.key !== 'Enter') {
    return;
  } else {
    introScreen.classList.add('fadeOut');
    userNameScreen.classList.remove('hidden');
    setTimeout(() => {
      userNameScreen.classList.add('fadeIn');
    }, 0);
    introScreen.addEventListener('animationend', () => {
      introScreen.classList.add('hidden');
      this.window.removeEventListener('keydown', enterPressed);
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
