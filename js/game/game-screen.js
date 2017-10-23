import GameView from './game-view';
import {initialState} from "../data/data";
import {answersStack} from "../data/genre-screen-data";

class GameScreen {
  constructor() {
    this.view = new GameView();
  }

  init() {
    this.view.onArtistListClick = (evt) => this.onArtistListClick(evt);
    this.view.onArtistControlClick = (evt) => this.onArtistControlClick(evt);
    this.view.onCheckboxClick = (evt) => this.onCheckboxClick(evt);
    this.view.onControlClick = (evt) => this.onControlClick(evt);
    this.view.onSubmitClick = () => this.onSubmitClick();
    this.changeLevel(`artist`);
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
        initialState.nextLevel();
        this.changeLevel(`genre`);
      } else {
        alert(`Game over!`);
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
      this.changeLevel(`artist`);
    } else {
      alert(`Game over!`);
    }
      //showScreen(getResultScreen(initialState.GAME_START_TIME - this.endTime));
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

  changeLevel(newLevel) {
    if (newLevel === `genre`) {
      answersStack.clear();
    }
    this.view.updateLevel(newLevel);
    initialState.nextLevel();
  }
}

export default new GameScreen();
