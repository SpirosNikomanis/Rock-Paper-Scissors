export let UIManager = {
  addIntroScreenFadeIn: (screenIn) => {
    screenIn.classList.add('fadeIn');
  },

  fadeOutScreen(screenToBeHidden) {
    screenToBeHidden.classList.replace('fadeIn', 'fadeOut');
  },
  fadeInScreen(screenToBeShown) {
    screenToBeShown.classList.replace('hidden', 'fadeIn');
  },

  hideScreen(screenToBeHidden) {
    screenToBeHidden.classList.replace('fadeOut', 'hidden');
  },

  toggleHighlight(e) {
    if (document.querySelector('.option-img.active')) {
      document.querySelector('.option-img.active').classList.remove('active');
      document.querySelector('.option-img.active').style.filter =
        'grayscale(0.84)';
    }
  },

  //   modesDisplay: () => {
  //     const modeDisplayList = document.getElementsByClassName('mode-options');

  //     return (modeDisplayList[0].textContent =
  //       modesList[modeSelected % modesList.length]);
  //   },

  //   SlideToggle: () => {
  //     document.querySelector('.left-half').classList.toggle('slide-right');
  //     document.querySelector('.right-half').classList.toggle('slide-left');
  //     document.querySelector('.versus-text').classList.toggle('slide-middle');
  //     document.querySelector('.versus-player').classList.toggle('reveal-avatar');
  //     document.querySelector('.versus-com').classList.toggle('reveal-avatar');
  //   },

  //   displayRound: () => {
  //     ++roundNumber;
  //     round.textContent = `Round ${roundNumber}`;
  //   },

  //   resetRound: () => {
  //     roundNumber = 0;
  //     round.textContent = `Round ${roundNumber}`;
  //   },

  //   displayLives: () => {
  //     if (currentMode === 'Normal') {
  //       UIupdate.createPlayerLives();
  //       UIupdate.createEnemyLives();
  //     }

  //     if (currentMode === 'Ranked') UIupdate.createPlayerLives();
  //   },

  //   createPlayerLives: () => {
  //     for (let i = 0; i < 5; i++) {
  //       let newLife = document.createElement('DIV');
  //       let lifeimg = document.createElement('IMG');
  //       newLife.className = `life`;
  //       lifeimg.className = 'small-img';
  //       lifeimg.src = '../assets/img/Heart.webp';
  //       playerLifeBar.append(newLife);
  //       newLife.append(lifeimg);
  //     }
  //   },

  //   createEnemyLives: () => {
  //     for (let i = 0; i < 5; i++) {
  //       let newLife = document.createElement('DIV');
  //       let lifeimg = document.createElement('IMG');
  //       newLife.className = `life`;
  //       lifeimg.className = 'small-img';
  //       lifeimg.src = '../assets/img/Heart.webp';
  //       comLifeBar.append(newLife);
  //       newLife.append(lifeimg);
  //     }
  //   },

  //   removeLifePlayer: () => {
  //     if (!playerLifeBar.hasChildNodes()) return;
  //     playerLifeBar.removeChild(playerLifeBar.lastElementChild);
  //   },

  //   removeLifeOpponent: () => {
  //     if (!comLifeBar.hasChildNodes()) return;
  //     comLifeBar.removeChild(comLifeBar.lastElementChild);
  //   },

  //   removeAllLives: () => {
  //     while (playerLifeBar.hasChildNodes()) {
  //       playerLifeBar.removeChild(playerLifeBar.firstChild);
  //     }
  //     while (comLifeBar.hasChildNodes()) {
  //       comLifeBar.removeChild(comLifeBar.firstChild);
  //     }
  //   },

  //   winnerNormalMode: () => {
  //     if (currentPlayer.score === 5)
  //       return (announcement.textContent = `${currentPlayer.username} Wins!`);
  //     if (currentEnemy.score === 5)
  //       return (announcement.textContent = `${currentEnemy.username} Wins!`);
  //   },

  //   winnerRankedMode: () => {
  //     if (currentEnemy.score === 5) {
  //       return (announcement.textContent = `${currentPlayer.score} Wins`);
  //     }
  //   },
};
