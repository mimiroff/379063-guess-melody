import assert from 'assert';
import countGameResult from '../count-result';

describe(`Count Function`, () => {
  describe(`countGameResult`, () => {
    it(`should return 7 if 9 answer is true and 1 mistake`, () => {
      assert.equal(7, countGameResult([{answer: true, fast: false}, {answer: true, fast: false},
        {answer: true, fast: false}, {answer: true, fast: false}, {answer: true, fast: false},
        {answer: true, fast: false}, {answer: true, fast: false}, {answer: true, fast: false},
        {answer: true, fast: false}, {answer: false, fast: false}], 1));
    });
    it(`should return -1 if number of answers is less then 10`, () => {
      assert.equal(-1, countGameResult([true, true, false, true, false]));
    });
    it(`should return 12 if 10 answers is true and 2 is fast without any mistake`, () => {
      assert.equal(12, countGameResult([{answer: true, fast: false}, {answer: true, fast: true},
        {answer: true, fast: false}, {answer: true, fast: false}, {answer: true, fast: true},
        {answer: true, fast: false}, {answer: true, fast: false}, {answer: true, fast: false},
        {answer: true, fast: false}, {answer: true, fast: false}], 0));
    });
    it(`should return 10 if 10 answers is true and no mistakes`, () => {
      assert.equal(10, countGameResult([{answer: true, fast: false}, {answer: true, fast: false},
        {answer: true, fast: false}, {answer: true, fast: false}, {answer: true, fast: false},
        {answer: true, fast: false}, {answer: true, fast: false}, {answer: true, fast: false},
        {answer: true, fast: false}, {answer: true, fast: false}], 0));
    });
    it(`should return -1 if player have 4 mistakes`, () => {
      assert.equal(-1, countGameResult([{answer: true, fast: false}, {answer: true, fast: true},
        {answer: false, fast: false}, {answer: false, fast: false}, {answer: false, fast: false},
        {answer: true, fast: false}, {answer: true, fast: false}, {answer: false, fast: false},
        {answer: true, fast: false}, {answer: true, fast: false}], 4));
    });
    it(`should return 9 if 8 answers is true 5 - fast`, () => {
      assert.equal(9, countGameResult([{answer: true, fast: true}, {answer: true, fast: true},
        {answer: true, fast: true}, {answer: true, fast: true}, {answer: true, fast: true},
        {answer: true, fast: false}, {answer: true, fast: false}, {answer: true, fast: false},
        {answer: false, fast: false}, {answer: false, fast: false}], 2));
    });
  });
});
