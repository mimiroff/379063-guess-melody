
import {
  generateArtistQuestion, generateGenreQuestion, tick, reset, nextLevel, addMistake, addAnswer,
  answersStack, resultScreenData
} from "../data/data";

export default class GameModel {
  constructor(stack = answersStack, stats = resultScreenData) {
    this.stack = stack;
    this.stats = stats;
  }

  update(newState) {
    this.state = newState;
    return this.state;
  }

  nextLevel() {
    this.update(nextLevel(this.state));
  }

  tick() {
    this.update(tick(this.state));
  }

  addMistake() {
    this.update(addMistake(this.state));
  }

  addAnswer(answer) {
    this.update(addAnswer(this.state, answer));
  }

  reset() {
    this.update(reset(this.state));
  }

  getArtistLevel() {
    this.data = generateArtistQuestion();
    return this.data;
  }

  getGenreLevel() {
    this.data = generateGenreQuestion();
    return this.data;
  }

  get time() {
    return this.state.time;
  }

  get level() {
    return this.state.level;
  }

  get mistakes() {
    return this.state.mistakes;
  }
}
