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