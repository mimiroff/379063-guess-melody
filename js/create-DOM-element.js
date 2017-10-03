const getElementFromTemplate = (string) => {
  const template = document.createElement(`template`);
  template.innerHTML = string;
  return template.content.cloneNode(true);
};

export default getElementFromTemplate;
