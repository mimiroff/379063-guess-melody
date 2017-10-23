// import {initialState} from '../data/data';
// import ArtistView from './artist-view';
// import {showHeader, showScreen} from '../util';
// import getGenreScreen from '../genre/genre';
// import {generateArtistQuestion} from '../data/artist-screen-data';
// import getResultScreen from '../result/result';
//
// const getArtistScreen = () => {
//   initialState.nextLevel();
//   const artistScreen = new ArtistView(generateArtistQuestion(3));
//   const startTime = initialState.time;
//   const FAST_ANSWER_TIME = initialState.FAST_ANSWER_TIME;
//   let endTime;
//
//   artistScreen.onArtistListClick = (evt) => {
//     endTime = initialState.time;
//     if (evt.target.className === `main-answer-r`) {
//       if (evt.target.value === `true` && (startTime - endTime < FAST_ANSWER_TIME)) {
//         initialState.addAnswer({answer: true, fast: true});
//       } else if (evt.target.value === `true`) {
//         initialState.addAnswer({answer: true, fast: false});
//       } else {
//         initialState.addAnswer({answer: false, fast: false});
//         initialState.addMistake();
//       }
//       if (initialState.mistakes <= 3 && initialState.level < 10) {
//         showScreen(getGenreScreen());
//         showHeader();
//       } else {
//         showScreen(getResultScreen(initialState.GAME_START_TIME - endTime));
//       }
//     }
//   };
//   artistScreen.onControlClick = (evt) => {
//     const audio = evt.target.parentNode.querySelector(`audio`);
//     if (evt.target.classList.contains(`player-control--pause`)) {
//       audio.pause();
//       evt.target.classList.remove(`player-control--pause`);
//       evt.target.classList.add(`player-control--play`);
//     } else if (evt.target.classList.contains(`player-control--play`)) {
//       audio.play();
//       evt.target.classList.remove(`player-control--play`);
//       evt.target.classList.add(`player-control--pause`);
//     }
//   };
//
//   return artistScreen;
// };
//
// export default getArtistScreen;
