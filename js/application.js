import welcomeScreen from './welcome/welcome-screen';
import gameScreen from './game/game-screen';
import ResultScreen from './result/result-screen';
import winScreen from './winscreen/winscreen';
import {initialState} from "./data/data";

export default class Application {

  static init(gameData) {
    Application.gameData = gameData;
    Application.routes = {
      Welcome: welcomeScreen,
      Game: gameScreen,
      Score: winScreen
    };
  }

  static showWelcome() {
    const screen = new Application.routes.Welcome();
    screen.init();
  }

  static showGame() {
    const screen = new Application.routes.Game(Application.gameData);
    screen.init(initialState);
  }

  static showStats(state) {
    const screen = new Application.routes.Score();
    screen.init(state);
  }

  static showLoose(state) {
    const screen = new ResultScreen();
    screen.init(state);
  }
}

