import getElementFromTemplate from './create-DOM-element';
import {screens} from './show-element';

let element;

for (let i = 0; i < screens.length; i++) {
  if (screens[i].classList.contains(`main--level-genre`)) {
    element = screens[i];
  }
}

const stringElement = element.outerHTML;

const genreScreen = getElementFromTemplate(stringElement);
export default genreScreen;
