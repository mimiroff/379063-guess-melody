import {getMinutes, getSeconds} from '../util';
import AbstractView from '../view';
import {GAME_START_TIME} from '../data/data';

const mistake = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;
const TIMER_RADIUS = 370;
const fullLength = 2 * Math.PI * TIMER_RADIUS;


export default class Header extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }
  get template() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0, 0, 780, 780">
       <circle
         cx="390" cy="390" r="370"
         class="timer-line"
         stroke-dasharray="${fullLength}"
         stroke-dashoffset="${fullLength / GAME_START_TIME * (GAME_START_TIME - this.state.time)}"
         style="filter: url(.#blur);">
       </circle>
         </svg>

       <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
         <span class="timer-value-mins">${getMinutes(this.state.time)}</span>
         <span class="timer-value-dots">:</span>
         <span class="timer-value-secs">${getSeconds(this.state.time)}</span>
       </div>
     

     <div class="main-mistakes">
     ${new Array(this.state.state.mistakes).fill(mistake).join(``)}
     </div>`;
  }

  bind() {
    this.minutes = this.element.querySelector(`.timer-value-mins`);
    this.seconds = this.element.querySelector(`.timer-value-secs`);
    this.circleElement = this.element.querySelector(`.timer-line`);
  }

  updateTime(time) {
    this.minutes.textContent = getMinutes(time);
    this.seconds.textContent = getSeconds(time);
    this.circleElement.setAttribute(`stroke-dasharray`, `${fullLength}`);
    this.circleElement.setAttribute(`stroke-dashoffset`, `${fullLength / GAME_START_TIME * (GAME_START_TIME - time)}`);
  }

  draw() {
    const container = document.querySelector(`.main--level`);
    const level = document.querySelector(`.main-wrap`);
    container.insertBefore(this.element, level);
  }

  colorize() {
    document.querySelector(`.timer-value`).classList.add(`timer-value--finished`);
  }
}
