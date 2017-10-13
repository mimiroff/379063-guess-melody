import getElementFromTemplate from './create-DOM-element';
import showElement from './show-element';
import headerTemplate from './header';
import createGenreScreen from './genre';
import {initialState, generateArtistQuestion, playerAnswers} from './data';

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

const screenTemplate = (state) => `<section class="main main--level main--level-artist">
      ${headerTemplate(initialState)}
    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio src="${state.src}" autoplay></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
      ${generateAnswerTemplate(state)}        
      </form>
    </div>
  </section>`;

const createArtistScreen = () => {
  showElement(getElementFromTemplate(screenTemplate(generateArtistQuestion())));
  const artistList = document.querySelector(`.main-list`);
  artistList.addEventListener(`click`, onArtistListClick);
};

const onArtistListClick = (evt) => {
  if (evt.target.className === `main-answer-r`) {
    createGenreScreen();
  }
};

export default createArtistScreen;
