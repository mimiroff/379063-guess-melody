import welcomeScreen from './welcome/welcome-screen';
import newGameScreen from './game/game-screen';
import resultScreen from './result/result-screen';
import winScreen from './winscreen/winscreen';
import {initialState} from "./data/data";

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  SCORE: `score`
};

const saveState = (state) => {
  return JSON.stringify(state);
};

const loadState = (dataString) => {
  try {
    return JSON.parse(dataString);
  } catch (e) {
    return initialState;
  }
};

const routes = {
  [ControllerId.WELCOME]: welcomeScreen,
  [ControllerId.GAME]: newGameScreen,
  [ControllerId.SCORE]: winScreen
};

export default class Application {

  static init() {
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = routes[id];
    if (controller) {
      controller.init(loadState(data));
    }
  }

  static showWelcome() {
    //welcomeScreen.init();
    location.hash = ControllerId.WELCOME;
  }

  static showGame(state = initialState) {
    //newGameScreen.init(state);
    location.hash = `${ControllerId.GAME}?${saveState(state)}`;
  }

  static showStats(state) {
    //winScreen.init(state);
    location.hash = `${ControllerId.SCORE}?${saveState(state)}`;
  }

  static showLoose(state) {
    resultScreen.init(state);
  }
}

Application.init();
