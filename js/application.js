import welcomeScreen from './welcome/welcome-screen';
import newGameScreen from './game/game-screen';

export default class Application {

  static showWelcome() {
    welcomeScreen.init();
  }

  static showGame() {
    newGameScreen.init();
  }
}

