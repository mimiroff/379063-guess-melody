import WelcomeView from './welcome-view';
import {showScreen, getRandomInt} from '../util';
import {getWelcome, initialState} from '../data/data';
import getGenreScreen from '../genre/genre';
import getArtistScreen from '../artist/artist';
import Timer from '../timer';

const timer = new Timer();

const getWelcomeScreen = () => {
  initialState.reset();
  timer.stop();
  timer.reset();

  const welcomeScreen = new WelcomeView(initialState, getWelcome());
  welcomeScreen.onClick = () => {
    timer.start();
    const dice = getRandomInt(0, 2);
    if (dice === 0) {
      showScreen(getArtistScreen());
    } else {
      showScreen(getGenreScreen());
    }
  };
  return welcomeScreen;
};

export {getWelcomeScreen, timer};
