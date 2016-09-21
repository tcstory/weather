import PubSub from 'pubsub-js';
import propagating from 'propagating-hammerjs';
import _Hammer from 'hammerjs';
import Data from './components/data';
import store from './components/store';
import weatherIcon from './components/weather-icons';

const Hammer = propagating(_Hammer);

require('./index.scss');

import Sidebar from './components/sidebar';

const App = {
  init() {
    this._rootEl = document.querySelector('#app');
    this._weatherIconEl = document.querySelector('.weather-wrapper__weather-preview ');
    this._weatherText = document.querySelector('.weather-wrapper__weather-text');
    this._citynameEl = document.querySelector('.weather-wrapper__city-name-text');
    this._temperatureEl = document.querySelector('.weather-wrapper__temperature');
    this._menuBtnEl = document.querySelector('.menu-btn');
    this._bindEvents();
    this._addMultiTouchGesture();
    this._sidebar = new Sidebar();
    this._rootEl.appendChild(this._sidebar.getDom());
  },
  _bindEvents() {
    const mc1 = new Hammer.Manager(this._rootEl);
    mc1.add(new Hammer.Tap());
    mc1.on('tap', (ev) => {
      this._sidebar.closeSidebar();
    });

    const mc2 = new Hammer.Manager(this._menuBtnEl);
    mc2.add(new Hammer.Tap());
    mc2.on('tap', (ev) => {
      this._sidebar.openSidebar();
      ev.stopPropagation();
    });
  },
  _addMultiTouchGesture() {
    this._gestureManager = new Hammer.Manager(this._rootEl);
    const pan = new Hammer.Pan();
    this._gestureManager.add(pan);
    this._gestureManager.on('panright', (ev) => {
      this._sidebar.openSidebar();
    });
    this._gestureManager.on('panleft', (ev) => {
      this._sidebar.closeSidebar();
    });
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
