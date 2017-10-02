import getElementFromTemplate from './create-DOM-element';
import {screens, showElement} from './show-element';
import {onPlayButtonClick, createWelcomeScreen} from './welcome';

let element;

for (const screen of screens) {
  if (screen.textContent.includes(`Увы и ах!`)) {
    element = screen;
  }
}

const stringElement = element.outerHTML;

const createResult2Screen = () => {
  return getElementFromTemplate(stringElement);
};
const onReplayButtonClickR2 = () => {
  showElement(createWelcomeScreen());
  const playButton = document.querySelector(`.main-play`);
  playButton.addEventListener(`click`, onPlayButtonClick);
};
export {createResult2Screen, onReplayButtonClickR2};
