import App from '../application';
import GenreView from './genre-view';
import {showScreen} from "../util";
import {initialState} from "../data/data";
import getResultScreen from '../result/result';
import {generateGenreQuestion, answersStack} from "../data/genre-screen-data";

class GenreScreen {
  constructor(data = generateGenreQuestion(4)) {
    this.data = data;
    this.view = new GenreView(this.data);
    this.startTime = initialState.time;
    this.endTime = null;
    this.view.onCheckboxClick = (evt) => this.onCheckboxClick(evt);
    this.view.onSubmitClick = () => this.onSubmitClick();
    this.view.onControlClick = (evt) => this.onControlClick(evt);
  }

  init() {
    showScreen(this.view);
    this.tick();
    initialState.nextLevel();
  }

  tick() {
    initialState.time--;
    this.view.updateHeader(initialState);

    this.timer = setTimeout(()=> this.tick(), 1000);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  onCheckboxClick(evt) {
    if (evt.currentTarget.checked) {
      answersStack.add(evt.currentTarget);
    } else if (!evt.currentTarget.checked) {
      answersStack.delete(evt.currentTarget);
    }
    if (answersStack.size > 0) {
      this.view.submitButton.removeAttribute(`disabled`);
    } else {
      this.view.submitButton.setAttribute(`disabled`, ``);
    }
  }

  onSubmitClick() {
    let answers = [...answersStack.answers].map((it) => {
      return it.value;
    });
    this.endTime = initialState.time;
    if (answers.includes(`false`)) {
      initialState.addAnswer({answer: false, fast: false});
      initialState.addMistake();
    } else if (!answers.includes(`false`) && (this.startTime - this.endTime < initialState.FAST_ANSWER_TIME)) {
      initialState.addAnswer({answer: true, fast: true});
    } else {
      initialState.addAnswer({answer: true, fast: false});
    }

    if (initialState.mistakes <= 3 && initialState.level < 10) {
      App.showArtists();
    } else {
      showScreen(getResultScreen(initialState.GAME_START_TIME - this.endTime));
    }
  }

  onControlClick(evt) {
    const audio = evt.target.parentNode.querySelector(`audio`);
    if (evt.target.classList.contains(`player-control--pause`)) {
      audio.pause();
      evt.target.classList.remove(`player-control--pause`);
      evt.target.classList.add(`player-control--play`);
    } else if (evt.target.classList.contains(`player-control--play`)) {
      Array.from(this.view.tracks, (it) => {
        it.pause();
      });
      Array.from(this.view.controls, (it) => {
        it.classList.remove(`player-control--pause`);
        it.classList.add(`player-control--play`);
      });
      audio.play();
      evt.target.classList.remove(`player-control--play`);
      evt.target.classList.add(`player-control--pause`);
    }
  }
}

export default new GenreScreen();
