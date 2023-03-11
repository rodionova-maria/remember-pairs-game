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

const app = {
  difficulty: 4,
  duration: '',
  generatedCards: [],
  selectedCards: {},
};

const difficultyScreen = document.querySelector('.difficulty-screen');

const difficulty = difficultyScreen.querySelector('.difficulty');
const difficultyButtons = difficulty.querySelectorAll('.difficulty__btn');
const btnStart = difficultyScreen.querySelector('.btn-start');

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

const gameScreen = document.querySelector('.game-screen');

const getRandom = (max) => Math.floor(Math.random() * max);

const generateCards = (difLevel) => {
  do {
    let randomCardId = getRandom(ALL_CARDS.length);
    if (!app.generatedCards.includes(randomCardId)) {
      app.generatedCards.push(randomCardId);
    }
  } while (app.generatedCards.length < difLevel);
  app.generatedCards = [...app.generatedCards, ...app.generatedCards];
};

const hideCards = () => {
  const cards = gameScreen.querySelectorAll('.card');
  cards.forEach((card) => {
    card.src = '../images/shirt.svg';
  });
};

const mix = (array) => {
  return (array = array.sort(() => Math.random() - 0.5));
};

const renderCards = () => {
  const cards = gameScreen.querySelector('.game__cards');
  cards.innerHTML = '';
  app.generatedCards.forEach((id) => {
    const card = document.createElement('img');
    card.classList.add('card');
    card.setAttribute('data-id', id);
    card.src = `../images/${ALL_CARDS[id]}`;
    cards.appendChild(card);
  });
};

btnStart.addEventListener('click', () => {
  difficultyScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  const gameTimer = gameScreen.querySelector('.game__panel-timer');

  let secs,
    now,
    timer,
    mins = 0;

  function startTimer() {
    now = Date.now();
    mins = 0;
    timer = setInterval(function () {
      secs = Math.floor((Date.now() - now) / 1000);
      if (secs === 60) {
        now = Date.now();
        mins++;
      }
      if (secs < 10) {
        secs = '0' + secs;
      }
      gameTimer.innerHTML = mins + '.' + secs;
    });
  }

  const showHide5sec = () => {
    app.duration = `${mins}.${secs}`;
    clearInterval(timer);
    gameTimer.innerHTML = '0.00';
    renderCards();
    setTimeout(function () {
      hideCards();
      startTimer();
    }, 3000);
  };

  generateCards(app.difficulty);
  app.generatedCards = mix(app.generatedCards);
  showHide5sec();

  const btnReset = gameScreen.querySelector('.btn-reset');
  btnReset.addEventListener('click', () => {
    showHide5sec();
  });
});
