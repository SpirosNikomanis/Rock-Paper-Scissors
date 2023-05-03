const playerLifeBar = document.querySelector(".player-lifebar");
const comLifeBar = document.querySelector(".computer-lifebar");
const round = document.querySelector(".round-number");
let roundNumber = 0;

export let UIupdate = {
  switchScreens: function (screenOut, screenIn) {
    screenOut.classList.replace("fadeIn", "fadeOut");
    screenOut.addEventListener(
      "animationend",
      () => {
        screenIn.classList.replace("hidden", "fadeIn");
        screenOut.classList.replace("fadeOut", "hidden");
      },
      { once: true }
    );
  },

  resetAvatarBox: function () {
    if (document.querySelector(".option-img.active")) {
      document.querySelector(".option-img.active").style.filter =
        "grayscale(0.84)";
      document.querySelector(".option-img.active").classList.remove("active");
    }
  },

  vsSlideIn: function () {
    document.querySelector(".left-half").classList.add("slide-right");
    document.querySelector(".right-half").classList.add("slide-left");
    document.querySelector(".versus-text").classList.add("slide-middle");
    document.querySelector(".versus-player").classList.add("reveal-avatar");
    document.querySelector(".versus-com").classList.add("reveal-avatar");
  },

  vsSlideOut: function () {
    document.querySelector(".left-half").classList.remove("slide-right");
    document.querySelector(".right-half").classList.remove("slide-left");
    document.querySelector(".versus-text").classList.remove("slide-middle");
    document.querySelector(".versus-player").classList.remove("reveal-avatar");
    document.querySelector(".versus-com").classList.remove("reveal-avatar");
  },

  displayRound: function () {
    ++roundNumber;
    round.textContent = `Round ${roundNumber}`;
  },

  resetRound: function () {
    roundNumber = 0;
    round.textContent = `Round ${roundNumber}`;
  },

  createPlayerLives: function () {
    for (let i = 0; i < 5; i++) {
      let newLife = document.createElement("DIV");
      let lifeimg = document.createElement("IMG");
      newLife.className = `life`;
      lifeimg.className = "small-img";
      lifeimg.src = "../assets/img/Heart.webp";
      playerLifeBar.append(newLife);
      newLife.append(lifeimg);
    }
  },

  createEnemyLives: function () {
    for (let i = 0; i < 5; i++) {
      let newLife = document.createElement("DIV");
      let lifeimg = document.createElement("IMG");
      newLife.className = `life`;
      lifeimg.className = "small-img";
      lifeimg.src = "../assets/img/Heart.webp";
      comLifeBar.append(newLife);
      newLife.append(lifeimg);
    }
  },

  removeLife: function (loser) {
    if (loser === "player") {
      if (!playerLifeBar.hasChildNodes()) {
        return;
      } else {
        playerLifeBar.removeChild(playerLifeBar.lastElementChild);
      }
    }

    if (loser === "com") {
      if (!comLifeBar.hasChildNodes()) {
        return;
      } else {
        comLifeBar.removeChild(comLifeBar.lastElementChild);
      }
    }
  },

  removeAllLives: function () {
    while (playerLifeBar.hasChildNodes()) {
      playerLifeBar.removeChild(playerLifeBar.firstChild);
    }
    while (comLifeBar.hasChildNodes()) {
      comLifeBar.removeChild(comLifeBar.firstChild);
    }
  },
};
