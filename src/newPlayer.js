const availableAvatars = [
  'boy-1',
  'boy-2',
  'boy-3',
  'boy-4',
  'boy-5',
  'girl-1',
  'girl-2',
  'girl-3',
  'girl-4',
  'girl-5',
];

const RANDOM_NUMBER = Math.floor(Math.random() * 10);

function getAvatarChoice(avatarID = 'default') {
  if (avatarID !== 'random') return avatarID;
  return availableAvatars[RANDOM_NUMBER];
}

export default class Player {
  constructor(username = 'Player 1', score) {
    (this.username = username),
      (this.score = score),
      (this.updateScore = () => ++this.score),
      (this.resetScore = () => (this.score = 0)),
      (this.avatarChoice = (id) => getAvatarChoice(id)),
      (this.resetAvatarChoice = () => getAvatarChoice());

    // document.querySelector('#full-avatar').src = `../assets/img/${id}.webp`;

    // document.querySelector(
    //   '.versus-player-img'
    // ).src = `../assets/img/${id}.webp`;

    // document.querySelector(
    //   '.playerGame-avatar'
    // ).src = `../assets/img/${id}.webp`;
    //   (this.usernameDisplay = (name) => {
    //     document.querySelector('.playerUserName-display').textContent = name;
    //   }),

    // document.querySelector(
    //   '.versus-player-img'
    // ).src = `../assets/img/random.webp`;

    // document.querySelector(
    //   '.playerGame-avatar'
    // ).src = `../assets/img/random.webp`;

    // document.querySelector('.playerChoice-display').style.opacity = 0;
  }
}
