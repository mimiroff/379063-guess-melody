import {getMinutes, getSeconds} from "../util";
import AbstractView from "../view";

const mistake = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

export default class Header extends AbstractView {
  get template() {
    return `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
       <circle
         cx="390" cy="390" r="370"
         class="timer-line"
         style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

       <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
         <span class="timer-value-mins">${getMinutes(this.state.time)}</span>
         <span class="timer-value-dots">:</span>
         <span class="timer-value-secs">${getSeconds(this.state.time)}</span>
       </div>
     </svg>

     <div class="main-mistakes">
     ${new Array(this.state.mistakes).fill(mistake).join(``)}
     </div>`;
  }

  bind() {
    this.minutes = this.element.querySelector(`.timer-value-mins`);
    this.seconds = this.element.querySelector(`.timer-value-secs`);
  }

  updateTime(time) {
    this.minutes.textContent = getMinutes(time);
    this.seconds.textContent = getSeconds(time);
  }
}

// const getHeaderTemplate = (state) => {
//   const mistake = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;
//
//   return `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
//       <circle
//         cx="390" cy="390" r="370"
//         class="timer-line"
//         style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
//
//       <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
//         <span class="timer-value-mins">${getMinutes(state.time)}</span>
//         <span class="timer-value-dots">:</span>
//         <span class="timer-value-secs">${getSeconds(state.time)}</span>
//       </div>
//     </svg>
//
//     <div class="main-mistakes">
//     ${new Array(state.mistakes).fill(mistake).join(``)}
//     </div>`;
// };
//
// export default getHeaderTemplate;
