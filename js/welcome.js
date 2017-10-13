import getElementFromTemplate from './create-DOM-element';
import showElement from './show-element';
import {welcomeData} from './data';
import createArtistScreen from "./artist";

const element = (data) => `<section class="main main--welcome">
    <section class="logo" title="${data.gameName}"><h1>${data.gameName}</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">${data.title}</h2>
    <p class="text main-text">
      ${data.rules}
    </p>
  </section>`;

const createWelcomeScreen = () => {
  showElement(getElementFromTemplate(element(welcomeData)));
  const playButton = document.querySelector(`.main-play`);
  playButton.addEventListener(`click`, onPlayButtonClick);
};

const onPlayButtonClick = () => {
  createArtistScreen();
};

export default createWelcomeScreen;
