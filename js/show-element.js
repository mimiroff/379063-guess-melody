const showElement = (fragment) => {
  const screen = document.querySelector(`.main`);
  const mainScreen = screen.querySelector(`.main`);
  const newScreen = fragment;

  if (mainScreen) {
    screen.replaceChild(newScreen, mainScreen);
  } else {
    screen.appendChild(newScreen);
  }
};

const template = document.querySelector(`#templates`).content.cloneNode(true);
const screens = template.querySelectorAll(`.main`);

export {showElement, screens};
