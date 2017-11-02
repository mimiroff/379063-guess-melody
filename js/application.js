import welcomeScreen from './welcome/welcome-screen';
import GameScreen from './game/game-screen';
import resultScreen from './result/result-screen';
import winScreen from './winscreen/winscreen';
import {initialState} from "./data/data";

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

  static showGame() {
    location.hash = ControllerId.GAME;
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
  }
}

