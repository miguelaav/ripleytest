//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// define the Express app
const app = express();

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
//var client = redis.createClient();
if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var client = require("redis").createClient(rtg.port, rtg.hostname);

    client.auth(rtg.auth.split(":")[1]);
  } else {
    var client = require("redis").createClient();
  }
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
client.set('USA', '32.674684,-83.25066', redis.print);

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
  }
  const request = require('request');
app.get('/:id', (req, res) => {

   return new Promise(function(resolve,reject){
        let failvar = false;
        client.get(req.params.id, function (error, result) {
            do  {         
                try {
                    failvar = false;
                    if (Math.random(0, 1) < 0.1) 
                        throw new Error('How unfortunate! The API Request Failed')
                } catch(err) {
                    client.hset(+ new Date(),"api.errors","Error generado en modo Random")
                    failvar = true;
                }
                request('https://api.darksky.net/forecast/606403b3650cc2417e7bd95529388f7b/'+result, { json: true }, (err, resu, body) => {
                    if (err) 
                        { reject("error") 
                    } else {
                        //console.log(resu)
                        if (failvar == false) {resolve(resu)}
                        //resolve(resu)
                    }                       
                });
            } while (failvar == true) 
        });
    }).then(function(result) {
                console.log("termino")
                res.send(result)
    });
        
});

function intent(){
    
}


const port = process.env.PORT || 4000;
// start the server
app.listen(port, () => {
  console.log('listening on port 4000');
});