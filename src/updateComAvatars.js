export let ComAvatars = {
  randomChoice: function () {
    let randomChoice = Math.floor(Math.random() * 4);
    switch (randomChoice) {
      case 0:
        this.displayChoice('Dracula');
      case 1:
        this.displayChoice('Frankenstein');
      case 2:
        this.displayChoice('Robot');
      case 3:
        this.displayChoice('Witch');
    }
  },

  displayChoice: function name(id) {
    document.querySelector('.versus-com-img').src = `../assets/img/${id}.webp`;
    document.querySelector(
      '.computerGame-avatar'
    ).src = `../assets/img/${id}.webp`;
  },
};
