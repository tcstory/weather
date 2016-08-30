import request from 'superagent';

const key = '7246069012d242c0a06cb7163c9cb555';

let Data = {
    fetchWeather(cityId, cb) {
        request
            .get('https://api.heweather.com/x3/weather')
            .query({
                cityid: cityId,
                key: key
            })
            .end(cb)
    }
};

export default Data;