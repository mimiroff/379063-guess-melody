const initialState = {
  time: 300,
  mistakes: 0,
  level: 0,
  artistQuestions: new Set()
};

const welcomeData = {
  gameName: `Угадай мелодию`,
  title: `Правила игры`,
  rules: `Правила просты — за 5 минут ответить на все вопросы.<br>
          Ошибиться можно 3 раза.<br>
          Удачи!`
};

const playerAnswers = [];

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
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
]);

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateArtistQuestion = () => {
  const questionData = [...[...musicData].keys()].filter((it) => {
    return !initialState.artistQuestions.has(it);
  });
  const questionNumber = questionData[getRandomInt(0, questionData.length - 1)];

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
      if (!artists.has(it.artist) || it.artist === [...musicData][questionNumber].artist) {
        artists.add(it.artist);
        return it;
      } else {
        return false;
      }
    });

    filteredByArtists.sort(() => {
      return Math.random() - 0.5;
    }).slice(0, 2).map((it) => {
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
    answers: generateAnswers()
  };

  initialState.artistQuestions.add(questionNumber);
  return artistQuestion;
};

export {initialState, generateArtistQuestion, welcomeData, playerAnswers};
