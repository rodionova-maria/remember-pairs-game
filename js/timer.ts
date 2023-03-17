export function startTimer(timerId?: number) {
  if (timerId) {
    return;
  }
  const gameTimer = gameScreen.querySelector('.game__panel-timer');
  gameTimer.textContent = '0.00';
  const startTime = new Date().getTime();
  const run = () => {
    const time = new Date().getTime() - startTime;
    gameTimer.textContent = (time / 1000).toFixed(1);
    timerId = window.setTimeout(run, 50);
  };
  run();
}

export function stopTimer(timerId?: number) {
  if (timerId) {
    clearTimeout(timerId);
    timerId = undefined;
  }
}
