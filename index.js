const keyboardButtons = document.querySelectorAll(".btn");
const textarea = document.querySelector("textarea");
const deleteButton = document.querySelector(".delete");
const capsButton = document.querySelector(".caps");

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
