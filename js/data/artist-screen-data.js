import {musicData, initialState} from './data';
import {getRandomInt} from '../util';

const generateArtistQuestion = (numberOfAnswers) => {
  const questionData = [...[...musicData].keys()].filter((it) => {
    return !initialState.artistQuestions.has(it);
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
    }).slice(0, numberOfAnswers - 1).map((it) => {
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

export {generateArtistQuestion};
