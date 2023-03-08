const CARD_SUITS = ['hearts', 'diamonds', 'spades', 'clubs'];
const CARD_VALUE = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6];

const app = {
  difficulty: 1,
  progress: '',
  duration: '',
  allCards: {},
  selectedCards: {}
}

const difficultyScreen = document.querySelector('.difficulty-screen');
const gameScreen = document.querySelector('.game-screen');

const difficulty = difficultyScreen.querySelector('.difficulty');
const difficultyButtons = difficulty.querySelectorAll('.difficulty__btn');
const btnStart = difficultyScreen.querySelector('.btn-start');

difficulty.addEventListener('click', (event) => {
  target = event.target;
  if (!target.classList.contains('difficulty__btn')) {
    return;
  }
  difficultyButtons.forEach(btn => {
    btn.classList.remove('difficulty__btn_selected');
  });
  target.classList.add('difficulty__btn_selected');

  app.difficulty = +target.dataset.value;
});

btnStart.addEventListener('click', () => {
  difficultyScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  const game__cards = document.querySelector('.game__cards');
  CARD_SUITS.forEach(suite => {
    CARD_VALUE.forEach(value => {
      const card = document.createElement('div');
      card.classList.add('game__cards-item', suite, value);
      game__cards.appendChild(card);
      app.allCards[suite] = value;
    });
  });
});