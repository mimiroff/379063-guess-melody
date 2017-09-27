(function () {
  const template = document.querySelector(`#templates`).content.cloneNode(true);
  const screens = template.querySelectorAll(`.main`);

  const mainScreens = [];
  screens.forEach(function (it) {
    if (it.classList.contains(`main--welcome`) || it.classList.contains(`main--level`)) {
      mainScreens.push(it);
    }
  });

  let screenNumber = 0;

  const showElement = (number) => {
    const fragment = document.createDocumentFragment();
    const screen = document.querySelector(`.main`);
    const mainScreen = screen.querySelector(`.main`);
    const newScreen = fragment.appendChild(mainScreens[number]);

    if (mainScreen) {
      screen.replaceChild(newScreen, mainScreen);
    } else {
      screen.appendChild(newScreen);
    }
  };

  const switchScreens = (direction) => {
    if (direction === `right` && screenNumber < mainScreens.length - 1) {
      showElement(++screenNumber);
    } else if (direction === `left` && screenNumber > 0) {
      showElement(--screenNumber);
    }
  };

  showElement(screenNumber);

  document.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 39 && evt.altKey) {
      switchScreens(`right`);
    } else if (evt.keyCode === 37 && evt.altKey) {
      switchScreens(`left`);
    }
  });
})();

