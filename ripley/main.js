//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
var http = require("http")
const port = process.env.PORT || 4000;

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
var redis = require('redis');
const WebSocket = require('ws');

let server = require('http').createServer();
//const wss = new WebSocket.Server({ port: 3030 });
const wss = new WebSocket.Server({ server:server });

server.on('request', app);
//var client = redis.createClient();
if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var clientRedis = require("redis").createClient(rtg.port, rtg.hostname);

    clientRedis.auth(rtg.auth.split(":")[1]);
  } else {
    var clientRedis = require("redis").createClient();
  }
  clientRedis.on('connect', function() {
    console.log('Redis client connected');
});

clientRedis.on('error', function (err) {
    console.log('Something went wrong ' + err);
});
clientRedis.set('CL', '-33.4372,-70.6506', redis.print);
clientRedis.set('CH', '47.376721, 8.546354', redis.print);
clientRedis.set('NZ', '-36.8404,174.74', redis.print);
clientRedis.set('AU', '-33.8667,151.2', redis.print);
clientRedis.set('UK', '51.5072,-0.1275', redis.print);
clientRedis.set('USA', '32.674684,-83.25066', redis.print);



wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {  
            
        if (data){
            console.log(data)
            wss.clients.forEach(function each(client) {
                clientRedis.get(data, function (error, result) {
                    console.log(result)
                    //client.send("adios")                            
                    request('https://api.darksky.net/forecast/606403b3650cc2417e7bd95529388f7b/'+result, { json: true }, (err, resu, body) => {
                        if (err) 
                            { console.log("error") 
                        } else {
                            //console.log(resu.body.currently)
                            //client.send("adios")
                            client.send(JSON.stringify(resu.body.currently));
                        }                       
                    });  
                    
                });                                               
              });
        }
        /*
            setInterval(function(){
                
            },10*1000);
        */
    });
});


  const request = require('request');
app.get('/:id', (req, res) => {

   return new Promise(function(resolve,reject){
        let failvar = false;
        clientRedis.get(req.params.id, function (error, result) {
            //client.set('lastcallID',req.params.id,redis.print);
            //global.varScope = req.params.id;
            do  {         
                try {
                    failvar = false;
                    if (Math.random(0, 1) < 0.1) 
                        throw new Error('How unfortunate! The API Request Failed')
                } catch(err) {
                    clientRedis.hset(+ new Date(),"api.errors","Error generado en modo Random")
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

server.listen(port, function() {
    console.log(`http/ws server listening on ${port}`);
});