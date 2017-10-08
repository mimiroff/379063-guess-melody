import assert from 'assert';
import generateGameResult from '../generate-result';

describe(`Game result generation`, () => {
  describe(`generateGameResult`, () => {
    it(`should return string 'Время вышло! Вы не успели отгадать все мелодии' if player has failed and his time is over`, () => {
      assert.equal(`Время вышло! Вы не успели отгадать все мелодии`, generateGameResult([12, 3, 8], {
        score: 9, notes: 1, timeLeft: 0
      }));
    });
    it(`should return string 'У вас закончились все попытки. Ничего, повезёт в следующий раз!' 
    if player has failed and ran out out tries`, () => {
          assert.equal(`У вас закончились все попытки. Ничего, повезёт в следующий раз!`, generateGameResult([9, 6, 5], {
            score: 10, notes: 0, timeLeft: 20
          }));
        });
    it(`should return 'Вы заняли 1-ое место из 2 игроков. Это лучше чем у 50% игроков'  
    if player has won the game with 2 scores with one opponent scored 1`, () => {
          assert.equal(`Вы заняли 1-ое место из 2 игроков. Это лучше чем у 50% игроков`, generateGameResult([1], {
            score: 2, notes: 1, timeLeft: 10
          }));
        });
    it(`should return 'Вы заняли 1-ое место из 1 игрока. Это лучше чем у 0% игроков'  
      if player has won the game without opponents`, () => {
          assert.equal(`Вы заняли 1-ое место из 1 игрока. Это лучше чем у 0% игроков`, generateGameResult([], {
            score: 2, notes: 1, timeLeft: 10
          }));
        });
    it(`should return 'Вы заняли 3-ое место из 21 игрока. Это лучше чем у 86% игроков'  
      if player has won the game with 8 scores, took third place with twenty one opponent`, () => {
          assert.equal(`Вы заняли 3-ое место из 21 игрока. Это лучше чем у 86% игроков`, generateGameResult(
              [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 9, 10], {
                score: 8, notes: 1, timeLeft: 10
              }));
        });
  });
});
