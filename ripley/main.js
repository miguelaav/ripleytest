//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// define the Express app
const app = express();

// the database
const questions = [];

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan('combined'));
const axios = require('axios');
var redis = require('redis');
var client = redis.createClient();
client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});
client.set('CL', '-33.4372,-70.6506', redis.print);
client.set('CH', '47.376721, 8.546354', redis.print);
client.set('NZ', '-36.8404,174.74', redis.print);
client.set('AU', '-33.8667,151.2', redis.print);
client.set('UK', '51.5072,-0.1275', redis.print);
client.set('USA', '32.5430633,-85.3900823', redis.print);


app.get('/:id', (req, res) => {
    const request = require('request');
    //console.log(req.params.id)
    
    client.get(req.params.id, function (error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log(result);
        request('https://api.darksky.net/forecast/606403b3650cc2417e7bd95529388f7b/'+result, { json: true }, (err, resu, body) => {
        if (err) { return console.log(err); }
        res.send(resu)
        });
    });
  
});

// start the server
app.listen(8081, () => {
  console.log('listening on port 8081');
});