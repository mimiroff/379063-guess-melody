import GenreView from './genre-view';
import {generateGenreQuestion, answersStack} from '../data/genre-screen-data';
import {initialState} from '../data/data';
import {showScreen} from '../util';
import getArtistScreen from '../artist/artist';
import getResultScreen from '../result/result';

const getGenreScreen = () => {
  initialState.nextLevel();
  const genreScreen = new GenreView(initialState, generateGenreQuestion(4));
  const startTime = initialState.time;
  const FAST_ANSWER_TIME = initialState.FAST_ANSWER_TIME;
  let endTime;
  let timePast;
  answersStack.clear();

  genreScreen.onCheckboxClick = (evt) => {
    if (evt.currentTarget.checked) {
      answersStack.add(evt.currentTarget);
    } else if (!evt.currentTarget.checked) {
      answersStack.delete(evt.currentTarget);
    }
    if (answersStack.size > 0) {
      genreScreen.submitButton.removeAttribute(`disabled`);
    } else {
      genreScreen.submitButton.setAttribute(`disabled`, ``);
    }
  };

  genreScreen.onSubmitClick = () => {
    let answers = [...answersStack.answers].map((it) => {
      return it.value;
    });
    endTime = initialState.time;
    timePast = initialState.GAME_START_TIME - endTime;
    if (answers.includes(`false`)) {
      initialState.addAnswer({answer: false, fast: false});
      initialState.addMistake();
    } else if (!answers.includes(`false`) && (startTime - endTime < FAST_ANSWER_TIME)) {
      initialState.addAnswer({answer: true, fast: true});
    } else {
      initialState.addAnswer({answer: true, fast: false});
    }

    if (initialState.mistakes <= 3 && initialState.level < 10) {
      showScreen(getArtistScreen());
    } else {
      console.log(timePast);
      showScreen(getResultScreen(timePast));
    }
  };

  genreScreen.onControlClick = (evt) => {
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
  };

  return genreScreen;
};

export default getGenreScreen;
