import PubSub from 'pubsub-js';

const store = {
  _data: {
    weather: {},
    cityList: [],
  },
  setWeather(cityId, info) {
    this._data.weather[cityId] = info;
  },
  getWeather(cityId) {
    return this._data.weather[cityId];
  },
  setCityList(list) {
    this._data.cityList = list;
    PubSub.publish('store-change');
  },
  getCityList() {
    return this._data.cityList;
  }
};

export default store;
