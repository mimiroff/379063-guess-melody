
import {tick, reset, nextLevel, addMistake, addAnswer, answersStack, resultScreenData} from "../data/data";

export default class GameModel {
  constructor(data, stack = answersStack, stats = resultScreenData.win) {
    this.data = data;
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
    this.stats = resultScreenData.win;
    this.update(reset(this.state));
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
