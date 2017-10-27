
import {
  generateArtistQuestion, generateGenreQuestion, tick, reset, nextLevel, addMistake, addAnswer,
  answersStack, resultScreenData, initialState
} from "../data/data";

export default class GameModel {
  constructor(state = initialState, stack = answersStack, stats = resultScreenData.win) {
    this.stack = stack;
    this.stats = stats;
    this.state = state;
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
    this.state.question = generateArtistQuestion();
    return this.state.question;
  }

  getGenreLevel() {
    this.state.question = generateGenreQuestion();
    return this.state.question;
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
