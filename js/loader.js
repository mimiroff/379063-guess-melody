
const SERVER_URL = `https://es.dump.academy/guess-melody/questions`;

export default class Loader {
  static loadData() {
    return fetch(SERVER_URL).then((response) => {
      return response.json();
    });
  }

  static prefetch(data) {
    data.map((it) => {
      if (it.type === `artist`) {
        fetch(it.src);
      } else {
        it.answers.map((item) => {
          fetch(item.src);
        });
      }
    });
    return data;
  }

}

