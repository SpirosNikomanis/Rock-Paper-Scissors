export let PlayerAvatars = {
  choice: function (id) {
    if (id !== 'randomImg') {
      id;
    } else {
      let random = Math.floor(Math.random() * 10);
      switch (random) {
        case 0:
          id = 'boy-1';
          break;
        case 1:
          id = 'boy-2';
          break;
        case 2:
          id = 'boy-3';
          break;
        case 3:
          id = 'boy-4';
          break;
        case 4:
          id = 'boy-5';
          break;
        case 5:
          id = 'girl-1';
          break;
        case 6:
          id = 'girl-2';
          break;
        case 7:
          id = 'girl-3';
          break;
        case 8:
          id = 'girl-4';
          break;
        case 9:
          id = 'girl-5';
          break;
      }
    }

    document.querySelector('#full-avatar').src = `../assets/img/${id}.webp`;

    document.querySelector(
      '.versus-player-img'
    ).src = `../assets/img/${id}.webp`;

    document.querySelector(
      '.playerGame-avatar'
    ).src = `../assets/img/${id}.webp`;
  },

  resetChoice: function () {
    document.querySelector('#full-avatar').src = `../assets/img/random.webp`;

    document.querySelector(
      '.versus-player-img'
    ).src = `../assets/img/random.webp`;

    document.querySelector(
      '.playerGame-avatar'
    ).src = `../assets/img/random.webp`;
  },
};
