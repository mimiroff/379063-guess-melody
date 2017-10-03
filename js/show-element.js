const showElement = (fragment) => {
  const screen = document.querySelector(`.main`);
  const newScreen = fragment;

  if (screen.firstChild) {
    screen.removeChild(screen.firstChild);
  }
  screen.appendChild(newScreen);
};

export default showElement;
