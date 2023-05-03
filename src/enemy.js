export default class Enemy {
  constructor(username, score) {
    (this.username = username),
      (this.score = score),
      (this.updateScore = function () {
        return ++this.score;
      }),
      (this.resetScore = function () {
        this.score = 0;
      });

    (this.randomChoice = function () {
      let randomChoice = Math.floor(Math.random() * 4);

      switch (randomChoice) {
        case 0:
          this.username = 'Dracula';
          break;
        case 1:
          this.username = 'Frankenstein';
          break;
        case 2:
          this.username = 'Robot';
          break;
        case 3:
          this.username = 'Witch';
          break;
      }
      this.displayChoice();
    }),
      (this.displayChoice = function () {
        document.querySelector(
          '.versus-com-img'
        ).src = `../assets/img/${this.username}.webp`;

        document.querySelector(
          '.computerGame-avatar'
        ).src = `../assets/img/${this.username}.webp`;

        this.displayName();
      }),
      (this.displayName = function () {
        document.querySelector('.comUserName-display').textContent =
          this.username;
      }),
      (this.resetChoice = function () {
        document.querySelector(
          '.versus-com-img'
        ).src = `../assets/img/random.webp`;

        document.querySelector(
          '.computerGame-avatar'
        ).src = `../assets/img/random.webp`;

        document.querySelector('.computerChoice-display').style.opacity = 0;
      });
  }
}
