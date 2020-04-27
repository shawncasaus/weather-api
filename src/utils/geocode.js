const request = require('request');
const keys = require('./api-key');


const geocode = (address, callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + keys.mapBox + '&limit=1';

    const latitude = 0;
    const longitude = 0 
    const location = "";

    const geoInfo = {
        latitude,
        longitude,
        location
    }

    request({
        url: geoCodeUrl,
        json: true
    }, (error, response) => {
        if(error) {
            callback('Unable to connect to location services', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const features =  response.body.features[0];
            geoInfo.latitude = features.center[1];
            geoInfo.longitude = features.center[0];
            geoInfo.location = features.place_name

            callback(undefined, geoInfo);              
        }
    });
}

module.exports = geocode;

