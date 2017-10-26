import AbstractView from '../view';

// export const drawComparison = (data) => {
//   let comparison = ``;
//   if (data.comparison) {
//     comparison = `<span class="main-comparison">${data.comparison}</span>`;
//   }
//   return comparison;
// };

export default class ResultView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }

  get template() {
    return `<section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <h2 class="title">${this.data.title}</h2>
    <div class="main-stat">${this.data.statistics}</div>
    <span class="main-comparison">${this.data.comparison ? this.data.comparison : ``}</span>
    <span role="button" tabindex="0" class="main-replay">${this.data.replayTitle}</span>
  </section>`;
  }

  bind() {
    const replayButton = this.element.querySelector(`.main-replay`);
    replayButton.addEventListener(`click`, () => {
      this.onReplayButtonClick();
    });
  }

  onReplayButtonClick() {

  }
}
