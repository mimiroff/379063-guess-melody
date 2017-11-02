import AbstractView from '../view';


const generateAnswerTemplate = (data) => {

  const templates = [];

  data.answers.map((it, i) => {
    templates.push(`<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${i}" name="answer" value="answer-${i}"/>
          <label class="main-answer" for="answer-${i}">
            <img class="main-answer-preview" src="${it.image.url}"
                 alt="${it.title}" width="${it.image.width}" height="${it.image.height}">
            ${it.title}
          </label>
        </div>`);
  });
  return templates.join(``);
};

export default class ArtistView extends AbstractView {
  constructor(data) {
    super();
    this.data = data;
  }
  get template() {
    return `<section class="main main--level main--level-artist">
    <div class="main-wrap">
      <h2 class="title main-title">${this.data.question}</h2>
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
      this.onArtistControlClick(evt);
    });
  }

  onArtistListClick() {

  }

  onArtistControlClick() {

  }
}
