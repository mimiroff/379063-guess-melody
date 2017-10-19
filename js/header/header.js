import Header from './header-view';
import {initialState} from "../data/data";
import {timer} from '../welcome/welcome';


const getHeader = () => {
  const header = new Header(initialState);
  timer.onTick = () => {
    initialState.time = timer.time;
    header.updateTime(initialState.time);
  };

  return header;
};

export default getHeader;
