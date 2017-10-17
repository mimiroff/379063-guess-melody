import GenreView from './genre-view';
import {generateGenreQuestion, answersStack} from '../data/genre-screen-data';
import {initialState} from '../data/data';
import {showScreen} from '../util';
import getArtistScreen from '../artist/artist';
import getResultScreen from '../result/result';

const getGenreScreen = () => {
  initialState.nextLevel();
  const genreScreen = new GenreView();

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

    if (answers.includes(`false`)) {
      initialState.addAnswer({answer: false, fast: false});
      initialState.addMistake();
    } else {
      initialState.addAnswer({answer: true, fast: false});
    }

    if (initialState.mistakes <= 3 && initialState.level < 10) {
      showScreen(getArtistScreen());
    } else {
      showScreen(getResultScreen());
    }
  };

  genreScreen.data = generateGenreQuestion(4);
  genreScreen.state = initialState;
  return genreScreen;
};

export default getGenreScreen;
