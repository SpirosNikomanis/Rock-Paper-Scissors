export default class Player {
  constructor(username, score) {
    (this.username = username),
      (this.score = score),
      (this.updateScore = function () {
        return ++this.score;
      });
  }
}
