import PubSub from 'pubsub-js';

import Data from './components/data';
import store from './components/store';

require('./index.scss');

let App = {
    fetchDefaultWeather(cityId) {
        Data.fetchWeather(cityId, function (err, res) {
            if (!err) {
                let info = res.body["HeWeather data service 3.0"][0];
                store.cacheWeather(cityId, info);
            } else {
                if (__DEV__) {
                    console.log(err)
                }
            }
        });
    }
};

window.addEventListener('DOMContentLoaded', function () {
    let default_city_id = 'CN101280601';
    App.fetchDefaultWeather(default_city_id);
});




