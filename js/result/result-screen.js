import App from '../application';
import ResultView from './result-view';
import {showScreen} from '../util';
import {resultScreenData} from '../data/data';


class ResultScreen {

  init(state) {
    this.state = state;
    this.data = resultScreenData;
    this.view = new ResultView(this.data[this.state]);

    this.view.onReplayButtonClick = () => {
      App.showGame();
    };

    showScreen(this.view);
  }
}

export default ResultScreen;
