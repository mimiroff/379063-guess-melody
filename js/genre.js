import getElementFromTemplate from './create-DOM-element';
import showElement from './show-element';
import headerTemplate from './header';
import {initialState} from './data';
import createResult1Screen from './result-1';
import createResult2Screen from './result-2';
import createResult3Screen from './result-3';

const element = `<section class="main main--level main--level-genre">
${headerTemplate(initialState)}
    <div class="main-wrap">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-1">
          <label class="genre-answer-check" for="a-1"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-2">
          <label class="genre-answer-check" for="a-2"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-3">
          <label class="genre-answer-check" for="a-3"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-4">
          <label class="genre-answer-check" for="a-4"></label>
        </div>

        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const createGenreScreen = () => {
  showElement(getElementFromTemplate(element));
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
};

const onSubmitButtonClick = (evt) => {
  evt.preventDefault();
  const dice = getRandomInt(0, 3);
  if (dice === 0) {
    createResult1Screen();
  } else if (dice === 1) {
    createResult2Screen();
  } else {
    createResult3Screen();
  }
};

export default createGenreScreen;
