import assert from 'assert';
import Timer from './timer';

describe(`Timer`, () => {
  describe(`class Timer methods`, () => {
    it(`should return 1 after 2 tick if time set to 3`, () => {
      const timer = new Timer();
      timer.time = 3;
      timer.tick();
      timer.tick();
      assert.equal(1, timer.time);
    });
    it(`should not return -1 after 2 tick if time set to 1`, () => {
      const timer = new Timer();
      timer.time = 1;
      timer.tick();
      timer.tick();
      assert.notEqual(-1, timer.time);
    });
    it(`should return massage after time has reached 0`, () => {
      const timer = new Timer();
      timer.time = 1;
      timer.tick();
      timer.tick();
      assert.equal(`string`, typeof timer.massage);
    });
    it(`should not return massage until timer has reached 0`, () => {
      const timer = new Timer();
      timer.time = 3;
      timer.tick();
      timer.tick();
      assert.notEqual(`string`, typeof timer.massage);
    });
    it(`should set timer to 300 when method reset is called`, () => {
      const timer = new Timer();
      timer.time = 50;
      timer.reset();
      assert.equal(300, timer.time);
    });
  });
});
