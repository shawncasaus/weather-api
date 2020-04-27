const request = require('request');
const keys = require('./api-key');

const darksky = (lat, long, callback) => {
    const darkskyUrl = 'https://api.darksky.net/forecast/' + keys.darkSky + '/' + lat + ',' + long + '?lang=fr&units=si';

    request({
        url: darkskyUrl,
        json: true
    }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather Service", undefined);
        } else if(response.body.error) {
            callback(response.body.error, undefined);
        } else {
            callback(undefined, response.body.currently);
        }
    });
}

module.exports = darksky;