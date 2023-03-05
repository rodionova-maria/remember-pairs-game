const app = {
  difficulty: '',
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
});