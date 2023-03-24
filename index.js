window.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Enter") {
    window.location.href = "./GamePage/game-page.html";
  }
});
