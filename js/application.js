import welcomeScreen from './welcome/welcome-screen';
import newGameScreen from './game/game-screen';
import resultScreen from './result/result-screen';
import winScreen from './winscreen/winscreen';
import {initialState} from "./data/data";

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  SCORE: `score`
};

const saveState = (state) => {
  const stringified = JSON.stringify(state);
  console.log(stringified);
  return stringified;
};

const loadState = (dataString) => {
console.log(`4: передано в распарс - ${dataString}`);
  try {
    const parsed = JSON.parse(dataString);
    console.log(`5: передаются данные для формирования вью - ${parsed}`);
    return parsed;
  } catch (e) {
    console.log(e);
    return initialState;
  }
};

const routes = {
  [ControllerId.WELCOME]: welcomeScreen,
  [ControllerId.GAME]: newGameScreen,
  [ControllerId.SCORE]: winScreen
};

export default class Application {

  static init() {
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      console.log(`1: записывает в хэш - ${hashValue}`);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = routes[id];
    console.log(`2: ищем контролер - ${controller}`);
    console.log(`3: дата которая будет передана в контролер - ${data}`);
    if (controller) {
      controller.init(loadState(data));
    }
  }

  static showWelcome() {
    //welcomeScreen.init();
    location.hash = ControllerId.WELCOME;
  }

  static showGame(state = initialState) {
    //newGameScreen.init(state);
    location.hash = `${ControllerId.GAME}?${saveState(state)}`;
  }

  static showStats(state) {
    //winScreen.init(state);
    location.hash = `${ControllerId.SCORE}?${saveState(state)}`;
  }

  static showLoose(state) {
    resultScreen.init(state);
  }
}

Application.init();
