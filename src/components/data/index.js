import request from 'superagent';

const key = '7246069012d242c0a06cb7163c9cb555';

const Data = {
  fetchWeather(cityId, cb) {
    request
      .get('https://api.heweather.com/x3/weather')
      .query({
        key,
        cityid: cityId,
      })
      .end(cb);
  },
  fetchCityList(cb) {
    request
      .get('https://api.heweather.com/x3/citylist')
      .query({
        key,
        search: 'allchina',
      })
      .end(cb);
  },
};

export default Data;
