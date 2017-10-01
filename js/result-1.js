import getElementFromTemplate from './create-DOM-element';
import {screens} from './show-element';

let element;

for (let i = 0; i < screens.length; i++) {
  if (screens[i].textContent.includes(`Вы настоящий меломан!`)) {
    element = screens[i];
  }
}

const stringElement = element.outerHTML;

const resultOneScreen = getElementFromTemplate(stringElement);
export default resultOneScreen;
