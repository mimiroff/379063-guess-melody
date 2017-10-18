import AbstractView from '../view';
import getHeader from "../header/header";
import {showScreen} from "../util";

const generateAnswerTemplate = (state) => {

  const templates = [];

  state.answers.map((it, i) => {
    templates.push(`<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${i + 1}" name="answer" value="${it.isCorrect}"/>
          <label class="main-answer" for="answer-${i + 1}">
            <img class="main-answer-preview" src="${it.image}"
                 alt="${it.artist}" width="134" height="134">
            ${it.artist}
          </label>
        </div>`);
  });
  return templates.join(``);
};

export default class ArtistView extends AbstractView {
  constructor(state, data) {
    super(state);
    this.data = data;
  }
  get template() {
    return `<section class="main main--level main--level-artist">
${showScreen(getHeader())}
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src="${this.data.src}" autoplay></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
      ${generateAnswerTemplate(this.data)}        
      </form>
    </div>
  </section>`;
  }

  bind() {
    const control = this.element.querySelector(`.player-control`);
    const artistList = this.element.querySelector(`.main-list`);
    artistList.addEventListener(`click`, (evt) => {
      this.onArtistListClick(evt);
    });
    control.addEventListener(`click`, (evt) => {
      this.onControlClick(evt);
    });
  }

  onArtistListClick() {

  }

  onControlClick() {

  }
}
