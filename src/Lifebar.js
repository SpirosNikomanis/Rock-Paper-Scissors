import { Select } from './utilities.js';

export class Lifebar {
  constructor(containerElement, numberOfLives) {
    this.container = containerElement;
    this.numberOfLives = numberOfLives;
    this.lives = [];
  }

  createLives() {
    for (let i = 0; i < this.numberOfLives; i++) {
      const life = document.createElement('img');
      life.classList = 'life-img';
      life.src = '../assets/img/Heart.webp';

      // TEMP to be added by CSS
      life.style.width = '80px';
      //

      this.lives.push(life);
      this.update();
    }
  }

  removeLife() {
    this.lives.pop();
    this.update();
  }

  update() {
    this.container.innerHTML = '';
    for (const life of this.lives) {
      this.container.appendChild(life);
    }
  }

  reset() {
    this.lives.length = 0;
    this.update();
  }
}

const PlayerLifebarContainer = Select('.player-lifebar');
const ComLifebarContainer = Select('.opponent-lifebar');

export const PlayerLifebar = new Lifebar(PlayerLifebarContainer, 5);
export const ComLifebar = new Lifebar(ComLifebarContainer, 5);
