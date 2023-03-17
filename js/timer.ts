let timeoutId = 0;

export function startTimer(node: Element) {
  if (timeoutId) {
    return;
  }
  const startTime = new Date().getTime();
  const run = () => {
    const time = new Date().getTime() - startTime;
    node.textContent = (time / 1000).toFixed(1);
    timeoutId = window.setTimeout(run, 50);
  };
  run();
}

export function stopTimer() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = 0;
  }
}
