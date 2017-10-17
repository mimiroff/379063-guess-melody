import WelcomeView from './welcome-view';
import {showScreen, getRandomInt} from '../util';
import {getWelcome, initialState} from '../data/data';
import getGenreScreen from '../genre/genre';
import getArtistScreen from '../artist/artist';
import Timer from '../timer';

let timer = new Timer();

const getWelcomeScreen = () => {
  initialState.reset();

  const welcomeScreen = new WelcomeView();
  welcomeScreen.onClick = () => {
    const dice = getRandomInt(0, 2);
    timer.start();
    if (dice === 0) {
      showScreen(getArtistScreen());
    } else {
      showScreen(getGenreScreen());
    }
  };
  welcomeScreen.data = getWelcome();
  return welcomeScreen;
};

export {getWelcomeScreen, timer};
