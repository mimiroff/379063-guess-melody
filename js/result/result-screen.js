import App from '../application';
import ResultView from "./result-view";
import {initialState} from "../data/data";
import {showScreen, getMinutes, getSeconds} from "../util";
import resultScreenData from "../data/result-screen-data";

class ResultScreen {
  constructor() {
    this.data = resultScreenData;
    this.state = initialState;
  }

  init() {
    this.view = new ResultView(this.generateResult(this.countResult()));

    this.view.onReplayButtonClick = () => {
      App.showWelcome();
    };

    showScreen(this.view);
  }

  countResult() {
    const MISTAKE_MULT = 2;
    const result = {
      score: 0,
      fast: 0,
      mistakes: this.state.mistakes,
      timePast: this.state.GAME_START_TIME - this.state.time
    };
    const mistakesCredits = result.mistakes * MISTAKE_MULT;
    const gameAnswers = this.state.answers;

    gameAnswers.map((it) => {
      if (it.answer === true && it.fast === true) {
        result.score += 2;
        result.fast++;
      } else if (it.answer === true) {
        result.score++;
      }
    });
    result.score -= mistakesCredits;
    return result;
  }

  generateResult(selfResults, othersResults) {
    const score = selfResults.score;
    const fast = selfResults.fast;
    const mistakes = selfResults.mistakes;
    const timePast = selfResults.timePast;
    let gameState;

    switch (true) {
      case timePast === this.state.GAME_START_TIME:
        gameState = `timeUp`;
        break;
      case mistakes > 3:
        gameState = `noTries`;
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

        if ((timePast / 60 < 10 || timePast / 60 > 20) && getMinutes(timePast).includes(`1`, 1)) {
          ENDINGS.minutes = `у`;
        } else if ((timePast / 60 < 10 || timePast / 60 > 20) && getMinutes(timePast).includes(`2`, 1)) {
          ENDINGS.minutes = `ы`;
        } else if ((timePast / 60 < 10 || timePast / 60 > 20) && getMinutes(timePast).includes(`3`, 1)) {
          ENDINGS.minutes = `ы`;
        } else if ((timePast / 60 < 10 || timePast / 60 > 20) && getMinutes(timePast).includes(`4`, 1)) {
          ENDINGS.minutes = `ы`;
        }

        if ((timePast % 60 < 10 || timePast % 60 > 20) && getSeconds(timePast).includes(`1`, 1)) {
          ENDINGS.seconds = `у`;
        } else if ((timePast % 60 < 10 || timePast % 60 > 20) && getSeconds(timePast).includes(`2`, 1)) {
          ENDINGS.seconds = `ы`;
        } else if ((timePast % 60 < 10 || timePast % 60 > 20) && getSeconds(timePast).includes(`3`, 1)) {
          ENDINGS.seconds = `ы`;
        } else if ((timePast % 60 < 10 || timePast % 60 > 20) && getSeconds(timePast).includes(`4`, 1)) {
          ENDINGS.seconds = `ы`;
        }

        if ((score < 10 || score > 20) && score.toString().includes(`1`, 1)) {
          ENDINGS.score = ``;
        } else if ((score < 10 || score > 20) && score.toString().includes(`2`, 1)) {
          ENDINGS.score = `а`;
        } else if ((score < 10 || score > 20) && score.toString().includes(`3`, 1)) {
          ENDINGS.score = `а`;
        } else if ((score < 10 || score > 20) && score.toString().includes(`4`, 1)) {
          ENDINGS.score = `а`;
        }

        if ((fast < 10 || fast > 20) && fast.toString().includes(`1`, 1)) {
          ENDINGS.fast = `ый`;
        }

        if ((mistakes < 10 || mistakes > 20) && mistakes.toString().includes(`1`, 1)) {
          ENDINGS.mistakes = `ку`;
        } else if ((mistakes < 10 || mistakes > 20) && mistakes.toString().includes(`2`, 1)) {
          ENDINGS.mistakes = `ки`;
        } else if ((mistakes < 10 || mistakes > 20) && mistakes.toString().includes(`3`, 1)) {
          ENDINGS.mistakes = `ки`;
        } else if ((mistakes < 10 || mistakes > 20) && mistakes.toString().includes(`4`, 1)) {
          ENDINGS.mistakes = `ки`;
        }

        this.data.win.statistics = `За ${getMinutes(timePast)} минут${ENDINGS.minutes} и ${getSeconds(timePast)} секунд${ENDINGS.seconds} вы набрали<br/>
    ${score} балл${ENDINGS.score} (${fast} быстр${ENDINGS.fast})<br/>
    совершив ${mistakes} ошиб${ENDINGS.mistakes}`;
        this.data.win.comparison = `Вы заняли ${place}-ое место из ${players} игрок${ENDINGS.players}. Это лучше чем у ${percent}% игроков`;
        gameState = `win`;
      }
    }
    return this.data[gameState];
  }
}

export default new ResultScreen();
