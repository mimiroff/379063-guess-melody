import {showElement} from './show-element';
import {onPlayButtonClick, createWelcomeScreen} from './welcome';


showElement(createWelcomeScreen());

const playButton = document.querySelector(`.main-play`);
playButton.addEventListener(`click`, onPlayButtonClick);
