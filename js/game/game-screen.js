import GameView from './game-view';
import {FAST_ANSWER_TIME, GAME_START_TIME, MAX_LEVEL, MAX_MISTAKES, WARNING_TIME} from '../data/data';
import App from '../application';
import {getMinutes, getSeconds} from '../util';
import GameModel from './game-model';
import Loader from '../loader';

class GameScreen {
  constructor(data) {
    this.model = new GameModel(data);
    this.view = new GameView(this.model);
  }

  init(state) {
    this.model.update(state);
    this.model.reset();
    this.view.onArtistListClick = (evt) => this.onArtistListClick(evt);
    this.view.onArtistControlClick = (evt) => this.onArtistControlClick(evt);
    this.view.onCheckboxClick = (evt) => this.onCheckboxClick(evt);
    this.view.onControlClick = (evt) => this.onControlClick(evt);
    this.view.onSubmitClick = () => this.onSubmitClick();
    this.changeLevel(this.model.data[this.model.level]);
    this.tick();
  }


  onArtistListClick(evt) {
    this.endTime = this.model.time;
    const index = +evt.target.id.slice(evt.target.id.length - 1);
    if (evt.target.className === `main-answer-r`) {
      if (this.model.data[this.model.level - 1].answers[index].isCorrect && (this.startTime - this.endTime < FAST_ANSWER_TIME)) {
        this.model.addAnswer({answer: true, fast: true});
      } else if (this.model.data[this.model.level - 1].answers[index].isCorrect) {
        this.model.addAnswer({answer: true, fast: false});
      } else {
        this.model.addAnswer({answer: false, fast: false});
        this.model.addMistake();
      }

      if (this.model.mistakes > MAX_MISTAKES) {
        this.stopTimer();
        App.showLoose(`noTries`);
      } else if (this.model.level < MAX_LEVEL) {
        this.changeLevel(this.model.data[this.model.level]);
      } else {
        this.stopTimer();
        this.generateResult(this.countResult());
      }
    }
  }

  onArtistControlClick(evt) {
    const audio = evt.target.parentNode.querySelector(`audio`);
    if (evt.target.classList.contains(`player-control--pause`)) {
      audio.pause();
      evt.target.classList.remove(`player-control--pause`);
      evt.target.classList.add(`player-control--play`);
    } else if (evt.target.classList.contains(`player-control--play`)) {
      audio.play();
      evt.target.classList.remove(`player-control--play`);
      evt.target.classList.add(`player-control--pause`);
    }
  }

  onCheckboxClick(evt) {
    if (evt.currentTarget.checked) {
      this.model.stack.add(+evt.currentTarget.id.slice(evt.target.id.length - 1));
    } else if (!evt.currentTarget.checked) {
      this.model.stack.delete(+evt.currentTarget.id.slice(evt.target.id.length - 1));
    }
    if (this.model.stack.size > 0) {
      this.view.level.submitButton.removeAttribute(`disabled`);
    } else {
      this.view.level.submitButton.setAttribute(`disabled`, ``);
    }
  }

  onSubmitClick() {
    let answers = [...this.model.stack.answers].map((it) => {
      return this.model.data[this.model.level - 1].answers[it].genre;
    });
    const genre = this.model.data[this.model.level - 1].genre;
    const answerTypes = answers.map((it) => {
      return it === genre;
    });
    this.endTime = this.model.time;
    if (answerTypes.includes(false)) {
      this.model.addAnswer({answer: false, fast: false});
      this.model.addMistake();
    } else if (!answerTypes.includes(false) && (this.startTime - this.endTime < FAST_ANSWER_TIME)) {
      this.model.addAnswer({answer: true, fast: true});
    } else {
      this.model.addAnswer({answer: true, fast: false});
    }

    if (this.model.mistakes > MAX_MISTAKES) {
      this.stopTimer();
      App.showLoose(`noTries`);
    } else if (this.model.level < MAX_LEVEL) {
      this.changeLevel(this.model.data[this.model.level]);
    } else {
      this.stopTimer();
      this.generateResult(this.countResult());
    }
  }

