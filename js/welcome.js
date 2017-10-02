import getElementFromTemplate from './create-DOM-element';
import {showElement, screens} from './show-element';
import {createArtistScreen, onArtistListClick} from "./artist";

let element;

for (const screen of screens) {
  if (screen.classList.contains(`main--welcome`)) {
    element = screen;
  }
}

const stringElement = element.outerHTML;

const createWelcomeScreen = () => {
  return getElementFromTemplate(stringElement);
};

const onPlayButtonClick = () => {
  showElement(createArtistScreen());
  const artistList = document.querySelector(`.main-list`);
  artistList.addEventListener(`click`, onArtistListClick);
};

export {createWelcomeScreen, onPlayButtonClick};
