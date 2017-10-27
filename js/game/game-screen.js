import GameView from './game-view';
import {FAST_ANSWER_TIME, GAME_START_TIME} from '../data/data';
import App from '../application';
import {getRandomInt, getMinutes, getSeconds} from '../util';
import GameModel from './game-model';

class GameScreen {
  constructor() {
    this.model = new GameModel();
    this.view = new GameView(this.model);
    this.model.state.question = (getRandomInt(0, 2) === 0) ? this.model.getArtistLevel() : this.model.getGenreLevel();
  }

  init(state = this.model) {
    this.model.update(state);
    //this.model.reset();
    this.view.onArtistListClick = (evt) => this.onArtistListClick(evt);
    this.view.onArtistControlClick = (evt) => this.onArtistControlClick(evt);
    this.view.onCheckboxClick = (evt) => this.onCheckboxClick(evt);
    this.view.onControlClick = (evt) => this.onControlClick(evt);
    this.view.onSubmitClick = () => this.onSubmitClick();
    this.changeLevel(this.model.state.question);
    // if (getRandomInt(0, 2) === 0) {
    //   this.changeLevel(this.model.getArtistLevel());
    // } else {
    //   this.changeLevel(this.model.getGenreLevel());
    // }
    this.tick();
  }

  onArtistListClick(evt) {
    this.endTime = this.model.time;
    if (evt.target.className === `main-answer-r`) {
      if (evt.target.value === `true` && (this.startTime - this.endTime < FAST_ANSWER_TIME)) {
        this.model.addAnswer({answer: true, fast: true});
      } else if (evt.target.value === `true`) {
        this.model.addAnswer({answer: true, fast: false});
      } else {
        this.model.addAnswer({answer: false, fast: false});
        this.model.addMistake();
      }

      if (this.model.mistakes > 3) {
        this.stopTimer();
        App.showLoose(`noTries`);
      } else if (this.model.level < 10) {
        this.changeLevel(this.model.getGenreLevel());
      } else {
        this.stopTimer();
        App.showStats(this.generateResult(this.countResult()));
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
      this.model.stack.add(evt.currentTarget);
    } else if (!evt.currentTarget.checked) {
      this.model.stack.delete(evt.currentTarget);
    }
    if (this.model.stack.size > 0) {
      this.view.level.submitButton.removeAttribute(`disabled`);
    } else {
      this.view.level.submitButton.setAttribute(`disabled`, ``);
    }
  }

  onSubmitClick() {
    let answers = [...this.model.stack.answers].map((it) => {
      return it.value;
    });
    this.endTime = this.model.time;
    if (answers.includes(`false`)) {
      this.model.addAnswer({answer: false, fast: false});
      this.model.addMistake();
    } else if (!answers.includes(`false`) && (this.startTime - this.endTime < FAST_ANSWER_TIME)) {
      this.model.addAnswer({answer: true, fast: true});
    } else {
      this.model.addAnswer({answer: true, fast: false});
    }

    if (this.model.mistakes > 3) {
      this.stopTimer();
      App.showLoose(`noTries`);
    } else if (this.model.level < 10) {
      this.changeLevel(this.model.getArtistLevel());
    } else {
      this.stopTimer();
      App.showStats(this.generateResult(this.countResult()));
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
    if (question.isGenre) {
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
    if (this.model.time === 29) {
      this.view.colorizeHeader();
    }
    if (this.model.time === 0) {
      this.stopTimer();
      App.showLoose(`timeUp`);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
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

  generateResult(selfResults, othersResults) {
    const score = selfResults.score;
    const fast = selfResults.fast;
    const mistakes = selfResults.mistakes;
    const timePast = selfResults.timePast;

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

    if (score === 1) {
      ENDINGS.score = ``;
    } else if (score === 2 || score === 3 || score === 4) {
      ENDINGS.score = `а`;
    }

    if ((fast < 10 || fast > 20) && fast.toString().includes(`1`, 1)) {
      ENDINGS.fast = `ый`;
    }

    if (mistakes === 1) {
      ENDINGS.mistakes = `ку`;
    } else if (mistakes === 2 || mistakes === 3) {
      ENDINGS.mistakes = `ки`;
    }

    this.model.stats.statistics = `За ${getMinutes(timePast)} минут${ENDINGS.minutes} и ${getSeconds(timePast)} секунд${ENDINGS.seconds} вы набрали<br/>
    ${score} балл${ENDINGS.score} (${fast} быстр${ENDINGS.fast})<br/>
    совершив ${mistakes} ошиб${ENDINGS.mistakes}`;
    this.model.stats.comparison = `Вы заняли ${place}-ое место из ${players} игрок${ENDINGS.players}. Это лучше чем у ${percent}% игроков`;

    return this.model.stats;
  }
}

export default new GameScreen();
