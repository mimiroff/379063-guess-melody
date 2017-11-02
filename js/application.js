import welcomeScreen from './welcome/welcome-screen';
import GameScreen from './game/game-screen';
import resultScreen from './result/result-screen';
import winScreen from './winscreen/winscreen';
import {initialState} from "./data/data";
import Loader from "./loader";

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  SCORE: `score`
};

export default class Application {

  static init(gameData) {
    Application.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(gameData),
      [ControllerId.SCORE]: winScreen
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = this.routes[id];
    if (controller) {
      controller.init(this.loadState(data));
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static showGame(state = initialState) {
    location.hash = `${ControllerId.GAME}?${this.saveState(state)}`;
  }

  static showStats(state) {
    location.hash = `${ControllerId.SCORE}?${this.saveState(state)}`;
  }

  static showLoose(state) {
    resultScreen.init(state);
  }

  static saveState(state) {
    return JSON.stringify(state);
  }

  static loadState(dataString) {
    try {
      return JSON.parse(dataString);
    } catch (e) {
      return initialState;
    }
  };
}

Application.showLoose(`loading`);

Loader.loadData().then((gameData) => Application.init(gameData)).then(Application.showWelcome).catch(Application.showLoose(`noConnection`));
