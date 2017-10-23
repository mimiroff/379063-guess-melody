import {musicData, initialState} from './data';
import {getRandomInt} from '../util';

const answersStack = {
  _answers: new Set(),
  get answers() {
    return this._answers;
  },
  get size() {
    return this._answers.size;
  },
  clear() {
    this._answers.clear();
  },
  add(data) {
    this._answers.add(data);
  },
  delete(data) {
    this._answers.delete(data);
  }
};

const generateGenreQuestion = (numberOfAnswers) => {
  const questionData = [...[...musicData].keys()].filter((it) => {
    return !initialState.genreQuestions.has(it);
  });
  const questionNumber = questionData[getRandomInt(0, questionData.length)];

  const generateAnswers = () => {
    const answers = [];
    let answer = {
      src: [...musicData][questionNumber].src,
      isCorrect: true
    };
    answers.push(answer);

    const filteredByIndex = [...musicData].filter((it, i) => {
      return i !== questionNumber;
    });

    filteredByIndex.sort(() => {
      return Math.random() - 0.5;
    }).slice(0, numberOfAnswers - 1).map((it) => {
      if (it.genre === [...musicData][questionNumber].genre) {
        answer = {
          src: it.src,
          isCorrect: true
        };
      } else {
        answer = {
          src: it.src,
          isCorrect: false
        };
      }
      answers.push(answer);
    });

    answers.sort(() => {
      return Math.random() - 0.5;
    });
    return answers;
  };

  const genreQuestion = {
    genre: [...musicData][questionNumber].genre,
    answers: generateAnswers()
  };

  initialState.genreQuestions.add(questionNumber);
  return genreQuestion;
};

export {generateGenreQuestion, answersStack};
