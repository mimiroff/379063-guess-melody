
import {showElement} from './show-element';
import {welcomeScreen, onPlayButtonClick} from "./welcome";


showElement(welcomeScreen);

const playButton = document.querySelector(`.main-play`);
playButton.addEventListener(`click`, onPlayButtonClick);

