
export const createElement = (template) => {
  const element = document.createElement(`template`);
  element.innerHTML = template;
  return element.content.cloneNode(true);
};

export const main = document.querySelector(`.main`);

export const showScreen = (view) => {
  main.innerHTML = ``;
  main.appendChild(view.element);
};

export const getMinutes = (timeLeft) => {
  let time = Math.floor(timeLeft / 60);
  return time < 10 ? `0${time}` : `${time}`;
};

export const getSeconds = (timeLeft) => {
  let time = timeLeft % 60;
  return time < 10 ? `0${time}` : `${time}`;
};
