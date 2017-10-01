import getElementFromTemplate from './create-DOM-element';
import {screens} from './show-element';

let element;

for (let i = 0; i < screens.length; i++) {
  if (screens[i].classList.contains(`main--welcome`)) {
    element = screens[i];
  }
}

const stringElement = element.outerHTML;

const welcomeScreen = getElementFromTemplate(stringElement);
export default welcomeScreen;
