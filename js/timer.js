
export default class Timer {
  set time(time) {
    this._time = time;
  }

  get time() {
    return this._time;
  }

  reset() {
    this.time = 300;
  }

  tick() {
    this.time--;
  }

  onTick() {

  }

  start() {
    this.reset();
    this.interval = setInterval(() => {
      this.tick();
      this.onTick();
      if (this.time === 0) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }
}
