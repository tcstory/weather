import PubSub from 'pubsub-js';
import request from 'superagent';

require('./index.scss');

const key = '7246069012d242c0a06cb7163c9cb555';

let store = {

};

let net = {
    fetchWeather(cityId, cb) {
        request
            .get('https://api.heweather.com/x3/weather')
            .query({
                cityid: cityId,
                key: key
            })
            .end(function (err, res) {
                if (err) {
                    if (__DEV__) {
                        console.log(err);
                    }
                } else {
                    cb(res)
                }
            })
    }
};

let App = {

};




