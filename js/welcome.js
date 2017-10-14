import getElementFromTemplate from './create-DOM-element';
import showElement from './show-element';
import {welcomeData} from './welcome-data';
import createArtistScreen from './artist';
import createGenreScreen from './genre';
import {getRandomInt} from './util';
import {initialState} from './data';

const element = (data) => `<section class="main main--welcome">
    <section class="logo" title="${data.gameName}"><h1>${data.gameName}</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">${data.title}</h2>
    <p class="text main-text">
      ${data.rules}
    </p>
  </section>`;

const createWelcomeScreen = () => {
  initialState.reset();
  showElement(getElementFromTemplate(element(welcomeData)));
  const playButton = document.querySelector(`.main-play`);
  playButton.addEventListener(`click`, onPlayButtonClick);
};

const onPlayButtonClick = () => {
  const dice = getRandomInt(0, 2);
  if (dice === 0) {
    createArtistScreen();
  } else {
    createGenreScreen();
  }
};

export default createWelcomeScreen;
