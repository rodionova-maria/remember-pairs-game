import { startTimer } from './timer';
import { stopTimer } from './timer';
import { showResult } from './result';

import '../css/vars.scss';
import '../css/main.scss';
import '../css/difficulty.scss';
import '../css/play.scss';
import '../css/result.scss';

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

type App = {
  difficulty: number;
  duration: string | null;
  generatedCards: number[];
  selectedCards: number[];
  status: string;
};

export const app: App = {
  difficulty: 4,
  duration: '',
  generatedCards: [],
  selectedCards: [],
  status: '',
};

export const gameScreen = document.querySelector('.game-screen');
export const difficultyScreen = document.querySelector('.difficulty-screen');
const difficulty = difficultyScreen?.querySelector('.difficulty');
const difficultyButtons = difficulty?.querySelectorAll('.difficulty__btn');
const btnStart = difficultyScreen?.querySelector('.btn-start');
const gameTimer = gameScreen?.querySelector('.game__panel-timer') as HTMLDivElement;

difficulty?.addEventListener('click', (event) => {
  const target = event.target as HTMLButtonElement;
  if (!target.classList.contains('difficulty__btn')) {
    return;
  }
  difficultyButtons?.forEach((btn) => {
    btn.classList.remove('difficulty__btn_selected');
  });
  target.classList.add('difficulty__btn_selected');
  app.difficulty = Number(target.dataset.value);
});

btnStart?.addEventListener('click', () => {
  difficultyScreen?.classList.add('hidden');
  gameScreen?.classList.remove('hidden');

  generateCards(app.difficulty);
  app.generatedCards = mix(app.generatedCards);
  showHide5sec();

  const btnReset = gameScreen?.querySelector('.btn-reset');
  btnReset?.addEventListener('click', () => {
    showHide5sec();
  });
});

const getRandom = (max: number) => Math.floor(Math.random() * max);

const mix = (array: number[]) => {
  return (array = array.sort(() => Math.random() - 0.5));
};

const generateCards = (difLevel: number) => {
  app.generatedCards = [];
  do {
    let randomCardId = getRandom(ALL_CARDS.length);
    if (!app.generatedCards.includes(randomCardId)) {
      app.generatedCards.push(randomCardId);
    }
  } while (app.generatedCards.length < difLevel);
  app.generatedCards = [...app.generatedCards, ...app.generatedCards];
};

function hideCards() {
  const cards = gameScreen?.querySelectorAll('.card');
  cards?.forEach((card) => {
    const el = card as HTMLImageElement;
    el.src = './static/shirt.svg';
  });
}

function showHide5sec() {
  app.status = '';
  gameTimer.textContent = '0.0';
  stopTimer();
  renderCards();
  setTimeout(function () {
    hideCards();
    startTimer(gameTimer);
  }, 3000);
}

const renderCards = () => {
  app.selectedCards = [];
  let clicksCounter = 0;
  const cards = gameScreen?.querySelector('.game__cards') as HTMLElement;
  cards.innerHTML = '';
  app.generatedCards.forEach((id) => {
    const card = new Image();
    card.classList.add('card');
    card.setAttribute('data-id', String(id));
    card.src = `./static/${ALL_CARDS[id]}`;
    cards.appendChild(card);

    function cardClickHandler(event: Event) {
      if (app.status === 'loose' || app.status === 'win') {
        return;
      }
      const target = event.target as HTMLImageElement;

      target.src = `./static/${ALL_CARDS[id]}`;
      if (clicksCounter % 2 === 0) {
        app.selectedCards.push(id);
        clicksCounter++;
      } else {
        if (app.selectedCards[app.selectedCards.length - 1] !== id) {
          stopTimer();
          app.status = 'loose';
          app.duration = gameTimer.textContent;
          showResult();
        } else {
          app.selectedCards.push(id);
          clicksCounter++;
        }
      }
      if (app.selectedCards.length === app.generatedCards.length) {
        stopTimer();
        app.status = 'win';
        app.duration = gameTimer.textContent;
        showResult();
      }
      target.removeEventListener('click', cardClickHandler);
    }

    card.addEventListener('click', cardClickHandler);
  });
};
