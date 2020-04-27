const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const darksky =  require('./utils/darksky');
const { setJSON, getJSON } = require('./utils/lastCall');

const app = express();

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

//setup handlebars engine
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//index page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Application Météo',
        name: "Shawn Casaus"
    });
});

//main server request for the weather API
app.get('/weather', (req, res) => {
    console.log("req");

    //if the address call is invalid
    if (!req.query.address) {
        return res.send({
            error: 'No location provided'
        });
    }

    //if the Address call is valid
    if (req.query.address) {
        const location = req.query.address;

        //call to geolocation API
        geocode(location, (error, {latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: error
                });
            } 
        
            //call to darksky API
            darksky(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    });
                } 

                const data = {
                    forcast: forecastData,
                    location: location
                };

                //Save Last Call
                setJSON(data);
                return res.send(data); //response
            });
        });
    }
}); 

//get JSON from last request and send it too a get-json url
app.get('/weather/get-json', (req, res) => {
    return res.send(getJSON()); //get last call and send it to URL /weather/get-json
});

//renders the about page 
app.get('/about', (req, res) => {
    res.render('about', {
        title: ' À Propos de Moi',
        name: "Shawn Casaus"
    });
});

//renders the help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Page d'Aide",
        name: 'Shawn Casaus',
        helpMessage: "Besoin-vous d'aide?"
    });
});

//renders any incorrect help url, for futrue support of more help features
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Erreur: 404',
        name: 'Shawn Casaus',
        errorMessage: "Désolé la article de la aide tu est à la recherche de est ne disponible pas."
    });
});

//handler for 404's
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Erreur: 404',
        name: 'Shawn Casaus',
        errorMessage: "Désolé la page tu est à la recherche de est ne disponible pas."
    });
});

//initial listener
app.listen(3000, () => {
    console.log("Server running on port 3000.");
});