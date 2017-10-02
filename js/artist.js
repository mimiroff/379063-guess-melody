import getElementFromTemplate from './create-DOM-element';
import {screens, showElement} from './show-element';
import {createGenreScreen, onSubmitButtonClick} from './genre';

let element;

for (const screen of screens) {
  if (screen.classList.contains(`main--level-artist`)) {
    element = screen;
  }
}

const stringElement = element.outerHTML;

const createArtistScreen = () => {
  return getElementFromTemplate(stringElement);
};

const onArtistListClick = (evt) => {
  if (evt.target.className === `main-answer-r`) {
    showElement(createGenreScreen());
    const answerForm = document.querySelector(`.genre`);
    const submitButton = answerForm.querySelector(`.genre-answer-send`);
    const checkboxes = answerForm.querySelectorAll(`[type='checkbox']`);
    let checked = 0;

    submitButton.setAttribute(`disabled`, ``);
    Array.from(checkboxes, (it) => {
      it.addEventListener(`click`, (e) => {
        if (e.currentTarget.checked) {
          checked++;
        } else if (!e.currentTarget.checked) {
          checked--;
        }
        if (checked > 0) {
          submitButton.removeAttribute(`disabled`);
        } else {
          submitButton.setAttribute(`disabled`, ``);
        }
      });
    });
    submitButton.addEventListener(`click`, onSubmitButtonClick);
  }
};

export {createArtistScreen, onArtistListClick};
