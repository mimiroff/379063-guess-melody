import WelcomeView from './welcome-view';
import {showScreen} from '../util';
import App from '../application';

class WelcomeScreen {
  constructor() {
    this.view = new WelcomeView();
  }

  init() {
    showScreen(this.view);

    this.view.onClick = () => {
      App.showGame();
    };
  }
}

export default WelcomeScreen;
