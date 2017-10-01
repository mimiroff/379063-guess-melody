import getElementFromTemplate from './create-DOM-element';
import {showElement, screens} from './show-element';
import {artistScreen, onArtistListClick} from "./artist";

let element;

for (let i = 0; i < screens.length; i++) {
  if (screens[i].classList.contains(`main--welcome`)) {
    element = screens[i];
  }
}

const stringElement = element.outerHTML;

const welcomeScreen = getElementFromTemplate(stringElement);
export {welcomeScreen};

export const onPlayButtonClick = () => {
  showElement(artistScreen);
  const artistList = document.querySelector(`.main-list`);
  artistList.addEventListener(`click`, onArtistListClick);
};
