
const countGameResult = (answers, mistakes) => {
  if (!Array.isArray(answers) || typeof mistakes !== `number`) {
    throw new Error(`Wrong argument type`);
  }
  const MISTAKE_MULT = 2;
  const mistakesCredits = mistakes * MISTAKE_MULT;
  const gameAnswers = answers;
  const result = {
    score: 0,
    fast: 0,
    mistakes,
    timeLeft: 148
  };

  gameAnswers.map((it)=> {
    if (it.answer === true && it.fast === true) {
      result.score += 2;
      result.fast++;
    } else if (it.answer === true) {
      result.score++;
    }
  });
  result.score -= mistakesCredits;
  return result;
};

export default countGameResult;
