import { itemByRandomID as RandomID, Select } from './utilities.js';

const containerElement = Select('.options-container');
const avatarFullDisplayElement = Select('.avatarFullDisplay');
const startButton = Select('.start-button');

export class Avatar {
  constructor(_id = 'Random') {
    this.id = _id;
    this.imgSrc = `../assets/img/${this.id}.png`;
    this.fullDisplayImgSrc = `../assets/img/${this.id}.webp`;
  }

  preview(element) {
    element.src = this.fullDisplayImgSrc;
  }

  static resetAvatarSelection() {
    removeHighlight();
    selectedAvatar = null;
    randomAvatar.preview(avatarFullDisplayElement);
  }
}

//1. CHANGE NUMBER TO ADD/REMOVE NUMBER OF AVATARS FOR PLAYER
//2. ADD/REMOVE ARGUMENTS TO ADD/REMOVE AVATARS FROM APP
//3. ADD/REMOVE LIST ITEMS TO ADD/REMOVE AVATARS FROM APP

const NUMBER_OF_AVATARS = 5; //1

let IDs = () => {
  const IDlist = [];
  for (let i = 1; i <= NUMBER_OF_AVATARS; i++) {
    IDlist.push(`boy-${i}`); //2
    IDlist.push(`girl-${i}`); //2
  }

  return IDlist;
};

const ComAvatarsID = ['Dracula', 'Witch', 'Robot', 'Frankenstein']; //3
const PlayerAvatarsID = [...IDs()];

const ComAvatars = ComAvatarsID.map((ID) => (ID = new Avatar(ID)));
const PlayerAvatars = PlayerAvatarsID.map((ID) => (ID = new Avatar(ID)));
const randomAvatar = new Avatar();

PlayerAvatars.push(randomAvatar);

randomAvatar.preview(avatarFullDisplayElement);

class AvatarButtons {
  constructor() {
    this.container = containerElement;
    this.buttons = [];
  }

  static createButton({ id, imgSrc }) {
    const newAvatarbutton = document.createElement('button');

    newAvatarbutton.id = id;
    newAvatarbutton.classList = 'avatar';
    newAvatarbutton.style.filter = 'grayscale(0.84)';
    newAvatarbutton.style.backgroundImage = `url(${imgSrc})`;

    newAvatarbutton.addEventListener('click', (e) => previewClickedAvatar(e));

    return newAvatarbutton;
  }

  addButton(button) {
    this.buttons.push(button);

    this.reset();
  }

  reset() {
    this.container.innerHTML = '';

    startButton.style.opacity = 0;

    for (const button of this.buttons) {
      this.container.appendChild(button);
    }
  }
}

(function createAvatarButtons() {
  const buttonsContainer = new AvatarButtons(containerElement);

  PlayerAvatars.forEach((avatar) => {
    const newButton = AvatarButtons.createButton(avatar);

    buttonsContainer.addButton(newButton);
  });
})();

let selectedAvatar;

function previewClickedAvatar(e) {
  addHighlight(e.target);

  selectedAvatar = clickedAvatar(e.target.id);

  selectedAvatar.preview(avatarFullDisplayElement);

  startButton.style.opacity = 1;
}

const clickedAvatar = (id) => {
  if (id !== 'Random') {
    return new Avatar(id);
  } else {
    return new Avatar(RandomID('Random', PlayerAvatars).id);
  }
};

function removeHighlight() {
  let activeButton = Select('.avatar.active');

  if (activeButton) {
    activeButton.classList.remove('active');
    activeButton.style.filter = 'grayscale(0.84)';
  }
}

function addHighlight(element) {
  removeHighlight();
  element.classList.add('active');
  element.style.filter = 'grayscale(0)';
}

function printAvatars(player, com) {
  const playerAvatarVSDisplay = Select('.versus-player-img');
  const comAvatarVSDisplay = Select('.versus-com-img');
  const playerAvatarGameDisplay = Select('.playerGame-avatar');
  const comAvatarGameDisplay = Select('.computerGame-avatar');

  const playerAvatarImgSrc = player.Avatar.fullDisplayImgSrc;
  const comAvatarImgSrc = com.Avatar.fullDisplayImgSrc;

  playerAvatarVSDisplay.src = playerAvatarImgSrc;
  playerAvatarGameDisplay.src = playerAvatarImgSrc;
  comAvatarVSDisplay.src = comAvatarImgSrc;
  comAvatarGameDisplay.src = comAvatarImgSrc;
}

export function setAvatars(player, com) {
  com.Avatar = RandomID('Random', ComAvatars);
  player.Avatar = selectedAvatar;

  printAvatars(player, com);
}
