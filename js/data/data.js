import {getRandomInt} from "../util";

export const GAME_START_TIME = 300;
export const FAST_ANSWER_TIME = 20;
const artistQuestions = new Set();
const genreQuestions = new Set();

const initialState = {
  mistakes: 0,
  level: 0,
  time: GAME_START_TIME,
  playerAnswers: [],
  question: null
};

export const tick = (game) => {
  game = Object.assign({}, game);
  game.time--;
  return game;
};

export const reset = (game) => {
  game = Object.assign({}, game);
  game.time = GAME_START_TIME;
  game.mistakes = 0;
  game.level = 0;
  game.playerAnswers = [];
  return game;
};

export const nextLevel = (game) => {
  game = Object.assign({}, game);
  game.level++;
  return game;
};

export const addMistake = (game) => {
  game = Object.assign({}, game);
  game.mistakes++;
  return game;
};

export const addAnswer = (game, answer) => {
  game = Object.assign({}, game);
  game.playerAnswers.push(answer);
  return game;
};

const musicData = new Set([
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=6feb0654949ef64c`,
    genre: `Electronic`
  }
]);

const generateArtistQuestion = () => {
  const ANSWERS_QUANTITY = 3;
  const questionData = [...[...musicData].keys()].filter((it) => {
    return !artistQuestions.has(it);
  });
  const questionNumber = questionData[getRandomInt(0, questionData.length)];

  const generateAnswers = () => {
    const answers = [];
    let answer = {
      artist: [...musicData][questionNumber].artist,
      image: [...musicData][questionNumber].image,
      isCorrect: true
    };
    answers.push(answer);

    const artists = new Set();
    const filteredByIndex = [...musicData].filter((it, i) => {
      return i !== questionNumber;
    });

    const filteredByArtists = filteredByIndex.filter((it) => {
      if (!artists.has(it.artist) && it.artist !== [...musicData][questionNumber].artist) {
        artists.add(it.artist);
        return it;
      } else {
        return false;
      }
    });

    filteredByArtists.sort(() => {
      return Math.random() - 0.5;
    }).slice(0, ANSWERS_QUANTITY - 1).map((it) => {
      answer = {
        artist: it.artist,
        image: it.image,
        isCorrect: false
      };
      answers.push(answer);
    });

    answers.sort(() => {
      return Math.random() - 0.5;
    });
    return answers;
  };

  const artistQuestion = {
    src: [...musicData][questionNumber].src,
    answers: generateAnswers(),
    isGenre: false
  };

  artistQuestions.add(questionNumber);
  return artistQuestion;
};

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

const generateGenreQuestion = () => {
  const ANSWERS_QUANTITY = 4;
  const questionData = [...[...musicData].keys()].filter((it) => {
    return !genreQuestions.has(it);
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
    }).slice(0, ANSWERS_QUANTITY - 1).map((it) => {
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
    answers: generateAnswers(),
    isGenre: true
  };

  genreQuestions.add(questionNumber);
  return genreQuestion;
};

const resultScreenData = {
  win: {
    title: `Вы настоящий меломан!`,
    statistics: ``,
    comparison: ``,
    replayTitle: `Сыграть ещё раз`
  },
  timeUp: {
    title: `Увы и ах!`,
    statistics: `Время вышло!<br/>
    Вы не успели отгадать все мелодии`,
    replayTitle: `Попробовать ещё раз`
  },
  noTries: {
    title: `Какая жалость!`,
    statistics: `У вас закончились все попытки.<br/>
    Ничего, повезёт в следующий раз!`,
    replayTitle: `Попробовать ещё раз`
  }
};

export {initialState, musicData, generateGenreQuestion, generateArtistQuestion, answersStack, resultScreenData};
