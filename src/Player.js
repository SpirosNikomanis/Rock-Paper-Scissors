import { Select } from './utilities.js';

export default class Player {
  constructor(_username) {
    this.username = _username;
    this.avatar = null;
    let score = 0;

    const incrementScore = () => {
      score += 1;
    };

    this.getScore = function () {
      return score;
    };

    this.increaseScore = function () {
      incrementScore();
    };
  }

  set Avatar(avatar) {
    this.avatar = { ...avatar };
  }

  get Avatar() {
    return this.avatar;
  }

  reset() {
    this.username = '';
    this.avatar = null;
  }
}

export const setPlayerName = (player, callback) => {
  const playerNameDisplayElement = Select('.playerUserName-display');
  player.username = callback;
  playerNameDisplayElement.textContent = player.username;
};

export const setComputerName = () => {
  const comNameDisplayElement = Select('.comUserName-display');
  Computer.username = Computer.Avatar.id;
  comNameDisplayElement.textContent = Computer.username;
};

export const Player01 = new Player();
export const Computer = new Player();
