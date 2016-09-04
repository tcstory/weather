import Data from './components/data';
import store from './components/store';
import weatherIcon from './components/weather-icons';

require('./index.scss');

const App = {
  init() {
    this._weatherIconEl = document.querySelector('.weather-wrapper__weather-preview ');
    this._weatherText = document.querySelector('.weather-wrapper__weather-text');
    this._citynameEl = document.querySelector('.weather-wrapper__city-name-text');
    this._temperatureEl = document.querySelector('.weather-wrapper__temperature');
  },
  fetchDefaultWeather(cityId) {
    Data.fetchWeather(cityId, (err, res) => {
      if (!err) {
        const info = res.body['HeWeather data service 3.0'][0];
        store.cacheWeather(cityId, info);
        this.showWeather(cityId);
      } else {
        if (__DEV__) {
          console.log(err);
        }
      }
    });
  },
  showWeather(cityId) {
    const w = store.getWeather(cityId);
    this._weatherIconEl.style.backgroundImage = `url(${weatherIcon[w.now.cond.code][0]})`;
    this._citynameEl.textContent = w.basic.city;
    this._temperatureEl.textContent = `${w.now.tmp}°`;
    this._weatherText.textContent = `${w.now.cond.txt}`;
  },
};

window.addEventListener('DOMContentLoaded', function () {
  App.init();
  const defaultCityId = 'CN101280601';
  App.fetchDefaultWeather(defaultCityId);
});
