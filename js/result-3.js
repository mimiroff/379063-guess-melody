import getElementFromTemplate from './create-DOM-element';
import {screens, showElement} from './show-element';
import {onPlayButtonClick, createWelcomeScreen} from './welcome';

let element;

for (const screen of screens) {
  if (screen.textContent.includes(`Какая жалость!`)) {
    element = screen;
  }
}

const stringElement = element.outerHTML;

const createResult3Screen = () => {
  return getElementFromTemplate(stringElement);
};
const onReplayButtonClickR3 = () => {
  showElement(createWelcomeScreen());
  const playButton = document.querySelector(`.main-play`);
  playButton.addEventListener(`click`, onPlayButtonClick);
};
export {createResult3Screen, onReplayButtonClickR3};
