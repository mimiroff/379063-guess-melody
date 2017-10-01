import getElementFromTemplate from './create-DOM-element';
import {screens} from './show-element';

let element;

for (let i = 0; i < screens.length; i++) {
  if (screens[i].classList.contains(`main--level-artist`)) {
    element = screens[i];
  }
}

const stringElement = element.outerHTML;

const artistScreen = getElementFromTemplate(stringElement);
export default artistScreen;
