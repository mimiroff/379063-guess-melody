//
// export default class Timer {
//   set time(time) {
//     if (typeof time !== `number`) {
//       throw new Error(`Wrong argument type. Number should be passed!`);
//     }
//     this._time = time;
//   }
//
//   get time() {
//     return this._time;
//   }
//
//   reset() {
//     this.time = 300;
//   }
//
//   tick() {
//     if (this.time === 0) {
//       this.time = 0;
//       this.massage = `Time is up!`;
//     } else {
//       this.time--;
//     }
//   }
//
//   onTick() {
//
//   }
//
//   start() {
//     this.interval = setInterval(() => {
//       this.tick();
//       this.onTick();
//       if (this.time === 0) {
//         this.stop();
//       }
//     }, 1000);
//   }
//
//   stop() {
//     clearInterval(this.interval);
//   }
// }
