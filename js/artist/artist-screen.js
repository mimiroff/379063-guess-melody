import App from '../application';
import {generateArtistQuestion} from "../data/artist-screen-data";
import ArtistView from './artist-view';
import {showScreen} from "../util";
import {initialState} from "../data/data";
import getResultScreen from '../result/result';

class ArtistScreen {
  constructor(data = generateArtistQuestion(3)) {
    this.data = data;
    this.view = new ArtistView(this.data);
    this.startTime = initialState.time;
    this.endTime = null;
    this.view.onArtistListClick = (evt) => this.onArtistListClick(evt);
    this.view.onControlClick = (evt) => this.onControlClick(evt);
  }

  init() {
    showScreen(this.view);
    this.tick();
    initialState.nextLevel();
  }

  tick() {
    initialState.time -= 1;
    this.view.updateHeader(initialState);
    console.log(initialState.time);

    this.timer = setTimeout(()=> this.tick(), 1000);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  onArtistListClick(evt) {
    this.endTime = initialState.time;
    if (evt.target.className === `main-answer-r`) {
      if (evt.target.value === `true` && (this.startTime - this.endTime < initialState.FAST_ANSWER_TIME)) {
        initialState.addAnswer({answer: true, fast: true});
      } else if (evt.target.value === `true`) {
        initialState.addAnswer({answer: true, fast: false});
      } else {
        initialState.addAnswer({answer: false, fast: false});
        initialState.addMistake();
      }
      if (initialState.mistakes <= 3 && initialState.level < 10) {
        App.showGenres();
      } else {
        showScreen(getResultScreen(initialState.GAME_START_TIME - this.endTime));
      }
    }
  }

  onControlClick(evt) {
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
}

export default new ArtistScreen();
