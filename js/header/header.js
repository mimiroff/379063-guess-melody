import {initialState} from '../data/data';
import getHeaderTemplate from './header-view';

const getHeader = () => {
  return getHeaderTemplate(initialState);
};

// const setTimer = (time) => {
//   if (typeof time !== `number`) {
//     throw new Error(`Wrong argument type`);
//   }
//   // if (time === 0) {
//   //   return {
//   //     time,
//   //     tick() {
//   //       if (time > 0) {
//   //         return setTimer(time - 1);
//   //       } else {
//   //         return setTimer(time);
//   //       }
//   //     },
//   //     reset() {
//   //       return setTimer(300);
//   //     },
//   //     massage: `Time is up!`
//   //   };
//   // } else {
//   return {
//     time,
//     tick() {
//       if (time > 0) {
//         return setTimer(time - 1);
//       } else {
//         return setTimer(time);
//       }
//     },
//     reset() {
//       return setTimer(300);
//     },
//     start() {
//       this.timer = setTimer(initialState.time);
//       this.interval = setInterval(() => {
//         this.timer = this.timer.tick();
//         initialState.time = this.timer.time;
//         console.log(initialState.time);
//         if (this.timer.time === 0) {
//           clearInterval(this.interval);
//         }
//       }, 1000);
//     },
//     stop() {
//       clearInterval(this.interval)
//     }
//   };
// };
//
// const startTimer = () => {
//   let timer = setTimer(initialState.time);
//   const interval = setInterval(() => {
//     timer = timer.tick();
//     initialState.time = timer.time;
//     console.log(initialState.time);
//     if (timer.time === 0) {
//       clearInterval(interval);
//     }
//   }, 1000);
// };

export {getHeader};
