import '../css/vars.scss';
import '../css/main.scss';
import '../css/difficulty.scss';
import '../css/play.scss';

let ALL_CARDS = [
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

let timeoutId = null;

const app = {
  difficulty: 4,
  duration: '',
  generatedCards: [],
  selectedCards: [],
};

const difficultyScreen = document.querySelector('.difficulty-screen');
const difficulty = difficultyScreen.querySelector('.difficulty');
const difficultyButtons = difficulty.querySelectorAll('.difficulty__btn');
const btnStart = difficultyScreen.querySelector('.btn-start');

const gameScreen = document.querySelector('.game-screen');

difficulty.addEventListener('click', (event) => {
  const target = event.target;
  if (!target.classList.contains('difficulty__btn')) {
    return;
  }
  difficultyButtons.forEach((btn) => {
    btn.classList.remove('difficulty__btn_selected');
  });
  target.classList.add('difficulty__btn_selected');
  app.difficulty = +target.dataset.value;
});

btnStart.addEventListener('click', () => {
  difficultyScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  generateCards(app.difficulty);
  app.generatedCards = mix(app.generatedCards);
  showHide5sec();

  const btnReset = gameScreen.querySelector('.btn-reset');
  btnReset.addEventListener('click', () => {
    showHide5sec();
  });
});

const getRandom = (max) => Math.floor(Math.random() * max);

const mix = (array) => {
  return (array = array.sort(() => Math.random() - 0.5));
};

const generateCards = (difLevel) => {
  do {
    let randomCardId = getRandom(ALL_CARDS.length);
    if (!app.generatedCards.includes(randomCardId)) {
      app.generatedCards.push(randomCardId);
    }
  } while (app.generatedCards.length < difLevel);
  app.generatedCards = [...app.generatedCards, ...app.generatedCards];
};

function hideCards() {
  const cards = gameScreen.querySelectorAll('.card');
  cards.forEach((card) => {
    card.src = './static/shirt.svg';
  });
}

const renderCards = () => {
  app.selectedCards = [];
  let clicksCounter = 0;
  const cards = gameScreen.querySelector('.game__cards');
  cards.innerHTML = '';
  app.generatedCards.forEach((id) => {
    const card = document.createElement('img');
    card.classList.add('card');
    card.setAttribute('data-id', id);
    card.src = `./static/${ALL_CARDS[id]}`;
    cards.appendChild(card);

    function cardClickHandler() {
      this.src = `./static/${ALL_CARDS[id]}`;
      if (clicksCounter % 2 === 0) {
        app.selectedCards.push(id);
        clicksCounter++;
      } else {
        if (app.selectedCards[app.selectedCards.length - 1] !== id) {
          stopTimer();
          alert('Игра окончена! Вы проиграли.');
        } else {
          app.selectedCards.push(id);
          clicksCounter++;
        }
      }
      if (app.selectedCards.length === app.generatedCards.length) {
        stopTimer();
        alert('Выигрыш.');
      }
      this.removeEventListener('click', cardClickHandler);
    }

    card.addEventListener('click', cardClickHandler);
  });
};

function startTimer() {
  if (timeoutId) {
    return;
  }
  const gameTimer = gameScreen.querySelector('.game__panel-timer');
  gameTimer.textContent = '0.00';
  const startTime = new Date().getTime();
  const run = () => {
    const time = new Date().getTime() - startTime;
    gameTimer.textContent = (time / 1000).toFixed(1);
    timeoutId = window.setTimeout(run, 50);
  };
  run();
}

function stopTimer() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
}

function showHide5sec() {
  stopTimer();
  renderCards();
  setTimeout(function () {
    hideCards();
    startTimer();
  }, 3000);
}
