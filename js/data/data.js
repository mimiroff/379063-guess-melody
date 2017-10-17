
const initialState = {
  _time: 300,
  _mistakes: 0,
  _level: 0,
  artistQuestions: new Set(),
  genreQuestions: new Set(),
  _playerAnswers: [],
  reset() {
    this._time = 300;
    this._mistakes = 0;
    this._level = 0;
    this.artistQuestions.clear();
    this.genreQuestions.clear();
    this._playerAnswers = [];
  },
  get answers() {
    return this._playerAnswers;
  },
  set time(time) {
    this._time = time;
  },
  get time() {
    return this._time;
  },
  get mistakes() {
    return this._mistakes;
  },
  get level() {
    return this._level;
  },
  nextLevel() {
    this._level++;
  },
  addMistake() {
    this._mistakes++;
  },
  addAnswer(answer) {
    this._playerAnswers.push(answer);
  }
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
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
]);

const welcomeData = {
  gameName: `Угадай мелодию`,
  title: `Правила игры`,
  rules: `Правила просты — за 5 минут ответить на все вопросы.<br>
          Ошибиться можно 3 раза.<br>
          Удачи!`
};

const getWelcome = () => {
  return welcomeData;
};

export {initialState, musicData, getWelcome};