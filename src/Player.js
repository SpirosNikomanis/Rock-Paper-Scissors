import { VsAnimation } from "./Screen.js";
import { itemByRandomID as RandomID, Select } from "./utilities.js";

const containerElement = Select(".options-container");
const avatarFullDisplayElement = Select(".avatarFullDisplay");

class Player {
  constructor(_username = "Player01") {
    this.username = _username;
  }
  set Avatar(avatar) {
    this.avatar = { ...avatar };
  }
  get Avatar() {
    return this.avatar;
  }
}

class Avatar {
  constructor(_id = "Random") {
    this.id = _id;
    this.imgSrc = `../assets/img/${this.id}.png`;
    this.fullDisplayImgSrc = `../assets/img/${this.id}.webp`;
  }

  preview() {
    avatarFullDisplayElement.src = this.fullDisplayImgSrc;
  }
}

class AvatarButtons {
  constructor() {
    this.container = containerElement;
    this.buttons = [];
  }

  static createButton({ id, imgSrc }) {
    const newAvatarbutton = document.createElement("button");

    newAvatarbutton.id = id;
    newAvatarbutton.classList = "avatar";
    newAvatarbutton.style.filter = "grayscale(0.84)";
    newAvatarbutton.style.backgroundImage = `url(${imgSrc})`;

    newAvatarbutton.addEventListener("click", (e) => {
      isClicked(e);
    });

    return newAvatarbutton;
  }

  addButton(button) {
    this.buttons.push(button);
    this.update();
  }

  update() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }

    for (const button of this.buttons) {
      this.container.appendChild(button);
    }
  }
}

//1. CHANGE NUMBER TO ADD/REMOVE NUMBER OF AVATARS FOR PLAYER
//2. ADD/REMOVE LIST ITEMS TO ADD/REMOVE AVATARS FROM APP
//3. ADD/REMOVE ARGUMENTS TO ADD/REMOVE AVATARS FROM APP

const NUMBEROFAVATARS = 5; //1
const NUMBER_OF_LIVES = 5;

let IDs = () => {
  const IDlist = [];
  for (let i = 1; i <= NUMBEROFAVATARS; i++) {
    IDlist.push(`boy-${i}`); //3
    IDlist.push(`girl-${i}`); //3
  }
  return IDlist;
};

const EnemyAvatarsID = ["Dracula", "Witch", "Robot", "Frankenstein"]; //2
const PlayerAvatarsID = [...IDs()];

const EnemyAvatars = EnemyAvatarsID.map((ID) => (ID = new Avatar(ID)));
const PlayerAvatars = PlayerAvatarsID.map((ID) => (ID = new Avatar(ID)));

let tempAvatar = new Avatar();
PlayerAvatars.push(tempAvatar);

const Player01 = new Player();
const Enemy = new Player("Enemy");

(function createAvatarButton() {
  const buttonsContainer = new AvatarButtons(containerElement);

  PlayerAvatars.forEach((avatar) => {
    let newButton = AvatarButtons.createButton(avatar);
    buttonsContainer.addButton(newButton);
  });

  tempAvatar.preview();
})();

function isClicked(e) {
  highlight(e.target);
  tempAvatar = clickedAvatar(e.target.id);
  tempAvatar.preview();

  document.querySelector(".start-button").style.opacity = 1;
  VsAnimation();

  // //TO BE MOVED TO FUNCTION,SUBMIT ONCLICK
  //TEST PURPOSE ONLY

  Player01.Avatar = tempAvatar;
  Enemy.Avatar = RandomID("Random", EnemyAvatars);

  console.log(Player01);
  console.log(Enemy);
}

function highlight(element) {
  let activeButton = Select(".avatar.active");

  if (activeButton) {
    activeButton.classList.remove("active");
    activeButton.style.filter = "grayscale(0.84)";
  }
  element.classList.add("active");
  element.style.filter = "grayscale(0)";
}
const clickedAvatar = (id) => {
  if (id !== "Random") return new Avatar(id);
  return new Avatar(RandomID("Random", PlayerAvatars).id);
};

class Life {
  constructor() {}

  static create() {
    const newLife = document.createElement("img");

    newLife.classList = "life-img";
    newLife.src = "../assets/img/Heart.webp";

    //TEMP to be added by Css
    newLife.style.width = `80px`;

    return newLife;
  }
}

export class Lifebar {
  constructor(containerElement) {
    this.container = containerElement;
    this.lives = [];
  }

  add(life) {
    this.lives.push(life);
    this.update();
  }

  remove() {
    this.lives.pop();
    this.update();
  }

  update() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }

    for (const life of this.lives) {
      this.container.appendChild(life);
    }
  }

  reset() {
    for (let i = 1; i <= NUMBER_OF_LIVES; i++) {
      let newLife = Life.create();
      this.add(newLife);
    }
  }
}

// const playerAvatarDisplayElements = [playerVsImg, playerGameImg];
// const enemyAvatarDisplayElements = [opponentVsImg, opponentGameImg];

//TODO ADD FUNCTIONS
// addGlobalListener(avatarScreen, 'click', '.start-button', () => {
//   appScreen.VsAnimation();
// });
