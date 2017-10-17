import ResultView from './result-view';
import {showScreen} from '../util';
import {getWelcomeScreen} from '../welcome/welcome';
import resultScreenData from '../data/result-screen-data';
import {gameState, generateGameResult} from './generate-result';
import countGameResult from './count-result';
import {initialState} from '../data/data';

const getResultScreen = () => {
  generateGameResult(countGameResult(initialState.answers, initialState.mistakes));

  const resultScreen = new ResultView();

  resultScreen.onReplayButtonClick = () => {
    showScreen(getWelcomeScreen());
  };

  resultScreen.data = resultScreenData[gameState];
  return resultScreen;
};

export default getResultScreen;
