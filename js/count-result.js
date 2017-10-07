const countGameResult = (answers, notes) => {
  const ANSWERS_NORM = 10;
  const MISTAKE_MULT = 2;
  const mistakesCredits = notes * MISTAKE_MULT;
  const gameAnswers = answers;
  let credits = 0;
  if (gameAnswers.length < ANSWERS_NORM || notes > 3) {
    return -1;
  }
  gameAnswers.map((it)=> {
    if (it.answer === true && it.fast === true) {
      credits += 2;
    } else if (it.answer === true) {
      credits++;
    }
  });
  credits -= mistakesCredits;
  return credits;
};

export default countGameResult;

