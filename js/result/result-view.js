import AbstractView from '../view';

const drawComparison = (data) => {
  let comparison = ``;
  if (data.comparison) {
    comparison = `<span class="main-comparison">${data.comparison}</span>`;
  }
  return comparison;
};

export default class ResultView extends AbstractView {
  constructor(state, data) {
    super(state);
    this.data = data;
  }

  get template() {
    return `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${this.data.title}</h2>
    <div class="main-stat">${this.data.statistics}</div>
    ${drawComparison(this.data)}
    <span role="button" tabindex="0" class="main-replay">${this.data.replayTitle}</span>
  </section>`;
  }

  bind() {
    this.replayButton = this.element.querySelector(`.main-replay`);
    this.replayButton.addEventListener(`click`, this.onReplayButtonClick);
  }

  onReplayButtonClick() {

  }
}
