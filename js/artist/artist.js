import {initialState} from '../data/data';
import ArtistView from './artist-view';
import {showScreen} from '../util';
import getGenreScreen from '../genre/genre';
import {generateArtistQuestion} from '../data/artist-screen-data';
import getResultScreen from '../result/result';

const getArtistScreen = () => {
  initialState.nextLevel();
  const artistScreen = new ArtistView();

  artistScreen.onArtistListClick = (evt) => {
    if (evt.target.className === `main-answer-r`) {
      if (evt.target.value === `true`) {
        initialState.addAnswer({answer: true, fast: false});
      } else {
        initialState.addAnswer({answer: false, fast: false});
        initialState.addMistake();
      }
      if (initialState.mistakes <= 3 && initialState.level < 10) {
        showScreen(getGenreScreen());
      } else {
        showScreen(getResultScreen());
      }
    }
  };
  artistScreen.data = generateArtistQuestion(3);
  artistScreen.state = initialState;
  return artistScreen;
};

export default getArtistScreen;
