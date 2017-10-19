import ResultView from './result-view';
import {showScreen} from '../util';
import {getWelcomeScreen} from '../welcome/welcome';
import resultScreenData from '../data/result-screen-data';
import {gameState, generateGameResult} from './generate-result';
import countGameResult from './count-result';
import {initialState} from '../data/data';

const getResultScreen = (time) => {
  generateGameResult(countGameResult(initialState.answers, initialState.mistakes, time));

  const resultScreen = new ResultView(initialState, resultScreenData[gameState]);

  resultScreen.onReplayButtonClick = () => {
    showScreen(getWelcomeScreen());
  };

  return resultScreen;
};

export default getResultScreen;