  onControlClick(evt) {
    const audio = evt.target.parentNode.querySelector(`audio`);
    if (evt.target.classList.contains(`player-control--pause`)) {
      audio.pause();
      evt.target.classList.remove(`player-control--pause`);
      evt.target.classList.add(`player-control--play`);
    } else if (evt.target.classList.contains(`player-control--play`)) {
      Array.from(this.view.level.tracks, (it) => {
        it.pause();
      });
      Array.from(this.view.level.controls, (it) => {
        it.classList.remove(`player-control--pause`);
        it.classList.add(`player-control--play`);
      });
      audio.play();
      evt.target.classList.remove(`player-control--play`);
      evt.target.classList.add(`player-control--pause`);
    }
  }

  changeLevel(question) {
    if (question.type === `genre`) {
      this.model.stack.clear();
    }
    this.view.updateLevel(question);
    this.model.nextLevel();
    this.startTime = this.model.time;
  }

  tick() {
    this.model.tick();
    this.view.updateHeader(this.model.time);
    this.timer = setTimeout(() => this.tick(), 1000);
    if (this.model.time === WARNING_TIME) {
      this.view.colorizeHeader();
    }
    if (this.model.time === 0) {
      this.stopTimer();
      App.showLoose(`timeUp`);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
    delete this.timer;
  }

  countResult() {
    const MISTAKE_MULT = 2;
    const result = {
      score: 0,
      fast: 0,
      mistakes: this.model.mistakes,
      timePast: GAME_START_TIME - this.model.time
    };
    const mistakesCredits = result.mistakes * MISTAKE_MULT;
    const gameAnswers = this.model.state.playerAnswers;

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

  generateResult(selfResults) {
    const score = selfResults.score;
    const fast = selfResults.fast;
    const mistakes = selfResults.mistakes;
    const timePast = selfResults.timePast;

    const DECLINES = {
      minutes: [`минуту`, `минуты`, `минут`],
      seconds: [`секунду`, `секунды`, `секунд`],
      mistakes: [`ошибку`, `ошибки`, `ошибок`],
      scores: [`балл`, `балла`, `баллов`],
      fastAnswers: [`быстрый`, `быстрых`, `быстрых`],
      players: [`игрока`, `игроков`, `игроков`]
    };

    let results = [];
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

    const compareResults = () => {
      results.push(score);
      results.sort(asc);
      place = results.length - results.indexOf(score);
      players = results.length;
      percent = Math.round(((players - place) / players) * 100);
    };

    const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
      num = Math.abs(num);
      if (num > 10 && (Math.round((num % 100) / 10)) === 1) {
        return genitivePlural;
      } else {
        switch (num % 10) {
          case 1:
            return nominative;
          case 2:
          case 3:
          case 4:
            return genitiveSingular;
          default:
            return genitivePlural;
        }
      }
    };

    const generateStats = () => {
      this.model.stats.statistics = `За ${getMinutes(timePast)} ${numDecline(+getMinutes(timePast), ...DECLINES.minutes)} 
      и ${getSeconds(timePast)} ${numDecline(+getSeconds(timePast), ...DECLINES.seconds)} вы набрали<br/>
      ${score} ${numDecline(score, ...DECLINES.scores)} (${fast} ${numDecline(fast, ...DECLINES.fastAnswers)})<br/>
      совершив ${mistakes} ${numDecline(mistakes, ...DECLINES.mistakes)}`;
      this.model.stats.comparison = `Вы заняли ${place}-ое место из ${players} ${numDecline(players, ...DECLINES.players)}. Это лучше чем у ${percent}% игроков`;
      App.showStats(this.model.stats);
    };

    Loader.loadResults().then((response) => {
      response.map((it) => {
        if (typeof it.score === `number`) {
          results.push(it.score);
        }
      });
    }).then(compareResults).then(generateStats).then(() => Loader.saveResults(selfResults));
  }
}

export default GameScreen;
