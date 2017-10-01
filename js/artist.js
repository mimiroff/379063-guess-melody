import getElementFromTemplate from './create-DOM-element';
import {screens, showElement} from './show-element';
import genreScreen from './genre';

let element;

for (let i = 0; i < screens.length; i++) {
  if (screens[i].classList.contains(`main--level-artist`)) {
    element = screens[i];
  }
}

const stringElement = element.outerHTML;

const artistScreen = getElementFromTemplate(stringElement);
export {artistScreen};
export const onArtistListClick = (evt) => {
  if (evt.target.className === `main-answer-preview` || evt.target.className === `main-answer`
    || evt.target.className === `main-answer-r`) {
    showElement(genreScreen);
  }
};
