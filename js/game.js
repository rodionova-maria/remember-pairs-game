const getRandom = (max) => Math.floor(Math.random() * max);

const generateCards = (difLevel) => {
  do {
    let randomCardId = getRandom(ALL_CARDS.length);
    if (!app.generatedCards.includes(randomCardId)) {
      app.generatedCards.push(randomCardId);
    }
  } while (app.generatedCards.length < difLevel);
  app.generatedCards = [...app.generatedCards, ...app.generatedCards];
}

const hideCards = () => {
  const cards = gameScreen.querySelectorAll('.card');
  cards.forEach(card => {
    card.src = '../images/shirt.svg';
  });
}

const mix = (array) => {
  array = array.sort(() => Math.random() - 0.5);
}

const renderCards = () => {
  const cards = gameScreen.querySelector('.game__cards');
  cards.innerHTML = '';
  app.generatedCards.forEach(id => {
    const card = document.createElement('img');
    card.classList.add('card');
    card.setAttribute('data-id', id);
    card.src = `../images/${ALL_CARDS[id]}`;
    cards.appendChild(card);
  });
}

btnStart.addEventListener('click', () => {
  difficultyScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  const gameTimer = gameScreen.querySelector('.game__panel-timer');

  let secs, now, timer, mins = 0;

  function startTimer() {
    now = Date.now();
    mins = 0;
    timer = setInterval(function () {
      secs = Math.floor((Date.now() - now) / 1000)
      if (secs == 60) {
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
    clearInterval(timer);
    app.duration = `${mins}.${secs}`;
    gameTimer.innerHTML = '0.00';
    renderCards();
    setTimeout(
      function () {
        hideCards();
        startTimer();
      }
      , 3000);
  }

  generateCards(app.difficulty);
  mix(app.generatedCards);
  showHide5sec();

  const btnReset = gameScreen.querySelector('.btn-reset');
  btnReset.addEventListener('click', () => {
    showHide5sec();
  });
});