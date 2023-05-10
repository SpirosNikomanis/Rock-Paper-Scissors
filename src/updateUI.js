// import { eventListenersManager } from './eventListenersManager';

// const playerLifeBar = document.querySelector('.player-lifebar');
// const comLifeBar = document.querySelector('.computer-lifebar');
// const round = document.querySelector('.round-number');
// const announcement = document.querySelector('.announcement-text');

// let roundNumber = 0;
// let UIupdate;
// let currentPlayer;
// let currentEnemy;
// let currentMode;

// export let UIupdates = {
//   // switchScreens: (screenOut, screenIn) =>
//   //   eventListenersManager.toggleScreens(screenOut, screenIn),
//   // {
//   //   screenOut.classList.replace('fadeIn', 'fadeOut');
//   //   screenOut.addEventListener(
//   //     'animationend',
//   //     () => {
//   //       screenIn.classList.replace('hidden', 'fadeIn');
//   //       screenOut.classList.replace('fadeOut', 'hidden');
//   //     },
//   //     { once: true }
//   //   );

//   // resetAvatarBox: (box) => {
//   //   //toggle avatarboxes active onclick

//   //   const isActive = document.querySelector('.option-img.active');

//   //   if (isActive) {
//   //     isActive.style.filter = 'grayscale(0.84)';
//   //     isActive.classList.remove('active');
//   //   }
//   //   box.classList.add('active');
//   //   box.style.filter = 'grayscale(0)';
//   // },

//   // displayMode: (modeOptions, modeOptionSelected) => {
//   //   const gameModesDisplay = document.getElementsByClassName('mode-options');

//   //   return (gameModesDisplay[0].textContent =
//   //     modeOptions[modeOptionSelected % modeOptions.length]);
//   // },

//   winnerNormalMode: (currentPlayer, currentEnemy) => {
//     if (currentPlayer.score === 5)
//       return (announcement.textContent = `${currentPlayer.username} Wins!`);
//     if (currentEnemy.score === 5)
//       return (announcement.textContent = `${currentEnemy.username} Wins!`);
//   },

//   winnerRankedMode: (currentPlayer, currentEnemy) => {
//     if (currentEnemy.score === 5) {
//       return (announcement.textContent = `${currentPlayer.score} Wins`);
//     }
//   },

//   // vsSlideToggle: () => {
//   //   document.querySelector('.left-half').classList.toggle('slide-right');
//   //   document.querySelector('.right-half').classList.toggle('slide-left');
//   //   document.querySelector('.versus-text').classList.toggle('slide-middle');
//   //   document.querySelector('.versus-player').classList.toggle('reveal-avatar');
//   //   document.querySelector('.versus-com').classList.toggle('reveal-avatar');
//   // },

//   displayRound: () => {
//     ++roundNumber;
//     round.textContent = `Round ${roundNumber}`;
//   },

//   resetRound: () => {
//     roundNumber = 0;
//     round.textContent = `Round ${roundNumber}`;
//   },

//   displayLives: (currentMode) => {
//     if (currentMode === 'Normal') {
//       UIupdate.createPlayerLives();
//       UIupdate.createEnemyLives();
//     }

//     if (currentMode === 'Ranked') {
//       UIupdate.createPlayerLives();
//     }
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

//   removeLife: (loser) => {
//     if (loser === 'player') {
//       if (!playerLifeBar.hasChildNodes()) {
//         return;
//       } else {
//         playerLifeBar.removeChild(playerLifeBar.lastElementChild);
//       }
//     }

//     if (loser === 'com') {
//       if (!comLifeBar.hasChildNodes()) {
//         return;
//       } else {
//         comLifeBar.removeChild(comLifeBar.lastElementChild);
//       }
//     }
//   },

//   removeAllLives: () => {
//     while (playerLifeBar.hasChildNodes()) {
//       playerLifeBar.removeChild(playerLifeBar.firstChild);
//     }
//     while (comLifeBar.hasChildNodes()) {
//       comLifeBar.removeChild(comLifeBar.firstChild);
//     }
//   },
// };
