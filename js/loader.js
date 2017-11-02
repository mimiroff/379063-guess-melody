import App from './application';
const SERVER_URL = `https://es.dump.academy/guess-melody`;

const DEFAULT_NAME = `id379063`;

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`).catch(App.showLoose(`noConnection`)).then((response) => {
      return response.json();
    });
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${name}`).then((res) => res.json());
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${name}`, requestSettings);
  }
}

