import AbstractView from '../view';

export default class WelcomeView extends AbstractView {
  constructor(state, data) {
    super(state);
    this.data = data;
  }
  get template() {
    return `<section class="main main--welcome">
      <section class="logo" title="${this.data.gameName}"><h1>${this.data.gameName}</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">${this.data.title}</h2>
      <p class="text main-text">
      ${this.data.rules}
      </p>
      </section>`;
  }
  bind() {
    const playButton = this.element.querySelector(`.main-play`);
    playButton.addEventListener(`click`, () => {
      this.onClick();
    });
  }

  onClick() {

  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
  }
}
