import AbstractView from '../view';
import getHeader from '../header/header';
import {showScreen} from "../util";

const generateAnswerTemplate = (data) => {

  const templates = [];

  data.answers.map((it, i) => {
    templates.push(`<div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio src="${it.src}"></audio>
              <button class="player-control player-control--play"></button>
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

export default class GenreView extends AbstractView {
  constructor(state, data) {
    super(state);
    this.data = data;
  }
  get template() {
    return `<section class="main main--level main--level-genre">
   ${showScreen(getHeader())}
    <div class="main-wrap">
      <h2 class="title">Выберите ${this.data.genre} треки</h2>
      <form class="genre">
        ${generateAnswerTemplate(this.data)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;
  }

  bind() {
    const answerForm = this.element.querySelector(`.genre`);
    this.submitButton = answerForm.querySelector(`.genre-answer-send`);
    const checkboxes = answerForm.querySelectorAll(`[type='checkbox']`);
    const controls = answerForm.querySelectorAll(`.player-control`);
    this.submitButton.setAttribute(`disabled`, ``);
    Array.from(checkboxes, (it) => {
      it.addEventListener(`click`, (evt) => {
        this.onCheckboxClick(evt);
      });
    });
    this.submitButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this.onSubmitClick();
    });
    Array.from(controls, (it) => {
      it.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.onControlClick(evt);
      });
    });
  }

  onCheckboxClick() {

  }

  onSubmitClick() {

  }
  onControlClick() {

  }
}

