import AbstractView from '../view';
import ArtistView from '../artist/artist-view';
import {showScreen} from "../util";
import GenreView from "../genre/genre-view";
import Header from '../header/header-view';


export default class GameView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  updateLevel(data) {
    let level;
    if (data.isGenre) {
      level = new GenreView(data);
      level.onCheckboxClick = (evt) => this.onCheckboxClick(evt);
      level.onControlClick = (evt) => this.onControlClick(evt);
      level.onSubmitClick = () => this.onSubmitClick();
    } else {
      level = new ArtistView(data);
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

  updateHeader(state) {
    this.header.updateTime(state);
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
