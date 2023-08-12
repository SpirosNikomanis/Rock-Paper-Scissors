import { Select } from './utilities.js';

const Mode = {
  _Options: ['Normal', 'Ranked'],
  _Option: 0,
  selectedMode: '',

  update() {
    const modeOptionsElement = Select('.mode-option');

    modeOptionsElement.textContent =
      this._Options[this._Option % this._Options.length];
    this.selectedMode = this._Options[this._Option % this._Options.length];
  },

  toggle(e) {
    if (e.target.id === 'right-arrow') {
      this._Option++;
    } else {
      this._Option =
        this._Option > 0 ? this._Option - 1 : this._Options.length - 1;
    }
    this.update();
  },

  reset() {
    this._Option = 0;
    this.update();
  },

  get() {
    return this.selectedMode;
  },
};

export default Mode;
