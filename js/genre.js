import getElementFromTemplate from './create-DOM-element';
import showElement from './show-element';
import headerTemplate from './header';
import {initialState} from './data';
import countGameResult from './count-result';
import {generateGenreQuestion} from './genre-screen-data';
import createArtistScreen from './artist';

const generateAnswerTemplate = (state) => {

  const templates = [];

  state.answers.map((it, i) => {
    templates.push(`<div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src="${it.src}" controls></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="${it.isCorrect}" id="a-${i + 1}">
          <label class="genre-answer-check" for="a-${i + 1}"></label>
        </div>`);
  });
  return templates.join(``);
};

const screenTemplate = (state) => `<section class="main main--level main--level-genre">
${headerTemplate(initialState)}
    <div class="main-wrap">
      <h2 class="title">Выберите ${state.genre} треки</h2>
      <form class="genre">
        ${generateAnswerTemplate(state)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;

const answersStack = {
  _answers: new Set(),
  get answers() {
    return this._answers;
  },
  get size() {
    return this._answers.size;
  },
  clear() {
    this._answers.clear();
  },
  add(data) {
    this._answers.add(data);
  },
  delete(data) {
    this._answers.delete(data);
  }
};

const createGenreScreen = () => {
  initialState.nextLevel();
  answersStack.clear();
  showElement(getElementFromTemplate(screenTemplate(generateGenreQuestion(4))));
  const answerForm = document.querySelector(`.genre`);
  const submitButton = answerForm.querySelector(`.genre-answer-send`);
  const checkboxes = answerForm.querySelectorAll(`[type='checkbox']`);

  submitButton.setAttribute(`disabled`, ``);

  Array.from(checkboxes, (it) => {
    it.addEventListener(`click`, (e) => {
      if (e.currentTarget.checked) {
        answersStack.add(e.currentTarget);
      } else if (!e.currentTarget.checked) {
        answersStack.delete(e.currentTarget);
      }
      if (answersStack.size > 0) {
        submitButton.removeAttribute(`disabled`);
      } else {
        submitButton.setAttribute(`disabled`, ``);
      }
    });
  });
  submitButton.addEventListener(`click`, onSubmitButtonClick);
};

const onSubmitButtonClick = (evt) => {
  evt.preventDefault();
  let answers = [...answersStack.answers].map((it) => {
    return it.value;
  });

  if (answers.includes(`false`)) {
    initialState.addAnswer({answer: false, fast: false});
    initialState.addMistake();
  } else {
    initialState.addAnswer({answer: true, fast: false});
  }

  if (initialState.mistakes <= 3 && initialState.level < 10) {
    createArtistScreen();
  } else {
    countGameResult(initialState.answers, initialState.mistakes);
  }
};

export default createGenreScreen;
