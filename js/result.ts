import { app } from './script';
import { difficultyScreen } from './script';
import { gameScreen } from './script';

export function showResult() {
  const resultScreen = document.querySelector('.result-screen');
  const overlay = document.querySelector('.overlay');
  const resultDuration = resultScreen?.querySelector('.result__duration-time') as HTMLDivElement;
  const resultTitle = resultScreen?.querySelector('.result__title') as HTMLDivElement;
  const btnRestart = resultScreen?.querySelector('.btn-restart') as HTMLButtonElement;
  const resultImg = resultScreen?.querySelector('.result__img');

  const img = new Image();

  overlay?.classList.remove('hidden');
  resultScreen?.classList.remove('hidden');

  if (app.status === 'win') {
    resultTitle.textContent = 'Вы выиграли';
    img.src = './static/win.png';
  } else {
    resultTitle.textContent = 'Вы проиграли';
    img.src = './static/loose.png';
  }

  resultImg?.replaceChildren(img);

  resultDuration.textContent = `${app.duration} сек`;

  btnRestart.addEventListener('click', () => {
    resultScreen?.classList.add('hidden');
    gameScreen?.classList.add('hidden');
    overlay?.classList.add('hidden');
    difficultyScreen?.classList.remove('hidden');
  });
}
