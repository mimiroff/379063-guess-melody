import welcomeScreen from './welcome/welcome-screen';
import newGameScreen from './game/game-screen';
import resultScreen from './result/result-screen';

export default class Application {

  static showWelcome() {
    welcomeScreen.init();
  }

  static showGame() {
    newGameScreen.init();
  }

  static showStats() {
    resultScreen.init();
  }
}
