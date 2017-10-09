const startTimer = (time) => {
  const timer = {
    timeSet: time,
    timeLeft: time,
    tick: () => {
      if (timer.timeLeft > 0) {
        timer.timeLeft--;
      } else {
        clearInterval(timerId);
      }
    }
  };
  let timerId = setInterval(timer.tick, 1000);
  return timer;
};

export default startTimer;
