import AbstractView from '../view';
import ArtistView from '../artist/artist-view';
import {showScreen} from '../util';
import GenreView from '../genre/genre-view';
import Header from '../header/header-view';


export default class GameView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  updateLevel(questionData) {
    let level;
    if (questionData.type === `genre`) {
      level = new GenreView(questionData);
      level.onCheckboxClick = (evt) => this.onCheckboxClick(evt);
      level.onControlClick = (evt) => this.onControlClick(evt);
      level.onSubmitClick = () => this.onSubmitClick();
    } else {
      level = new ArtistView(questionData);
      level.onArtistListClick = (evt) => this.onArtistListClick(evt);
      level.onArtistControlClick = (evt) => this.onArtistControlClick(evt);
    }

    showScreen(level);
    this.drawHeader();
    this.level = level;
  }

  drawHeader() {
    this.header = new Header(this.state);
    this.header.draw();
  }

  updateHeader(time) {
    this.header.updateTime(time);
  }

  colorizeHeader() {
    this.header.colorize();
  }

  onArtistListClick() {

  }

  onArtistControlClick() {

  }

  onCheckboxClick() {

  }

  onControlClick() {

  }

  onSubmitClick() {

  }
}
