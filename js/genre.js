import getElementFromTemplate from './create-DOM-element';
import {screens, showElement} from './show-element';
import {createResult1Screen, onReplayButtonClickR1} from './result-1';
import {createResult2Screen, onReplayButtonClickR2} from './result-2';
import {createResult3Screen, onReplayButtonClickR3} from './result-3';

let element;

for (const screen of screens) {
  if (screen.classList.contains(`main--level-genre`)) {
    element = screen;
  }
}

const stringElement = element.outerHTML;

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const createGenreScreen = () => {
  return getElementFromTemplate(stringElement);
};
const onSubmitButtonClick = (evt) => {
  evt.preventDefault();
  const dice = getRandomInt(0, 3);
  if (dice === 0) {
    showElement(createResult1Screen());
    const replayButton = document.querySelector(`.main-replay`);
    replayButton.addEventListener(`click`, onReplayButtonClickR1);
  } else if (dice === 1) {
    showElement(createResult2Screen());
    const replayButton = document.querySelector(`.main-replay`);
    replayButton.addEventListener(`click`, onReplayButtonClickR2);
  } else {
    showElement(createResult3Screen());
    const replayButton = document.querySelector(`.main-replay`);
    replayButton.addEventListener(`click`, onReplayButtonClickR3);
  }
};

export {createGenreScreen, onSubmitButtonClick};
