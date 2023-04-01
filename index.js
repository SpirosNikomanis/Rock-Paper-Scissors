const keyboardButtons = document.querySelectorAll(".btn");
const textarea = document.querySelector("textarea");
const deleteButton = document.querySelector(".delete");
const capsButton = document.querySelector(".caps");
const submitButton = document.querySelector(".submit__btn");
const userNameScreen = document.querySelector(".username__screen");
const introScreen = document.querySelector(".intro");

let userName;
let chars = [];

keyboardButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    textarea.value += btn.innerText; //display buttons in textarea
    chars = textarea.value.split("");
  });
});

deleteButton.addEventListener("click", () => {
  chars.pop();
  textarea.value = chars.join("");
});

capsButton.addEventListener("click", () => {
  keyboardButtons.forEach((btn) => {
    btn.classList.toggle("upper");
  });
});
submitButton.addEventListener("click", () => {
  userName = chars.join("");
  userNameScreen.classList.replace("fadeIn", "fadeOut");
  console.log(userName);
});
