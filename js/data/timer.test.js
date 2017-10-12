import assert from 'assert';
import {setTimer} from '../timer';

describe(`Timer`, () => {
  describe(`setTimer function`, () => {
    it(`should return 1 after 2 tick if time set to 3`, () => {
      let timer = setTimer(3);
      timer = timer.tick();
      timer = timer.tick();
      assert.equal(1, timer.time);
    });
    it(`should not return -1 after 2 tick if time set to 1`, () => {
      let timer = setTimer(1);
      timer = timer.tick();
      timer = timer.tick();
      assert.notEqual(-1, timer.time);
    });
    it(`should return massage after time has reached 0`, () => {
      let timer = setTimer(2);
      timer = timer.tick();
      timer = timer.tick();
      assert.equal(`string`, typeof timer.massage);
    });
    it(`should not return massage until timer has reached 0`, () => {
      let timer = setTimer(3);
      timer = timer.tick();
      timer = timer.tick();
      assert.notEqual(`string`, typeof timer.massage);
    });
    it(`should set timer to 300 when method reset is called`, () => {
      let timer = setTimer(3);
      timer = timer.reset();
      assert.equal(300, timer.time);
    });
    it(`should throw an error when wrong argument type has been passed to function`, () => {
      assert.throws(setTimer.bind(setTimer, `3`));
    });
  });
});
