// const versusImg = document.querySelector('.versus-com-img');
// const computerAvatar = document.querySelector('.computerGame-avatar');

const availableAvatars = ['Dracula', 'Frankenstein', 'Robot', 'Witch'];
const RANDOM_NUMBER = Math.floor(Math.random() * 4);

function getAvatarChoice(avatarID = 'default') {
  if (avatarID == 'default') return avatarID;
  availableAvatars[RANDOM_NUMBER];
}

export default class Opponent {
  constructor(username, score) {
    (this.username = username),
      (this.score = score),
      (this.updateScore = () => ++this.score),
      (this.resetScore = () => (this.score = 0)),
      (this.avatarChoice = () => getAvatarChoice('random')),
      (this.resetAvatarChoice = () => getAvatarChoice());

    //   (this.displayChoice = function () {
    //     versusImg.src = `../assets/img/${this.username}.webp`;
    //     computerAvatar.src = `../assets/img/${this.username}.webp`;

    //     this.displayName();
    //   }),
    //   (this.displayName = function () {
    //     const comUserName = document.querySelector('.comUserName-display');
    //     comUserName.textContent = this.username;
    //   }),
    //   (this.resetChoice = function () {
    //     versusImg.src = `../assets/img/random.webp`;
    //     computerAvatar.src = `../assets/img/random.webp`;

    //     document.querySelector('.computerChoice-display').style.opacity = 0;
  }
}
