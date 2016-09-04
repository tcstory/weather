const store = {
  _weather: {},
  cacheWeather(cityId, info) {
    this._weather[cityId] = info;
  },
  getWeather(cityId) {
    return this._weather[cityId];
  },
};

export default store;
