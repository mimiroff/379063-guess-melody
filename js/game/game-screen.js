import GameView from './game-view';
import {initialState} from '../data/data';
import App from '../application';
import {getRandomInt} from '../util';
import GameModel from './game-model';

class GameScreen {
  constructor() {
    this.model = new GameModel();
    this.view = new GameView(this.model);
  }

  init() {
    this.model.update(initialState);
    this.model.reset();
    this.view.onArtistListClick = (evt) => this.onArtistListClick(evt);
    this.view.onArtistControlClick = (evt) => this.onArtistControlClick(evt);
    this.view.onCheckboxClick = (evt) => this.onCheckboxClick(evt);
    this.view.onControlClick = (evt) => this.onControlClick(evt);
    this.view.onSubmitClick = () => this.onSubmitClick();
    if (getRandomInt(0, 2) === 0) {
      this.changeLevel(this.model.getArtistLevel());
    } else {
      this.changeLevel(this.model.getGenreLevel());
    }
    this.tick();
  }

  onArtistListClick(evt) {
    this.endTime = this.model.time;
    if (evt.target.className === `main-answer-r`) {
      if (evt.target.value === `true` && (this.startTime - this.endTime < this.model.state.FAST_ANSWER_TIME)) {
        this.model.addAnswer({answer: true, fast: true});
      } else if (evt.target.value === `true`) {
        this.model.addAnswer({answer: true, fast: false});
      } else {
        this.model.addAnswer({answer: false, fast: false});
        this.model.addMistake();
      }

      if (this.model.mistakes <= 3 && this.model.level < 10) {
        this.changeLevel(this.model.getGenreLevel());
      } else {
        this.stopTimer();
        App.showStats(this.model);
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
    } else if (!answers.includes(`false`) && (this.startTime - this.endTime < this.model.state.FAST_ANSWER_TIME)) {
      this.model.addAnswer({answer: true, fast: true});
    } else {
      this.model.addAnswer({answer: true, fast: false});
    }

    if (this.model.mistakes <= 3 && this.model.level < 10) {
      this.changeLevel(this.model.getArtistLevel());
    } else {
      this.stopTimer();
      App.showStats(this.model);
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

  changeLevel(data) {
    if (data.isGenre) {
      this.model.stack.clear();
    }
    this.view.updateLevel(data);
    this.model.nextLevel();
    this.startTime = this.model.time;
  }

  tick() {
    this.model.tick();
    this.view.updateHeader(this.model);

    this.timer = setTimeout(() => this.tick(), 1000);
    if (this.model.time === 30) {
      this.view.colorizeHeader();
    }
    if (this.model.time === 0) {
      this.stopTimer();
      App.showStats(this.model);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }
}

export default new GameScreen();
