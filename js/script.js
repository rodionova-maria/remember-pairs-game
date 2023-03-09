const ALL_CARDS = [
  'hearts-6.svg',
  'hearts-7.svg',
  'hearts-8.svg',
  'hearts-9.svg',
  'hearts-10.svg',
  'hearts-jack.svg',
  'hearts-queen.svg',
  'hearts-king.svg',
  'hearts-ace.svg',
  'diamonds-6.svg',
  'diamonds-7.svg',
  'diamonds-8.svg',
  'diamonds-9.svg',
  'diamonds-10.svg',
  'diamonds-jack.svg',
  'diamonds-queen.svg',
  'diamonds-king.svg',
  'diamonds-ace.svg',
  'spades-6.svg',
  'spades-7.svg',
  'spades-8.svg',
  'spades-9.svg',
  'spades-10.svg',
  'spades-jack.svg',
  'spades-queen.svg',
  'spades-king.svg',
  'spades-ace.svg',
  'clubs-6.svg',
  'clubs-7.svg',
  'clubs-8.svg',
  'clubs-9.svg',
  'clubs-10.svg',
  'clubs-jack.svg',
  'clubs-queen.svg',
  'clubs-king.svg',
  'clubs-ace.svg',
];

const app = {
  difficulty: 3,
  duration: '',
  generatedCards: [],
  selectedCards: {}
}

const difficultyScreen = document.querySelector('.difficulty-screen');
const gameScreen = document.querySelector('.game-screen');