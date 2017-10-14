import getElementFromTemplate from './create-DOM-element';
import showElement from './show-element';
import createWelcomeScreen from './welcome';
import resultScreenData from './result-screen-data';


const element = (data) => {
  let comparison = ``;
  if (data.comparison) {
    comparison = `<span class="main-comparison">${data.comparison}</span>`;
  }
  return `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${data.title}</h2>
    <div class="main-stat">${data.statistics}</div>
    ${comparison}
    <span role="button" tabindex="0" class="main-replay">${data.replayTitle}</span>
  </section>`;
};

const createResultScreen = (state) => {
  showElement(getElementFromTemplate(element(resultScreenData[state])));
  const replayButton = document.querySelector(`.main-replay`);
  replayButton.addEventListener(`click`, onReplayButtonClick);
};

const onReplayButtonClick = () => {
  createWelcomeScreen();
};

export default createResultScreen;
