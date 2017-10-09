import assert from 'assert';
import startTimer from '../timer';

describe(`Timer`, () => {
  describe(`startTimer function`, () => {
    it(`should stop after 5 seconds`, () => {
      assert.equal(5, startTimer(5));
    });
  });
});
