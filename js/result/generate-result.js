import resultScreenData from '../data/result-screen-data';
import {getMinutes, getSeconds} from '../util';

let gameState = ``;

const generateGameResult = (selfResults, othersResults) => {
  if (typeof selfResults !== `object`) {
    throw new Error(`Wrong argument type`);
  }
  const score = selfResults.score;
  const fast = selfResults.fast;
  const mistakes = selfResults.mistakes;
  const timeLeft = selfResults.timeLeft;

  switch (true) {
    case timeLeft <= 0: gameState = `timeUp`;
      break;
    case mistakes > 3: gameState = `noTries`;
      break;
    default: {

      const results = othersResults ? othersResults : [];
      const ENDINGS = {
        minutes: ``,
        seconds: ``,
        score: `ов`,
        fast: `ых`,
        mistakes: `ок`,
        players: `ов`
      };

      let place;
      let players;
      let percent;

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

      if (players.toString().lastIndexOf(`1`) > -1 && players !== 11) {
        ENDINGS.players = `а`;
      }
      if ((timeLeft / 60 < 10 || timeLeft / 60 > 20) && getSeconds(timeLeft).lastIndexOf(`1`) > -1) {
        ENDINGS.minutes = `у`;
      } else if ((timeLeft / 60 < 10 || timeLeft / 60 > 20) && getSeconds(timeLeft).lastIndexOf(`2`) > -1) {
        ENDINGS.minutes = `ы`;
      } else if ((timeLeft / 60 < 10 || timeLeft / 60 > 20) && getSeconds(timeLeft).lastIndexOf(`3`) > -1) {
        ENDINGS.minutes = `ы`;
      } else if ((timeLeft / 60 < 10 || timeLeft / 60 > 20) && getSeconds(timeLeft).lastIndexOf(`4`) > -1) {
        ENDINGS.minutes = `ы`;
      }

      if ((timeLeft % 60 < 10 || timeLeft % 60 > 20) && getSeconds(timeLeft).lastIndexOf(`1`) > -1) {
        ENDINGS.seconds = `у`;
      } else if ((timeLeft % 60 < 10 || timeLeft % 60 > 20) && getSeconds(timeLeft).lastIndexOf(`2`) > -1) {
        ENDINGS.seconds = `ы`;
      } else if ((timeLeft % 60 < 10 || timeLeft % 60 > 20) && getSeconds(timeLeft).lastIndexOf(`3`) > -1) {
        ENDINGS.seconds = `ы`;
      } else if ((timeLeft % 60 < 10 || timeLeft % 60 > 20) && getSeconds(timeLeft).lastIndexOf(`4`) > -1) {
        ENDINGS.seconds = `ы`;
      }

      if ((score < 10 || score > 20) && score.toString().lastIndexOf(`1`) > -1) {
        ENDINGS.score = ``;
      } else if ((score < 10 || score > 20) && score.toString().lastIndexOf(`2`) > -1) {
        ENDINGS.score = `а`;
      } else if ((score < 10 || score > 20) && score.toString().lastIndexOf(`3`) > -1) {
        ENDINGS.score = `а`;
      } else if ((score < 10 || score > 20) && score.toString().lastIndexOf(`4`) > -1) {
        ENDINGS.score = `а`;
      }

      if ((fast < 10 || fast > 20) && fast.toString().lastIndexOf(`1`) > -1) {
        ENDINGS.fast = `ый`;
      }

      if ((mistakes < 10 || mistakes > 20) && mistakes.toString().lastIndexOf(`1`) > -1) {
        ENDINGS.mistakes = `ку`;
      } else if ((mistakes < 10 || mistakes > 20) && mistakes.toString().lastIndexOf(`2`) > -1) {
        ENDINGS.mistakes = `ки`;
      } else if ((mistakes < 10 || mistakes > 20) && mistakes.toString().lastIndexOf(`3`) > -1) {
        ENDINGS.mistakes = `ки`;
      } else if ((mistakes < 10 || mistakes > 20) && mistakes.toString().lastIndexOf(`4`) > -1) {
        ENDINGS.mistakes = `ки`;
      }

      resultScreenData.win.statistics = `За ${getMinutes(timeLeft)} минут${ENDINGS.minutes} и ${getSeconds(timeLeft)} секунд${ENDINGS.seconds} вы набрали<br/>
    ${score} балл${ENDINGS.score} (${fast} быстр${ENDINGS.fast})<br/>
    совершив ${mistakes} ошиб${ENDINGS.mistakes}`;
      resultScreenData.win.comparison = `Вы заняли ${place}-ое место из ${players} игрок${ENDINGS.players}. Это лучше чем у ${percent}% игроков`;
      gameState = `win`;
    }
  }
};

export {gameState, generateGameResult};
