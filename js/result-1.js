import getElementFromTemplate from './create-DOM-element';
import {screens, showElement} from './show-element';
import {onPlayButtonClick, createWelcomeScreen} from './welcome';

let element;

for (const screen of screens) {
  if (screen.textContent.includes(`Вы настоящий меломан!`)) {
    element = screen;
  }
}

const stringElement = element.outerHTML;

const createResult1Screen = () => {
  return getElementFromTemplate(stringElement);
};
const onReplayButtonClickR1 = () => {
  showElement(createWelcomeScreen());
  const playButton = document.querySelector(`.main-play`);
  playButton.addEventListener(`click`, onPlayButtonClick);
};
export {createResult1Screen, onReplayButtonClickR1};
