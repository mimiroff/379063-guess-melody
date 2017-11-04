import 'babel-polyfill';
import 'whatwg-fetch';
import App from './application';
import Loader from './loader';

App.showLoose(`loading`);

Loader.loadData().then((gameData) => App.init(gameData)).then(App.showWelcome).catch(() => App.showLoose(`noConnection`));
