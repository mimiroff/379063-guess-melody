const setTimer = (time) => {
  if (typeof time !== `number`) {
    throw new Error(`Wrong argument type`);
  }
  if (time === 0) {
    return {
      time,
      tick() {
        if (time > 0) {
          return setTimer(time - 1);
        } else {
          return setTimer(time);
        }
      },
      reset() {
        return setTimer(300);
      },
      massage: `Time is up!`
    };
  } else {
    return {
      time,
      tick() {
        if (time > 0) {
          return setTimer(time - 1);
        } else {
          return setTimer(time);
        }
      },
      reset() {
        return setTimer(300);
      }
    };
  }
};

const startTimer = (time) => {
  let timer = setTimer(time);
  const interval = setInterval(() => {
    timer = timer.tick();
    if (timer.massage) {
      clearInterval(interval);
    }
  }, 1000);
};

export {setTimer, startTimer};
