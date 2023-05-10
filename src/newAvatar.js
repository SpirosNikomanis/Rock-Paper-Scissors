export const Avatars = [
  {
    id: 'boy-1',
    imgSrc: './assets/img/boy-1.webp',
  },
  {
    id: 'boy-2',
    imgSrc: './assets/img/boy-1.webp',
  },
  {
    id: 'boy-3',
    imgSrc: './assets/img/boy-1.webp',
  },
  {
    id: 'boy-4',
    imgSrc: './assets/img/boy-1.webp',
  },
  {
    id: 'boy-5',
    imgSrc: './assets/img/boy-1.webp',
  },
  {
    id: 'girl-1',
    imgSrc: './assets/img/boy-1.webp',
  },
  {
    id: 'girl-2',
    imgSrc: './assets/img/boy-1.webp',
  },
  {
    id: 'girl-3',
    imgSrc: './assets/img/boy-1.webp',
  },
  {
    id: 'girl-4',
    imgSrc: './assets/img/boy-1.webp',
  },
  {
    id: 'girl-5',
    imgSrc: './assets/img/boy-1.webp',
  },
];

console.log(Avatars);
Avatars.forEach((avatar) => {
  let newCharacter = document.createElement('button');

  newCharacter.classList = 'avatar';
  newCharacter.id = avatar.id;
  // newCharacter.rel = avatar.name;
  newCharacter.innerHTML = `
		<img class="character__img" src="${avatar.imgSrc}" /> `;
  newCharacter.addEventListener('click', () => {
    if (document.querySelector('.avatar.active')) {
      document.querySelector('.avatar.active').classList.remove('active');
    }
    newCharacter.classList.add('active');
  });
  document.querySelector('intro-section').appendChild(newCharacter);
});
