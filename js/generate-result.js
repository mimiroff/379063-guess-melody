const generateGameResult = (othersResults, selfResults) => {
  if (typeof selfResults !== `object` || !Array.isArray(othersResults)) {
    throw new Error(`Wrong argument type`);
  }
  const score = selfResults.score;
  const notes = selfResults.notes;
  const timeLeft = selfResults.timeLeft;
  const results = othersResults;
  let resultString;
  let place;
  let players;
  let percent;
  let ending = `ов`;

  const asc = (a, b) => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  };

  results.push(score);
  results.sort(asc);
  place = results.length - results.indexOf(score);
  players = results.length;
  percent = Math.round(((players - place) / players) * 100);
  if (players.toString().lastIndexOf(1) > -1 && players !== 11) {
    ending = `а`;
  }

  switch (true) {
    case timeLeft <= 0: resultString = `Время вышло! Вы не успели отгадать все мелодии`;
      break;
    case notes <= 0: resultString = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
      break;
    default: resultString = `Вы заняли ${place}-ое место из ${players} игрок${ending}. Это лучше чем у ${percent}% игроков`;
  }
  return resultString;
};
export default generateGameResult;
