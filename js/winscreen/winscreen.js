import App from '../application';
import WinScreenView from './winscreen-view';
import {showScreen} from '../util';


class WinScreen {

  init(stats) {
    this.stats = stats;
    this.view = new WinScreenView(stats);

    this.view.onReplayButtonClick = () => {
      App.showGame();
    };

    showScreen(this.view);
  }
}

export default WinScreen;
